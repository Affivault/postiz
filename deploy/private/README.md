# Private Postiz (just you)

How the pieces fit:

- **Website**: Vercel project `postiz1`. It is redeployed automatically on every push to `main`.
- **Backend**: one small server running the backend, the background worker, Postgres, Redis and Temporal. It is redeployed automatically on every push to `main` by the GitHub Action `Deploy Private Instance`.
- Vercel forwards `/api/*` and `/uploads/*` to the server, so everything lives under your Vercel URL. Login cookies work there.
- Registration is locked: only the **first** account can be created. Create it right away.

## 1. Rent a server (one time)

Any **x86 (Intel/AMD)** Ubuntu 22.04/24.04 VPS with **4 GB RAM** or more will do (e.g. Hetzner CX22/CPX21, DigitalOcean). Not ARM: the image is built for x86 only.

## 2. Run the setup script (one time)

SSH into the server as root and run:

```bash
curl -fsSL https://raw.githubusercontent.com/Affivault/postiz/main/deploy/private/setup.sh -o setup.sh
sudo bash setup.sh
```

If the repo is private, the raw link won't work. Copy `setup.sh` onto the server some other way, for example by pasting it into `nano setup.sh`.

When it asks, press Enter to accept the defaults:
- the Vercel URL (`https://postiz1.vercel.app`)
- the server hostname (`<your-ip>.sslip.io`, a free HTTPS name that needs no domain)

The script will:
- install Docker
- open only ports 22/80/443
- generate random secrets into `/opt/postiz/.env`
- print the values for steps 3 and 4

## 3. GitHub secrets (one time)

In the repo, go to **Settings → Secrets and variables → Actions**. Add `DEPLOY_HOST` and `DEPLOY_SSH_KEY` exactly as the script printed them.

Then go to **Actions → Deploy Private Instance → Run workflow**. The first build takes about 15 minutes. Later builds are faster.

## 4. Vercel env vars (one time)

In Vercel, open project `postiz1` → **Settings → Environment Variables**. Add the variables the script printed, then **Redeploy**.

The project's Root Directory should be `apps/frontend`.

## 5. Create your account

Open `https://postiz1.vercel.app`. On first visit you'll see the sign-up form. Create your account. After that, the site only shows a login page and nobody else can register.

## Every change after this

Push or merge to `main`. Vercel redeploys the website and GitHub Actions redeploys the server.

## Connecting social accounts

Each network needs its own developer app keys (see https://docs.postiz.com/providers).

1. Add them to `/opt/postiz/.env` on the server.
2. Run `cd /opt/postiz && docker compose up -d`.
3. Use `https://postiz1.vercel.app/integrations/social/<provider>` as the redirect URL in each developer app.

## Useful commands (on the server)

```bash
cd /opt/postiz
docker compose ps            # what is running
docker compose logs -f postiz  # app logs
docker compose restart postiz
```

Backups: the data lives in Docker volumes. The important one is `postiz_postgres-volume`, plus `postiz_postiz-uploads` for media.

## Known limit

Uploads pass through Vercel. If very large videos fail to upload, add Cloudflare R2 storage (see the commented `CLOUDFLARE_*` settings in `docker-compose.yaml` at the repo root) to both `.env` and Vercel.
