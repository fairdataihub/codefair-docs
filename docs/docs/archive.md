---
lang: en-US
title: FAIR Software Release
description: FAIR Software Release
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Software%20Archive&app=codefair&org=fairdataihub
---

# FAIR Software Release

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), many of the principles aimed at making research software **Findable** and **Accessible** can be fulfilled by archiving the software in a suitable archival repository. This is critical to ensure the long-term preservation and accessibility of the software. One recommended approach, as prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x), is to archive each release of your software on Zenodo.

::: tip
Our staging site at <https://staging.codefair.io/> uses the Zenodo Sandbox API rather than the production Zenodo API. You can test the full FAIR release workflow here before archiving your software on the live Zenodo platform.
:::

::: warning
There is a webhook method that allows you to [automatically archive each GitHub release on Zenodo](https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content). However, please note that this method does not provide the DOI before the software is archived on Zenodo, meaning the DOI cannot be included in the software's metadata on GitHub beforehand. This does not align with the FAIR4RS Principle F3, which states: "Metadata should clearly and explicitly include the identifier of the software they describe."
:::

::: info
To archive your software on Zenodo, you will need to have a [license file](/docs/license.md) and [metadata files](/docs/metadata.md) (CITATION.cff and codemeta.json) in your repository.
:::

## How to make a FAIR release

To make a FAIR software release, you can simply click on the `Create release` button provided in the GitHub Issue Dashboard under the FAIR Software Release section. This will direct you to the Codefair's UI that takes you step by step into connecting to Zenodo, providing metadata required by Zenodo, making a release on GitHub, and archiving it on Zenodo.

![Software Archive](/zenodo-dashboard.png)

## FAIR software release UI

The Zenodo archive UI is a user-friendly interface that allows you to archive your research software. It takes you through several steps:

1. **Confirm required metadata**:

   - This section ensures that your software contains the required metadata needed by Zenodo for proper archiving. It checks for details like license information, CITATION.cff, and codemeta.json, ensuring your software is described well for others to find and cite.

   ![Confirm Metadata](/confirm-metadata-zenodo.png)

2. **Check Zenodo Connection**:

   - This step checks if your Zenodo account is connected with Codefair. If it’s not connected, you can authenticate with your Zenodo account using OAuth. The permissions required for this connection include:
     - **Deposit**: Allows the upload of files but does not publish them.
     - **Allow publishing of uploads**: Required to publish the software on Zenodo.

   ![Zenodo Connection](/zenodo-permissions.png)

   ::: tip
   If the OAuth flow shows an error or a blank page, try navigating back and forth between Codefair and Zenodo until the connection completes. This can occur due to a known issue with Zenodo's OAuth implementation. If the problem persists, try using a private/incognito window or clearing relevant cookies.
   :::

3. **Select the Zenodo record**:

   - You can either create a new Zenodo record for your software or choose to update an existing one. This helps organize your software versions and makes it easier to track updates or changes over time.

   <!-- ![Select Zenodo Record](/path-to-select-zenodo-record-screenshot.png) -->

