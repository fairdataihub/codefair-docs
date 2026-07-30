---
lang: en-US
title: Adding a Compliance Check
description: Adding a new FAIR compliance check to the Codefair central API
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# Adding a Compliance Check :sparkles:

A **compliance check** is a single FAIR rule Codefair evaluates for a repository. For example, "does a `LICENSE` file exist?" or "is the `codemeta.json` valid?". Each check produces a result that is stored in the database and rendered as a section of the repository's **FAIR Compliance Dashboard** issue.

Codefair is deliberately modular: checks are small functions that receive a platform-agnostic [`RepositoryProvider`](./providers.md) and are wired into a single orchestrator, `runComplianceChecks()`. This page walks through adding a brand-new check end-to-end by building an example that verifies an `expecto_patronum.md` file exists.

> [!NOTE]
> This page covers the **backend** check. To build the Codefair UI page where a user can create or edit the file, follow [Adding a UI Page](./ui.md) afterwards.

All paths below are relative to the `ui/` directory.

## **Step 1**: Set up your development environment

Follow [Running Locally](./running-locally.md) to get the central API and validator running, and to create your GitHub App. Make sure you can install the App on a test repository and see the dashboard issue appear.

## **Step 2**: Write the check service

Compliance checks live in `server/services/compliance/`. Each one is a small, focused module that takes a `RepositoryProvider` and returns a typed result. The simplest existing example to copy is `readme.ts`.

Create `server/services/compliance/expecto.ts`:

```typescript
import type { RepositoryProvider } from '../providers/interface';

export interface ExpectoResult {
  content: string;
  path: string;
  status: boolean;
}

const EXPECTO_PATHS = ['expecto_patronum.md', 'docs/expecto_patronum.md'];

/**
 * Checks whether an `expecto_patronum.md` file exists in the repository.
 *
 * @param provider - The repository provider used to fetch file contents.
 * @param owner - The owner (user or organisation) of the repository.
 * @param repo - The repository name.
 * @returns An `ExpectoResult` with the file content, path, and a boolean status.
 */
export async function checkForExpecto(
  provider: RepositoryProvider,
  owner: string,
  repo: string,
): Promise<ExpectoResult> {
  for (const filePath of EXPECTO_PATHS) {
    const file = await provider.getFileContent(owner, repo, filePath);
    if (file) {
      return { content: file.content, path: file.path, status: true };
    }
  }
  return {
    content: '',
    path: 'No expecto_patronum.md file found',
    status: false,
  };
}
```

> [!IMPORTANT]
> Always go through the `provider` (`getFileContent`, `listDirectory`, `commitFile`, …). **Never** import Octokit directly in a compliance service. This is what lets the same check run unchanged on GitHub today and GitLab in the future. See [Platform Providers](./providers.md).

## **Step 3**: Register the check in the orchestrator

`server/services/compliance/index.ts` runs every check (in parallel) and returns a single `ComplianceSubjects` object. Add your check in three places:

```typescript
// 1. Add the name to the CheckName union
export type CheckName =
  | 'readme'
  | 'license'
  | 'metadata'
  | 'cwl'
  | 'contributing'
  | 'cofc'
  | 'expecto';

// 2. Add the result to ComplianceSubjects
import { checkForExpecto } from './expecto';
import type { ExpectoResult } from './expecto';

export interface ComplianceSubjects {
  // ...existing fields
  expecto: ExpectoResult;
}

// 3. Run it inside runComplianceChecks(): add a default stub and a Promise.all entry
const defaultExpecto: ExpectoResult = { content: '', path: '', status: false };

const [readme, license, metadata, contributing, cofc, expecto] =
  await Promise.all([
    // ...existing checks
    shouldRun('expecto', opts)
      ? checkForExpecto(provider, owner, repo)
      : Promise.resolve(defaultExpecto),
  ]);

return { cofc, contributing, cwl, expecto, license, metadata, readme };
```

The `shouldRun()` helper means your check participates automatically in full runs and can also be requested individually (e.g. when a single section needs refreshing).

## **Step 4**: Add a database model

Persistent state for each check is stored in PostgreSQL via Prisma. Open `prisma/schema.prisma` and add a model linked 1:1 to `Installation`, mirroring `ReadmeValidation`:

