# Netlify Build Troubleshooting Guide

## Current Status

I've applied the following fixes to your TraceFork project:

### ✅ Fixes Applied

1. **Node Version Control**
   - Created `.nvmrc` → pins Node to v18
   - Updated `package.json` → added engines field for Node 18.x
   - Created `netlify.toml` → explicit Node 18 configuration

2. **Missing Imports Fixed**
   - `ChromeLiquidUI.jsx` → added missing `useIntelligence` import
   - `useCommon.js` → added missing `useState` and `useRef` imports

3. **Netlify Configuration**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - SPA redirect rules for React Router

---

## How to Diagnose Your Build

Since the logs you shared stop after Node installation without showing the actual build output, follow these steps:

### Step 1: Verify Locally (REQUIRED)

Run this verification script I created:

```powershell
.\verify-build.ps1
```

Or manually:

```powershell
# Check Node version
node -v  # Should be v18.x.x

# Clean install
npm ci

# Build
npm run build

# Verify output
ls dist
```

### Step 2: Check for Common Issues

**If verification script fails**, check:

#### A. Missing Dependencies
- Ensure `package-lock.json` is committed to git
- Check that all imports reference packages in `package.json`

#### B. Build Script Missing
- Verify `package.json` has: `"build": "vite build"`

#### C. Wrong Output Directory
- Netlify expects: `dist/`
- Vite outputs to: `dist/` (default) ✓

#### D. Import Errors (most common)
The imports I fixed:
- ✓ `ChromeLiquidUI.jsx` was missing `useIntelligence`
- ✓ `useCommon.js` was missing `useState`, `useRef`

### Step 3: Get Full Netlify Logs

When you re-deploy, Netlify will show:

```
8:30:00 PM: Installing npm packages using npm version 10.9.4
8:30:05 PM: npm install output...
8:30:10 PM: Running build command: npm run build
8:30:15 PM: > tracefork@1.0.0 build
8:30:15 PM: > vite build
8:30:20 PM: [ERROR WILL APPEAR HERE IF BUILD FAILS]
```

**You need the lines after "vite build" to see the actual error.**

---

## Expected Netlify Build Log (Success)

```
Installing npm packages using npm version 10.9.4
...
Running build command: npm run build
> tracefork@1.0.0 build
> vite build

vite v5.0.0 building for production...
✓ 145 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-[hash].js      234.56 kB
✓ built in 12.34s
Build succeeded
```

---

## Quick Fix Checklist

- [x] Node version pinned to 18 (`.nvmrc`, `package.json`, `netlify.toml`)
- [x] Missing imports fixed (`useIntelligence`, `useState`, `useRef`)
- [x] Build command configured (`npm run build`)
- [x] Publish directory configured (`dist`)
- [ ] **Run local build verification** (`.\verify-build.ps1`)
- [ ] **Commit and push changes**
- [ ] **Check full Netlify deploy logs after push**

---

## What to Share If Still Failing

If the build still fails after pushing these changes, share:

1. **Full Netlify log** starting from "Running build command" through the error
2. **Local build output** from running `npm run build`
3. **Node version** from `node -v`

---

## Files Modified/Created

- [.nvmrc](file:///g:/TraceFork/.nvmrc) - Node version pin
- [netlify.toml](file:///g:/TraceFork/netlify.toml) - Netlify config
- [package.json](file:///g:/TraceFork/package.json) - Added engines field
- [ChromeLiquidUI.jsx](file:///g:/TraceFork/src/components/ChromeLiquidUI.jsx) - Fixed import
- [useCommon.js](file:///g:/TraceFork/src/hooks/useCommon.js) - Fixed imports
- [verify-build.ps1](file:///g:/TraceFork/verify-build.ps1) - Build verification script (NEW)

---

## Next Steps

1. **Run verification script**: `.\verify-build.ps1`
2. **If it passes**: Commit and push to trigger Netlify rebuild
3. **If it fails**: Fix the errors shown locally first
4. **After deploy**: Check full Netlify logs for the build output

The fixes I've applied address the most common Node 22 → 18 compatibility issues and missing imports that would prevent the build from succeeding.
