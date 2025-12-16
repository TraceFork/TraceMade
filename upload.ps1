# Quick GitHub Upload - Run this after restarting PowerShell
# Make sure to replace YOUR_USERNAME with your actual GitHub username!

Write-Host "=== TraceFork GitHub Upload ===" -ForegroundColor Cyan
Write-Host ""

# Check if git works
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ $gitVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Git not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Solution: Close this window and open a NEW PowerShell window" -ForegroundColor Yellow
    Write-Host "Git was just installed and needs a fresh terminal to work." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Get username
$username = Read-Host "Enter your GitHub username"
$email = Read-Host "Enter your email for Git commits"

# Configure git
Write-Host ""
Write-Host "Configuring Git..." -ForegroundColor Yellow
git config --global user.name "$username"
git config --global user.email "$email"
Write-Host "✓ Git configured" -ForegroundColor Green

# Initialize repo
Write-Host ""
Write-Host "Initializing repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit: TraceFork v1.0.0 - Cinematic Intelligence System"
git branch -M main
Write-Host "✓ Repository initialized and committed" -ForegroundColor Green

# Add remote
Write-Host ""
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
$repoUrl = "https://github.com/$username/TraceFork.git"
git remote add origin $repoUrl
Write-Host "✓ Remote added: $repoUrl" -ForegroundColor Green

Write-Host ""
Write-Host "=== IMPORTANT: Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create the repository on GitHub:" -ForegroundColor Yellow
Write-Host "   → Go to: https://github.com/new" -ForegroundColor White
Write-Host "   → Repository name: TraceFork" -ForegroundColor White
Write-Host "   → Description: A cinematic, experimental, intelligence-driven digital organism" -ForegroundColor White
Write-Host "   → Public or Private (your choice)" -ForegroundColor White
Write-Host "   → DO NOT initialize with README/gitignore/license" -ForegroundColor Red
Write-Host "   → Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repo, run this command:" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3. When prompted for password:" -ForegroundColor Yellow
Write-Host "   → Use a Personal Access Token (not your password)" -ForegroundColor White
Write-Host "   → Create one at: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "   → Required scope: 'repo'" -ForegroundColor White
Write-Host ""
Write-Host "Your repo will be live at: https://github.com/$username/TraceFork" -ForegroundColor Green
Write-Host ""
