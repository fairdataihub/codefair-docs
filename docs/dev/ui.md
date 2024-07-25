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

The best way to learn how to add a new feature to Codefair is to complete our step-by-step tutorial below:

The Codefair repository is split into two main sections: `ui` and `bot`. This tutorial will guide you through the process of adding a new UI page to Codefair using Vue syntax. The feature will display a markdown editor in the Codefair UI that will allow users to input text to be added to an expecto_patronum.md file in the root of the repository. The page will also make API calls to the MongoDB database to retrieve and display information gathered from the bot, safe drafts, push to the repository in a new branch and create a pull request.

> **Note**
> The feature connects with the bot feature implemented [here](./bot.md) so please ensure you have completed that tutorial before proceeding.

## **Step 1**: Setup your development environment

The first step is to setup your development environment and create a GitHub Oauth. You can find detailed instructions on how to do this in our [developer documentation](./running-locally.md).

## **Step 2**: Add the UI page

Next, you will need to add the UI page to the Codefair frontend. You can navigate to `ui/pages/add` and create a folder called `expecto` and within that folder create a `[identifier].vue` file. Create the UI page using the following Vue syntax:

```vue
<script setup lang="ts">

const route = useRoute();

const { identifier } = route.params as { identifier: string };

const expectoContent = ref<string>('');

const getExpectoLoading = ref(false);

const { data, error } = await useFetch(`/api/expecto/${identifier}`, {
  headers: useRequestHeaders(['cookie']),
});

if (data.value) {
  expectoContent.value = data.value.expectoContent ?? '';
}

const saveExpectoDraft = async () => {
  submitLoading.value = true;

  const body = {
    expectoContent: expectoContent.value,
  };

  await $fetch(`/api/expecto/${identifier}`, {
    method: 'PUT',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify(body),
  })
};

const saveExpectoAndPush = async () => {
  submitLoading.value = true;

  const body = {
    expectoContent: expectoContent.value,
  };

  await $fetch(`/api/expecto/${identifier}`, {
    method: 'POST',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify(body),
  })
};

const navigateToPR = () => {
  showSuccessModal.value = false;
  window.open(pullRequestURL.value, '_blank');
};
</script>

<template>
  <main class="">
    <n-flex vertical size="large">
      <TransitionFade>
        <div v-if="displayExpectoEditor">
          <n-form-item :show-feedback="false" size="large">
            <MdEditor
              v-model="expectoContent"
            />
        </div>
      </TransitionFade>
    </n-flex>
  </main>
</template>
```

## **Step 3**: Create interfaces for the API calls

Next, you will need to create interfaces for the API calls. You can navigate to `ui/types` and create a file called `expecto.d.ts` and add the following code to retrieve the necessary data from the MongoDB database:

```typescript
interface ExpectoRequestGetReponse extends ExpectoRequest {
  identifer: string;
  owner: string;
  repo: string;
  timestamp: number;
}

interface ExpectoRequest {
  expectoContent?: string;
}
```

## **Step 4**: Add the API routes

Finally, you will need to add the API calls to the Codefair frontend to retrieve and display the data from the MongoDB database, saving a draft, pushing content to a new branch and creating a pull request. You can navigate to `ui/server/api` and create a folder called `expecto` and within that folder another folder called `[identifier]`. There you will be able to add your different API calls.

### GET request

To create a GET request and retrieve the expecto content from the database, you can create a file a file called `index.get.ts` and add the following code:

```typescript
import { MongoClient } from 'mongodb';

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const { identifier } = event.context.params as { identifier: string };

  const client = new MongoClient(process.env.MONGODB_URI as string, {});
  await client.connect();

  const db = client.db(process.env.MONGODB_DB_NAME);
  const collection = db.collection('expectoPatronum');

  // Check if the request identifier exists in the database
  const expectoRequest = await collection.findOne({
    identifier,
  });

  // Check if the user is authorized to access the request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  const response: ExpectoRequestGetResponse = {
    expectoContent: expectoRequest.expectoContent,
    identifier: expectoRequest.identifier,
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    timestamp: expectoRequest.timestamp,
  };

  // return the valid request
  return response;
});
```

### POST request

The POST request will be used to push the content to the repository in a new branch and then create a pull request. You can create a file called `index.post.ts` and add the following code:

