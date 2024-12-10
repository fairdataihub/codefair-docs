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

The Codefair repository combines both the Nuxt frontend and the Probot backend to work with the GitHub App. The repository is divided into two main parts:

1. **Frontend**: The frontend is built with [Nuxt.js](https://nuxt.com/) and is responsible for the user interface of the Codefair platform. The frontend is located in the `ui` directory of the repository.

2. **GitHub App**: The GitHub app is built with [Probot](https://probot.github.io/docs/README/) and is responsible for the GitHub App functionality. The backend is located in the `bot` directory of the repository.

3. **Validation Microservice**: The validation microservice is built with [Express.js](https://expressjs.com/) and is responsible for the validation of metadata, licenses, and CWL files. The microservice is located in the `validation` directory of the repository.

## :white_check_mark: Prerequisites

Before you can run the Codefair repository, you will need the following prerequisites:

1. **Node.js**: You will need Node.js installed on your machine to run the Codefair repository. You can download Node.js from the [official Node.js website](https://nodejs.org/).

2. **Database**: Codefair now uses Prisma as an ORM for managing database storage. Ensure you have a supported database (e.g., PostgreSQL, MySQL, or SQLite) set up and configured. You can learn more about Prisma and its supported databases from the [official Prisma website](https://www.prisma.io/).

3. **Yarn**: You will need Yarn installed on your machine to run the Codefair repository. You can install Yarn by running the following command:

```bash
npm install -g yarn
```

4. **Smee**: You will need Smee.io to create a webhook proxy for the GitHub App. You can create a Smee.io webhook proxy by visiting the [Smee.io website](https://smee.io/). This will be used to receive GitHub App events from the GitHub API on your local machine.

5. **Oauth App**: Create an Oauth App by going to the Developer Settings in your GitHub account and within the Oauth Apps section. You will need to provide the following information:

   - **Application Name**: Name of the Oauth App
   - **Homepage URL**: URL for the Codefair frontend
   - **Authorization callback URL**: URL for the Codefair frontend

6. **GitHub App**: Create a GitHub App by going to the Developer Settings in your GitHub account and within the GitHub App section. You will need to provide the following information:

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
git clone <repository-url>
```

2. **Install Dependencies**: Run the following command to install the dependencies for the Codefair repository:

```bash
yarn install
```

3. **Gather Environment Variables**: Create a `.env` file in both the `ui` and `bot` directories of the repository. You can use the `.env.example` file as a template for the environment variables.

```bash
# .env file in the ui directory
GH_APP_ID=            # GitHub App ID
GH_APP_NAME=          # Name of the GitHub App
GH_APP_PRIVATE_KEY=   # GitHub App private key
GH_APP_CLIENT_ID=         # GitHub OAuth client ID
GH_APP_CLIENT_SECRET=     # GitHub OAuth client secret
GH_OAUTH_CLIENT_ID=   # GitHub OAuth client ID
GH_OAUTH_CLIENT_SECRET=   # GitHub OAuth client secret
PORT=3001             # port for the frontend
DATABASE_URL=         # URL for the database
WEBHOOK_PROXY_URL=    # URL for the webhook proxy
WEBHOOK_SECRET=      # GitHub App webhook secret
ZENODO_API_ENDPOINT=  # Zenodo API endpoint
ZENODO_CLIENT_ID=     # Zenodo OAuth client ID
ZENODO_CLIENT_SECRET= # Zenodo OAuth client secret
ZENODO_ENDPOINT=      # Zenodo endpoint
ZENODO_REDIRECT_URI=  # Zenodo redirect URI
```

```bash
# .env file in the bot directory
CODEFAIR_APP_DOMAIN=          # http://localhost:3000 or your domain for the frontend
GH_APP_NAME=              # Name of the GitHub App
GH_CLIENT_ID=             # GitHub OAuth client ID
GH_CLIENT_SECRET=         # GitHub OAuth client secret
PORT=3001                     # port for the Probot server
WEBHOOK_SECRET=               # GitHub App webhook secret
WEBHOOK_PROXY_URL=            # URL for the webhook proxy
APP_ID=                       # GitHub App ID
GH_APP_ID=                    # GitHub App Id
GH_APP_PRIVATE_KEY=                  # GitHub App private key
ZENODO_API_ENDPOINT=          # Zenodo API endpoint (sandbox or production)
ZENODO_ENDPOINT=              # Zenodo url (sandbox or production)
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
