# Chen's AI Copy - GitHub Setup Script
# Run this after: gh auth login (one-time)

Write-Host "Creating GitHub repo and pushing..." -ForegroundColor Cyan

# Create repo and push (requires gh auth login first)
gh repo create shenchensucc/chens-ai-copy --public --description "Personal digital twin MCP - context, experience, skills, preferences" --source=. --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDone! Repo: https://github.com/shenchensucc/chens-ai-copy" -ForegroundColor Green
} else {
    Write-Host "`nIf you see 'authentication required', run first: gh auth login" -ForegroundColor Yellow
}