```typescript
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import { App } from 'octokit';
import { nanoid } from 'nanoid';

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const bodySchema = z.object({
    expectoContent: z.string(),
  });

  const { identifier } = event.context.params as { identifier: string };

  const body = await readBody(event);

  const parsedBody = bodySchema.safeParse(body);

  const { expectoContent } = parsedBody.data;

  const client = new MongoClient(process.env.MONGODB_URI as string, {});
  await client.connect();

  const db = client.db(process.env.MONGODB_DB_NAME);
  const collection = db.collection('expectoPatronum');
  const installation = db.collection('installation');

  const expectoRequest = await collection.findOne({
    identifier,
  });

  const installationId = await installation.findOne({
    repositoryId: expectoRequest.repositoryId,
  });

  // Check if the user is authorized to access the request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  // Create an octokit app instance
  const app = new App({
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
    oauth: {
      clientId: null as unknown as string,
      clientSecret: null as unknown as string,
    },
  });

  // Get the installation instance for the app
  const octokit = await app.getInstallationOctokit(
    installationId.installationId,
  );

  // Get the default branch of the repository
  const { data: repoData } = await octokit.request(
    'GET /repos/{owner}/{repo}',
    {
      owner: expectoRequest.owner,
      repo: expectoRequest.repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  const defaultBranch = repoData.default_branch;

  // Get the default branch reference
  const { data: refData } = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    {
      owner: expectoRequest.owner,
      repo: expectoRequest.repo,
      ref: `heads/${defaultBranch}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  // Create a new branch for the addition
  const newBranchName = `expecto-${nanoid()}`;

  // Create a new branch from the default branch
  await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    ref: `refs/heads/${newBranchName}`,
    sha: refData.object.sha,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // Create a new file with the content
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    path: 'expecto_patronum.md',
    message: `feat: ✨ add expecto_patronum file`,
    content: Buffer.from(expectoContent).toString('base64'),
    branch: newBranchName,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  // Create a pull request for the new branch with the expecto_patronum.md content
  const { data: pullRequestData } = await octokit.request(
    'POST /repos/{owner}/{repo}/pulls',
    {
      owner: expectoRequest.owner,
      repo: expectoRequest.repo,
      title: 'feat: ✨ expecto_patronum.md file added',
      head: newBranchName,
      base: defaultBranch,
      // body: `Resolves #${context.payload.issue.number}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  // Save the PR URL to the database
  // Update the content in the database
  await collection.updateOne(
    {
      identifier,
    },
    {
      $set: {
        expectoContent,
        pullRequestURL: pullRequestData.html_url,
      },
    },
  );

  return {
    prUrl: pullRequestData.html_url,
    message: 'expecto_patronum.md request updated successfully',
  };
});
```

### PUT request

The PUT request will be used to save a draft of the content. You can create a file called `index.put.ts` and add the following code:

```typescript
import { MongoClient } from 'mongodb';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const bodySchema = z.object({
    expectoContent: z.string(),
  });

  const { identifier } = event.context.params as { identifier: string };

  const body = await readBody(event);

  const parsedBody = bodySchema.safeParse(body);

  const { expectoContent } = parsedBody.data;

  const client = new MongoClient(process.env.MONGODB_URI as string, {});
  await client.connect();

  const db = client.db(process.env.MONGODB_DB_NAME);
  const collection = db.collection('expectoPatronum');

  const expectoRequest = await collection.findOne({
    identifier,
  });

  // Check if the user is authorized to access the request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  const updatedRecord = await collection.updateOne(
    { identifier },
    {
      $set: {
        expectoContent,
      },
    },
  );

  return {
    expectoContent,
    identifier,
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    timestamp: expectoRequest.timestamp,
  };
});
```

## **Step 5**: Test the feature

You can now test both the bot feature and correlating UI feature by running the Codefair repository locally. The terminal should output both the UI and bot servers running.

```bash
pnpm dev
```

![Terminal Output](/terminal-output.png)

If you only want to check out the UI created, visit `https://localhost:3000/add/expecto/[identifier]` in your browser. The identifier being the one stored in the mongoDB database.

Another alternative would be to visit the GitHub issue created by the bot and click on the `Edit Expecto Patronum` badge to be redirected to the UI page.
