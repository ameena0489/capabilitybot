# ⚡ QUICK REFERENCE CARD

## 🏃‍♂️ Running Locally

**Start Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Start Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

**Open app**: http://localhost:5173

---

## 📦 NPM Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm run build` | Build for production |

---

## 🌐 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check if API is alive |
| `/api/analyze` | POST | Run capability analysis |
| `/api/analyses` | GET | Get analysis history |
| `/api/analyses/:id` | GET | Get specific analysis |

---

## 🔑 Environment Variables

**Backend (.env)**:
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
PORT=3001
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:3001
```

---

## 🚀 Deployment URLs

**Railway** (Backend):
```
https://your-app.railway.app
```

**Vercel** (Frontend):
```
https://your-app.vercel.app
```

---

## 🐛 Quick Fixes

**Port already in use**:
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Clear node_modules**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Reset database**:
```bash
rm backend/capability_agent.db
# Restart backend to recreate
```

---

## 📋 Pre-Deployment Checklist

- [ ] API key in backend .env
- [ ] Frontend points to backend URL
- [ ] CORS updated in server.js
- [ ] .gitignore includes .env
- [ ] Both builds succeed locally
- [ ] Test the live endpoints

---

## 🎯 Portfolio One-Liner

"Full-stack AI agent with multi-stage reasoning, RESTful API, and production deployment"

---

**Keep this handy!** 📌
