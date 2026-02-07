# 🎉 GETTING STARTED - Your AI Agent in 15 Minutes

Welcome! You're about to deploy a real AI agent to the web. Let's do this step by step.

---

## ⏱️ Time Breakdown

- ✅ **5 min**: Local setup
- ✅ **5 min**: Get API key
- ✅ **5 min**: Deploy to cloud
- ✅ **Total**: 15 minutes to live app!

---

## 🛠️ PART 1: Local Setup (5 minutes)

### Step 1: Download this project

**If using Git**:
```bash
git clone [your-repo-url]
cd capability-agent-fullstack
```

**If downloaded as ZIP**:
- Extract the ZIP file
- Open terminal in the extracted folder

### Step 2: Run the setup script

**On Mac/Linux**:
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows**:
```bash
# Install backend
cd backend
npm install

# Install frontend  
cd ../frontend
npm install
```

### Step 3: Get your Anthropic API key

1. Go to: https://console.anthropic.com/
2. Sign up (you get $5 free credit!)
3. Click "Get API Keys"
4. Create new key
5. **Copy it!**

### Step 4: Add API key to backend

1. Open `backend/.env` (create it if it doesn't exist)
2. Add this line:
   ```
   ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
   PORT=3001
   ```
3. Save the file

### Step 5: Test locally

**Terminal 1** (Backend):
```bash
cd backend
npm run dev
```

Should see: `🚀 Capability Agent API running on port 3001`

**Terminal 2** (Frontend):
```bash
cd frontend  
npm run dev
```

Should see: `Local: http://localhost:5173`

**Open browser**: Go to http://localhost:5173

**Test it**:
- Role: "Product Manager"
- Industry: "Technology"
- Click "Run AI Agent Analysis"
- Watch the magic! ✨

---

## ☁️ PART 2: Deploy to Cloud (10 minutes)

### Option A: Vercel + Railway (Easiest)

#### Deploy Backend to Railway

1. **Sign up**: https://railway.app
2. **New Project** → "Deploy from GitHub repo"
3. **Settings**:
   - Root: `backend`
   - Start: `npm start`
4. **Add Variables**:
   ```
   ANTHROPIC_API_KEY=your_key
   PORT=3001
   ```
5. **Copy your Railway URL**: `https://xxx.railway.app`

#### Deploy Frontend to Vercel

1. **Sign up**: https://vercel.com
2. **New Project** → Import from GitHub
3. **Settings**:
   - Framework: Vite
   - Root: `frontend`
   - Build: `npm run build`
   - Output: `dist`
4. **Add Variable**:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```
5. **Deploy!**

#### Final Step: Update CORS

1. In Railway, open `backend/server.js`
2. Find line: `app.use(cors());`
3. Replace with:
   ```javascript
   app.use(cors({
     origin: 'https://your-vercel-url.vercel.app'
   }));
   ```
4. Save and redeploy

**DONE!** Your app is live! 🎉

---

### Option B: All-in-One (Replit)

1. **Go to**: https://replit.com
2. **Import from GitHub**
3. **Run both**:
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2  
   cd frontend && npm run dev
   ```
4. **Share the Replit URL**

---

## 🧪 VERIFY IT WORKS

### Test Backend
Visit: `https://your-backend-url/health`

Should see:
```json
{
  "status": "ok",
  "message": "Capability Agent API is running"
}
```

### Test Frontend
Visit your Vercel URL and run an analysis!

---

## 🎯 YOU'RE DONE!

**You now have**:
- ✅ A live AI agent on the internet
- ✅ Full-stack application with database
- ✅ Production-ready deployment
- ✅ Portfolio-worthy project

---

## 📱 WHAT TO DO NEXT

### Share it:
- Tweet: "Just built and deployed an AI agent! 🤖"
- LinkedIn: "Excited to share my latest project..."
- Portfolio: Add to your projects page

### Improve it:
- Add user authentication
- Add PDF export
- Add analytics
- Add more AI capabilities

### Learn from it:
- Study how the backend works
- Understand the React patterns
- Learn about API design
- Practice deployment

---

## 💡 INTERVIEW TALKING POINTS

**"Tell me about a project you built"**

> "I built a full-stack AI agent that uses multi-stage reasoning to diagnose organizational capability gaps. The frontend is React with Tailwind, backend is Node.js with Express, and it integrates with Anthropic's Claude API. I deployed it using Vercel and Railway with a CI/CD pipeline. The agent performs autonomous multi-step analysis, stores results in SQLite, and provides personalized 90-day learning roadmaps."

**Technical skills demonstrated**:
- Frontend: React 18, Vite, Tailwind CSS
- Backend: Node.js, Express, RESTful API design
- Database: SQLite with async operations
- AI Integration: Anthropic Claude API
- Deployment: Serverless architecture
- DevOps: Environment management, CORS, security

---

## 🆘 NEED HELP?

**Common Issues**:

**"npm install fails"**
→ Delete `node_modules` and try again

**"API key invalid"**
→ Check you copied the full key from Anthropic

**"CORS error"**
→ Make sure backend URL is correct in frontend

**"Database error"**
→ Delete `capability_agent.db` and restart

---

## 📚 RESOURCES

- **Documentation**: See README.md
- **Deployment**: See DEPLOYMENT.md  
- **Quick Ref**: See QUICKREF.md
- **Structure**: See STRUCTURE.md

---

**Congratulations! You're now an AI agent builder!** 🚀

---

Made with ❤️ - Now go build more cool stuff!
