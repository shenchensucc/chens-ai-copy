#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  getFullContext,
  addLearning,
  updatePreference,
  addInterestedCompany,
} from "./storage/context-store.js";

const server = new Server(
  {
    name: "chens-ai-copy",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_context",
        description:
          "Get Chen's full personal context: experience, skills, resume preferences, learnings, and interested companies. Use when starting a new project or when you need to understand Chen's background and preferences.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              description:
                "Optional: 'all' | 'experience' | 'skills' | 'preferences' | 'learnings' | 'companies'. Default: all.",
              enum: ["all", "experience", "skills", "preferences", "learnings", "companies"],
            },
          },
        },
      },
      {
        name: "add_learning",
        description:
          "Add a learning, pattern, or insight to Chen's context. Use when Chen adopts a new approach, learns something from a project, or asks to remember something for future use.",
        inputSchema: {
          type: "object",
          properties: {
            content: { type: "string", description: "The learning or insight to remember" },
            source: { type: "string", description: "Optional: project or context where this was learned" },
            category: { type: "string", description: "Optional: e.g. 'resume', 'coding', 'process'" },
          },
          required: ["content"],
        },
      },
      {
        name: "update_preference",
        description:
          "Update a preference in Chen's context. Use when Chen expresses a new preference (e.g. resume format, communication style, tool choice).",
        inputSchema: {
          type: "object",
          properties: {
            key: { type: "string", description: "Preference key, e.g. 'resumeFormat.style' or 'communication.tone'" },
            value: { type: "string", description: "The value to set (will be parsed as JSON if possible)" },
          },
          required: ["key", "value"],
        },
      },
      {
        name: "add_interested_company",
        description:
          "Add a company Chen is interested in applying to or working with.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Company name" },
            sector: { type: "string", description: "Optional: industry sector" },
            notes: { type: "string", description: "Optional: notes" },
            rolesOfInterest: {
              type: "array",
              items: { type: "string" },
              description: "Optional: roles of interest",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const safeArgs = (args || {}) as Record<string, unknown>;

  try {
    if (name === "get_context") {
      const section = (safeArgs.section as string) || "all";
      const context = await getFullContext();

      let output: unknown;
      if (section === "all") {
        output = context;
      } else if (section === "experience") {
        output = context.experience;
      } else if (section === "skills") {
        output = context.skills;
      } else if (section === "preferences") {
        output = context.preferences;
      } else if (section === "learnings") {
        output = context.learnings;
      } else if (section === "companies") {
        output = context.interestedCompanies;
      } else {
        output = context;
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }

    if (name === "add_learning") {
      const content = safeArgs.content as string;
      if (!content) {
        return {
          content: [{ type: "text", text: "Error: content is required" }],
          isError: true,
        };
      }
      const learning = await addLearning({
        content,
        source: safeArgs.source as string | undefined,
        category: safeArgs.category as string | undefined,
      });
      return {
        content: [
          {
            type: "text",
            text: `Added learning: ${JSON.stringify(learning, null, 2)}`,
          },
        ],
      };
    }

    if (name === "update_preference") {
      const key = safeArgs.key as string;
      const valueStr = safeArgs.value as string;
      if (!key || valueStr === undefined) {
        return {
          content: [{ type: "text", text: "Error: key and value are required" }],
          isError: true,
        };
      }
      let value: unknown = valueStr;
      try {
        value = JSON.parse(valueStr);
      } catch {
        // Keep as string
      }
      await updatePreference(key, value);
      return {
        content: [
          {
            type: "text",
            text: `Updated preference ${key} = ${JSON.stringify(value)}`,
          },
        ],
      };
    }

    if (name === "add_interested_company") {
      const companyName = safeArgs.name as string;
      if (!companyName) {
        return {
          content: [{ type: "text", text: "Error: name is required" }],
          isError: true,
        };
      }
      await addInterestedCompany({
        name: companyName,
        sector: safeArgs.sector as string | undefined,
        notes: safeArgs.notes as string | undefined,
        rolesOfInterest: safeArgs.rolesOfInterest as string[] | undefined,
      });
      return {
        content: [
          {
            type: "text",
            text: `Added interested company: ${companyName}`,
          },
        ],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
