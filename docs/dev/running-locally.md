---
lang: en-US
title: Running Locally
description: Runnning the Codefair GitHub repository locally
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# :running: Running Locally

This section provides instructions for developers to run the Codefair GitHub repository locally.

## Code structure

The Codefair repository combines both the Nuxt frontend and the Probot backend to work with the GitHub App. The repository is divided into two main parts:

1. **Frontend**: The frontend is built with [Nuxt.js](https://nuxt.com/) and is responsible for the user interface of the Codefair platform. The frontend is located in the `ui` directory of the repository.

2. **GitHub App**: The GitHub app is built with [Probot](https://probot.github.io/docs/README/) and is responsible for the GitHub App functionality. The backend is located in the `bot` directory of the repository.

## Prerequisites

Before you can run the Codefair repository, you will need the following prerequisites:

1. **Node.js**: You will need Node.js installed on your machine to run the Codefair repository. You can download Node.js from the [official Node.js website](https://nodejs.org/).

2. **MongoDB**: You will need a MongoDB database to store the data for the Codefair platform. You can download MongoDB from the [official MongoDB website](https://www.mongodb.com/).

3. **pnpm**: You will need pnpm installed on your machine to run the Codefair repository. You can install pnpm by running the following command:

```bash
npm install -g pnpm
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

## Running the Repository

You can run the following commands to start the Codefair repository:

1. **Clone the Repository**: Clone the Codefair repository to your local machine by running the following command:

```bash
git clone
```

2. **Install Dependencies**: Run the following command to install the dependencies for the Codefair repository:

```bash
pnpm install
```

3. **Gather Environment Variables**: Create a `.env` file in both the `ui` and `bot` directories of the repository. You can use the `.env.example` file as a template for the environment variables.

```bash
# .env file in the ui directory
GITHUB_APP_ID=            # GitHub App ID
GITHUB_APP_PRIVATE_KEY=   # GitHub App private key
GITHUB_CLIENT_ID=         # GitHub OAuth client ID
GITHUB_CLIENT_SECRET=     # GitHub OAuth client secret
MONGODB_DB_NAME=          # Name of the MongoDB database
MONGODB_URI=              # URI for the MongoDB database
```

```bash
# .env file in the bot directory
CODEFAIR_APP_DOMAIN=          # http://localhost:3000 or your domain for the frontend
GITHUB_APP_NAME=              # Name of the GitHub App
GITHUB_CLIENT_ID=             # GitHub OAuth client ID
GITHUB_CLIENT_SECRET=         # GitHub OAuth client secret
MONGODB_DB_NAME=              # Name of the MongoDB database
MONGODB_URI=                  # URI for the MongoDB database
PORT=3001                     # port for the Probot server
WEBHOOK_PROXY_URL=            # URL for the webhook proxy
APP_ID=                       # GitHub App ID
GITHUB_APP_ID=                # GitHub App Id
PRIVATE_KEY=                  # GitHub App private key
WEBHOOK_SECRET=               # GitHub App webhook secret
```
