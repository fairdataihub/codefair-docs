---
lang: en-US
title: README.md
description: README.md
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=README.md&app=codefair&org=fairdataihub
---

# :book: README

A README file provides an introduction to your project, helping users understand its purpose, installation steps, usage examples, and more. Codefair checks for a `README.md`, `README.txt` or `README` (at the root, in `.github`, or in `docs`) to ensure clear project documentation.

## :hammer: How to fix the README issue

If Codefair does not detect a README file, it will flag a compliance issue on the dashboard. To resolve:

- Click on the **Add README** (or **Edit README** if a file already exists) button in the issue dashboard.
- The README editor UI will open.
- Write or update your project overview, installation instructions, usage examples, and any other relevant information.
- Click **Save and push README to repository** to create a pull request.
- Review and merge the PR on GitHub (or click Save Draft to continue editing later).

::: info
A well-written README file is highly recommended to guide users and contributors. Though it is not strictly require for FAIR Archival releases.
:::

## :memo: Recommended Sections

While there is no default template, a comprehensive README file often includes:

- Project name and description
- Table of contents (for longer docs)
- Installation instructions
- Usage examples
- Contribution guidelines
- License and authorship
- Support or contact information

Feel free to tailor these sections to your project's needs.

## :fountain_pen: README editor UI

The editor UI lets you:

- Write content from scratch.
- Preview how the markdown formatting will render on GitHub.
- Edit the contents directly in the browser.
- Save & push to create a pull request, or Save Draft to continue later.

::: warning
You must be signed in with your GitHub account to access the README editor. Codefair uses [GitHub OAuth](installation.md#key-oauth-sign-in-permissions) to sign into Codefair.
:::
