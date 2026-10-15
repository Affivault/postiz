# Acre Social on Render

How it fits together:

- **Render:** runs everything, all set up by `render.yaml`:
  - the app (website, API and background worker)
  - its Postgres database
  - a 10 GB disk for uploaded images and videos
  - Temporal (the post scheduler) with its own small database
  - Redis
- **GitHub Actions** ("Build and Deploy"): builds the app on every push to `main` and tells Render to redeploy.

Sign-ups are open and everything is free: there is no Stripe, so every account gets every feature.

## 1. Let Render download the app image

On GitHub, open your profile → **Packages** → `postiz` → **Package settings** → **Change visibility** → **Public**. The image holds only code, no secrets.

Before continuing, wait until **Actions** → "Build and Deploy" shows a green tick.

## 2. Create everything on Render

1. In Render, go to **New** → **Blueprint** → connect GitHub → pick this repo → **Apply**.
2. The only value it asks for is `NEXT_PUBLIC_SENTRY_DSN` (error monitoring). It's optional, so leave it empty for now.
3. Wait until all services show **Live**. On first start the app creates its database tables.
4. Open the `acre-social` service URL. You should see the landing page.

## 3. Auto-deploy on every change

In Render, open `acre-social` → **Settings** → **Deploy Hook** and copy the URL. Add it in GitHub under **Settings** → **Secrets and variables** → **Actions** as `RENDER_DEPLOY_HOOK_URL`.

## Custom domain (when you have one)

1. In Render, open `acre-social` → **Settings** → **Custom Domains** and add e.g. `acresocial.com`.
2. Add an environment variable `FRONTEND_URL=https://acresocial.com`, then redeploy.

## Emails (later, with Resend)

Until email is set up, new accounts are activated straight away and password reset emails are not sent. When you're ready, add these to `acre-social`:
`EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS` (an address on a domain you verified in Resend) and `EMAIL_FROM_NAME=Acre Social`.

## Connecting social networks

Each network needs a developer app registered to Acre Social (Meta, TikTok, LinkedIn, X, Google...). Add its keys as environment variables on `acre-social`; the names are listed in `.env.example`. Use `https://<your-domain>/integrations/social/<network>` as the redirect URL.

The privacy policy and terms the networks ask for are at `/privacy` and `/terms`. Have them reviewed before you submit.

## Growing later

- **Disk:** a Render disk attaches to a single instance, so the app runs as one server. If you need several app servers or much more storage, move media to Cloudflare R2. Set `STORAGE_PROVIDER=cloudflare` plus the `CLOUDFLARE_*` variables from `.env.example`.
- **Database:** upgrade the plan of `acre-db` in the Render dashboard when it fills up. Check the plan's backup options in Render before launch.
