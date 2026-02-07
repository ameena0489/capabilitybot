# 🚀 DEPLOYMENT GUIDE - Step by Step

This guide will walk you through deploying your AI Capability Agent to production.

---

## OPTION 1: Quick Deploy (Recommended for Beginners)

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "Get API Keys"
4. Create a new key
5. **Copy it** - you'll need it soon!

---

### Step 2: Deploy Backend to Railway

**Why Railway?** Free tier, easy setup, no credit card needed initially.

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click**: "New Project" → "Deploy from GitHub repo"
4. **Select your repository** (or upload the `backend` folder)
5. **Configure**:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
6. **Add Environment Variable**:
   - Click "Variables"
   - Add: `ANTHROPIC_API_KEY` = your_actual_key
   - Add: `PORT` = `3001`
7. **Deploy!**
8. **Copy your Railway URL** (looks like: `https://your-app.railway.app`)

---

### Step 3: Deploy Frontend to Vercel

**Why Vercel?** Made for React apps, free tier, automatic deployments.

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Click**: "Add New" → "Project"
4. **Import** your GitHub repository
5. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = your Railway URL (from Step 2)
7. **Deploy!**
8. **Get your live URL** (looks like: `https://your-app.vercel.app`)

---

### Step 4: Update CORS (Important!)

1. Go back to **Railway** backend
2. Open `server.js` in the editor
3. Find this line:
   ```javascript
   app.use(cors());
   ```
4. Replace with:
   ```javascript
   app.use(cors({
     origin: 'https://your-vercel-url.vercel.app'
   }));
   ```
5. Save and redeploy

---

### Step 5: Test Your Live App! 🎉

1. Visit your Vercel URL
2. Fill in a role (e.g., "Frontline Manager")
3. Add industry (e.g., "Healthcare")
4. Click "Run AI Agent Analysis"
5. Watch it work!

---

## OPTION 2: Manual Deploy (More Control)

### Backend - Alternative Platforms

**Render** (also free tier):
1. Sign up at render.com
2. New → Web Service
3. Connect GitHub repo
4. Root: `backend`
5. Build: `npm install`
6. Start: `npm start`
7. Add env vars

**Fly.io** (good for global deployment):
```bash
cd backend
flyctl launch
flyctl secrets set ANTHROPIC_API_KEY=your_key
flyctl deploy
```

---

### Frontend - Alternative Platforms

**Netlify**:
1. Sign up at netlify.com
2. New site from Git
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add env: `VITE_API_URL`

**Cloudflare Pages**:
1. Sign up at pages.cloudflare.com
2. Connect GitHub
3. Build command: `npm run build`
4. Output: `dist`

---

## 🔧 TROUBLESHOOTING

### "API call failed"
- Check if backend is running
- Verify `VITE_API_URL` matches your backend URL
- Check backend logs for errors

### "CORS error"
- Make sure you updated CORS in `server.js`
- Verify frontend URL is allowed in backend

### "Database error"
- Railway/Render create SQLite automatically
- Check write permissions in deployment logs

---

## 💰 COST BREAKDOWN

**Anthropic API**:
- Pay per use
- ~$0.003 per analysis (3 prompts)
- $5 credit gets you ~1,600 analyses

**Railway** (Backend):
- Free tier: $5/month credit
- Enough for ~500-1000 requests/month

**Vercel** (Frontend):
- Free tier: Unlimited
- Perfect for portfolio projects

**Total**: ~$5-10/month for moderate use

---

## 📊 MONITORING

**Check if backend is alive**:
```
https://your-railway-url.railway.app/health
```

**View database**:
```
https://your-railway-url.railway.app/api/analyses
```

---

## 🎯 PORTFOLIO TIPS

**In your resume/portfolio, say**:

> "Built and deployed a full-stack AI agent using React, Node.js, and Anthropic's Claude API. Implemented multi-stage reasoning, RESTful architecture, and database persistence. Deployed to production using Vercel and Railway with CI/CD pipeline."

**Technical highlights**:
- ✅ Frontend: React 18, Vite, Tailwind CSS
- ✅ Backend: Node.js, Express, SQLite
- ✅ AI: Anthropic Claude API integration
- ✅ Deployment: Serverless architecture
- ✅ Database: Persistent storage with SQLite

---

## 🔐 SECURITY CHECKLIST

Before going live:
- [ ] API key stored server-side only
- [ ] CORS configured for your domain
- [ ] `.env` files in `.gitignore`
- [ ] Input validation on all endpoints
- [ ] Rate limiting considered (optional)

---

## 📱 NEXT STEPS

Want to make it even better?
1. Add user authentication
2. Add analytics tracking
3. Add export to PDF feature
4. Add email delivery of reports
5. Add team/organization features

---

**Need help?** Check the main README.md or create an issue!

---

**Made with ❤️ - Ready to impress recruiters!**
