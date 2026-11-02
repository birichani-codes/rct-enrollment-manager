@echo off
cd /d "%~dp0"
where cloudflared >nul 2>nul
if errorlevel 1 (echo Install Cloudflare cloudflared first. See SHOWCASE_V9.md & pause & exit /b 1)
echo Start RCT Manager in another terminal before running this.
echo IMPORTANT: Quick tunnels give a publicly reachable URL. Protect the demonstration through staff login and share privately.
cloudflared tunnel --url http://localhost:3000
pause
