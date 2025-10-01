# ✅ Deployment Checklist

Quick checklist for deploying the E-Commerce application to production.

## Pre-Deployment

### 1. Code Preparation
- [ ] All code committed to Git
- [ ] No sensitive data in code (passwords, API keys, etc.)
- [ ] `.env` files are in `.gitignore`
- [ ] All tests passing locally
- [ ] Build succeeds locally (`npm run build`)

### 2. Accounts Setup
- [ ] GitHub account created
- [ ] MongoDB Atlas account created
- [ ] Render account created (for backend)
- [ ] Netlify OR Vercel account created (for frontend)

---

## Backend Deployment (Render)

### 3. MongoDB Atlas Setup
- [ ] MongoDB Atlas cluster created (Free M0 tier)
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 allowed)
- [ ] Connection string copied
- [ ] Connection string tested locally

### 4. Render Backend Setup
- [ ] New Web Service created on Render
- [ ] GitHub repository connected
- [ ] Build command set: `npm install`
- [ ] Start command set: `npm start`
- [ ] Root directory set: `backend`
- [ ] Environment set: `Node`

### 5. Backend Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URI=<your-mongodb-atlas-uri>`
- [ ] `JWT_SECRET=<secure-random-string>` (32+ characters)
- [ ] `JWT_EXPIRE=7d`
- [ ] `FRONTEND_URL=<will-add-later>`
- [ ] `CLIENT_URL=<will-add-later>`

### 6. Backend Deployment
- [ ] Backend deployed successfully
- [ ] Backend URL copied (e.g., `https://your-backend.onrender.com`)
- [ ] Health check endpoint tested: `curl https://your-backend.onrender.com`
- [ ] API returns: `{"success":true,"message":"E-Commerce API is running"}`

---

## Frontend Deployment (Netlify)

### 7. Netlify Frontend Setup
- [ ] New site created on Netlify
- [ ] GitHub repository connected
- [ ] Base directory set: `frontend`
- [ ] Build command set: `npm run build`
- [ ] Publish directory set: `frontend/dist`

### 8. Frontend Environment Variables
- [ ] `VITE_API_URL=<your-backend-url>/api`
  - Example: `https://your-backend.onrender.com/api`

### 9. Frontend Deployment
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied (e.g., `https://your-app.netlify.app`)
- [ ] Site loads without errors
- [ ] No console errors in browser

---

## Integration

### 10. Update Backend CORS
- [ ] Go back to Render dashboard
- [ ] Update `FRONTEND_URL` with your Netlify URL
- [ ] Update `CLIENT_URL` with your Netlify URL
- [ ] Backend redeployed automatically
- [ ] Wait for redeploy to complete (2-3 minutes)

---

## Testing

### 11. Create Admin User
- [ ] Admin user created via API:
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
- [ ] Admin credentials saved securely

### 12. Test User Features
- [ ] Can access frontend URL
- [ ] Can sign up new user
- [ ] Can login with new user
- [ ] Can browse products (empty initially)
- [ ] Can view product details
- [ ] Can add to cart
- [ ] Can view cart
- [ ] Can update cart quantities
- [ ] Can remove from cart
- [ ] Can proceed to checkout
- [ ] Can view orders
- [ ] Can logout

### 13. Test Admin Features
- [ ] Can login as admin
- [ ] Can access admin dashboard
- [ ] Can see admin menu/links
- [ ] Can create new product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Can view all orders
- [ ] Can update order status
- [ ] Products appear on home page

### 14. Test Shopping Flow (End-to-End)
- [ ] Login as regular user
- [ ] Browse products
- [ ] Add multiple products to cart
- [ ] Update quantities in cart
- [ ] Proceed to checkout
- [ ] Fill shipping information
- [ ] Place order successfully
- [ ] Order appears in order history
- [ ] Order appears in admin orders list
- [ ] Admin can update order status
- [ ] Updated status reflects in user's order history

---

## CI/CD Setup (Optional but Recommended)

