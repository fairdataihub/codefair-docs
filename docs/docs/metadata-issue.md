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

To fix the Metadata issue, you can simply click on the button provided in the Issue Dashboard under the Metadata section. This will direct you to the Codefair UI to review the metadata gathered from Probot. You can then edit the metadata as needed and save and push the changes. This will open a pull request in your repository with the updated metadata files. You can then review the changes and merge the pull request to resolve the Metadata issue.

![Metadata Issue](/metadata-issue-dashboard.png)
The image above demonstrates the Metadata issue in the Issue Dashboard.
