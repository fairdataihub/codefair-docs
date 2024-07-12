---
lang: en-US
title: Metadata
description: Metadata
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Metadata%20Issue&app=codefair&org=fairdataihub
---

# Metadata

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), many principles state to include rich metadata following standard structure. This is critical to make software findable and reusable. One of the ways to achieve that prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) is to include a CITATION.cff and a codemeta.json metadata files.

::: info
Metadata checks are performed only when a LICENSE file is present in the repository.
:::

## How to fix the Metadata issue

To fix the Metadata issue, you can simply click on the `Add Metadata` button provided in the Issue Dashboard under the Metadata section. This will direct you to the Codefair's metadata editor to review the metadata gathered from Probot. You can then edit the metadata as needed and save and push the changes. This will open a pull request in your repository with the updated metadata files. You can then review the changes and merge the pull request to resolve the Metadata issue.

![Metadata Issue](/metadata-issue-dashboard.png)
The image above demonstrates the Metadata issue in the Issue Dashboard.

## Metadata Editor

The metadata editor UI is a user-friendly interface that allows you to add a CITATION.cff and a codemeta.json file to your research software or edit them. The metadata initially displayed is what Codefair has gathered automatically from your repository (either from the GitHub metadata of your repository or existing metadata files). The editor is designed to help you input and update the metadata of your research software in a simple and intuitive way.

::: warning
To access the metadata editor, you will need to sign in using your GitHub account. We use GitHub OAuth to authenticate users and provide access to the Codefair features.
:::

The editor is broken into sections, each representing a different aspect of the metadata:

1. **General Information**: This section includes the title, description, and homepage of your repository.
2. **Discoverability**: This section includes the keywords and topics associated with your repository.
3. **License**: This section includes the license information for your repository.
4. **Software Requirements**: This section includes the software requirements for your repository.
5. **Current Version**: This section includes the version number and release date of your repository.
6. **Additional Information**: This section includes any additional information you would like to include in your metadata.
<!-- 7. **Editorial Review**: This section includes the status of the metadata and any comments from the editorial review. -->
7. **Authors and Contributors**: This section includes the authors and contributors of your repository.

When done, you can click on the `Save and push to repository` button and codefair will create a PR with corresponding CITATION.cff and codemeta.json files. The PR page will open automatically so you can quickly review and merge it. Alternatively, you can click on the `Save` button and come back to continue later on.

![Metadata Editor](/metadata-editor.png)
The image above demonstrates the metadata editor UI.
