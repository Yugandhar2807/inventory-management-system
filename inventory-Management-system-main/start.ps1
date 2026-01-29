#!/usr/bin/env powershell

# Inventory Management System - Quick Start Script (PowerShell)

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Inventory Management System - Quick Start" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Check backend node_modules
if (!(Test-Path "backend/node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location backend
    npm install
    Pop-Location
}

# Check frontend node_modules
if (!(Test-Path "frontend/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location frontend
    npm install
    Pop-Location
}

Write-Host ""
Write-Host "Starting Inventory Management System..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start:" -ForegroundColor Cyan
Write-Host "  1. Backend Server (Port 5000)" -ForegroundColor Yellow
Write-Host "  2. Frontend Dev Server (Port 5173)" -ForegroundColor Yellow
Write-Host ""

# Start backend
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend  
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers starting!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend will open at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend API at:        http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 To stop servers, close the terminal windows" -ForegroundColor Yellow
Write-Host ""
