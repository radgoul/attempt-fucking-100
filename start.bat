@echo off
echo Starting GOUL Shoppe NFT Minting Website...
echo.

echo Starting backend server...
start "Backend Server" cmd /k "npm run dev"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd client && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 