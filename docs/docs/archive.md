---
lang: en-US
title: Software Archive
description: Software Archive
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Software%20Archive&app=codefair&org=fairdataihub
---

# :label: Software Archive

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), one of the principles states that research software should be archived in a trusted repository. This is critical to ensure the long-term preservation and accessibility of the software. One of the ways to achieve that prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) is to archive your software on Zenodo.

::: info
To archive your software on Zenodo, you will need to have a license file and metadata files (CITATION.cff and codemeta.json) in your repository.
:::

## How to archive your software

In the GitHub issue that Codefair opens in your repository, you'll find a button that directs you to the Codefair website for archiving your software (Zenodo is currently supported). Alternatively, after signing in with your GitHub account on the Codefair website, you can visit the dashboard to archive your repository.

![Software Archive](/zenodo-dashboard.png)

## Zenodo Archive

The Zenodo archive UI is a user-friendly interface that allows you to archive your research software. The archive initially displayed is what Codefair has gathered automatically from your repository using your metadata files (CITATION.cff and codemeta.json). The editor is designed to help you input and update the metadata of your research software in a simple and intuitive way. The Zenodo archive UI is broken into sections, each representing a different aspect of the metadata:

![Zenodo Archive](/zenodo-workflow.png)

1. **Confirm required metadata**: This section includes the metadata required by Zenodo to archive your software. It ensures that your software is properly described, making it clear how others can access and cite it.

2. **Check Zenodo Connection**: This section checks if Codefair is connected to your Zenodo account. If not, you can connect your Zenodo account to Codefair with OAuth to authenticate users and provide access to the Codefair features. The permissions needed to authorize include:

   - **Deposit**: Allow upload (but not publishing).
   - **Allow publishing of uploads**: This permission is required to publish the archived software on Zenodo.

3. **Select the Zenodo record**: You can select an existing Zenodo record to update or create a new one.

4. **Zenodo Metadata**: Currently the Zenodo archive requests the following metadata: - **Access Right**: The access rights of the software. - **Version**: The version of the software, we recommend using [Semantic Versioning](https://semver.org/). This version will be different than the GitHub release version unless they are the same.

5. **Create a GitHub draft release**: You will have the option to create or select a draft GitHub release, where you can upload executable files, documentation, and other resources that make your software reusable. These assets will then be uploaded to Zenodo and linked to the archive.

6. **Publish Zenodo release**: After confirming that your GitHub draft release is ready, you can publish the Zenodo release. This step initiates the Zenodo workflow, where metadata files are updated, and assets are uploaded to Zenodo.

Once the process is complete, you will return to your repository's dashboard, where you can monitor the status of the Zenodo archive. The progress of the Zenodo workflow can also be tracked through your repository’s GitHub issue.
