---
lang: en-US
title: Installation
description: Installaling the GitHub App
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Installing%20the%20GitHub%20App&app=codefair&org=fairdataihub
---

# Installation

This section provides instructions for installing the Codefair GitHub App and the permissions required for the GitHub and Oauth Sign In through the Codefair UI.

## GitHub App Installation

To install the Codefair GitHub App, you will need to follow the steps below:

1. **Go to the GitHub Marketplace**: Visit https://github.com/marketplace/codefair-app
2. **Select the Organization/Account**: Before installing the Codefair GitHub App, you can select the organization or account where you want to install the app. Defaults to your personal account.
3. **Install the App**: Click on the `Install it for free` button to install the Codefair GitHub App on your desired account.
4. **Select Repositories**: Choose the repositories where you want to enable the Codefair GitHub App for and click on the `Save` button.

::: tip
You can also install the Codefair App without a credit card by visiting the [public page](https://github.com/apps/codefair-io)
:::

After following these steps, the Codefair GitHub App will be installed on your repository and you will be able to access the Codefair features.

## GitHub App Permissions

Codefair requires the following permissions to function correctly:

- **Read & Write Access**: Code, Issues and Pull Requests
- **Read Access**: Metadata

![Codefair Permissions](/codefair-permissions.png)

## Oauth Sign in Permissions

Users can sign in to Codefair using their GitHub account. Signing in requests the following scopes:

| Scope        | Why Codefair needs it                                                                                                                            |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:user`  | Reads your GitHub profile so Codefair knows who you are.                                                                                         |
| `user:email` | Reads your email address, used to attribute the pull requests Codefair opens for you.                                                            |
| `read:org`   | Lists the organizations you belong to, so your organization's repositories appear on your dashboard.                                             |
| `repo`       | Confirms you have write access to a repository before letting you change anything in it, and creates the branches and pull requests you ask for. |

![Oauth Permissions](/oauth-permissions.png)

::: warning
`repo` is a broad GitHub scope: it grants read and write access to your repositories, and GitHub does not offer a narrower version of it. Codefair uses it for two things only: checking that you are allowed to edit a repository before showing you its editors, and creating the branches and pull requests you explicitly ask for.
:::

Codefair does not copy your source code. It stores the content of the specific files it checks, such as your `LICENSE`, `README`, `CITATION.cff`, and `codemeta.json`, so it can show them in the editors and detect when they change. You can remove your stored tokens at any time from your Codefair profile page.

Changes Codefair makes to your repository arrive as pull requests for you to review, with one deliberate exception: when you publish a release to Zenodo, Codefair commits the newly minted DOI straight into your `CITATION.cff` and `codemeta.json` on your default branch. This has to happen during the release, so that the archived version contains its own DOI. Those two commits are made by Codefair and clearly labelled:

```
chore: 📝 Update CITATION.cff with Zenodo identifier
chore: 📝 Update codemeta.json with Zenodo identifier
```
