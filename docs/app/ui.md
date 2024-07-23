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
import sanitizeHtml from 'sanitize-html';
import { MdEditor, config } from 'md-editor-v3';
import TargetBlankExtension from '@/utils/TargetBlankExtension';

config({
  editorConfig: {
    languageUserDefined: {
      'en-US': {
        footer: {
          markdownTotal: 'Character Count',
          scrollAuto: 'Scroll Auto',
        },
      },
    },
  },
  markdownItConfig(md) {
    md.use(TargetBlankExtension);
  },
});

definePageMeta({
  middleware: ['protected'],
});

const route = useRoute();

const { identifier } = route.params as { identifier: string };

const githubRepo = ref<string | null>(null);
const expectoContent = ref<string>('');

const displayExpectoEditor = ref(false);
const getExpectoLoading = ref(false);
const submitLoading = ref(false);

const showSuccessModal = ref(false);
const pullRequestURL = ref<string>('');

const { data, error } = await useFetch(`/api/expecto/${identifier}`, {
  headers: useRequestHeaders(['cookie']),
});

if (error.value) {
  push.error({
    title: 'Failed to fetch file details',
    message: 'Please try again later',
  });

  // console.error("Failed to fetch license details:", error.value);

  throw createError(error.value);
}

if (data.value) {
  githubRepo.value = `${data.value.owner}/${data.value.repo}`;
  expectoContent.value = data.value.expectoContent ?? '';
  githubRepo.value = `${data.value.owner}/${data.value.repo}`;

  if (expectoContent.value) {
    displayExpectoEditor.value = true;
  }
}

const sanitize = (html: string) => sanitizeHtml(html);

const saveExpectoDraft = async () => {
  submitLoading.value = true;

  const body = {
    licenseId: licenseId.value,
    licenseContent: licenseContent.value,
  };

  await $fetch(`/api/expecto/${identifier}`, {
    method: 'PUT',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify(body),
  })
    .then((_response) => {
      push.success({
        title: 'Draft saved',
        message: 'You can continue editing now or come back later',
      });
    })
    .catch((error) => {
      console.error('Failed to save license draft:', error);
      push.error({
        title: 'Failed to save license draft',
        message: 'Please try again later',
      });
    })
    .finally(() => {
      submitLoading.value = false;
    });
};

const saveExpectoAndPush = async () => {
  submitLoading.value = true;

  const body = {
    licenseContent: licenseContent.value,
  };

  await $fetch(`/api/expecto/${identifier}`, {
    method: 'POST',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify(body),
  })
    .then((response) => {
      if ('prUrl' in response) {
        push.success({
          title: 'expecto_patronum.md pushed to repository',
          message: 'Review the changes in the repository',
        });

        showSuccessModal.value = true;
        pullRequestURL.value = response.prUrl;
      } else {
        push.error({
          title: 'Failed to push expecto_patronum.md to repository',
          message: 'Please try again later',
        });
      }
    })
    .catch((error) => {
      console.error('Failed to push expecto_patronum.md to repository:', error);
      push.error({
        title: 'Failed to push expecto_patronum.md to repository',
        message: 'Please try again later',
      });
    })
    .finally(() => {
      submitLoading.value = false;
    });
};

const navigateToPR = () => {
  showSuccessModal.value = false;
  window.open(pullRequestURL.value, '_blank');
};
</script>

