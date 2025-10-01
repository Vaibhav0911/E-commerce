#!/bin/bash

# Frontend Deployment Script for Netlify/Vercel
# This script helps deploy the frontend to Netlify or Vercel

echo "🚀 E-Commerce Frontend Deployment Script"
echo "========================================="
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/../frontend" || exit

echo "📦 Installing dependencies..."
npm install

echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with production API URL before deploying!"
fi

echo "🔨 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Output in dist/ directory"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo ""
echo "📋 Choose your deployment platform:"
echo "   1. Netlify"
echo "   2. Vercel"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "📋 Netlify Deployment Steps:"
        echo "   Option A - Using Netlify CLI:"
        echo "      1. Install: npm install -g netlify-cli"
        echo "      2. Login: netlify login"
        echo "      3. Deploy: netlify deploy --prod --dir=dist"
        echo ""
        echo "   Option B - Using Netlify Dashboard:"
        echo "      1. Go to https://app.netlify.com"
        echo "      2. Click 'Add new site' > 'Import an existing project'"
        echo "      3. Connect your GitHub repository"
        echo "      4. Configure:"
        echo "         - Base directory: frontend"
        echo "         - Build command: npm run build"
        echo "         - Publish directory: frontend/dist"
        echo "      5. Add environment variable:"
        echo "         - VITE_API_URL=<your-backend-url>/api"
        echo "      6. Deploy!"
        echo ""
        
        # Check if netlify CLI is installed
        if command -v netlify &> /dev/null; then
            read -p "Deploy now using Netlify CLI? (y/n): " deploy_now
            if [ "$deploy_now" = "y" ]; then
                netlify deploy --prod --dir=dist
            fi
        fi
        ;;
    2)
        echo ""
        echo "📋 Vercel Deployment Steps:"
        echo "   Option A - Using Vercel CLI:"
        echo "      1. Install: npm install -g vercel"
        echo "      2. Login: vercel login"
        echo "      3. Deploy: vercel --prod"
        echo ""
        echo "   Option B - Using Vercel Dashboard:"
        echo "      1. Go to https://vercel.com"
        echo "      2. Click 'Add New' > 'Project'"
        echo "      3. Import your GitHub repository"
        echo "      4. Configure:"
        echo "         - Framework Preset: Vite"
        echo "         - Root Directory: frontend"
        echo "         - Build Command: npm run build"
        echo "         - Output Directory: dist"
        echo "      5. Add environment variable:"
        echo "         - VITE_API_URL=<your-backend-url>/api"
        echo "      6. Deploy!"
        echo ""
        
        # Check if vercel CLI is installed
        if command -v vercel &> /dev/null; then
            read -p "Deploy now using Vercel CLI? (y/n): " deploy_now
            if [ "$deploy_now" = "y" ]; then
                vercel --prod
            fi
        fi
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment process complete!"
echo ""