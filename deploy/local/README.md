# Acre Social on your own computer (free)

Runs the whole app on your computer with Docker. It costs nothing. It's only online while your computer is on and awake: scheduled posts go out only while it's running.

## One-time setup

1. Install **Docker Desktop** (free): https://www.docker.com/products/docker-desktop/ and open it.
2. Download this repo: on GitHub click **Code** → **Download ZIP**, then unzip it.
3. Turn off sleep on your computer so posts keep going out.
   - **Mac:** System Settings → Battery/Energy → Prevent automatic sleeping.
   - **Windows:** Settings → System → Power → Sleep: Never.

## Start it

Open the unzipped folder, then `deploy` → `local`, and double-click:

- **Mac:** `Start Acre Social.command`. The first time, macOS may block it: right-click it, choose **Open**, then **Open** again.
- **Windows:** `Start Acre Social.bat`. If Windows shows "Windows protected your PC", click **More info** → **Run anyway**.

A window opens and shows progress. The first start downloads about 2 GB and takes a few minutes. Then open **http://localhost:5000** in your browser, click **Create free account**, and sign up.

## Share it on the internet (optional)

Double-click `Share Acre Social online`. The window shows a link like `https://something.trycloudflare.com` that works from any device.

- The link changes every time you do this.
- Free Cloudflare quick tunnels are meant for testing, not for real customers.

## Stop it

Double-click `Stop Acre Social`. Your accounts, posts and uploads are kept and come back when you start it again.

## For terminal users

The same actions are `./start.sh`, `./start.sh public` and `./start.sh stop` (Windows: `start.ps1`).

## Updating

Every start checks for the newest version of Acre Social and downloads it if there is one, so you never need to download the ZIP again. After a change has been made, double-click **Stop Acre Social**, then **Start Acre Social**.

If you see "port is already allocated" or "address already in use" on a Mac, turn off **System Settings → General → AirDrop & Handoff → AirPlay Receiver**: it uses the same port (5000).
