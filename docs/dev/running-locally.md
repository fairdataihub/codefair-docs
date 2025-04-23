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

This section provides instructions for developers to run the Codefair GitHub repository locally.

## :file_folder: Code structure

The Codefair repository combines both the Nuxt frontend and the Probot backend to work with the GitHub App. The repository is divided into three main parts:

1. **Frontend**: The frontend is built with [Nuxt.js](https://nuxt.com/) and is responsible for the user interface of the Codefair platform. The frontend is located in the `ui` directory of the repository.

2. **GitHub App**: The GitHub app is built with [Probot](https://probot.github.io/docs/README/) and is responsible for the GitHub App functionality. The backend is located in the `bot` directory of the repository.

3. **Validation Microservice**: The validation microservice is built with [Python](https://www.python.org/) and [Flask](https://flask.palletsprojects.com/en/stable/), which is responsible for the validation of metadata, licenses, and CWL files. The microservice is located in the `validation` directory of the repository.

## :white_check_mark: Prerequisites

Before you can run the Codefair repository, you will need the following prerequisites:

1. **Node.js**: You will need Node.js (v20) installed on your machine to run the Codefair repository. You can download Node.js from the [official Node.js website](https://nodejs.org/en/download).

2. **Database**: Codefair now uses Prisma as an ORM for managing database storage (Earlier versions used MongoDB). Ensure you have a supported database (e.g., PostgreSQL, MySQL, or SQLite) set up and configured. You can learn more about Prisma and its supported databases from the [official Prisma website](https://www.prisma.io/). We've provided a Postgres Docker Compose file in the root of the repository to help you get started. You can run the following command to start a Postgres database using Docker:

```bash
docker-compose -f docker-compose.yml up -d
```

3. **Yarn**: You will need Yarn installed on your machine to run the Codefair repository. You can install Yarn by running the following command:

```bash
npm install -g yarn
```

4. **Python**: Python is used for the Validation service. You will need Python 3.8 or higher installed on your machine. You can download Python from the [official Python website](https://www.python.org/downloads/).

5. **Smee**: You will need Smee.io to create a webhook proxy for the GitHub App. You can create a Smee.io webhook proxy by visiting the [Smee.io website](https://smee.io/). This will be used to receive GitHub App events from the GitHub API on your local machine.

6. **Oauth App**: Create an Oauth App by going to the Developer Settings in your GitHub account and within the Oauth Apps section. You will need to provide the following information:

   - **Application Name**: Name of the Oauth App
   - **Homepage URL**: URL for the Codefair frontend
   - **Authorization callback URL**: URL for the Codefair frontend

7. **GitHub App**: Create a GitHub App by going to the Developer Settings in your GitHub account and within the GitHub App section. You will need to provide the following information:

   - **GitHub App Name**: Name of the GitHub App
   - **Homepage URL**: URL for the Codefair frontend
   - **Webhook URL**: URL for the Probot server (If working locally use the Smee.io URL)
   - **Webhook Secret**: Secret for the GitHub App webhook
   - **Permissions**:
     - **Read & Write access:** Contents, issues, and pull requests
     - **Read access:** Metadata
     - **Events to Subscribe to:** Issue comments, issues, pull request, pull request review, push, repository

For the final question on `Where can this GitHub App be installed?`, you can choose `Any account` to allow the GitHub App to be installed on any repository.

Once you have create the GitHub App, you will need to generate a private key and client secret for the GitHub App. The private key and client secret will be used to authenticate the GitHub App with the GitHub API.

## :wrench: Setting up the Codefair repository

You can run the following commands to start the Codefair repository:

1. **Clone the Repository**: Clone the Codefair repository to your local machine by running the following command:

```bash
git clone https://github.com/fairdataihub/codefair-app.git
```

2. **Gather Environment Variables**: Create a `.env` file in both the `ui` and `bot` directories of the repository. You can use the `.env.example` file as a template for the environment variables.

```bash
# .env file in the ui directory
APP_ID=               # GitHub App ID
CODEFAIR_APP_DOMAIN=  # URL for the Codefair app
CODEFAIR_BOT_DOMAIN=  # URL for the Codefair bot
DATABASE_URL=         # Postgres DB URL
GH_APP_CLIENT_ID=     # GitHub App client ID
GH_APP_CLIENT_SECRET= # GitHub App client secret
GH_APP_ID=            # GitHub App ID
GH_APP_NAME=          # GitHub App Name
GH_APP_PRIVATE_KEY=   # GitHub App private key
GH_OAUTH_APP_ID=      # GitHub OAuth App ID
GH_OAUTH_CLIENT_ID=   # GitHub OAuth Client ID
GH_OAUTH_CLIENT_SECRET= # GitHub OAuth Client Secret
PORT="3000"             # Port to run frontend
UI_LOGWATCH_URL=        # UI Logwatch URL
VALIDATOR_URL=          # Validator URL
WEBHOOK_PROXY_URL=      # Webhook proxy URL
WEBHOOK_SECRET=         # Webhook proxy secret
ZENODO_API_ENDPOINT=    # Zenodo API endpoint
ZENODO_CLIENT_ID=       # Zenodo Client ID
ZENODO_CLIENT_SECRET=   # Zenodo Client Secret
ZENODO_ENDPOINT=        # Zenodo Endpoint URL
ZENODO_REDIRECT_URI=    # Zenodo Redirect URI
```

```bash
# .env file in the bot directory
BOT_LOGWATCH_URL=             # Logwatch URL for the bot
CODEFAIR_APP_DOMAIN=          # http://localhost:300 or your domain for the frontend
CODEFAIR_BOT_DOMAIN=          # http://localhost:3001 or your domain for the bot
DATABASE_URL=                 # Postgres DB URL
GH_APP_CLIENT_ID=             # GitHub Client ID
GH_APP_CLIENT_SECRET=         # GitHub Client Secret
GH_APP_ID=                    # GitHub App ID
GH_APP_NAME=                  # GitHub App Name
GH_APP_PRIVATE_KEY=           # GitHub App Private key
PORT="3001"                   # Port for the Probot Server
VALIDATOR_URL=                # http://localhost:5000 or Validator URL
WEBHOOK_PROXY_URL=            # Webhook Proxy URL
WEBHOOK_SECRET=               # WebHook Secret
ZENODO_API_ENDPOINT=          # Zenodo API Endpoint
ZENODO_CLIENT_ID=             # Zenodo Client ID
ZENODO_CLIENT_SECRET=         # Zenodo Client Secret
ZENODO_ENDPOINT=              # Zenodo API URL (sandbox or production)
ZENODO_REDIRECT_URI=          # Zenodo Redirect URL (sandbox or production)
```

## :running: Running the Codefair repository

There are three main parts to running the Codefair repository:

- **Frontend**: To run the frontend run the following command at the root of the repository:

```bash
# Navigate to the ui directory, install dependencies, and run the server
cd ui && yarn install && yarn dev
```

- **Backend**: To run the backend run the following command at the root of the repository:

```bash
# Navigate to the bot directory, install dependencies, and run the server
cd bot && yarn install && yarn dev
```

- **Validation Microservice**: To run the validation microservice run the following command at the root of the repository:

```bash
# Create a virtual environment within the validation folder
cd validation && python -m venv .venv

# Activate the virtual environment
source .venv/bin/activate  # For Linux or MacOS
source .venv/Scripts/activate   # For Windows

# Install the requirements
pip install -r requirements.txt

# Run the microservice
python app.py --host localhost --port 5000
```
