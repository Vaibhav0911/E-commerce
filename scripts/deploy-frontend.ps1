# Frontend Deployment Script for Netlify/Vercel (PowerShell)
# This script helps deploy the frontend to Netlify or Vercel

Write-Host "🚀 E-Commerce Frontend Deployment Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptPath\..\frontend"

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check for .env file
if (-not (Test-Path .env)) {
    Write-Host "⚠️  No .env file found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Please update .env with production API URL before deploying!" -ForegroundColor Yellow
}

Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful! Output in dist/ directory" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Choose your deployment platform:" -ForegroundColor Cyan
Write-Host "   1. Netlify" -ForegroundColor White
Write-Host "   2. Vercel" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Enter choice (1 or 2)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📋 Netlify Deployment Steps:" -ForegroundColor Cyan
        Write-Host "   Option A - Using Netlify CLI:" -ForegroundColor White
        Write-Host "      1. Install: npm install -g netlify-cli" -ForegroundColor Gray
        Write-Host "      2. Login: netlify login" -ForegroundColor Gray
        Write-Host "      3. Deploy: netlify deploy --prod --dir=dist" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   Option B - Using Netlify Dashboard:" -ForegroundColor White
        Write-Host "      1. Go to https://app.netlify.com" -ForegroundColor Gray
        Write-Host "      2. Click 'Add new site' > 'Import an existing project'" -ForegroundColor Gray
        Write-Host "      3. Connect your GitHub repository" -ForegroundColor Gray
        Write-Host "      4. Configure:" -ForegroundColor Gray
        Write-Host "         - Base directory: frontend" -ForegroundColor DarkGray
        Write-Host "         - Build command: npm run build" -ForegroundColor DarkGray
        Write-Host "         - Publish directory: frontend/dist" -ForegroundColor DarkGray
        Write-Host "      5. Add environment variable:" -ForegroundColor Gray
        Write-Host "         - VITE_API_URL=<your-backend-url>/api" -ForegroundColor DarkGray
        Write-Host "      6. Deploy!" -ForegroundColor Gray
        Write-Host ""
        
        # Check if netlify CLI is installed
        $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
        if ($netlifyInstalled) {
            $deployNow = Read-Host "Deploy now using Netlify CLI? (y/n)"
            if ($deployNow -eq "y") {
                netlify deploy --prod --dir=dist
            }
        } else {
            Write-Host "💡 Netlify CLI not installed. Install with: npm install -g netlify-cli" -ForegroundColor Yellow
        }
    }
    "2" {
        Write-Host ""
        Write-Host "📋 Vercel Deployment Steps:" -ForegroundColor Cyan
        Write-Host "   Option A - Using Vercel CLI:" -ForegroundColor White
        Write-Host "      1. Install: npm install -g vercel" -ForegroundColor Gray
        Write-Host "      2. Login: vercel login" -ForegroundColor Gray
        Write-Host "      3. Deploy: vercel --prod" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   Option B - Using Vercel Dashboard:" -ForegroundColor White
        Write-Host "      1. Go to https://vercel.com" -ForegroundColor Gray
        Write-Host "      2. Click 'Add New' > 'Project'" -ForegroundColor Gray
        Write-Host "      3. Import your GitHub repository" -ForegroundColor Gray
        Write-Host "      4. Configure:" -ForegroundColor Gray
        Write-Host "         - Framework Preset: Vite" -ForegroundColor DarkGray
        Write-Host "         - Root Directory: frontend" -ForegroundColor DarkGray
        Write-Host "         - Build Command: npm run build" -ForegroundColor DarkGray
        Write-Host "         - Output Directory: dist" -ForegroundColor DarkGray
        Write-Host "      5. Add environment variable:" -ForegroundColor Gray
        Write-Host "         - VITE_API_URL=<your-backend-url>/api" -ForegroundColor DarkGray
        Write-Host "      6. Deploy!" -ForegroundColor Gray
        Write-Host ""
        
        # Check if vercel CLI is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if ($vercelInstalled) {
            $deployNow = Read-Host "Deploy now using Vercel CLI? (y/n)"
            if ($deployNow -eq "y") {
                vercel --prod
            }
        } else {
            Write-Host "💡 Vercel CLI not installed. Install with: npm install -g vercel" -ForegroundColor Yellow
        }
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Deployment process complete!" -ForegroundColor Green
Write-Host ""