@echo off
cd /d "%~dp0"
echo STOP RCT Manager first! This resets ALL demo changes including staff accounts.
set /p CHOICE=Type RESET to restore original 50-student showcase: 
if not "%CHOICE%"=="RESET" exit /b 1
copy /y "data\showcase-original.sqlite" "data\rct.sqlite"
if exist "data\rct.sqlite-wal" del "data\rct.sqlite-wal"
if exist "data\rct.sqlite-shm" del "data\rct.sqlite-shm"
echo Reset complete. Start RCT Manager and set up a new administrator.
pause