### 15. GitHub Secrets Configuration
- [ ] Go to GitHub repo → Settings → Secrets and variables → Actions
- [ ] Add `VITE_API_URL` secret
- [ ] Add `RENDER_DEPLOY_HOOK` secret (from Render dashboard)
- [ ] Add `NETLIFY_AUTH_TOKEN` secret (from Netlify dashboard)
- [ ] Add `NETLIFY_SITE_ID` secret (from Netlify site settings)

### 16. Test CI/CD
- [ ] Make a small code change
- [ ] Commit and push to main branch
- [ ] GitHub Actions workflow runs successfully
- [ ] Backend deploys automatically
- [ ] Frontend deploys automatically
- [ ] Changes reflected on live site

---

## Post-Deployment

### 17. Performance Check
- [ ] Frontend loads in < 3 seconds
- [ ] API responses are fast (< 1 second)
- [ ] Images load properly
- [ ] No broken links
- [ ] Mobile responsive design works

### 18. Security Check
- [ ] HTTPS enabled (automatic on Netlify/Render)
- [ ] No sensitive data exposed in frontend
- [ ] JWT tokens stored securely (localStorage)
- [ ] CORS configured correctly
- [ ] Environment variables not exposed

### 19. Monitoring Setup
- [ ] Render dashboard bookmarked
- [ ] Netlify dashboard bookmarked
- [ ] MongoDB Atlas dashboard bookmarked
- [ ] Email notifications enabled (Render)
- [ ] Deploy notifications enabled (Netlify)

### 20. Documentation
- [ ] Backend URL documented
- [ ] Frontend URL documented
- [ ] Admin credentials saved securely
- [ ] MongoDB credentials saved securely
- [ ] Deployment process documented for team

---

## Optional Enhancements

### 21. Custom Domain (Optional)
- [ ] Domain purchased
- [ ] DNS configured for frontend (Netlify)
- [ ] DNS configured for backend (Render)
- [ ] SSL certificates provisioned
- [ ] Custom domain working

### 22. Analytics (Optional)
- [ ] Google Analytics added
- [ ] Tracking code implemented
- [ ] Conversion tracking setup

### 23. Error Tracking (Optional)
- [ ] Sentry or similar service setup
- [ ] Error tracking configured
- [ ] Alerts configured

---

## Maintenance

### 24. Regular Tasks
- [ ] Monitor application logs weekly
- [ ] Check for dependency updates monthly
- [ ] Review security advisories
- [ ] Backup database regularly
- [ ] Test critical flows monthly

---

## Troubleshooting Reference

### Common Issues

**Backend not responding:**
- Check Render logs
- Verify MongoDB connection
- Check environment variables

**CORS errors:**
- Verify FRONTEND_URL matches exactly
- Include https:// in URL
- Redeploy backend after changes

**Frontend API errors:**
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for details

**Build failures:**
- Check GitHub Actions logs
- Verify all dependencies installed
- Check for syntax errors

---

## Success Criteria

Your deployment is successful when:

✅ Backend is accessible and returns health check
✅ Frontend loads without errors
✅ Users can sign up and login
✅ Admin can create and manage products
✅ Users can browse and add products to cart
✅ Users can complete checkout and place orders
✅ Admin can view and manage all orders
✅ CORS is working (no CORS errors)
✅ HTTPS is enabled
✅ CI/CD pipeline is working (if configured)

---

## Quick Links

- **Backend URL**: `https://your-backend.onrender.com`
- **Frontend URL**: `https://your-app.netlify.app`
- **Render Dashboard**: https://dashboard.render.com
- **Netlify Dashboard**: https://app.netlify.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub Actions**: https://github.com/your-username/your-repo/actions

---

## Support

If you encounter issues:

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting
2. Review application logs in Render/Netlify dashboards
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Test API endpoints directly with curl or Postman

---

**🎉 Once all items are checked, your application is live and ready for users!**

**Estimated Time**: 30-60 minutes for first-time deployment

**Difficulty**: Beginner-friendly with detailed guides

**Cost**: $0 (using free tiers)