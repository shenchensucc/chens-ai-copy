# Chen's AI Copy - Sync from GitHub then start MCP
# Runs git pull before starting, so you always have latest when opening Cursor
$ErrorActionPreference = "SilentlyContinue"
Set-Location $PSScriptRoot
git pull --quiet 2>$null
node dist/index.js
