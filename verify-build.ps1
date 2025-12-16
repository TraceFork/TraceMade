# TraceFork Build Verification Script
# Run this to simulate Netlify's build process locally

Write-Host "=== TraceFork Build Verification ===" -ForegroundColor Cyan
Write-Host ""

# Check Node version
Write-Host "1. Checking Node version..." -ForegroundColor Yellow
$nodeVersion = node -v
Write-Host "   Node version: $nodeVersion" -ForegroundColor Green

if ($nodeVersion -match "v(\d+)\.") {
    $majorVersion = [int]$matches[1]
    if ($majorVersion -ne 18) {
        Write-Host "   WARNING: Expected Node 18, found v$majorVersion" -ForegroundColor Red
        Write-Host "   Install Node 18 LTS: https://nodejs.org/" -ForegroundColor Yellow
    }
}

Write-Host ""

# Check for package.json
Write-Host "2. Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "   ✓ package.json found" -ForegroundColor Green
    
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.scripts.build) {
        Write-Host "   ✓ build script exists: $($packageJson.scripts.build)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ No build script found in package.json!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   ✗ package.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Clean install
Write-Host "3. Installing dependencies (npm ci)..." -ForegroundColor Yellow
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ npm ci failed!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Dependencies installed" -ForegroundColor Green

Write-Host ""

# Run build
Write-Host "4. Running build (npm run build)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ Build failed!" -ForegroundColor Red
    Write-Host "   Check the error output above for details" -ForegroundColor Yellow
    exit 1
}
Write-Host "   ✓ Build completed successfully" -ForegroundColor Green

Write-Host ""

# Check dist folder
Write-Host "5. Checking build output..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distFiles = Get-ChildItem "dist" -Recurse
    Write-Host "   ✓ dist folder created with $($distFiles.Count) files" -ForegroundColor Green
    
    if (Test-Path "dist/index.html") {
        Write-Host "   ✓ dist/index.html exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ dist/index.html missing!" -ForegroundColor Red
    }
} else {
    Write-Host "   ✗ dist folder not created!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Build Verification Complete ===" -ForegroundColor Cyan
Write-Host "Your build should work on Netlify!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. git add ." -ForegroundColor White
Write-Host "2. git commit -m 'Fix: Add Netlify config and Node 18 compatibility'" -ForegroundColor White
Write-Host "3. git push" -ForegroundColor White
Write-Host "4. Check Netlify deploy logs" -ForegroundColor White
