---
lang: en-US
title: Metadata
description: Metadata
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Metadata&app=codefair&org=fairdataihub
---

# Metadata

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), many principles state to include rich metadata following standard structure. This is critical to make software findable and reusable. One of the ways to achieve that prescribed by the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) is to include a CITATION.cff and a codemeta.json metadata files.

::: info
Metadata checks are performed only when a LICENSE file is present in the repository.
:::

![Metadata Issue](/metadata-issue-dashboard.png)

## How to fix the Metadata issue

To fix the Metadata issue, you can simply click on the `Add Metadata` (or `Edit Metadata` if both metadata files exist) button provided in the issue dashboard under the Metadata section.

This will direct you to the Codefair's metadata editor to review the metadata gathered by Codefair. Metadata is gathered from multiple sources that include:

- GitHub metadata of your repository provided by GitHub API.
- Existing metadata stored in our database.
- Existing CITATION.cff and codemeta.json files in your repository.

You can then edit the metadata as needed and save as a draft or push the changes into a pull request.

## Metadata Editor {#metadata-editor}

The metadata editor UI is a user-friendly interface that allows you to generate both a CITATION.cff and a codemeta.json file within the same page in a simple and intuitive way.

The editor is broken into collapsible sections, each representing a different aspect of the metadata. A sidebar lists every section with a status dot (green when it is complete, orange when something is still missing, red when a field needs fixing) and tracks how many of the required sections you have finished.

| Section                    | Required | What goes here                                                                                     |
| :------------------------- | :------- | :------------------------------------------------------------------------------------------------- |
| **Basic Information**      | Yes      | Software name and description, plus creation and first release dates.                              |
| **Authors & Contributors** | Yes      | Everyone involved, with affiliation, email, and ORCID, and the roles they played.                  |
| **Discoverability**        | Yes      | Keywords, application category, a unique identifier such as a DOI, and funding details.            |
| **Development Community**  | No       | Links to your code repository, issue tracker, continuous integration, and related resources.       |
| **Software Requirements**  | Yes      | Programming languages, runtime platform, and supported operating systems.                          |
| **Current Version**        | No       | Version number, release date, download URL, and release notes.                                     |
| **Additional Information** | No       | Development status, and whether this software is part of, or the source code of, something larger. |

::: tip
Codefair pre-fills much of this from your repository (languages, contributors, repository URL, and existing releases), so in most cases you are reviewing and correcting rather than typing everything from scratch. If a required field is missing when you try to save, the editor jumps you to the section that needs attention.
:::

Licensing is **not** part of this editor. Codefair fills the license field of both files from the license already detected on your repository, so you manage it in one place: the [license editor](./license.md#license-editor-ui).

When done, you can click on the `Save and push to repository` button and codefair will create a PR with corresponding CITATION.cff and codemeta.json files. The PR page will open automatically so you can quickly review and merge it. Alternatively, you can click on the `Save draft` button and come back to continue later on.

::: warning
To access the metadata editor, you will need to sign in using your GitHub account. We use [GitHub OAuth](./installation.md#oauth-sign-in-permissions) to authenticate users and provide access to the Codefair features.
:::

![Metadata Editor](/metadata-editor.png)

## About Metadata Validation {#about-metadata-validation}

When a `codemeta.json` or `CITATION.cff` file is detected in your repository, Codefair automatically validates each file
to ensure it conforms to its respective standard. The validation results are reflected in the issue dashboard, and you
can open the dedicated **View Metadata Validation** page from the Codefair UI dashboard (via the **View Validations**
badge in the Metadata section) to review the per-file status and detailed error messages.

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
You can use the Codefair [metadata editor](#metadata-editor) to generate valid `codemeta.json` and
`CITATION.cff` files as it enforces the required structure automatically, reducing the chance of validation errors.
:::
