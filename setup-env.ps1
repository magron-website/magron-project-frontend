# Cursor 터미널 PATH 갱신 + npm 실행 우회
# 사용법 (PowerShell):  . .\setup-env.ps1
#
# 또는 재시작 없이 바로:
#   install.bat   - 패키지 설치
#   dev.bat       - 개발 서버 실행

$env:Path = "C:\Program Files\nodejs;" + [System.Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path', 'User')

function npm {
  & "$env:ProgramFiles\nodejs\npm.cmd" @args
}

function npx {
  & "$env:ProgramFiles\nodejs\npx.cmd" @args
}

Write-Host "PATH refreshed."
Write-Host "node: $(node -v)"
Write-Host "npm:  $(npm.cmd -v)"
