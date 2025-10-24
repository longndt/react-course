#!/bin/bash

# Full-Stack Development Server Startup Script (JavaScript Version)
# This script starts both backend and frontend servers

echo "🚀 Starting Full-Stack Development Environment (JavaScript)"
echo "========================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if MongoDB is running (optional)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure you have MongoDB running or use MongoDB Atlas."
fi

# Function to start backend
start_backend() {
    echo "📦 Starting Backend Server (JavaScript)..."
    cd backend

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing backend dependencies..."
        npm install
    fi

    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚙️  Creating .env file from template..."
        cp env.example .env
        echo "📝 Please edit backend/.env with your MongoDB URI"
    fi

    echo "🔧 Backend starting on http://localhost:5000"
    npm run dev &
    BACKEND_PID=$!
    cd ..
}

# Function to start frontend
start_frontend() {
    echo "📦 Starting Frontend Server (JavaScript)..."

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing frontend dependencies..."
        npm install
    fi

    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚙️  Creating .env file from template..."
        cp env.example .env
    fi

    echo "🎨 Frontend starting on http://localhost:5173"
    npm run dev &
    FRONTEND_PID=$!
}

# Start both servers
start_backend
sleep 3
start_frontend

echo ""
echo "✅ Both servers are starting up!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000/api"
echo "❤️  Health Check: http://localhost:5000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
