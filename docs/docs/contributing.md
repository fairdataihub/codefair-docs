---
lang: en-US
title: Contributing
description: Contributing
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Contributing&app=codefair&org=fairdataihub
---

# :memo: Contributing

A Contributing guide helps new collaborators understand how to propose changes, report issues, and submit improvements. Codefair verifies that your repository contains a `CONTRIBUTING.md` file (at the root, in `.github`, or in `docs`) to streamline contributions and maintain quality.

## :hammer: How to fix the Contributing issue

If Codefair does not detect a contributing file, it will flag a compliance issue on the dashboard. To resolve:

- Click on the **Add Contributing** (or **Edit Contributing** if a file already exists) button in the issue dashboard.
- The Contributing editor UI will open, allowing you to select a contributing template provided by [nayafia/contributing-template](https://github.com/nayafia/contributing-template)
- Review and customize the instructions to match your project's needs.
- Click **Save and push contributing to repository** to create a pull request.
- Review and merge the PR on GitHub (or click Save Draft to continue editing later).

::: info
This file is not mandatory, but highly recommended. You will still be able to make FAIR Archival releases without it.
:::

## :memo: Contributing template

Codefair provides a single template based on the [nayafia/contributing-template](https://github.com/nayafia/contributing-template). It covers commons sections such as:

- Reporting bugs
- Suggesting enchancements
- Style guidelines
- Pull request process

Feel free to remove sections you don't need or add project-specific instructions.

## :fountain_pen: Contributing editor UI

The editor UI lets you:

- Use a template or create your own custom Contributing guide.
- Preview how the file will appear on GitHub.
- Edit the contents directly in the browser.
- Save & push to create a pull request, or Save Draft to continue later.

::: warning
You must be signed in with your GitHub account to access the Contributing editor. Codefair uses [GitHub OAuth](installation.md#key-oauth-sign-in-permissions) to sign into Codefair.
:::
