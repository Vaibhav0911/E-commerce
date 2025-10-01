# 🚀 Deployment Quick Reference

One-page reference for deploying the E-Commerce application.

---

## 📋 Prerequisites (5 minutes)

```bash
✅ Node.js 18+ installed
✅ Git configured
✅ Accounts created:
   - MongoDB Atlas (free)
   - Render (free)
   - Netlify or Vercel (free)
```

---

## 🎯 Deployment Flow (30 minutes)

```
MongoDB Atlas → Render (Backend) → Netlify (Frontend) → Test
```

---

## 1️⃣ MongoDB Atlas (5 minutes)

```bash
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Allow all IPs (0.0.0.0/0)
5. Get connection string:
   mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

---

## 2️⃣ Backend - Render (10 minutes)

```bash
1. Go to: https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - Name: ecommerce-backend
   - Root Directory: backend
   - Build: npm install
   - Start: npm start
   
5. Environment Variables:
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<random-32-char-string>
   JWT_EXPIRE=7d
   FRONTEND_URL=<will-add-later>
   CLIENT_URL=<will-add-later>

6. Deploy → Copy URL
   Example: https://ecommerce-backend-xxxx.onrender.com
```

**Generate JWT Secret:**
```powershell
# Windows PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

---

## 3️⃣ Frontend - Netlify (10 minutes)

```bash
1. Go to: https://app.netlify.com
2. Add new site → Import project
3. Connect GitHub repo
4. Configure:
   - Base directory: frontend
   - Build: npm run build
   - Publish: frontend/dist

5. Environment Variables:
   VITE_API_URL=https://your-backend.onrender.com/api

6. Deploy → Copy URL
   Example: https://your-app.netlify.app
```

---

## 4️⃣ Update Backend CORS (2 minutes)

```bash
1. Go back to Render dashboard
2. Your service → Environment
3. Update:
   FRONTEND_URL=https://your-app.netlify.app
   CLIENT_URL=https://your-app.netlify.app
4. Save (auto-redeploys)
```

---

## 5️⃣ Create Admin User (2 minutes)

```bash
curl -X POST https://your-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

**Windows PowerShell:**
```powershell
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "Admin123!"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-backend.onrender.com/api/auth/signup" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

---

## 6️⃣ Test Deployment (5 minutes)

```bash
✅ Open: https://your-app.netlify.app
✅ Sign up new user
✅ Login
✅ Login as admin
✅ Add products (admin)
✅ Browse products
✅ Add to cart
✅ Checkout
✅ View orders
```

---

## 🐳 Alternative: Docker (5 minutes)

```bash
# Clone repo
git clone <your-repo>
cd E-commerce

# Start all services
docker-compose up -d

# Access:
Frontend: http://localhost:3000
Backend: http://localhost:5000
MongoDB: localhost:27017
```

---

## 🔄 CI/CD Setup (Optional - 10 minutes)

```bash
1. Go to GitHub repo → Settings → Secrets
2. Add secrets:
   VITE_API_URL=https://your-backend.onrender.com/api
   RENDER_DEPLOY_HOOK=<from-render-settings>
   NETLIFY_AUTH_TOKEN=<from-netlify-settings>
   NETLIFY_SITE_ID=<from-netlify-settings>

3. Push to main → Auto-deploy! 🎉
```

**Get Render Deploy Hook:**
- Render Dashboard → Service → Settings → Deploy Hook

**Get Netlify Token:**
- Netlify → User Settings → Applications → New access token

**Get Netlify Site ID:**
- Netlify → Site Settings → General → Site ID

---

## 📊 Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=your-32-character-random-string-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.netlify.app
CLIENT_URL=https://your-app.netlify.app
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🛠️ Deployment Scripts

### Windows
```powershell
# Backend
.\scripts\deploy-backend.ps1

# Frontend
.\scripts\deploy-frontend.ps1
```

### Linux/Mac
```bash
# Backend
chmod +x scripts/deploy-backend.sh
./scripts/deploy-backend.sh

# Frontend
chmod +x scripts/deploy-frontend.sh
./scripts/deploy-frontend.sh
```

---

## 🐛 Quick Troubleshooting

### CORS Error
```bash
Problem: "Blocked by CORS policy"
Fix: Update FRONTEND_URL in Render to match Netlify URL exactly
```

### API Connection Failed
```bash
Problem: "Network Error"
Fix: Check VITE_API_URL in Netlify environment variables
```

### 401 Unauthorized
```bash
Problem: "Unauthorized"
Fix: Login again (token may have expired)
```

### Backend Sleeping
```bash
Problem: "Slow first request"
Fix: Normal on Render free tier (wakes up in 30s)
```

---

## 📚 Full Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete guide (5,000+ lines)
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Detailed checklist
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Docker guide
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Integration details

---

## 💰 Cost

**Free Tier (Recommended):**
- MongoDB Atlas: $0/month (512 MB)
- Render: $0/month (750 hours)
- Netlify: $0/month (100 GB bandwidth)
- **Total: $0/month** ✅

**Paid Tier (High Traffic):**
- MongoDB Atlas: $9/month
- Render: $7/month
- Netlify Pro: $19/month
- **Total: $35/month**

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Netlify
- [ ] CORS updated with frontend URL
- [ ] Admin user created
- [ ] Can sign up/login
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Admin can manage products
- [ ] No CORS errors
- [ ] No console errors

---

## 🎉 You're Live!

```
Frontend: https://your-app.netlify.app
Backend: https://your-backend.onrender.com
Admin: admin@example.com / Admin123!
```

**Total Time: 30-60 minutes**
**Total Cost: $0/month**

---

## 📞 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
2. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for step-by-step
3. Check troubleshooting sections in guides
4. Review browser console and server logs

---

**🚀 Happy Deploying!**