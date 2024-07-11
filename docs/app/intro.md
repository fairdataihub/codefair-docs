---
lang: en-US
title: Running the Repository
description: Runnning the Codefair GitHub repository
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20Codefair%20Repository&app=codefair&org=fairdataihub
---

# :toolbox: Developer Instructions

This section provides instructions for developers to run the Codefair GitHub repository.

## Code Structure

The Codefair repository combines both the Nuxt frontend and the Probot backend to work with the GitHub App. The repository is divided into two main parts:

1. **Frontend**: The frontend is built with Nuxt.js and is responsible for the user interface of the Codefair platform. The frontend is located in the `ui` directory of the repository.

2. **GitHub App**: The GitHub app is built with Probot and is responsible for the GitHub App functionality. The backend is located in the `bot` directory of the repository.

## Prerequisites

Before you can run the Codefair repository, you will need the following prerequisites:

1. **Node.js**: You will need Node.js installed on your machine to run the Codefair repository. You can download Node.js from the [official Node.js website](https://nodejs.org/).

2. **GitHub App**: You will need to create a GitHub App and install it on your repository. You can follow the instructions in the [GitHub App documentation](https://docs.github.com/en/developers/apps) to create a GitHub App.

## Running the Repository

To run the Codefair repository, you will need pnpm installed on your machine. If you do not have pnpm installed, you can install it by running the following command:

```bash
npm install -g pnpm
```

After you have installed pnpm, you can run the following commands to start the Codefair repository:

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
GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MONGODB_DB_NAME=
MONGODB_URI="
```

```bash
# .env file in the bot directory
CODEFAIR_APP_DOMAIN=http://localhost:3000
GITHUB_APP_NAME=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MONGODB_DB_NAME=
MONGODB_URI=
PORT=3001
WEBHOOK_PROXY_URL=
APP_ID=
GITHUB_APP_ID=
PRIVATE_KEY=
WEBHOOK_SECRET=
```
