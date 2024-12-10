---
lang: en-US
title: Metadata
description: Metadata
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Metadata&app=codefair&org=fairdataihub
---

# :label: Metadata

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), many principles state to include rich metadata following standard structure. This is critical to make software findable and reusable. One of the ways to achieve that prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) is to include a CITATION.cff and a codemeta.json metadata files.

::: info
Metadata checks are performed only when a LICENSE file is present in the repository.
:::

![Metadata Issue](/metadata-issue-dashboard.png)

## :hammer_and_wrench: How to fix the Metadata issue

To fix the Metadata issue, you can simply click on the `Add Metadata` (or `Edit Metadata` if both metadata files exist) button provided in the issue dashboard under the Metadata section.

This will direct you to the Codefair's metadata editor to review the metadata gathered by Codefair. Metadata is gathered from multiple sources that include:

- GitHub metadata of your repository provided by GitHub API.
- Existing metadata stored in our database.
- Existing CITATION.cff and codemeta.json files in your repository.

You can then edit the metadata as needed and save as a draft or push the changes into a pull request.

## :fountain_pen: Metadata Editor

The metadata editor UI is a user-friendly interface that allows you to generate both a CITATION.cff and a codemeta.json file within the same page in a simple and intuitive way.

The editor is broken into sections, each representing a different aspect of the metadata:

1. **General Information**: This section includes essential details about your repository, such as the title, description, and homepage URL. It helps users and other researchers understand the purpose of your software at a glance.
2. **Discoverability**: This section includes keywords, tags, and topics that make it easier for others to discover your repository in search results. These descriptors improve the visibility of your software across platforms like GitHub, Zenodo, and software registries.
3. **License**: This section includes the licensing information for your repository. It ensures that your software is properly licensed, making it clear how others can use, modify, and distribute it.
4. **Software Requirements**: This section specifies the technical requirements necessary for users to install and run your software successfully.
5. **Current Version**: This section tracks the version number, release date, and any associated release notes for your repository. It provides transparency about the most recent updates to your software, helping users stay informed about the latest changes and improvements.
6. **Additional Information**: This section is a flexible area where you can include any supplementary information that may not fit into the other categories. It can be used to note acknowledgments, special usage instructions, or links to external resources like documentation, publications, or datasets.
<!-- 7. **Editorial Review**: This section includes the status of the metadata and any comments from the editorial review. -->
7. **Authors and Contributors**: This section lists the authors, contributors, and collaborators involved in creating or maintaining the repository. It recognizes their work and gives proper attribution while making it clear who to contact for further inquiries or contributions.

When done, you can click on the `Save and push to repository` button and codefair will create a PR with corresponding CITATION.cff and codemeta.json files. The PR page will open automatically so you can quickly review and merge it. Alternatively, you can click on the `Save` button and come back to continue later on.

::: warning
To access the metadata editor, you will need to sign in using your GitHub account. We use [GitHub OAuth](./installation.md#oauth-sign-in-permissions) to authenticate users and provide access to the Codefair features.
:::

![Metadata Editor](/metadata-editor.png)
