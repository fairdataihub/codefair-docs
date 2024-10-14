---
lang: en-US
title: FAIR Software Release
description: FAIR Software Release
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Software%20Archive&app=codefair&org=fairdataihub
---

# :label: FAIR Software Release

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), many of the principles aimed at making research software **Findable** and **Accessible** can be fulfilled by archiving the software in a suitable archival repository. This is critical to ensure the long-term preservation and accessibility of the software. One recommended approach, as prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x), is to archive each release of your software on Zenodo.

::: warning
There is a webhook method that allows you to [automatically archive each GitHub release on Zenodo](https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content). However, please note that this method does not provide the DOI before the software is archived on Zenodo, meaning the DOI cannot be included in the software's metadata on GitHub beforehand. This does not align with the FAIR4RS Principle F3, which states: "Metadata should clearly and explicitly include the identifier of the software they describe."
:::

::: info
To archive your software on Zenodo, you will need to have a [license file](/docs/license.md) and [metadata files](/docs/metadata.md) (CITATION.cff and codemeta.json) in your repository.
:::

## How to make a FAIR release

To make a FAIR software release, you can simply click on the "Create release" button provided in the GitHub Issue Dashboard under the FAIR Software Release section. This will direct you to the Codefair's UI that takes you step by step into connecting to Zenodo, providing metadata required by Zenodo, making a release on GitHub, and archiving it on Zenodo.

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

After hitting the **Create Release** button (or its equivalent), Codefair automatically processes your release. This involves generating a DOI (Digital Object Identifier) through Zenodo for citation purposes, updating the metadata files (CITATION.cff and codemeta.json) with the new DOI, and finalizing the release both on GitHub and Zenodo. Once completed, Codefair informs you of the successful archival through your repository's GitHub issue, where you can track the entire Zenodo process.

## Workflow Diagram

![Zenodo Archive](/zenodo-diagram.png)
