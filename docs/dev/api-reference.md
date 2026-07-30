---
lang: en-US
title: REST API Reference
description: Reference for the Codefair central API HTTP endpoints
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=REST%20API%20Reference&app=codefair&org=fairdataihub
---

# :satellite: REST API Reference

The central API exposes its functionality over HTTP from `ui/server/api`. This page is a reference to those endpoints.

> [!WARNING] > **Internal and evolving.** These endpoints currently power Codefair's own web UI and are authenticated with the browser **session cookie**, not API tokens. They are documented here as the foundation of the planned **public REST API**, so paths, payloads, and the auth model may change before a stable, token-authenticated, versioned API is released. Treat this as a contributor reference, not a public contract.

## :gear: Conventions

- **Routing.** Nuxt/Nitro encodes the HTTP method in the file name: `index.get.ts` → `GET`, `index.post.ts` → `POST`, `index.put.ts` → `PUT`. Path segments in brackets (`[owner]`, `[repo]`) are URL parameters.
- **Authentication.** Most endpoints call `protectRoute(event)` (a valid session is required) and `repoWritePermissions(event, owner, repo)` (the signed-in user must have write access to the repository). A CSRF/origin check runs in middleware for browser requests. Exceptions: the **webhook** endpoint uses HMAC signature verification, and the **badge** endpoint is public.
- **Errors.** Failures are returned as JSON with an HTTP status and a `statusMessage`, e.g. `{ "statusCode": 404, "statusMessage": "installation-not-found" }`.
- **Bodies.** Write endpoints validate their JSON body with [Zod](https://zod.dev/).

## :file_folder: Repository compliance

Each FAIR check exposes a consistent trio: `GET` current state, `POST` to create the file via a pull request, and `PUT` to save a draft. All are under `/api/[owner]/[repo]`.

| Method           | Path                    | Purpose                                                      |
| :--------------- | :---------------------- | :----------------------------------------------------------- |
| GET / POST / PUT | `/license`              | Read, create-PR, or update the `LICENSE`.                    |
| PUT              | `/license/custom_title` | Save a custom license title.                                 |
| GET / POST / PUT | `/readme`               | Read, create-PR, or update the `README`.                     |
| GET / POST / PUT | `/contributing`         | Read, create-PR, or update `CONTRIBUTING.md`.                |
| GET / POST / PUT | `/code-of-conduct`      | Read, create-PR, or update `CODE_OF_CONDUCT.md`.             |
| GET / POST / PUT | `/code-metadata`        | Read, create-PR, or update `codemeta.json` + `CITATION.cff`. |

## :test_tube: Validation views

| Method | Path                                   | Purpose                                              |
| :----- | :------------------------------------- | :--------------------------------------------------- |
| GET    | `/[owner]/[repo]/cwl-validation`       | CWL files and their validation results.              |
| GET    | `/[owner]/[repo]/cwl-validation/rerun` | Re-run CWL validation.                               |
| GET    | `/[owner]/[repo]/metadata-validation`  | `codemeta.json` / `CITATION.cff` validation results. |

## :bar_chart: Dashboard data

| Method | Path                        | Purpose                                                              |
| :----- | :-------------------------- | :------------------------------------------------------------------- |
| GET    | `/dashboard`                | The signed-in user plus their organizations, with repository counts. |
| GET    | `/[owner]/dashboard`        | Repositories Codefair manages for one owner.                         |
| GET    | `/[owner]/[repo]/dashboard` | Full compliance state for one repository.                            |
| GET    | `/[owner]/[repo]/rerun`     | Re-run compliance checks (SSE). See [Re-runs](#re-runs) below.       |
| POST   | `/utils`                    | Trigger a dashboard re-render.                                       |

> [!NOTE]
> A second, older pair of routes exists at `/dashboard/[owner]` and
> `/dashboard/[owner]/[repo]`. No page calls them; the UI uses
> `/[owner]/dashboard` and `/[owner]/[repo]/dashboard` above. Treat them as
> deprecated and don't build on them.

### Re-runs {#re-runs}

`/[owner]/[repo]/rerun` and `/[owner]/[repo]/cwl-validation/rerun` both stream
[Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
rather than returning JSON, emitting `running`, `progress`, `complete`, and `fail` events so
the UI can show live progress.

`rerun` takes a `rerunType` query parameter, one of: `full-repo`, `license`, `metadata`,
`readme`, `contributing`, `code-of-conduct` (each also accepts a `-validation` suffix, e.g.
`license-validation`).

> [!IMPORTANT]
> Both endpoints require the installation to have `use_central_api` enabled and return
> **400 `Central API mode required for rerun`** otherwise. See
> [Architecture](./architecture.md) for what that flag means.

## :rocket: Releases & archival

| Method | Path                                       | Purpose                                        |
| :----- | :----------------------------------------- | :--------------------------------------------- |
| POST   | `/[owner]/[repo]/release/github`           | Create a GitHub (draft) release.               |
| GET    | `/[owner]/[repo]/release/github/[release]` | Fetch a GitHub release.                        |
| GET    | `/[owner]/[repo]/release/zenodo`           | Get Zenodo deposition status.                  |
| POST   | `/[owner]/[repo]/release/zenodo`           | Publish to Zenodo (streams progress over SSE). |
| GET    | `/[owner]/[repo]/release/zenodo/status`    | Poll the publication status.                   |
| GET    | `/zenodo/callback`                         | Zenodo OAuth callback.                         |
| POST   | `/zenodo/disconnect`                       | Disconnect the user's Zenodo account.          |

## :bust_in_silhouette: User & session

| Method | Path           | Purpose                                     |
| :----- | :------------- | :------------------------------------------ |
| GET    | `/user`        | The current user (id, username, github_id). |
| GET    | `/user/token`  | The user's GitHub access token.             |
| DELETE | `/user/tokens` | Revoke the user's tokens.                   |
| POST   | `/logout`      | End the session.                            |

## :label: Badges & utilities

| Method | Path                           | Auth    | Purpose                                                               |
| :----- | :----------------------------- | :------ | :-------------------------------------------------------------------- |
| GET    | `/badge/[owner]/[repo]`        | Public  | Returns an SVG **DOI badge** for the repo's published Zenodo release. |
| GET    | `/utils/stats`                 | Public  | Global usage statistics.                                              |
| GET    | `/request/license/[licenseid]` | Session | Fetch a license template by SPDX id, proxied from spdx.org.           |

## :inbox_tray: Webhooks

| Method | Path               | Auth | Purpose                                                            |
| :----- | :----------------- | :--- | :----------------------------------------------------------------- |
| POST   | `/webhooks/github` | HMAC | Receives GitHub App events. See [Architecture](./architecture.md). |

## :compass: Non-`/api` routes

Not everything is under `/api`. These live in `ui/server/routes/` and are reached directly in
the browser rather than by `fetch`.

| Method | Path                               | Auth    | Purpose                                                                               |
| :----- | :--------------------------------- | :------ | :------------------------------------------------------------------------------------ |
| GET    | `/up`                              | Public  | Health check for the deployment proxy.                                                |
| GET    | `/login/github`                    | Public  | Starts GitHub OAuth. Accepts `?redirect=` to return the user where they started.      |
| GET    | `/login/github/callback`           | Public  | OAuth callback: validates state, creates the session, redirects to the dashboard.     |
| GET    | `/doi/[owner]/[repo]`              | Public  | Redirects to the repository's published DOI. **This is the DOI badge's link target.** |
| GET    | `/add/license/[identifier]`        | Session | Redirect shim to the license editor. Kept for links in older dashboard issues.        |
| GET    | `/add/code-metadata/[identifier]`  | Session | Redirect shim to the metadata editor.                                                 |
| GET    | `/add/cwl-validation/[identifier]` | Session | Redirect shim to the CWL results page.                                                |

> [!TIP]
> The DOI badge is a pair: `/api/badge/[owner]/[repo]` serves the **SVG image**, and
> `/doi/[owner]/[repo]` is what it **links to**. Note the `/api` prefix on the image but not
> on the redirect.

## :page_facing_up: Example

Reading and updating the README for a repository:

```bash
# GET current README content (requires a valid session cookie)
curl https://codefair.io/api/octocat/hello-world/readme \
  -H "Cookie: <session-cookie>"
# → { "readmeContent": "# Hello World\n..." }

# POST new content: commits to a new branch and opens a pull request
curl -X POST https://codefair.io/api/octocat/hello-world/readme \
  -H "Cookie: <session-cookie>" \
  -H "Content-Type: application/json" \
  -d '{ "readmeContent": "# Hello World\n\nA friendly README." }'
# → { "message": "README request updated successfully", "prUrl": "https://github.com/octocat/hello-world/pull/42" }
```

## :crystal_ball: Toward a public REST API

The current surface is the groundwork for a public REST API. Expected additions as it matures:

- **Token authentication** for programmatic clients (alongside the existing session auth used by the web UI).
- **Versioning** (e.g. an `/api/v1` prefix) and a published **OpenAPI** specification.
- **Platform-agnostic paths** that work for GitLab as well as GitHub, made possible by the [provider abstraction](./providers.md).

Until then, prefer the documented behaviours above over reverse-engineering individual routes, and expect changes.
