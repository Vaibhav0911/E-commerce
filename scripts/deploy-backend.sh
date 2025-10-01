#!/bin/bash

# Backend Deployment Script for Render
# This script helps deploy the backend to Render

echo "🚀 E-Commerce Backend Deployment Script"
echo "========================================"
echo ""

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "⚠️  Render CLI not found. Installing..."
    npm install -g @render/cli
fi

# Navigate to backend directory
cd "$(dirname "$0")/../backend" || exit

echo "📦 Installing dependencies..."
npm install

echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with production values before deploying!"
    exit 1
fi

echo "🔍 Running pre-deployment checks..."

# Check Node.js version
NODE_VERSION=$(node -v)
echo "   Node.js version: $NODE_VERSION"

# Check for syntax errors
echo "   Checking for syntax errors..."
node -c server.js
if [ $? -eq 0 ]; then
    echo "   ✅ No syntax errors found"
else
    echo "   ❌ Syntax errors detected. Please fix before deploying."
    exit 1
fi

echo ""
echo "✅ Pre-deployment checks passed!"
echo ""
echo "📋 Next Steps for Render Deployment:"
echo "   1. Create a new Web Service on Render (https://render.com)"
echo "   2. Connect your GitHub repository"
echo "   3. Configure the following:"
echo "      - Build Command: npm install"
echo "      - Start Command: npm start"
echo "      - Environment: Node"
echo "   4. Add environment variables:"
echo "      - NODE_ENV=production"
echo "      - MONGODB_URI=<your-mongodb-atlas-uri>"
echo "      - JWT_SECRET=<generate-secure-secret>"
echo "      - JWT_EXPIRE=7d"
echo "      - FRONTEND_URL=<your-frontend-url>"
echo "   5. Deploy!"
echo ""
echo "💡 Tip: Use render.yaml for automatic configuration"
echo ""