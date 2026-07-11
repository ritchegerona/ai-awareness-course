@echo off
REM Launch AI Awareness Course on Windows
REM Requires only Node.js (no npm install / no internet after Node is installed)
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo ============================================
  echo  Node.js is required (only system dependency)
  echo ============================================
  echo.
  echo  Install once from:
  echo    https://nodejs.org/  (LTS recommended)
  echo.
  echo  Then double-click start.bat again.
  echo.
  pause
  exit /b 1
)

if "%PORT%"=="" set PORT=3000
if "%HOST%"=="" set HOST=127.0.0.1
set URL=http://%HOST%:%PORT%/

for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo Using Node.js %NODE_VER%
echo Starting AI Awareness Course at %URL%
echo Press Ctrl+C to stop the server.
echo.

start "" "%URL%"
node server.js
if errorlevel 1 (
  echo.
  echo Server failed. If the port is busy, try:
  echo   set PORT=3001
  echo   start.bat
  echo.
)

pause