```prisma
model ExpectoValidation {
  id                String       @id @default(cuid())
  identifier        String       @unique
  repository_id     Int          @unique
  contains_expecto  Boolean      @default(false)
  expecto_content   String       @default("")
  expecto_path      String       @default("")
  pull_request_url  String       @default("")
  created_at        DateTime     @default(now())
  updated_at        DateTime     @updatedAt
  repository        Installation @relation(fields: [repository_id], references: [id], onDelete: Cascade)
}
```

Then add the back-reference on the `Installation` model so the relation resolves:

```prisma
model Installation {
  // ...existing relations
  ExpectoValidation ExpectoValidation?
}
```

Apply the change to your local database:

```bash
yarn prisma:db:push
```

> [!NOTE] > `prisma:db:push` is great for fast local iteration. When you're ready to open a pull request, generate a migration instead so the change is reproducible:
>
> ```bash
> yarn prisma:migrate:dev --name add_expecto_validation
> ```

To write results back, follow the pattern in `server/services/compliance/license.ts` (`updateLicenseDatabase`), which `upsert`s the per-check row keyed on `repository_id`.

## **Step 5**: Render it on the dashboard

The dashboard issue body is built by `server/services/dashboard/renderer.ts`, a pure function that turns the compliance results into Markdown. Add a section renderer modelled on `renderReadme()`:

```typescript
function renderExpecto(
  owner: string,
  repo: string,
  data: { result: ExpectoResult; pullRequestUrl: string },
): string {
  const { pullRequestUrl, result } = data;
  // Links the dashboard badge to the Codefair UI page (see the UI guide)
  const badgeURL = `${DOMAIN}/dashboard/${owner}/${repo}/edit/expecto`;
  const verb = result.status ? 'Edit' : 'Create';
  const color = result.status ? '0ea5e9' : 'dc2626';
  const badge = `[![Expecto](https://img.shields.io/badge/${verb}_Expecto-${color}.svg)](${badgeURL})`;
  const header = result.status
    ? '## Expecto Patronum ✔️'
    : '## Expecto Patronum ❌';
  const desc = result.status
    ? `An \`expecto_patronum.md\` file was found in your repository.`
    : `An \`expecto_patronum.md\` file was not found. Click the badge below to add one with Codefair's editor.`;

  let section = `${header}\n\n${desc}\n\n${badge}\n\n`;
  if (pullRequestUrl) {
    section +=
      `\n\nA pull request for the file is open:\n\n` +
      `[![Expecto](https://img.shields.io/badge/View_PR-6366f1.svg)](${pullRequestUrl})\n\n`;
  }
  return section;
}
```

Then call it from `renderDashboard()` and add the data to the `DashboardSections` type so it is included in the issue body:

```typescript
body += renderExpecto(owner, repo, expecto);
```

When `renderDashboard()` runs, the dashboard manager (`server/services/dashboard/manager.ts`) updates the single GitHub issue for the repository, with no extra wiring needed.

## **Step 6**: Test the feature

Run the stack locally (see [Running Locally](./running-locally.md)):

```bash
# In ui/: runs the Nuxt server plus the Smee webhook proxy
yarn dev:webhook
```

Install (or push to) your test repository and watch the terminal: webhook deliveries are logged as they arrive. Add or remove an `expecto_patronum.md` file, push to the default branch, and confirm:

1. The check runs (add `console.log`/`logwatch` statements while developing).
2. A row appears in your `ExpectoValidation` table (`yarn prisma:studio` to inspect).
3. The **FAIR Compliance Dashboard** issue gains an _Expecto Patronum_ section with the correct ✔️/❌ state and badge.

You can inspect each webhook delivery and replay it from your GitHub App's **Advanced** settings page.

## Recap

| You added           | Where                                   |
| :------------------ | :-------------------------------------- |
| The check function  | `server/services/compliance/expecto.ts` |
| Orchestrator wiring | `server/services/compliance/index.ts`   |
| A database model    | `prisma/schema.prisma`                  |
| A dashboard section | `server/services/dashboard/renderer.ts` |

Next, give users a way to create the file from the web app: [Adding a UI Page](./ui.md).
