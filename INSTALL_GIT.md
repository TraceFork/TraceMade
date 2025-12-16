# Git Installation Guide for Windows

## Download Git for Windows

**Direct Download Link:**
https://git-scm.com/download/win

This will download the latest Git installer for Windows.

## Installation Steps

1. **Run the installer** (Git-2.x.x-64-bit.exe)

2. **Follow the installation wizard:**
   - Click "Next" through the license agreement
   - **Installation path**: Keep default (C:\Program Files\Git)
   - **Select Components**: Keep all defaults checked
   - **Start Menu folder**: Keep default
   - **Default editor**: Choose "Use Visual Studio Code" (or your preferred editor)
   - **PATH environment**: Choose "Git from the command line and also from 3rd-party software" ✓
   - **SSH executable**: Use bundled OpenSSH
   - **HTTPS transport**: Use OpenSSL library
   - **Line ending conversions**: Checkout Windows-style, commit Unix-style
   - **Terminal emulator**: Use MinTTY
   - **Default behavior of git pull**: Default (fast-forward or merge)
   - Keep all other defaults
   - Click "Install"

3. **Finish installation**
   - Click "Finish"
   - **IMPORTANT**: Close and reopen PowerShell/Terminal for PATH changes to take effect

## Verify Installation

After closing and reopening PowerShell, run:

```powershell
git --version
```

You should see: `git version 2.x.x.windows.x`

## Alternative: Winget (Windows Package Manager)

If you have Windows 11 or Windows 10 with winget:

```powershell
winget install --id Git.Git -e --source winget
```

## Quick Setup After Installation

Once Git is installed and you've reopened PowerShell:

```powershell
# Configure your identity (required for commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Navigate to TraceFork
cd g:\TraceFork

# Run the setup script
.\setup-github.ps1
```

## Need Help?

Full documentation: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

---

**After installation, return to the GitHub setup steps!**