<template>
  <main class="mx-auto max-w-screen-xl bg-white p-8">
    <n-flex vertical size="large" class="pb-5">
      <div class="flex flex-row justify-between">
        <h1 class="text-2xl font-bold">
          Edit expecto_patronum.md for
          <NuxtLink
            :to="`https://github.com/${githubRepo}`"
            target="_blank"
            class="text-blue-500 underline transition-all hover:text-blue-600"
          >
            {{ data?.repo }}
          </NuxtLink>
        </h1>
      </div>

      <TransitionFade>
        <div v-if="displayExpectoEditor">
          <n-form-item :show-feedback="false" size="large">
            <template #label>
              <p class="pb-1 text-base font-bold">
                Edit your expecto_patronum.md content
                <span class="text-right text-xs text-stone-500">
                  (You can use the left panel to edit the content and right
                  panel to preview the changes)
                </span>
              </p>
            </template>
            <MdEditor
              v-model="expectoContent"
              language="en-US"
              :toolbars-exclude="[
                'preview',
                'fullscreen',
                'save',
                'pageFullscreen',
                'github',
                'catalog',
              ]"
              preview-theme="github"
              :show-code-row-number="true"
              :sanitize="sanitize"
            />
          </n-form-item>
        </div>
      </TransitionFade>
    </n-flex>

    <n-divider />

    <n-flex class="my-4" justify="space-between">
      <n-button
        size="large"
        color="black"
        @click="saveExpectoDraft"
        :loading="submitLoading"
        :disabled="!expectoContent"
      >
        <template #icon>
          <Icon name="material-symbols:save" />
        </template>

        Save draft
      </n-button>

      <n-button
        size="large"
        color="black"
        x
        @click="saveExpectoAndPush"
        :disabled="!expectoContent"
        :loading="submitLoading"
      >
        <template #icon>
          <Icon name="ion:push" />
        </template>
        Save and push expecto_patronum.md to repository
      </n-button>
    </n-flex>

    <n-modal v-model:show="showSuccessModal" transform-origin="center">
      <n-card
        style="width: 600px"
        title="One more thing!"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        A pull request to update the expecto_patronum.md file has been
        submitted. Please approve the pull request to make the changes live.
        <template #footer>
          <n-flex justify="end">
            <n-button type="success" @click="navigateToPR">
              <template #icon>
                <Icon name="icon-park-outline:success" />
              </template>
              View Pull Request
            </n-button>
          </n-flex>
        </template>
      </n-card>
    </n-modal>
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

## **Step 4**: Add the API calls

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

  if (!expectoRequest) {
    throw createError({
      statusCode: 404,
      statusMessage: 'expectopatronum-request-not-found',
    });
  }

  // Check if the user is authorized to access the codeMetadata request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  const response: ExpectoRequestGetResponse = {
    expectoContent: expectoRequest.expectoContent,
    identifier: expectoRequest.identifier,
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    timestamp: expectoRequest.timestamp,
  };

  // return the valid license request
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
  if (!body) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields',
    });
  }

  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    throw createError({
      message: 'The provided parameters are invalid',
      statusCode: 400,
    });
  }

  const { expectoContent } = parsedBody.data;

  const client = new MongoClient(process.env.MONGODB_URI as string, {});
  await client.connect();

  const db = client.db(process.env.MONGODB_DB_NAME);
  const collection = db.collection('expectoPatronum');
  const installation = db.collection('installation');

  const expectoRequest = await collection.findOne({
    identifier,
  });

  if (!expectoRequest) {
    throw createError({
      statusCode: 404,
      message: 'License request not found',
    });
  }

  const installationId = await installation.findOne({
    repositoryId: licenseRequest.repositoryId,
  });

  if (!installationId) {
    throw createError({
      statusCode: 404,
      message: 'Installation not found',
    });
  }

  // Check if the user is authorized to access the license request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  if (!expectoRequest.open) {
    throw createError({
      statusCode: 400,
      message: 'Expecto request is not open',
    });
  }

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

  // Create a new branch for the license addition
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

  // Create a new file with the license content
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
  // Update the license content and the license id in the database
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
  if (!body) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields',
    });
  }

  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    throw createError({
      message: 'The provided parameters are invalid',
      statusCode: 400,
    });
  }

  const { expectoContent } = parsedBody.data;

  const client = new MongoClient(process.env.MONGODB_URI as string, {});
  await client.connect();

  const db = client.db(process.env.MONGODB_DB_NAME);
  const collection = db.collection('expectoPatronum');

  const expectoRequest = await collection.findOne({
    identifier,
  });
  if (!expectoRequest) {
    throw createError({
      statusCode: 404,
      message: 'License request not found',
    });
  }

  // Check if the user is authorized to access the license request
  await repoWritePermissions(event, expectoRequest.owner, expectoRequest.repo);

  if (!expectoRequest.open) {
    throw createError({
      statusCode: 400,
      message: 'Expecto request is not open',
    });
  }

  const updatedRecord = await collection.updateOne(
    { identifier },
    {
      $set: {
        expectoContent,
      },
    },
  );
  if (!updatedRecord) {
    throw createError({
      statusCode: 500,
      message: 'expecto-request-update-failed',
    });
  }

  return {
    expectoContent,
    identifier,
    owner: expectoRequest.owner,
    repo: expectoRequest.repo,
    timestamp: expectoRequest.timestamp,
  };
});
```
