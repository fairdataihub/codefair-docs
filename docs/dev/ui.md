---
lang: en-US
title: Adding a New UI page
description: Adding a new feature to Codefair
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# Adding a New UI page :sparkles:

This tutorial walks through adding a Codefair UI page using Vue. We'll build a Markdown editor that lets a user create an `expecto_patronum.md` file in their repository. The page fetches existing content from the central API, and on save it commits the file to a new branch and opens a pull request.

> [!NOTE]
> This page builds on the backend check from [Adding a Compliance Check](./compliance-check.md) (the `expecto_patronum.md` example). Complete that tutorial first so the database model and dashboard badge exist.

In the new architecture, UI pages and their API routes are organised **per repository**:

- **Editor pages** live at `pages/dashboard/[owner]/[repo]/edit/<feature>.vue`
- **Read-only views** live at `pages/dashboard/[owner]/[repo]/view/<feature>.vue`
- **API routes** live at `server/api/[owner]/[repo]/<feature>/index.<method>.ts`

Data is read and written with [Prisma](https://www.prisma.io/) (not MongoDB), and every route is protected by the auth helpers `protectRoute` and `repoWritePermissions`. All paths below are relative to the `ui/` directory.

## **Step 1**: Set up your development environment

Follow [Running Locally](./running-locally.md) to run the central API and create your GitHub App and OAuth App.

## **Step 2**: Add the editor page

Create `pages/dashboard/[owner]/[repo]/edit/expecto.vue`. The route params give you the `owner` and `repo`, which you use to call the per-repository API:

```vue
<script setup lang="ts">
const route = useRoute();
const { owner, repo } = route.params as { owner: string; repo: string };

const expectoContent = ref<string>('');

const { data } = await useFetch(`/api/${owner}/${repo}/expecto`, {
  headers: useRequestHeaders(['cookie']),
});

if (data.value) {
  expectoContent.value = data.value.expectoContent ?? '';
}

async function pushToRepo() {
  const { prUrl } = await $fetch(`/api/${owner}/${repo}/expecto`, {
    body: { expectoContent: expectoContent.value },
    method: 'POST',
  });
  // navigate the user to the new pull request
  await navigateTo(prUrl, { external: true });
}
</script>

<template>
  <main>
    <n-flex vertical size="large">
      <MdEditor v-model="expectoContent" language="en-US" />
      <n-button type="primary" @click="pushToRepo">
        Save and open pull request
      </n-button>
    </n-flex>
  </main>
</template>
```

The dashboard badge you added in the [compliance check tutorial](./compliance-check.md) links here, because the renderer points it at `${DOMAIN}/dashboard/${owner}/${repo}/edit/expecto`.

## **Step 3**: Add the GET route

Create `server/api/[owner]/[repo]/expecto/index.get.ts`. It looks up the repository's `Installation`, returns the stored content, and creates an empty record on first visit. Helpers like `prisma`, `protectRoute`, and `repoWritePermissions` are auto-imported. This mirrors `server/api/[owner]/[repo]/readme/index.get.ts`:

```typescript
import { createId } from '@paralleldrive/cuid2';

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const { owner, repo } = event.context.params as {
    owner: string;
    repo: string;
  };

  const installation = await prisma.installation.findFirst({
    include: { ExpectoValidation: true },
    where: { owner, repo },
  });

  if (!installation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'installation-not-found',
    });
  }

  // Confirm the signed-in user has write access to the repo
  await repoWritePermissions(event, owner, repo);

  let expecto = installation.ExpectoValidation;
  if (!expecto) {
    expecto = await prisma.expectoValidation.create({
      data: {
        contains_expecto: false,
        identifier: createId(),
        repository: { connect: { id: installation.id } },
      },
    });
  }

  return { expectoContent: expecto.expecto_content || '' };
});
```

## **Step 4**: Add the POST route

Create `server/api/[owner]/[repo]/expecto/index.post.ts`. It validates the body with [Zod](https://zod.dev/), checks permissions, then uses the GitHub App installation client to create a branch, commit the file, and open a pull request — finally saving the PR URL to the database. This mirrors `server/api/[owner]/[repo]/readme/index.post.ts`:

```typescript
import { z } from 'zod';
import { App } from 'octokit';
import { nanoid } from 'nanoid';

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const { owner, repo } = event.context.params as {
    owner: string;
    repo: string;
  };

  const bodySchema = z.object({ expectoContent: z.string() });
  const parsedBody = bodySchema.safeParse(await readBody(event));
  if (!parsedBody.success) {
    throw createError({ statusCode: 400, statusMessage: 'invalid-parameters' });
  }
  const { expectoContent } = parsedBody.data;

  const expecto = await prisma.expectoValidation.findFirst({
    include: { repository: true },
    where: { repository: { owner, repo } },
  });
  if (!expecto?.repository) {
    throw createError({ statusCode: 404, statusMessage: 'request-not-found' });
  }

  await repoWritePermissions(event, owner, repo);

  // Authenticate as the GitHub App installation for this repository
  const app = new App({
    appId: process.env.GH_APP_ID!,
    oauth: {
      clientId: null as unknown as string,
      clientSecret: null as unknown as string,
    },
    privateKey: process.env.GH_APP_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  });
  const octokit = await app.getInstallationOctokit(
    expecto.repository.installation_id,
  );

  // Branch off the default branch, commit the file, and open a PR
  const { data: repoData } = await octokit.request(
    'GET /repos/{owner}/{repo}',
    {
      owner,
      repo,
    },
  );
  const defaultBranch = repoData.default_branch;
  const { data: refData } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    { owner, repo, ref: `heads/${defaultBranch}` },
  );

  const newBranch = `expecto-${nanoid(5)}`;
  await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: refData.object.sha,
  });
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    branch: newBranch,
    content: Buffer.from(expectoContent).toString('base64'),
    message: 'feat: ✨ add expecto_patronum.md',
    path: 'expecto_patronum.md',
  });
  const { data: pr } = await octokit.request(
    'POST /repos/{owner}/{repo}/pulls',
    {
      owner,
      repo,
      base: defaultBranch,
      head: newBranch,
      title: 'feat: ✨ expecto_patronum.md added',
    },
  );

  // Persist the PR URL and content
  await prisma.expectoValidation.update({
    data: { expecto_content: expectoContent, pull_request_url: pr.html_url },
    where: { id: expecto.id },
  });

  return { message: 'expecto request updated', prUrl: pr.html_url };
});
```

> [!NOTE]
> The example above constructs an Octokit `App` inline because that is what the existing
> per-repository routes do. For new code, prefer
> `getInstallationOctokit(installationId)` from `server/services/github-app/client.ts` — it
> centralises the App credentials instead of repeating them in every route. Better still, if
> your route only needs ordinary repository operations, take a
> [`RepositoryProvider`](./providers.md) so it stays platform-agnostic.

> [!TIP]
> Need a read-only results page instead (like the CWL or metadata validation reports)? Put it under `pages/dashboard/[owner]/[repo]/view/<feature>.vue` and point the dashboard badge at `.../view/<feature>`.

## **Step 5**: Test the feature

Run the stack locally and sign in:

```bash
# In ui/
yarn dev
```

Visit `http://localhost:3000/dashboard/<owner>/<repo>/edit/expecto`, edit the content, and click **Save**. Confirm that a new branch and pull request are created on the repository, and that the PR URL is stored on the `ExpectoValidation` row (`yarn prisma:studio`). You can also reach the page from the **FAIR Compliance Dashboard** issue by clicking the _Create/Edit Expecto_ badge.
