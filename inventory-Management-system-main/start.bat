@echo off
REM Inventory Management System - Quick Start Script

echo.
echo ====================================================
echo   Inventory Management System - Quick Start
echo ====================================================
echo.

REM Check if both backend and frontend have node_modules
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting Inventory Management System...
echo.
echo This script will open two terminal windows:
echo   1. Backend (Port 5000)
echo   2. Frontend (Port 5173)
echo.
echo Press any key to continue...
pause >nul

REM Start backend in new window
echo Starting Backend Server on Port 5000...
start cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend in new window
echo Starting Frontend Server on Port 5173...
start cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers started!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:5000
echo.
echo Close these windows to stop the servers.
echo.
pause
