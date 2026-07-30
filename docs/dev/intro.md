---
lang: en-US
title: Introduction
description: Introduction
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# Introduction

This is the documentation of Codefair for developers. You will find here everything to set up the project locally and start making your contribution! Before you continue, we invite you to first read our [contributing guidelines](https://github.com/fairdataihub/codefair-app/blob/main/CONTRIBUTING.md) and our [code of conduct](https://github.com/fairdataihub/codefair-app/blob/main/CODE_OF_CONDUCT.md).

## How the project is organized

Codefair recently moved to a **central API** architecture. The [`codefair-app`](https://github.com/fairdataihub/codefair-app) repository is now organized into two active parts:

- **`ui/`**: a [Nuxt](https://nuxt.com/) application that serves both the web interface **and** the central API. Its server (built on Nuxt's [Nitro](https://nitro.build/) engine) receives GitHub webhooks, runs the FAIR compliance checks, talks to GitHub through [Octokit](https://github.com/octokit/octokit.js), and persists everything in PostgreSQL through [Prisma](https://www.prisma.io/).
- **`validator/`**: a standalone [Python](https://www.python.org/) + [Flask](https://flask.palletsprojects.com/) microservice that validates CWL, `CITATION.cff`, and `codemeta.json` files. The `ui` calls it over HTTP.

> [!NOTE]
> The repository also contains a `bot/` folder. This was the original [Probot](https://probot.github.io/) backend and is **being retired**. Codefair migrated off Probot to the Nuxt + Octokit central API described above. It has not been deleted yet because the cutover happens per repository via the `use_central_api` flag, so it still serves installations that have not been migrated. New work should target `ui/` and `validator/`; don't add features to `bot/`. See [Architecture](./architecture.md#use-central-api-flag) for details.

This central API is the foundation for two ongoing goals: releasing a public **REST API** and adding **GitLab** support alongside GitHub. The architecture was deliberately built around platform-agnostic abstractions so that new checks, new platforms, and community contributions are easier to land.

## Where to go next

- **[Architecture](./architecture.md)**: understand how the central API, validator, database, and external platforms fit together before you write any code.
- **[Running Locally](./running-locally.md)**: set up your environment and run the stack on your machine.
- **Contributing a Feature**: step-by-step tutorials for [adding a compliance check](./compliance-check.md), [adding a UI page](./ui.md), and [adding a validation endpoint](./validator.md).
- **Extending the Platform**: learn the [provider model used to add platforms like GitLab](./providers.md) and browse the [REST API reference](./api-reference.md).
