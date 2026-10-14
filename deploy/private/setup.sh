#!/usr/bin/env bash
# One-time server setup for the private Postiz instance.
# Run as root on a fresh Ubuntu/Debian server:
#   curl -fsSL https://raw.githubusercontent.com/<owner>/<repo>/main/deploy/private/setup.sh -o setup.sh
#   sudo bash setup.sh
set -euo pipefail

APP_DIR=/opt/postiz
IP=$(curl -fsS https://api.ipify.org || hostname -I | awk '{print $1}')

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (sudo bash setup.sh)"
  exit 1
fi

read -rp "Your Vercel website URL [https://postiz1.vercel.app]: " FRONTEND_URL
FRONTEND_URL="${FRONTEND_URL:-https://postiz1.vercel.app}"
FRONTEND_URL="${FRONTEND_URL%/}"
# Free HTTPS hostname that points at this server, no domain needed
DEFAULT_DOMAIN="$(echo "$IP" | tr . -).sslip.io"
read -rp "Hostname for this server [$DEFAULT_DOMAIN]: " DOMAIN
DOMAIN="${DOMAIN:-$DEFAULT_DOMAIN}"

# 1. Docker
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

# 2. Firewall: only SSH + web
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null
  ufw allow 80/tcp >/dev/null
  ufw allow 443 >/dev/null
  ufw --force enable >/dev/null
fi

# 3. App folder + secrets (never overwritten once created)
mkdir -p "$APP_DIR/dynamicconfig"
if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" <<ENV
DOMAIN=$DOMAIN
FRONTEND_URL=$FRONTEND_URL
JWT_SECRET=$(openssl rand -hex 48)
POSTGRES_PASSWORD=$(openssl rand -hex 24)
TEMPORAL_DB_PASSWORD=$(openssl rand -hex 24)

# Add social network API keys below (see https://docs.postiz.com/providers),
# then run: cd $APP_DIR && docker compose up -d
# X_API_KEY=
# X_API_SECRET=
# LINKEDIN_CLIENT_ID=
# LINKEDIN_CLIENT_SECRET=
# FACEBOOK_APP_ID=
# FACEBOOK_APP_SECRET=
# OPENAI_API_KEY=
ENV
  chmod 600 "$APP_DIR/.env"
  echo "Created $APP_DIR/.env"
else
  echo "$APP_DIR/.env already exists, keeping it"
fi

# 4. Deploy key GitHub Actions uses to push updates to this server
KEY=/root/.ssh/postiz_deploy
mkdir -p /root/.ssh && chmod 700 /root/.ssh
if [ ! -f "$KEY" ]; then
  ssh-keygen -t ed25519 -N "" -C "postiz-deploy" -f "$KEY" >/dev/null
  cat "$KEY.pub" >> /root/.ssh/authorized_keys
  chmod 600 /root/.ssh/authorized_keys
fi

cat <<MSG

==========================================================
 1) GitHub: repo -> Settings -> Secrets and variables ->
    Actions -> New repository secret:

   DEPLOY_HOST = $IP
   DEPLOY_SSH_KEY = (everything between the lines below)
----------------------------------------------------------
$(cat "$KEY")
----------------------------------------------------------
    Then: Actions -> "Deploy Private Instance" -> Run workflow.

 2) Vercel: project postiz1 -> Settings -> Environment
    Variables (Production), then Redeploy:

   FRONTEND_URL=$FRONTEND_URL
   NEXT_PUBLIC_BACKEND_URL=$FRONTEND_URL/api
   BACKEND_INTERNAL_URL=https://$DOMAIN/api
   BACKEND_PROXY_URL=https://$DOMAIN
   IS_GENERAL=true
   DISABLE_REGISTRATION=true
   STORAGE_PROVIDER=local
   NEXT_PUBLIC_UPLOAD_DIRECTORY=/uploads
==========================================================
MSG
