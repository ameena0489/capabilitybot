#!/bin/bash

# Quick Start Script for Capability Agent
# This script sets up and runs both frontend and backend

echo "🚀 Starting Capability Agent Setup..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Setup Backend
echo -e "\n${BLUE}📦 Setting up backend...${NC}"
cd backend

if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit backend/.env and add your Anthropic API key!"
    echo "   Get your API key from: https://console.anthropic.com/"
    echo ""
    read -p "Press Enter after you've added your API key to continue..."
fi

echo "📥 Installing backend dependencies..."
npm install

# Setup Frontend
echo -e "\n${BLUE}📦 Setting up frontend...${NC}"
cd ../frontend

if [ ! -f ".env" ]; then
    echo "⚙️  Creating frontend .env file..."
    echo "VITE_API_URL=http://localhost:3001" > .env
fi

echo "📥 Installing frontend dependencies..."
npm install

# Instructions
echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "1. In one terminal, run the backend:"
echo "   cd backend && npm run dev"
echo ""
echo "2. In another terminal, run the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open your browser to: http://localhost:5173"
echo ""
echo "📚 For deployment instructions, see README.md"
