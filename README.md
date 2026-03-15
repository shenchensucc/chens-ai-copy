# Chen's AI Copy

Personal digital twin MCP (Model Context Protocol) server. Provides Chen's experience, skills, resume preferences, learnings, and interested companies to AI assistants across projects.

**Repo:** [github.com/shenchensucc/chens-ai-copy](https://github.com/shenchensucc/chens-ai-copy)

## What It Does

- **get_context** — Retrieve experience, skills, preferences, learnings, or interested companies
- **add_learning** — Record new learnings, patterns, or insights from project work
- **update_preference** — Update resume format, communication style, or other preferences
- **add_interested_company** — Add companies to track for job applications

## Quick Start

### Install from GitHub (new machine)

```bash
git clone https://github.com/shenchensucc/chens-ai-copy.git
cd chens-ai-copy
npm install
npm run build
```

### Add to Cursor

Add to `~/.cursor/mcp.json` (Windows: `C:\Users\<you>\.cursor\mcp.json` or Cursor Settings > MCP):

```json
{
  "mcpServers": {
    "chens-ai-copy": {
      "command": "node",
      "args": ["C:/path/to/chens-ai-copy/dist/index.js"]
    }
  }
}
```

Use the full path to your cloned `chens-ai-copy` folder.

### Sync on every Cursor start

The MCP uses `sync-and-run.ps1` which runs `git pull` before starting, so you always get the latest when opening Cursor. Ensure the MCP config points to the script:

```json
{
  "chens-ai-copy": {
    "command": "powershell",
    "args": ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "D:/2026/2026-03 Chens-ai-copy/sync-and-run.ps1"]
  }
}
```

### Setup on another machine

1. Clone: `git clone https://github.com/shenchensucc/chens-ai-copy.git D:\2026\2026-03 Chens-ai-copy`
2. Run: `cd D:\2026\2026-03 Chens-ai-copy && npm install && npm run build`
3. Add the MCP config above to `~/.cursor/mcp.json` (adjust path if different)

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

## Sync with GitHub

```bash
git pull   # get updates
git push   # push changes
```

## License

MIT
