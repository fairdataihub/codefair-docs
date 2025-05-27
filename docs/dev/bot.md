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

The Codefair repository is split into three main subfolders: `ui`, `bot` and `validator`. This tutorial will guide you through the process of adding a new check feature to Codefair bot. Codefair is modularized in a way to try and make it easy for anyone to plug in a new check with how our code structure is created. We have a main function that calls all the available checks `checkForCompliance()` and within there you will call your new feature. The example feature will below will guide you through the standard we have for creating a new feature to check if a `expecto_patronum.md` file exists. This feature will append the detailed results to an object that will then be used for the GitHub issue renderer. A clickable badge to direct a user to the Codefair UI to add the file is created for each compliance check to allow users to quickly handle a FAIR compliance check.

This page will focus on the steps required to add the new feature to the Codefair bot. To learn how to add a UI feature, you can refer to the [UI documentation](./ui.md).

## **Step 1**: Setup your development environment

The first step is to setup your development environment and create a GitHub App. You can find detailed instructions on how to do this in our [developer documentation](./running-locally.md).

## **Step 2**: Add the file check functionality

Next, you will need to add the file check functionality to the GitHub App. Depending on what feature you make you can decide where it best belongs. We have an `archival` folder for archiving workflows, `metadata` folder where metadata functions are called, `commands` for commands created from the UI into the GitHub issue body to trigger bot workflows, `cwl` for common workflow checks, `citation` and `codemeta` are specific metadata files, and `bot/utils` is where we have subfolders like `renderer` which contains workflows for rendering the github issue body, `compliance-checks` where `checkForCompliance()` is called, `tools` where many utility functions are kept. Within the `bot/utils/` folder is a file called `logwatch.js` which is the setup file for our deployed logging service. In this example we'll create a folder called `expecto_patronum` in the `bot` folder and a file called `index.js`. Add the following code to the `index.js` file:

```javascript
export async function checkForExpectoPatronumFile(context, owner, repo) {
  try {
    await context.octokit.rest.repos.getContent({
      owner,
      path: 'expecto_patronum.md', // Or whichever file you want to check for
      repo,
    });

    return true; // You can return the content of the file needed for validation
  } catch (error) {
    return false;
  }
}
```

Thereafter, navigate to `bot/utils/compliance-checks/index.js` and add the `checkForExpectoPatronumFile()` call within `checkForCompliance()` function:

```javascript
let expectoPatronum = await checkForExpectoPatronumFile(
  context,
  owner,
  repository.name,
);
```

The `checkForCompliance()` function is calls all the FAIR compliance checks and returns an object of all the checks. You can add your new check in the return object:

```javascript
return {
  citation,
  codemeta,
  cwl: cwlObject,
  license,
  expectoPatronum,
};
```

Finally that object is passed on over to the `renderIssues()` function to create the issue body of the GitHub issue. :

```javascript
const issueBody = await renderIssues(
  context,
  owner,
  repository,
  emptyRepo,
  subjects,
);
```

