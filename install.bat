@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
"C:\Program Files\nodejs\npm.cmd" install
if errorlevel 1 exit /b 1
echo.
echo [OK] 패키지 설치 완료
