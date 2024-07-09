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

The Metadata issue occurs when a CITATION.cff or codemeta.json file is not present in the repository. Metadata is essential for enhancing the discoverability and reusability of your research software. These files provide crucial information about your software, including the authors, title, and license details. This information is important for users who want to cite your research software or reuse it in their own projects.

By adding a CITATION.cff and codemeta.json file to your repository, you can help make your research software more discoverable and reusable. By adding metadata to your repository, you can help make your research software more FAIR and more compliant with the FAIR4RS principles.

::: info
Metadata checks are performed only when a LICENSE file is present in the repository.
:::

## How to fix the Metadata issue

To fix the Metadata issue, you can simply click on the `Add Metadata` button provided in the Issue Dashboard under the Metadata section. This will direct you to the Codefair's metadata editor to review the metadata gathered from Probot. You can then edit the metadata as needed and save and push the changes. This will open a pull request in your repository with the updated metadata files. You can then review the changes and merge the pull request to resolve the Metadata issue.

![Metadata Issue](/metadata-issue-dashboard.png)
The image above demonstrates the Metadata issue in the Issue Dashboard.

## Metadata Editor

The metadata editor is a user-friendly interface that allows you to edit the metadata of your research software. The metadata initially displayed is what Probot has gathered from your repository. The editor is designed to help you input and update the metadata of your research software in a simple and intuitive way.

The editor is broken into sections, each representing a different aspect of the metadata:

1. **General Information**: This section includes the title, description, and homepage of your repository.
2. **Discoverability**: This section includes the keywords and topics associated with your repository.
3. **License**: This section includes the license information for your repository.
4. **Software Requirements**: This section includes the software requirements for your repository.
5. **Current Version**: This section includes the version number and release date of your repository.
6. **Additional Information**: This section includes any additional information you would like to include in your metadata.
<!-- 7. **Editorial Review**: This section includes the status of the metadata and any comments from the editorial review. -->
7. **Authors and Contributors**: This section includes the authors and contributors of your repository.

![Metadata Editor](/metadata-editor.png)
The image above demonstrates the Metadata Editor in the Codefair UI.
