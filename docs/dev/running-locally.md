---
lang: en-US
title: Running Locally
description: Runnning the Codefair GitHub repository locally
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# :computer: Running Locally

This section provides instructions for developers to run the Codefair GitHub repository locally. If you have not yet, read the [Architecture](./architecture.md) page first; it explains how the pieces below fit together.

## :file_folder: Code structure

Codefair is a **central API**: a single Nuxt application that serves the web UI and the backend, plus a small validation microservice. The repository has two active parts:

1. **Central API (`ui/`)**: built with [Nuxt](https://nuxt.com/). It serves the user interface **and** the backend API (webhooks, FAIR compliance checks, pull requests, dashboard, and archival). It talks to GitHub through [Octokit](https://github.com/octokit/octokit.js) and stores state in PostgreSQL through [Prisma](https://www.prisma.io/).

2. **Validation microservice (`validator/`)**: built with [Python](https://www.python.org/) and [Flask](https://flask.palletsprojects.com/), responsible for validating `codemeta.json`, `CITATION.cff`, and CWL files. The `ui` calls it over HTTP.

> [!NOTE]
> The repository also contains a `bot/` folder: the original [Probot](https://probot.github.io/) backend, now **being retired**. You do **not** need to set it up for local development: all backend functionality you'll be working on lives in `ui/server`. It is still deployed in production for repositories that have not yet been migrated to the central API. See [Architecture](./architecture.md#use-central-api-flag).

## :white_check_mark: Prerequisites

Before you can run the Codefair repository, you will need the following prerequisites:

1. **Node.js**: The `ui` app targets **Node.js 24+** (see the `engines` field in `ui/package.json`). You can download Node.js from the [official website](https://nodejs.org/en/download).

2. **Yarn**: Install Yarn to manage the `ui` dependencies:

   ```bash
   npm install -g yarn
   ```

3. **PostgreSQL**: Codefair uses PostgreSQL via the Prisma ORM. The repository ships a Compose file (`db-docker-compose.yaml`) that runs a local Postgres for you; see **Set up the database** below. (You can also point `DATABASE_URL` at any Postgres instance you prefer.)

4. **Python**: Python **3.10+** is used for the validation service. Download it from the [official website](https://www.python.org/downloads/).

5. **Smee** (local dev): GitHub needs to reach your machine to deliver webhooks. Create a free channel at [smee.io](https://smee.io/) and use the URL as your webhook proxy. The `ui` includes a helper script that forwards events from Smee to your local server.

6. **OAuth App** (user sign-in): In your GitHub account, go to **Settings → Developer settings → OAuth Apps** and create one. Provide:

   - **Application name**
   - **Homepage URL**: the Codefair frontend (e.g. `http://localhost:3000`)
   - **Authorization callback URL**: `http://localhost:3000/login/github/callback`

7. **GitHub App** (the bot): In **Settings → Developer settings → GitHub Apps**, create one with:

   - **GitHub App name**
   - **Homepage URL**: the Codefair frontend
   - **Webhook URL**: your **Smee.io URL** in local development (in production this is the app's `/api/webhooks/github` endpoint)
   - **Webhook secret**: a value you choose. It must match `WEBHOOK_SECRET` in your `.env`
   - **Permissions**:
     - **Read & Write**: Contents, Issues, Pull requests
     - **Read-only**: Metadata
   - **Subscribe to events**: Installation target, Push, Pull request, Issues, Issue comment

   For _"Where can this GitHub App be installed?"_ choose **Any account** so you can install it on test repositories.

   After creating the App, generate a **private key** (`.pem`) and note the **App ID**. These become `GH_APP_PRIVATE_KEY` and `GH_APP_ID`.

## :arrow_down: Clone the repository

```bash
git clone https://github.com/fairdataihub/codefair-app.git
cd codefair-app
```

## :elephant: Set up the database

Start a local PostgreSQL instance using the provided Compose file at the repository root:

```bash
docker compose -f db-docker-compose.yaml up -d
```

This starts Postgres on port `5432` with database `codefair_local` (user `admin`, password `root`). The matching connection string is:

```bash
DATABASE_URL="postgresql://admin:root@localhost:5432/codefair_local"
```

## :key: Environment variables

Unlike the old Probot setup, there is now a **single** `.env` file, located in the `ui/` directory. The required variables are enforced at startup by `ui/server/plugins/env-check.ts`. If any are missing, the app refuses to boot and tells you which one. Create `ui/.env` with the following:

```bash
# Database
DATABASE_URL=               # PostgreSQL connection string (see above)

# GitHub App (the bot identity)
GH_APP_ID=                  # GitHub App ID
GH_APP_NAME=                # GitHub App name (used to build the "<name>[bot]" login)
GH_APP_PRIVATE_KEY=         # GitHub App private key (PEM; escape newlines as \n)

# GitHub OAuth (user sign-in)
GH_OAUTH_APP_ID=            # OAuth App ID
GH_OAUTH_CLIENT_ID=         # OAuth client ID
GH_OAUTH_CLIENT_SECRET=     # OAuth client secret

# Webhooks
WEBHOOK_SECRET=             # Must match the secret set on the GitHub App
WEBHOOK_PROXY_URL=          # Your Smee.io channel URL (local dev only)

# App + services
CODEFAIR_APP_DOMAIN=        # Base URL of the app, e.g. http://localhost:3000
UI_LOGWATCH_URL=            # Logging service endpoint
VALIDATOR_URL=              # Base URL of the validator, e.g. http://localhost:5000

# Zenodo (archival)
ZENODO_API_ENDPOINT=        # Zenodo API endpoint
ZENODO_ENDPOINT=            # Zenodo site URL (sandbox or production)
ZENODO_CLIENT_ID=           # Zenodo OAuth client ID
ZENODO_CLIENT_SECRET=       # Zenodo OAuth client secret
ZENODO_REDIRECT_URI=        # Zenodo OAuth redirect URI
```

> [!TIP]
> For local archival testing, point the Zenodo variables at the [Zenodo Sandbox](https://sandbox.zenodo.org/) rather than production so you don't mint real DOIs.

## :running: Running the services

### 1. Central API (`ui/`)

```bash
cd ui

# Install dependencies
yarn install

# Generate the Prisma client and create the database tables
yarn prisma:generate
yarn prisma:db:push

# Start the dev server on http://localhost:3000
yarn dev
```

To also forward GitHub webhooks from your Smee channel while developing, use the combined script instead of `yarn dev`:

```bash
# Runs the Nuxt dev server and the Smee proxy together
yarn dev:webhook
```

> [!TIP]
> Useful Prisma scripts: `yarn prisma:studio` opens a database GUI, and `yarn prisma:migrate:dev --name <name>` creates a migration when you change the schema (use this instead of `db:push` for changes you intend to merge).

### 2. Validation microservice (`validator/`)

```bash
cd validator

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
.venv\Scripts\activate           # Windows (PowerShell)

# Install the requirements
pip install -r requirements.txt

# Run the service on http://localhost:5000
python app.py --host localhost --port 5000
```

Alternatively, run the validator in Docker using the Compose file in that folder:

```bash
cd validator && docker compose up
```

Once both services are running, install your GitHub App on a test repository. Webhook deliveries will appear in your Smee channel and in the terminal running `yarn dev:webhook`, and Codefair will open a **FAIR Compliance Dashboard** issue on the repository.
