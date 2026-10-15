# Acre Social on your own computer (free)

Runs the whole app on your computer with Docker. It costs nothing. It's only online while your computer is on and awake: scheduled posts go out only while it's running.

## One-time setup

1. Install **Docker Desktop** (free): https://www.docker.com/products/docker-desktop/ and open it.
2. Download this repo: on GitHub click **Code** → **Download ZIP**, then unzip it.
3. Turn off sleep on your computer so posts keep going out.
   - **Mac:** System Settings → Battery/Energy → Prevent automatic sleeping.
   - **Windows:** Settings → System → Power → Sleep: Never.

## Start it

Open a terminal in the unzipped folder, then go into `deploy/local`:

- **Mac / Linux:** `./start.sh`
- **Windows** (PowerShell): `powershell -ExecutionPolicy Bypass -File .\start.ps1`

The first start downloads about 2 GB and takes a few minutes. Then open **http://localhost:5000**, click **Create free account**, and sign up.

## Share it on the internet (optional)

Run `./start.sh public` (Windows: `...\start.ps1 public`). It prints a link like `https://something.trycloudflare.com` that works from any device.

- The link changes every time you run this. After a restart, run it again and use the new link.
- Free Cloudflare quick tunnels are meant for testing, not for real customers.

## Stop it

Run `./start.sh stop` (Windows: `...\start.ps1 stop`). Your accounts, posts and uploads are kept and come back when you start it again.

## Updating

Run `docker compose pull` in this folder, then start it again.
