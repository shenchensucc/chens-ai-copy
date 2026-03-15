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
      "args": ["D:/2026/2026-02-26 BC Hydro/chens-ai-copy/dist/index.js"]
    }
  }
}
```

Use the full path to your `chens-ai-copy` folder. Optionally set `CHENS_AI_COPY_DATA_PATH` in `env` if you want data elsewhere.

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

## Push to GitHub

**Option A: Using GitHub CLI (recommended)**

```powershell
# One-time: authenticate
gh auth login

# Create repo and push
cd chens-ai-copy
.\setup-github.ps1
```

**Option B: Manual**

1. Create repo at [github.com/new](https://github.com/new) — name: `chens-ai-copy`, Public
2. Push: `git push -u origin main`

Repo URL: https://github.com/shenchensucc/chens-ai-copy

## License

MIT
