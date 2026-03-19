---
name: digital-twin-updater
description: Always active skill for Chen's digital twin repo. Use when working in this repo to read experience/skills/preferences/learnings context, or when the user says "update my digital twin", "add learning", "remember this", "add to my context", "update preference", "add company", or discusses insights, patterns, or lessons from project work. Also use proactively at end of sessions to capture new insights.
version: 1.0.0
---

# Chen's Digital Twin Updater

This repo IS Chen's digital twin — the source of truth for experience, skills, learnings, and preferences. Claude should actively read from and write to data files here.

## Data Files

| File | Purpose | When to Update |
|------|---------|----------------|
| `data/skills.json` | Technical, soft, domain skills, certifications | New tool/tech learned, certification earned |
| `data/experience.json` | Work history, education, roles | Job changes, new responsibilities |
| `data/learnings.json` | Project-derived patterns and insights | After completing tasks, discovering patterns |
| `data/preferences.json` | Resume format, communication style, cover letter | Style feedback, format changes |
| `data/interested_companies.json` | Companies/roles to track | New companies of interest |

## Core Behaviors

### Reading Context
When starting work in this repo or any conversation where Chen's background is relevant, read the relevant data files to have full context of who Chen is and what he knows.

### Writing Updates
When the user says anything like:
- "add this to my digital twin"
- "remember that I prefer X"
- "add learning: ..."
- "add [company] to my list"
- "update my context"

**Directly edit the relevant JSON file.** Do not just acknowledge — make the actual change.

### Proactive Updates
After completing significant work in this repo, consider if any insight is worth persisting:
- New patterns discovered about the codebase
- Better ways to structure data
- New skills or tools Chen demonstrated using

## Update Protocol

### Adding a Learning
Edit `data/learnings.json` — add to the array:
```json
{
  "date": "YYYY-MM-DD",
  "context": "brief context of where this came from",
  "learning": "the actual insight or pattern",
  "tags": ["relevant", "tags"]
}
```

### Adding a Skill
Edit `data/skills.json` — add to the appropriate array (`technical`, `soft`) or object (`engineerToolbox`, `engineeringDomains`).

### Updating a Preference
Edit `data/preferences.json` — find the relevant key and update it.

### Adding an Interested Company
Edit `data/interested_companies.json` — add entry with company name, role, and reason.

## Identity Summary

Chen is a P.Eng with PhD Chemical Engineering background, specializing in:
- Asset integrity management, RBI (API 580 certified)
- Pipeline integrity and corrosion engineering
- Data analytics (Python, Streamlit, FastAPI, Power BI, SQL)
- Building the "Engineer Toolbox" — Python web app for facility/pipeline engineering

Employers: Pacific Northern Gas, Suncor Energy, Nova Chemicals, Camber Technology, University of Alberta.

When helping Chen, tailor responses to his engineering + data science background.
