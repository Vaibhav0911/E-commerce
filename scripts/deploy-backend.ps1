# Backend Deployment Script for Render (PowerShell)
# This script helps deploy the backend to Render

Write-Host "🚀 E-Commerce Backend Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptPath\..\backend"

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
    Write-Host "⚠️  Please update .env with production values before deploying!" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔍 Running pre-deployment checks..." -ForegroundColor Yellow

# Check Node.js version
$nodeVersion = node -v
Write-Host "   Node.js version: $nodeVersion" -ForegroundColor Gray

# Check for syntax errors
Write-Host "   Checking for syntax errors..." -ForegroundColor Gray
node -c server.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ No syntax errors found" -ForegroundColor Green
} else {
    Write-Host "   ❌ Syntax errors detected. Please fix before deploying." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Pre-deployment checks passed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps for Render Deployment:" -ForegroundColor Cyan
Write-Host "   1. Create a new Web Service on Render (https://render.com)" -ForegroundColor White
Write-Host "   2. Connect your GitHub repository" -ForegroundColor White
Write-Host "   3. Configure the following:" -ForegroundColor White
Write-Host "      - Build Command: npm install" -ForegroundColor Gray
Write-Host "      - Start Command: npm start" -ForegroundColor Gray
Write-Host "      - Environment: Node" -ForegroundColor Gray
Write-Host "   4. Add environment variables:" -ForegroundColor White
Write-Host "      - NODE_ENV=production" -ForegroundColor Gray
Write-Host "      - MONGODB_URI=<your-mongodb-atlas-uri>" -ForegroundColor Gray
Write-Host "      - JWT_SECRET=<generate-secure-secret>" -ForegroundColor Gray
Write-Host "      - JWT_EXPIRE=7d" -ForegroundColor Gray
Write-Host "      - FRONTEND_URL=<your-frontend-url>" -ForegroundColor Gray
Write-Host "   5. Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tip: Use render.yaml for automatic configuration" -ForegroundColor Yellow
Write-Host ""