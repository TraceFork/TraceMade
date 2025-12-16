# TraceFork GitHub Setup Guide

This guide will help you create a GitHub repository for TraceFork and push all the code.

## Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `TraceFork`
3. Description: `A cinematic, experimental, intelligence-driven digital organism | Built by ForkTrace — 2024`
4. **Keep it Public** (or Private if you prefer)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 2: Initialize and Push (Run these commands)

Open PowerShell in the TraceFork directory and run:

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TraceFork v1.0.0 - Cinematic Intelligence System"

# Add your GitHub repository as remote (REPLACE 'yourusername' with your actual GitHub username)
git remote add origin https://github.com/yourusername/TraceFork.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure Netlify (Optional)

If deploying to Netlify:

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your `TraceFork` repository
5. Netlify will auto-detect settings from `netlify.toml` ✓
6. Click "Deploy site"

**That's it!** Your site will be live in 2-3 minutes.

---

## Alternative: Use the Automated Script

I've created `setup-github.ps1` - just run it and follow the prompts:

```powershell
.\setup-github.ps1
```

---

## What Gets Uploaded

Your repository will include:

```
TraceFork/
├── src/                    # All React components, contexts, hooks
├── public/                 # Static assets
├── index.html             # Entry point
├── package.json           # Dependencies
├── vite.config.js         # Build config
├── netlify.toml           # Netlify deploy config ✓
├── .nvmrc                 # Node version ✓
├── .gitignore             # Git ignore rules ✓
├── README.md              # Project documentation
└── verify-build.ps1       # Build verification script
```

**Total:** 30+ components, 3 contexts, 5 shaders, 2000+ lines CSS

---

## Repository Settings (Recommended)

After creating the repo, configure these settings:

### Topics
Add these topics to help others discover your project:
- `react`
- `threejs` 
- `webgl`
- `gsap`
- `experimental-ui`
- `creative-coding`
- `intelligence-system`
- `awwwards`

### About Section
- Description: `A cinematic, experimental, intelligence-driven digital organism`
- Website: `https://your-netlify-domain.netlify.app` (after Netlify deploy)

### Branch Protection (Optional, for collaboration)
- Settings → Branches → Add rule for `main`
- Require pull request reviews before merging

---

## Troubleshooting

### "Repository already exists"
If you see this error, the repo name is taken. Choose a different name like:
- `TraceFork-System`
- `TraceFork-Intelligence`
- `TraceFork-2024`

### "Authentication failed"
GitHub now requires personal access tokens:

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Use token as password when git prompts

Or use GitHub CLI:
```powershell
# Install GitHub CLI first: https://cli.github.com/
gh auth login
gh repo create TraceFork --public --source=. --remote=origin --push
```

### "Permission denied"
Ensure you're logged into GitHub in your browser and have verified your email.

---

## Viewing Your Repository

After setup, your repo will be at:
```
https://github.com/yourusername/TraceFork
```

Share this link to showcase your massive-scale cinematic intelligence system!

---

## Deploy Status Badge (Optional)

After deploying to Netlify, add this to your README.md:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

Get the badge URL from: Netlify → Site settings → Status badges

---

**Built by ForkTrace — 2024**
