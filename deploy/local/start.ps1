# Starts Acre Social on this computer (Windows PowerShell).
#   .\start.ps1          -> http://localhost:5000 (only this computer)
#   .\start.ps1 public   -> also gives a public https link via Cloudflare
#   .\start.ps1 stop     -> stops everything (your data is kept)
$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot
$files = @('-f', 'docker-compose.yaml', '-f', 'docker-compose.public.yaml')

# Fetch the latest setup files so changes never need a new ZIP download
$base = 'https://raw.githubusercontent.com/Affivault/postiz/main/deploy/local'
foreach ($f in @('docker-compose.yaml', 'docker-compose.public.yaml')) {
  try { Invoke-WebRequest -UseBasicParsing -Uri "$base/$f" -OutFile "$f.new"; Move-Item -Force "$f.new" $f }
  catch { Remove-Item -ErrorAction SilentlyContinue "$f.new" }
}

if (-not (Test-Path .env)) {
  $bytes = New-Object byte[] 32
  [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  'JWT_SECRET=' + (($bytes | ForEach-Object { $_.ToString('x2') }) -join '') |
    Out-File -Encoding ascii .env
}

$mode = if ($args.Count -gt 0) { $args[0] } else { '' }

if ($mode -eq 'stop') {
  docker compose @files down
  exit 0
}

Write-Host 'Checking for the latest version of Acre Social...'
docker compose pull acre
if ($LASTEXITCODE -ne 0) { Write-Host 'Could not check for updates, starting the version you have.' }

if ($mode -eq 'public') {
  docker compose @files up -d --force-recreate tunnel
  Write-Host 'Getting a public link...'
  $url = $null
  for ($i = 0; $i -lt 30 -and -not $url; $i++) {
    $found = docker compose @files logs tunnel 2>$null |
      Select-String -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -AllMatches
    if ($found) { $url = $found[-1].Matches[-1].Value } else { Start-Sleep -Seconds 2 }
  }
  if (-not $url) {
    Write-Host 'Could not get a public link. Try again in a minute.'
    exit 1
  }
  $env:PUBLIC_URL = $url
  docker compose @files up -d
} else {
  docker compose @files rm -sf tunnel 2>$null | Out-Null
  $url = 'http://localhost:5000'
  docker compose up -d
}

Write-Host ''
Write-Host "Acre Social is starting. In 1-2 minutes open: $url"