4. **Zenodo Metadata**:

   - This section gathers metadata specific to Zenodo, such as:
     - **Access Rights**: Defines how your software can be accessed (e.g., open access or restricted access).
     - **Version**: Specifies the version of the software. It is recommended to follow [Semantic Versioning](https://semver.org/). This version may differ from the GitHub release version unless both are synchronized.

   ![Zenodo Metadata](/zenodo-metadata.png)

5. **Create a GitHub Draft Release**:

   - You will have the option to create or select a draft GitHub release. This is where you can add files like executables, documentation, and other resources that make your software reusable. These assets will be linked to your Zenodo record and uploaded as part of the archive.

   <!-- ![GitHub Draft Release](/path-to-github-draft-release-screenshot.png) -->

6. **Publish Zenodo Release**:

   - Once your draft release is complete and everything is in place, you can publish the Zenodo release. This step triggers the workflow that updates your software’s metadata and uploads your assets to Zenodo.

   ![Publish Zenodo Release](/release-and-publish.png)

After clicking the `Start the Zenodo publish process` button, Codefair will automatically handle your release. This includes generating a DOI via Zenodo for citation, updating the metadata files (CITATION.cff and codemeta.json) with the new DOI, and finalizing the release on both GitHub and Zenodo. You can monitor the status in both the Codefair UI and GitHub Issue dashboards. Once completed, Codefair will notify you of the successful archival, allowing you to track the entire Zenodo process.

## Share your DOI badge {#share-your-doi-badge}

Once your software is archived on Zenodo, Codefair generates a **DOI badge** you can add to your README so visitors can quickly find and cite your latest release. Click **Request Zenodo badge** on the release page and Codefair shows ready-to-copy snippets in Markdown and HTML, plus the image and target URLs on their own:

```markdown
[![FAIR Software Release](https://codefair.io/api/badge/<owner>/<repo>)](https://codefair.io/doi/<owner>/<repo>)
```

```html
<a href="https://codefair.io/doi/<owner>/<repo>">
  <img
    src="https://codefair.io/api/badge/<owner>/<repo>"
    alt="FAIR Software Release"
  />
</a>
```

Two different URLs are doing two different jobs here:

- `https://codefair.io/api/badge/<owner>/<repo>` is the badge **image**, an SVG showing your DOI.
- `https://codefair.io/doi/<owner>/<repo>` is where the badge **links to**. It redirects to your DOI, so clicking the badge takes readers to your record.

Both always reflect your most recently published Zenodo DOI, so the badge stays up to date as you publish new releases without you having to edit your README again.

## Managing your Zenodo connection

Codefair stores a Zenodo token so it can create depositions on your behalf. There are two ways to remove it:

- **Sign out of Zenodo**, on the release page, in the _Check Zenodo connection_ step. This disconnects Zenodo and leaves the rest of your Codefair account untouched. Use this one if you simply want to reconnect with a different Zenodo account.
- **Purge tokens**, on your Codefair **profile** page. This is the bigger hammer: it removes your Zenodo token **and** your stored GitHub token, and signs you out of Codefair entirely. You will need to sign in again afterwards.

Either way you can reconnect later from the release workflow. Removing a token does not affect anything you have already published; your DOIs and Zenodo records are permanent.

## How Codefair finds your existing DOIs

Even before you publish through Codefair, the dashboard looks for identifiers you may already have. It reads the `identifier` field of your `codemeta.json` and the `doi` field of your `CITATION.cff`, and sorts what it finds into three groups:

| What Codefair finds             | What the dashboard shows                                                                          |
| :------------------------------ | :------------------------------------------------------------------------------------------------ |
| A Zenodo DOI                    | ✔️ You are archived, with a badge linking to the record.                                          |
| A DOI from somewhere else       | ℹ️ The DOI is recognised and displayed, with a note that automated archival is Zenodo-only today. |
| An identifier that is not a DOI | ℹ️ A suggestion to obtain a DOI, since a DOI is what makes a release citable and findable.        |
| Nothing                         | ❌ A button to create your first release.                                                         |

If more than one identifier is found, Codefair picks a **primary** one (preferring a Zenodo DOI) and lists the rest under _"Additional identifiers found"_, noting which file each came from. This is informational; Codefair never edits or removes identifiers you added yourself.

## Requirements and limits

A few conditions are enforced before a release can be archived:

- **A standard license is required.** Zenodo cannot accept a license it can't identify, so archiving is disabled while your license is marked as custom. See [Custom Licences](./license.md#custom-licences).
- **The GitHub release must be a draft.** Codefair publishes the GitHub release itself as the final step, so it needs the release to still be a draft when the process starts.
- **A tag can only be released once.** If the tag you selected has already been released, Codefair will ask you to pick or create another.
- **Access right is currently open only.** Zenodo's embargoed, restricted, and closed options are not yet supported through Codefair.

::: tip
Testing? Point Codefair at the [Zenodo Sandbox](https://sandbox.zenodo.org/) instead of production so you can practise the whole workflow without minting a real DOI. Sandbox DOIs use the `10.5072` prefix.
:::

## Workflow Diagram

![Zenodo Archive](/zenodo-diagram.png)
