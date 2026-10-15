#!/usr/bin/env bash
# Starts Acre Social on this computer.
#   ./start.sh          -> http://localhost:5000 (only this computer)
#   ./start.sh public   -> also gives a public https link via Cloudflare
#   ./start.sh stop     -> stops everything (your data is kept)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "JWT_SECRET=$(openssl rand -hex 32)" > .env
fi

case "${1:-}" in
  stop)
    docker compose -f docker-compose.yaml -f docker-compose.public.yaml down
    exit 0
    ;;
  public)
    docker compose -f docker-compose.yaml -f docker-compose.public.yaml up -d --force-recreate tunnel
    echo "Getting a public link..."
    URL=""
    for _ in $(seq 1 30); do
      URL=$(docker compose -f docker-compose.yaml -f docker-compose.public.yaml logs tunnel 2>/dev/null \
        | grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' | tail -1 || true)
      [ -n "$URL" ] && break
      sleep 2
    done
    if [ -z "$URL" ]; then
      echo "Could not get a public link. Try again in a minute."
      exit 1
    fi
    PUBLIC_URL="$URL" docker compose -f docker-compose.yaml -f docker-compose.public.yaml up -d
    ;;
  *)
    docker compose -f docker-compose.yaml -f docker-compose.public.yaml rm -sf tunnel >/dev/null 2>&1 || true
    URL="http://localhost:5000"
    docker compose up -d
    ;;
esac

echo
echo "Acre Social is starting. In 1-2 minutes open: $URL"
