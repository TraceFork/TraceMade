# TraceFork GitHub Repository Setup Script
# This script helps you set up and push TraceFork to GitHub

Write-Host "=== TraceFork GitHub Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking for Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git installed: $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Git not found! Please install Git first:" -ForegroundColor Red
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if already initialized
if (Test-Path ".git") {
    Write-Host "Git repository already initialized." -ForegroundColor Yellow
    $response = Read-Host "Do you want to continue? (y/n)"
    if ($response -ne "y") {
        exit 0
    }
}
else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
}

Write-Host ""

# Get GitHub username
Write-Host "GitHub Setup" -ForegroundColor Cyan
Write-Host "============" -ForegroundColor Cyan
Write-Host ""
$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "✗ Username cannot be empty" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Repository will be created at:" -ForegroundColor Yellow
Write-Host "  https://github.com/$username/TraceFork" -ForegroundColor White
Write-Host ""

# Confirm
$confirm = Read-Host "Continue with setup? (y/n)"
if ($confirm -ne "y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

Write-Host ""

# Create commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: TraceFork v1.0.0 - Cinematic Intelligence System"
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Commit failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Initial commit created" -ForegroundColor Green

Write-Host ""

# Add remote
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/TraceFork.git"

# Remove existing origin if present
git remote remove origin 2>$null

git remote add origin $remoteUrl
Write-Host "✓ Remote added: $remoteUrl" -ForegroundColor Green

Write-Host ""

# Rename branch to main
Write-Host "Setting default branch to 'main'..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch renamed to main" -ForegroundColor Green

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create the repository on GitHub:" -ForegroundColor Yellow
Write-Host "   https://github.com/new" -ForegroundColor White
Write-Host ""
Write-Host "   Repository name: TraceFork" -ForegroundColor White
Write-Host "   Description: A cinematic, experimental, intelligence-driven digital organism" -ForegroundColor White
Write-Host "   Public or Private: Your choice" -ForegroundColor White
Write-Host "   DO NOT initialize with README, .gitignore, or license" -ForegroundColor Red
Write-Host ""
Write-Host "2. After creating the repo, run this command:" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "   (You may be prompted for GitHub credentials)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Your repository will be live at:" -ForegroundColor Yellow
Write-Host "   https://github.com/$username/TraceFork" -ForegroundColor White
Write-Host ""
Write-Host "4. Optional - Deploy to Netlify:" -ForegroundColor Yellow
Write-Host "   https://app.netlify.com/" -ForegroundColor White
Write-Host "   → Import from Git → Select TraceFork → Deploy" -ForegroundColor White
Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
