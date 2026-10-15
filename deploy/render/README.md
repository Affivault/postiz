# Acre Social on Render

How it fits together:

- **Render:** runs the app (website + API + background worker), Temporal (the post scheduler, with its own small database) and Redis. `render.yaml` sets all of it up in one go.
- **Supabase:** stores your app data (users, posts, channels).
- **Cloudflare R2:** stores uploaded images and videos.
- **GitHub Actions** ("Build and Deploy"): builds the app on every push to `main` and tells Render to redeploy.

Sign-ups are open and everything is free: there is no Stripe, so every account gets every feature.

## 1. Supabase (database)

1. Create a project at supabase.com. Choose a region close to your Render region (Render's default is Oregon, so `us-west`).
2. Go to **Connect** → **Session pooler** and copy the URI. Replace `[YOUR-PASSWORD]` with your database password.
   - Use the *session pooler*, not the direct connection. Render can't reach Supabase's direct (IPv6-only) address.

## 2. Cloudflare R2 (media)

1. In Cloudflare go to **R2** → **Create bucket**, e.g. `acre-social-media`.
2. Make the bucket public: **Settings** → **Public access** → either enable the `r2.dev` URL or connect a custom domain such as `media.yourdomain.com`. Copy that URL, without a trailing slash.
3. In the bucket's **Settings** → **CORS policy**, paste the following (use your real site address):
   ```json
   [{ "AllowedOrigins": ["https://acre-social.onrender.com"], "AllowedMethods": ["GET", "PUT", "POST"], "AllowedHeaders": ["*"], "ExposeHeaders": ["ETag"] }]
   ```
4. Go to **R2** → **Manage API tokens** → **Create token** with *Object Read & Write* on that bucket. Copy the Access Key ID and Secret Access Key. Your Account ID is shown on the R2 overview page.

## 3. Let Render download the app image

On GitHub, open your profile → **Packages** → `postiz` → **Package settings** → **Change visibility** → **Public**. The image holds only code, no secrets.

Before continuing, wait until **Actions** → "Build and Deploy" shows a green tick.

## 4. Create everything on Render

1. In Render, go to **New** → **Blueprint** → connect GitHub → pick this repo → **Apply**.
2. It asks for the values marked `sync: false`:
   - `DATABASE_URL`: the Supabase session pooler URI from step 1
   - `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ACCESS_KEY`, `CLOUDFLARE_SECRET_ACCESS_KEY`, `CLOUDFLARE_BUCKETNAME`, `CLOUDFLARE_BUCKET_URL`: from step 2
   - `NEXT_PUBLIC_SENTRY_DSN`: optional, leave it empty for now
3. Wait until all services show **Live**. On first start the app creates its tables in Supabase.
4. Open the `acre-social` service URL. You should see the landing page.

## 5. Auto-deploy on every change

In Render, open `acre-social` → **Settings** → **Deploy Hook** and copy the URL. Add it in GitHub under **Settings** → **Secrets and variables** → **Actions** as `RENDER_DEPLOY_HOOK_URL`.

## Custom domain (when you have one)

1. In Render, open `acre-social` → **Settings** → **Custom Domains** and add e.g. `acresocial.com`.
2. Add an environment variable `FRONTEND_URL=https://acresocial.com`, then redeploy.
3. Add the new domain to the R2 CORS `AllowedOrigins`.

## Emails (later, with Resend)

Until email is set up, new accounts are activated straight away and password reset emails are not sent. When you're ready, add these to `acre-social`:
`EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS` (an address on a domain you verified in Resend) and `EMAIL_FROM_NAME=Acre Social`.

## Connecting social networks

Each network needs a developer app registered to Acre Social (Meta, TikTok, LinkedIn, X, Google...). Add its keys as environment variables on `acre-social`; the names are listed in `.env.example`. Use `https://<your-domain>/integrations/social/<network>` as the redirect URL.

The privacy policy and terms the networks ask for are at `/privacy` and `/terms`. Have them reviewed before you submit.
