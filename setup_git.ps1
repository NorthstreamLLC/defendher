# DefendHer Sport — one-time Git setup + push to GitHub
# Run from PowerShell inside C:\Users\north\Documents\DefendHer_Sport
# or just double-click this file

Set-Location "$PSScriptRoot"

Write-Host "Cleaning up any broken .git folder..." -ForegroundColor Cyan
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
    Write-Host "  Done." -ForegroundColor Green
}

Write-Host "Initializing git repo..." -ForegroundColor Cyan
git init -b main
git remote add origin https://github.com/NorthstreamLLC/defendher.git

Write-Host "Staging all files..." -ForegroundColor Cyan
git add .

Write-Host "Committing..." -ForegroundColor Cyan
git commit -m "Fix Vercel build: clean vite.config, add vercel.json for static deploy"

Write-Host ""
Write-Host "--------------------------------------------" -ForegroundColor Yellow
Write-Host "All set! Now run this to push to GitHub:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git push -u origin main --force" -ForegroundColor White
Write-Host ""
Write-Host "(The --force is needed because GitHub has unrelated history from the manual uploads.)" -ForegroundColor Gray
Write-Host "--------------------------------------------" -ForegroundColor Yellow
