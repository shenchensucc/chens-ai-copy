# Chen's AI Copy

Personal digital twin MCP (Model Context Protocol) server. Provides Chen's experience, skills, resume preferences, learnings, and interested companies to AI assistants across projects.

## What It Does

- **get_context** — Retrieve experience, skills, preferences, learnings, or interested companies
- **add_learning** — Record new learnings, patterns, or insights from project work
- **update_preference** — Update resume format, communication style, or other preferences
- **add_interested_company** — Add companies to track for job applications

## Quick Start

### Install & Run

```bash
cd chens-ai-copy
npm install
npm run build
npm start
```

### Add to Cursor

Add to `~/.cursor/mcp.json` (Windows: `%APPDATA%\Cursor\User\globalStorage\mcp.json` or Cursor Settings > MCP):

```json
{
  "mcpServers": {
    "chens-ai-copy": {
      "command": "node",
      "args": ["C:/path/to/chens-ai-copy/dist/index.js"],
      "env": {
        "CHENS_AI_COPY_DATA_PATH": "C:/path/to/chens-ai-copy/data"
      }
    }
  }
}
```

Or use `npx` from the project directory:

```json
{
  "mcpServers": {
    "chens-ai-copy": {
      "command": "npx",
      "args": ["-y", "chens-ai-copy"],
      "cwd": "C:/path/to/chens-ai-copy"
    }
  }
}
```

## Data Structure

| File | Content |
|------|---------|
| `data/preferences.json` | Resume format, communication style, cover letter structure |
| `data/experience.json` | Work history, education, certifications |
| `data/skills.json` | Technical, soft, and domain skills |
| `data/learnings.json` | Project-derived learnings and patterns |
| `data/interested_companies.json` | Companies and roles of interest |

## Updating From Other Projects

When working in any project, ask the AI to:
- "Add this to my digital twin: [learning]"
- "Remember that I prefer [preference]"
- "Update my context with what we learned from this project"

The AI will call `add_learning` or `update_preference` to keep your context current.

## Environment Variables

- `CHENS_AI_COPY_DATA_PATH` — Override data directory (default: `./data` relative to package)

## License

MIT
