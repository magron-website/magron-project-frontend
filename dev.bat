@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

if not exist "node_modules\" (
  echo node_modules 없음. install.bat 실행 중...
  call "%~dp0install.bat"
  if errorlevel 1 exit /b 1
)

"C:\Program Files\nodejs\npm.cmd" run dev