> :bulb: **Note**
> The event listeners we have can be found in the `bot/index.js` file. If you need an event listener not already available you can add it in this file. A list of GitHub event listeners is available [here](https://docs.github.com/en/webhooks/webhook-events-and-payloads).

## **Step 3**: Create schema for the new check

The next step is to create a schema for the new check. This will allow you to store the results of the check in the database. You can find the schema files in the `bot/prisma/schema.prisma` file. Add the following model to the `schema.prisma` file and update the Installation model to link to the new model:

```prisma
model ExpectoPatronum {
  id            Int      @id @default(cuid())
  created_id    Int
  identifier    String
  fileExists    Boolean
  owner         String
  repo          String
  repositoryId  String
  updated_at    DateTime @default(now())
  repository           Installation @relation(fields: [repository_id], references: [id], onDelete: Cascade)
}

model Installation {
  ...
  expectoPatronum ExpectoPatronum?
}
```

This will create a new table in the database called `ExpectoPatronum` linked with the installation table with the following fields:

- `id`: The unique identifier for the record.
- `created_id`: The ID of the record when it was created.
- `identifier`: The identifier for the record.
- `expectoContent`: The content of the `expecto_patronum.md` file.
- `owner`: The owner of the repository.
- `repo`: The name of the repository.
- `repositoryId`: The ID of the repository.
- `updated_at`: The date and time when the record was last updated.

After adding the schema, you can force push the changes to avoid creating a migration file.

```bash
yarn prisma:db:push
```

> **Note:**
> If the feature you create is something you want eventually merged to Codefair's main branch, you can run the following command to create a migration file and apply the changes to the database. This will create a new migration file in the `prisma/migrations` folder and apply the migration to the database:

```bash
yarn prisma:migrate:dev --name <migration_name>
```

You can check the database to see if the new table has been created. You can use a database client like [DBeaver](https://dbeaver.io/) or [Beekeeper](https://www.beekeeperstudio.io/) to connect to the database and view the tables.

## **Step 4**: Handle the check

Within the `renderIssues()` function, there are a series of functions that handle the template sections of the issue body. You can create and call a new function to handle the `expecto_patronum` check. This function will be responsible for creating the template section of the issue body, storing key information in the database.

```javascript
export async function applyExpectoPatronumTemplate(
  subjects,
  baseTemplate,
  db,
  repository,
  owner,
  context,
) {
  let expectoContent = '';
  if (subjects.expectoPatronum) {
    // Download the file from the repo
    const expectoFile = await context.octokit.repos.getContent({
      owner,
      path: 'expecto_patronum.md',
      repo: repository.name,
    });

    // Convert the content to readable format
    expectoContent = Buffer.from(
      expectoFile.data.content,
      'base64',
    ).toString('utf-8');
  }

  /*
    Handle validation of the file content here, store results in database to display results in Codefair UI
  */

  const identifier = createId();
  // URL is created to link the Codefair UI to the GitHub compliance issue
  let url = `${CODEFAIR_DOMAIN}/add/expecto/${identifier}`;

  // Call the database to check if repository exists and handle the creation of the record
  const expectoCollection = db.collection('expectoPatronum');
  const existingPatronum = await expectoCollection.findOne({
    repository: repository.name,
  });

  if (!existingPatronum) {
    await expectoCollection.create({
      identifier,
      fileExists: subjects.expectoPatronum
      expectoContent,
      ...
    });
  } else {
    await expectoCollection.update(
      where: { repository: repository.name },
      data: {
        ...
        fileExists: subjects.expectoPatronum,
        expectoContent,
      }
    );
    // Update the URL to link to the existing record
    url = `${CODEFAIR_DOMAIN}/add/expecto/${existingPatronum.identifier}`;
  }

  // Apply badge and template based on the existence and/or validation of the file
  if (!subjects.expectoPatronum) {
    const badge = `[![Expecto Patronum](https://img.shields.io/badge/Add_Patronum-dc2626.svg)](${url})`;
    baseTemplate += `## Expecto Patronum ❌\n\nAn expecto_patronum.md file was expected. Please visit the click on the badge below to add it.\n\n${expectoBadge}`;
  } else {
    const badge = `[![Expecto Patronum](https://img.shields.io/badge/Patronum_Exists-4ade80.svg)](${url})`;
    baseTemplate += `## Expecto Patronum ✅\n\nAn expecto_patronum.md file was found. Please visit the click on the badge below to view it.\n\n${expectoBadge}`;
  }

  return baseTemplate;
}
```

Finally, the `renderIssues()` function will return the final template to then pass on to the `createIssue()` function to update or create a new issue.

```javascript
// Create an issue with the compliance issues body
await createIssue(context, owner, repository, ISSUE_TITLE, issueBody);
```

## **Step 5**: Test the feature

You can provide console logs throughout your feature for debugging purposes and when you run locally you will those logs in the terminal. You can run the following command at the root level to start the both the ui and bot servers. Below is the command and the expected output:

```bash
yarn dev
```

![Terminal Output](/terminal-output.png)

You can then navigate to your `Account Settings -> Developer Settings -> GitHub Apps -> (Your GitHub App)`. Thereafter you can go to the `Install App` section to select a repository to install the GitHub App. Once installed, you can navigate to the `Advanced` page within the app settings to see the events being run and sent to your webook URL.

![GitHub App Events](/deliveries-page.png)
