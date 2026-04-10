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

## :white_check_mark: About Metadata Validation

When a `codemeta.json` or `CITATION.cff` file is detected in your repository, Codefair automatically validates each file
to ensure it conforms to its respective standard. The validation results are reflected in the issue dashboard.

### `codemeta.json` Validation

Codemeta.json files are validated against their declared schema version. Codefair supports both **Codemeta v2.0** and
**Codemeta v3.0**, detected automatically from the `@context` field in your file:

- `https://doi.org/10.5063/schema/codemeta-2.0` → validated against the Codemeta 2.0 JSON Schema
- `https://w3id.org/codemeta/3.0` → validated against the Codemeta 3.0 JSON Schema

If the `@context` field is missing or does not match a supported version, the file is flagged as invalid.

If any required fields are missing or malformed, the issue dashboard will display a specific validation error message describing the problem.

### `CITATION.cff` Validation

CITATION.cff files are validated using [cffconvert](https://github.com/citation-file-format/cffconvert), a dedicated
tool for the Citation File Format. Codefair passes your file to `cffconvert` for validation and surfaces any errors
directly in the issue dashboard.

Common validation errors include missing required fields (such as `title` or `authors`), incorrect YAML formatting, or
values that don't match the CFF schema.

::: tip
You can use the Codefair [metadata editor](#fountain_pen-metadata-editor) to generate valid `codemeta.json` and
`CITATION.cff` files as it enforces the required structure automatically, reducing the chance of validation errors.
:::
