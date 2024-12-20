---
lang: en-US
title: Installation
description: Installaling the GitHub App
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Installing%20the%20GitHub%20App&app=codefair&org=fairdataihub
---

# :cd: Installation

This section provides instructions for installing the Codefair GitHub App and the permissions required for the GitHub and Oauth Sign In through the Codefair UI.

## :gear: GitHub App Installation

To install the Codefair GitHub App, you will need to follow the steps below:

1. **Go to the GitHub Marketplace**: Visit https://github.com/marketplace/codefair-app
2. **Select the Organization/Account**: Before installing the Codefair GitHub App, you can select the organization or account where you want to install the app. Defaults to your personal account.
3. **Install the App**: Click on the `Install it for free` button to install the Codefair GitHub App on your desired account.
4. **Select Repositories**: Choose the repositories where you want to enable the Codefair GitHub App for and click on the `Save` button.

::: tip
You can also install the Codefair App without a credit card by visiting the [public page](https://github.com/apps/codefair-io)
:::

After following these steps, the Codefair GitHub App will be installed on your repository and you will be able to access the Codefair features.

## :robot: GitHub App Permissions

Codefair requires the following permissions to function correctly:

- **Read & Write Access**: Code, Issues and Pull Requests
- **Read Access**: Metadata

![Codefair Permissions](/codefair-permissions.png)

## :key: Oauth Sign in Permissions

Users can sign in to Codefair using their GitHub account. Codefair requires the following permissions to function correctly:

- **Read Access**: User Email, Profile Information

![Oauth Permissions](/oauth-permissions.png)

We do not store any data from your repository and only use the permissions to provide the Codefair features.
