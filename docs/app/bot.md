---
lang: en-US
title: Adding a New Bot Feature
description: Adding a new feature to Codefair
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Running%20the%20GitHub%20Repository&app=codefair&org=fairdataihub
---

# Adding a New Bot Feature :sparkles:

The best way to learn how to add a new feature to Codefair is to complete our step-by-step tutorial below:

The Codefair repository is split into two main sections: `ui` and `bot`. This tutorial will guide you through the process of adding a new file check feature to Codefair bot. The feature will check if a file named `expecto_patronum.md` exists in the root of the repository. If the file exists, the feature will display a checkmark in the Codefair issue dashboard. If the file does not exist, the feature will display a red cross in the Codefair issue dashboard and provide a clickable badge to direct a user to the Codefair UI to add the file.

This page will focus on the steps required to add the new feature to the Codefair bot. To learn how to add a UI feature, you can refer to the [UI documentation](./ui.md).

## **Step 1**: Setup your development environment

The first step is to setup your development environment and create a GitHub App. You can find detailed instructions on how to do this in our [developer documentation](./running-locally.md).

## **Step 2**: Add the file check functionality

Next, you will need to add the file check functionality to the GitHub App. You can navigate to `bot/utils` and create a folder called `expecto_patronum` and a file called `index.js`. Add the following code to the `index.js` file:

```javascript
export async function checkForExpectoPatronumFile(context, owner, repo) {
  try {
    await context.octokit.rest.repos.getContent({
      owner,
      path: 'expecto_patronum.md',
      repo,
    });

    return true;
  } catch (error) {
    return false;
  }
}
```

Thereafter, navigate to `bot/renderer/index.js` and add the `checkForExpectoPatronumFile` function to the `renderIssues` function after the empty repository check:

```javascript
let expectoPatronum = await checkForExpectoPatronumFile(
  context,
  owner,
  repository.name,
);
```

The `renderIssues` function is used througout all event listeners and has a loop to check files being added, so in the case of a push event, the commits can be checked for the file by adding this within the loop.

```javascript
if (commits[i].added[j] === "expecto_patronum.md") {
  expectoPatronum = true;
  continue;
}
```

Finally you can place the check into the subjects object within the `renderIssues` function:

```javascript
const subjects = {
  citation,
  codemeta,
  license,
  expectoPatronum,
};
```

> **Note**
> The event listeners we have can be found in the `bot/index.js` file. If you need an event listener not already available you can add it in this file. A list of GitHub event listeners is available [here](https://docs.github.com/en/webhooks/webhook-events-and-payloads).

## **Step 3**: Add check to the GitHub issue dashboard

After the check is done, you can pass the boolean value of `expectoPatronum` to the `renderIssue` function to create a message on the status of the check. Within the `bot/renderer/index.js` file, you can add the following function:

```javascript
export async function applyExpectoPatronumTemplate(
  subjects,
  baseTemplate,
  db,
  repository,
  owner,
  context,
) {
  if (!subjects.expectoPatronum) {
    const identifier = createId();
    let url = `${CODEFAIR_DOMAIN}/add/expecto/${identifier}`;

    const expectoCollection = db.collection('expectoPatronum');
    const existingPatronum = await expectoCollection.findOne({
      repository: repository.name,
    });

    if (!existingPatronum) {
      const newDate = Date.now();
      await expectoCollection.insertOne({
        created_id: newDate,
        identifier,
        open: true,
        owner,
        repo: repository.name,
        repositoryId: repository.id,
        updated_at: newDate,
      });
    } else {
      await expectoCollection.updateOne(
        { repository: repository.name },
        { $set: { updated_at: Date.now() } },
      );
      url = `${CODEFAIR_DOMAIN}/add/expecto/${existingPatronum.identifier}`;
    }

    // Apply badge and template
    const badge = `[![Expecto Patronum](https://img.shields.io/badge/Add_Patronum-dc2626.svg)](${url})`;
    baseTemplate += `## Expecto Patronum ❌\n\nAn expecto_patronum.md file was expected. Please visit the click on the badge below to add it.\n\n${expectoBadge}`;
  } else {
    // Download the expecto_patronum.md file from the repo
    const expectoFile = await context.octokit.repos.getContent({
      owner,
      path: 'expecto_patronum.md',
      repo: repository.name,
    });

    // Convert the content to utf-8
    const expectoContent = Buffer.from(
      expectoFile.data.content,
      'base64',
    ).toString('utf-8');

    const identifier = createId();

    let url = `${CODEFAIR_DOMAIN}/add/expecto/${identifier}`;

    const expectoCollection = db.collection('expectoPatronum');
    const existingExpecto = await expectoCollection.findOne({
      repositoryId: repository.id,
    });

    if (!existingPatronum) {
      const newDate = Date.now();
      await expectoCollection.insertOne({
        created_id: newDate,
        identifier,
        expectoContent,
        open: true,
        owner,
        repo: repository.name,
        repositoryId: repository.id,
        updated_at: newDate,
      });
    } else {
      await expectoCollection.updateOne(
        { repository: repository.name },
        { $set: { updated_at: Date.now(), expectoContent } },
      );
      url = `${CODEFAIR_DOMAIN}/add/expecto/${existingPatronum.identifier}`;
    }

    // Apply badge and template
    const expectoBadge = `[![Expecto Patronum](https://img.shields.io/badge/Edit_Expecto_Patronum-0ea5e9.svg)](${url})`;
    baseTemplate += `## Expecto Patronum✔️\n\nAn expecto_patronum.md file was found.\n\n${expectoBadge}`;

    return baseTemplate;
  }
}
```

The `applyExpectoPatronumTemplate` function will be placed within the `renderIssues` function at the end of the function where the other template updates are done.

```javascript
baseTemplate = await applyExpectoPatronumTemplate(
  subjects,
  baseTemplate,
  db,
  repository,
  owner,
  context,
);
```

## **Step 4**: Test the feature

You can provide console logs throughout your feature for debugging purposes and when you run locally you will those logs in the terminal. You can run the following command at the root level to start the both the ui and bot servers. Below is the command and the expected output:

```bash
pnpm dev
```

![Terminal Output](/terminal-output.png)

You can then navigate to your `Account Settings -> Developer Settings -> GitHub Apps -> (Your GitHub App)`. Thereafter you can go to the `Install App` section to select a repository to install the GitHub App. Once installed, you can navigate to the `Advanced` page within the app settings to see the events being run and sent to your webook URL.

![GitHub App Events](/deliveries-page.png)
