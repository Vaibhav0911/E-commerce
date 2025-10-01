# 🚀 Deployment Guide

Complete guide for deploying the E-Commerce application to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Frontend Deployment (Vercel - Alternative)](#frontend-deployment-vercel)
5. [Environment Variables](#environment-variables)
6. [CI/CD with GitHub Actions](#cicd-with-github-actions)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- ✅ [GitHub](https://github.com) - For code repository
- ✅ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For production database
- ✅ [Render](https://render.com) - For backend hosting (free tier available)
- ✅ [Netlify](https://netlify.com) OR [Vercel](https://vercel.com) - For frontend hosting (free tier available)

### Local Setup
```bash
# Ensure you have Node.js 18+ installed
node -v

# Ensure Git is configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Backend Deployment (Render)

### Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ecommerce`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render

#### Option A: Using Render Dashboard (Recommended)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: ecommerce-backend
   Region: Choose closest to your users
   Branch: main (or master)
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-secure-random-string>
   JWT_EXPIRE=7d
   FRONTEND_URL=<will-add-after-frontend-deployment>
   CLIENT_URL=<will-add-after-frontend-deployment>
   ```

   **Generate JWT_SECRET:**
   ```bash
   # On Linux/Mac:
   openssl rand -base64 32
   
   # On Windows (PowerShell):
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   
   # Or use online generator:
   # https://randomkeygen.com/
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the service URL (e.g., `https://ecommerce-backend.onrender.com`)

6. **Test Backend**
   ```bash
   # Test health endpoint
   curl https://your-backend-url.onrender.com
   
   # Should return:
   # {"success":true,"message":"E-Commerce API is running","version":"1.0.0"}
   ```

#### Option B: Using render.yaml (Infrastructure as Code)

1. **Push render.yaml to Repository**
   ```bash
   git add backend/render.yaml
   git commit -m "Add Render configuration"
   git push
   ```

2. **Create Service from Blueprint**
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect repository
   - Render will auto-detect `render.yaml`
   - Add environment variables manually
   - Deploy

### Step 3: Update CORS Settings

After deploying frontend, update backend environment variables:
```
FRONTEND_URL=https://your-app.netlify.app
CLIENT_URL=https://your-app.netlify.app
```

---

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

1. **Update Environment Variables**
   Create `.env.production` in `frontend/` directory:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Step 2: Deploy to Netlify

#### Option A: Using Netlify Dashboard (Recommended)

1. **Create Netlify Account**
   - Go to https://app.netlify.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify
   - Select your repository

3. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Add Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"
   ```
   Key: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment (2-5 minutes)
   - Copy the site URL (e.g., `https://your-app.netlify.app`)

6. **Update Backend CORS**
   - Go back to Render dashboard
   - Update environment variables:
     ```
     FRONTEND_URL=https://your-app.netlify.app
     CLIENT_URL=https://your-app.netlify.app
     ```
   - Render will auto-redeploy

#### Option B: Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=dist
   ```

4. **Follow Prompts**
   - Create & configure new site
   - Choose team
   - Site name (optional)

#### Option C: Using Deployment Script

**Windows (PowerShell):**
```powershell
.\scripts\deploy-frontend.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/deploy-frontend.sh
./scripts/deploy-frontend.sh
```

---

## Frontend Deployment (Vercel)

### Alternative to Netlify

#### Option A: Using Vercel Dashboard

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - Copy the deployment URL

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

---

## Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` (Render default) |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for JWT signing | `your-secure-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.netlify.app` |
| `CLIENT_URL` | Client URL for CORS | `https://your-app.netlify.app` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

---

## CI/CD with GitHub Actions

### Setup Automated Deployments

1. **Enable GitHub Actions**
   - GitHub Actions workflow is already configured in `.github/workflows/deploy.yml`
   - Automatically runs on push to `main` or `master` branch

2. **Add GitHub Secrets**
   Go to your GitHub repository → Settings → Secrets and variables → Actions

   **Required Secrets:**
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   RENDER_DEPLOY_HOOK=<render-deploy-hook-url>
   NETLIFY_AUTH_TOKEN=<netlify-auth-token>
   NETLIFY_SITE_ID=<netlify-site-id>
   ```

3. **Get Render Deploy Hook**
   - Go to Render Dashboard → Your Service
   - Settings → Deploy Hook
   - Copy the URL
   - Add as `RENDER_DEPLOY_HOOK` secret in GitHub

4. **Get Netlify Credentials**
   
   **Auth Token:**
   - Go to Netlify Dashboard
   - User Settings → Applications → Personal access tokens
   - Create new token
   - Copy and add as `NETLIFY_AUTH_TOKEN` secret
   
   **Site ID:**
   - Go to your site in Netlify
   - Site settings → General → Site details
   - Copy "Site ID"
   - Add as `NETLIFY_SITE_ID` secret

5. **Test CI/CD**
   ```bash
   git add .
   git commit -m "Test CI/CD deployment"
   git push origin main
   ```
   
   - Go to GitHub → Actions tab
   - Watch the workflow run
   - Both backend and frontend should deploy automatically

### Workflow Features

- ✅ Runs tests on every push and pull request
- ✅ Builds frontend and checks for errors
- ✅ Deploys backend to Render on push to main
- ✅ Deploys frontend to Netlify on push to main
- ✅ Provides deployment status in GitHub

---

## Post-Deployment

### 1. Create Admin User

After deployment, create an admin user:

```bash
# Replace with your backend URL
curl -X POST https://your-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

### 2. Test the Application

1. **Visit Frontend URL**
   - Open `https://your-app.netlify.app`

2. **Test User Registration**
   - Sign up with a new account
   - Verify you can login

3. **Test Admin Features**
   - Login with admin credentials
   - Add some products
   - Check admin dashboard

4. **Test Shopping Flow**
   - Browse products
   - Add to cart
   - Complete checkout
   - View orders

### 3. Configure Custom Domain (Optional)

#### Netlify Custom Domain
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

#### Render Custom Domain
1. Go to Service settings → Custom domains
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### 4. Enable HTTPS

Both Netlify and Render provide free SSL certificates automatically.

- **Netlify**: Auto-provisions Let's Encrypt SSL
- **Render**: Auto-provisions SSL for custom domains

### 5. Monitor Application

#### Render Monitoring
- Go to your service dashboard
- View logs, metrics, and events
- Set up email alerts for downtime

#### Netlify Monitoring
- Go to your site dashboard
- View deploy logs and analytics
- Set up deploy notifications

---

## Troubleshooting

### Backend Issues

#### Issue: "Application failed to respond"
**Solution:**
- Check Render logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0

#### Issue: "CORS errors"
**Solution:**
- Verify `FRONTEND_URL` and `CLIENT_URL` match your frontend URL exactly
- Check if frontend URL includes `https://` (not `http://`)
- Redeploy backend after updating CORS settings

#### Issue: "Database connection failed"
**Solution:**
- Verify MongoDB Atlas connection string
- Check database user credentials
- Ensure network access allows all IPs (0.0.0.0/0)
- Test connection string locally first

### Frontend Issues

#### Issue: "API calls failing"
**Solution:**
- Verify `VITE_API_URL` is set correctly
- Check if backend URL is accessible
- Open browser console for detailed errors
- Ensure backend CORS is configured

#### Issue: "Environment variables not working"
**Solution:**
- Ensure variables start with `VITE_`
- Rebuild frontend after changing env vars
- Check if `.env.production` exists
- Clear build cache and rebuild

#### Issue: "404 on page refresh"
**Solution:**
- Verify `netlify.toml` or `vercel.json` is present
- Check redirect rules for SPA routing
- Redeploy if configuration was added after initial deploy

### CI/CD Issues

#### Issue: "GitHub Actions failing"
**Solution:**
- Check Actions tab for error logs
- Verify all secrets are set correctly
- Ensure secret names match workflow file
- Check if deploy hooks are valid

#### Issue: "Deploy hook not triggering"
**Solution:**
- Verify deploy hook URL is correct
- Check if secret is properly set in GitHub
- Test deploy hook manually with curl
- Ensure workflow has correct branch name

---

## Performance Optimization

### Backend Optimization

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   
   Add to `server.js`:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

3. **Enable Caching**
   - Use Redis for session storage
   - Cache frequently accessed data

### Frontend Optimization

1. **Code Splitting**
   - Already enabled with Vite
   - Lazy load routes if needed

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Use CDN for images

3. **Bundle Analysis**
   ```bash
   npm run build -- --mode analyze
   ```

---

## Security Checklist

- ✅ Use strong JWT secret (32+ characters)
- ✅ Enable HTTPS (automatic on Netlify/Render)
- ✅ Set secure CORS origins
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting
- ✅ Validate all user inputs
- ✅ Use MongoDB Atlas with authentication
- ✅ Keep dependencies updated
- ✅ Enable security headers
- ✅ Implement proper error handling

---

## Cost Estimation

### Free Tier Limits

**Render (Backend):**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Sleeps after 15 minutes of inactivity
- ✅ 512 MB RAM
- ✅ Shared CPU

**Netlify (Frontend):**
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Automatic SSL

**MongoDB Atlas:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ No credit card required

**Total Cost: $0/month** (within free tier limits)

### Scaling Considerations

When you outgrow free tier:
- **Render**: $7/month for always-on service
- **Netlify**: $19/month for Pro features
- **MongoDB Atlas**: $9/month for dedicated cluster

---

## Backup and Recovery

### Database Backups

1. **MongoDB Atlas Automatic Backups**
   - Enabled by default on paid tiers
   - Free tier: Manual exports only

2. **Manual Backup**
   ```bash
   mongodump --uri="your-mongodb-uri" --out=./backup
   ```

3. **Restore Backup**
   ```bash
   mongorestore --uri="your-mongodb-uri" ./backup
   ```

### Code Backups

- ✅ Git repository (GitHub)
- ✅ Deployment history (Render/Netlify)
- ✅ Regular commits and tags

---

## Support and Resources

### Documentation
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

### Community
- [Render Community](https://community.render.com)
- [Netlify Community](https://answers.netlify.com)
- [Stack Overflow](https://stackoverflow.com)

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Netlify/Vercel
3. ✅ Configure environment variables
4. ✅ Set up CI/CD with GitHub Actions
5. ✅ Create admin user
6. ✅ Test all features
7. ✅ Configure custom domain (optional)
8. ✅ Set up monitoring and alerts
9. ✅ Share with users!

---

**🎉 Congratulations! Your E-Commerce application is now live in production!**

For questions or issues, refer to the troubleshooting section or check the documentation links above.