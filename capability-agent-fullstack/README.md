# AI Capability Diagnosis Agent - Full Stack Application

A production-ready AI agent that diagnoses organizational capability gaps and generates personalized 90-day learning roadmaps.

## 🏗️ Architecture

**Frontend**: React + Vite + Tailwind CSS  
**Backend**: Node.js + Express + SQLite  
**AI**: Anthropic Claude API  
**Deployment**: Vercel (frontend) + Railway (backend)

## 🚀 Features

- ✅ Multi-stage agentic reasoning
- ✅ Real-time AI analysis with Claude
- ✅ Persistent storage of analyses
- ✅ RESTful API architecture
- ✅ Production-ready deployment setup

---

## 📦 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Add your API key to `.env`**
   ```
   ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   PORT=3001
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   echo "VITE_API_URL=http://localhost:3001" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   App will run on `http://localhost:5173`

5. **Open in browser**: Visit `http://localhost:5173`

---

## 🌐 Production Deployment

### Deploy Backend to Railway

1. **Create Railway account**: [railway.app](https://railway.app)

2. **Create new project** → **Deploy from GitHub**

3. **Configure Railway**:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

4. **Add environment variables** in Railway dashboard:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key
   PORT=3001
   ```

5. **Deploy** → Get your Railway URL (e.g., `https://your-app.railway.app`)

### Deploy Frontend to Vercel

1. **Create Vercel account**: [vercel.com](https://vercel.com)

2. **Import your GitHub repository**

3. **Configure Vercel**:
   - Framework: Vite
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Add environment variable**:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```

5. **Deploy** → Get your Vercel URL (e.g., `https://your-app.vercel.app`)

6. **Update CORS** in backend: Add your Vercel URL to allowed origins

---

## 🧪 API Endpoints

### Health Check
```bash
GET /health
```

### Analyze Role
```bash
POST /api/analyze
Content-Type: application/json

{
  "role": "Frontline Manager",
  "industry": "Healthcare",
  "companySize": "500 employees",
  "challenge": "Scaling rapidly",
  "capabilities": "Strategic thinking, people leadership"
}
```

### Get Analysis History
```bash
GET /api/analyses
```

### Get Specific Analysis
```bash
GET /api/analyses/:id
```

---

## 💡 How to Use

1. **Fill in role context**:
   - Role title (required)
   - Industry (required)
   - Company size (optional)
   - Business challenge (optional)
   - Expected capabilities (optional)

2. **Click "Run AI Agent Analysis"**

3. **Watch the agent work**:
   - Multi-stage reasoning process
   - Real-time thinking display
   - AI-powered diagnosis generation

4. **Review results**:
   - Capability diagnosis report
   - 90-day learning roadmap
   - Success indicators
   - Manager support requirements

---

## 🔐 Security Notes

- **Never commit `.env` files** to version control
- **API keys** are stored server-side only
- **CORS** is configured to allow only trusted origins
- **Input validation** on all endpoints

---

## 📊 Database Schema

The SQLite database stores:
- Role information
- Capability diagnoses
- Learning plans
- Timestamps

All data is stored locally in `capability_agent.db`

---

## 🛠️ Tech Stack Details

### Frontend
- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

### Backend
- **Express**: Web framework
- **SQLite3**: Database
- **Anthropic SDK**: AI integration
- **CORS**: Cross-origin support

---

## 📝 Portfolio Description

You can describe this project as:

> "Full-stack AI agent system that uses multi-stage reasoning to diagnose organizational capability gaps and generate personalized learning roadmaps. Built with React, Node.js, and Anthropic's Claude API, featuring RESTful architecture, persistent storage, and production deployment."

**Key Technical Features**:
- Autonomous multi-stage AI reasoning
- RESTful API design
- Database integration for persistence
- Production-ready deployment
- Secure API key management
- Real-time user feedback

---

## 🎯 What Makes This "Agentic"

1. **Multi-stage reasoning**: Agent makes decisions at each step
2. **Tool use**: Calls external AI API for intelligence
3. **State management**: Maintains context across workflow
4. **Autonomous execution**: No human intervention between stages
5. **Structured output**: Generates multiple artifacts automatically

---

## 🐛 Troubleshooting

### Backend won't start
- Check if API key is set in `.env`
- Verify port 3001 is not in use
- Run `npm install` again

### Frontend can't connect to backend
- Verify backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Analysis fails
- Verify Anthropic API key is valid
- Check API key has sufficient credits
- Review backend logs for error details

---

## 📄 License

MIT License - Feel free to use for portfolio projects

---

## 🤝 Contributing

This is a portfolio/learning project. Feel free to fork and customize!

---

**Built with ❤️ using Claude AI**
