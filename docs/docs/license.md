---
lang: en-US
title: LICENSE
description: LICENSE
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=LICENSE&app=codefair&org=fairdataihub
---

# LICENSE

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), principle R1.1 states "Software is given a clear and accessible license". This is critical because without a license, a software cannot be legally reused. To comply with this principle, the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) instruct to include a LICENSE file with license terms.

![LICENSE Issue](/license-issue-dashboard.png)

## How Codefair detects your license

Codefair asks GitHub to identify your license first. GitHub uses [licensee](https://github.com/licensee/licensee), the same engine that powers the license label shown at the top of every repository page. Licensee finds the license file under any of the conventional names it recognises and compares its text against the [SPDX license list](https://spdx.org/licenses/) to work out which license it is.

If licensee cannot classify anything, Codefair falls back to looking for a license-shaped file at the root of your repository under one of these names:

| Fallback filename |
| :---------------- |
| `LICENSE`         |
| `LICENSE.md`      |
| `LICENSE.txt`     |
| `COPYING`         |
| `COPYING.LESSER`  |

A file found only through this fallback is treated as a **custom license**, because Codefair knows a license exists but not which one it is.

## How to fix the LICENSE issue

The Codefair issue dashboard will show a compliance issue with the license requirement if no license file can be found at all. To fix the LICENSE issue, you can simply click on the `Add License` (or `Edit License` if a license exists already) button provided in the issue dashboard. You will be directed to Codefair's license editor UI where you will be able to select a license, review/edit the license terms, and submit a PR for adding a LICENSE file to your repository. Details about Codefair's license editor UI are provided below.

## Custom Licences {#custom-licences}

If GitHub cannot determine an SPDX license ID, Codefair classifies your license as a **custom license**. This also happens when you modify the text of a standard license. Codefair compares your file against what it recorded previously, and meaningful changes cause it to ask you to confirm the license again rather than silently keeping the old identifier.

A custom license still counts as having a license: your dashboard shows ❗ ("needs verification") rather than ❌, and once you give it a title through the license editor it shows ✔️. You can also use the editor to replace it with one of the licenses from the SPDX list.

::: warning
**A custom license blocks archiving on Zenodo.** Zenodo's API only accepts licenses it can match to a known identifier, so the **Create release** button is disabled while your license is marked as custom, and the release page shows "Cannot publish to Zenodo with a custom license".

If you want to archive your software and mint a DOI, select a standard SPDX license in the license editor. If you must keep a custom license, you can still archive manually through Zenodo's own website.
:::

## License editor UI {#license-editor-ui}

The license editor UI is a user-friendly interface that allows you to add a license to your research software or edit it. The license editor provides you with a list of common licenses that you can choose from. Once selected, the license content is displayed in the editor allowing you to review and update the license text, if needed. You can then click on the `Save and push license to repository` button and codefair will create a PR with a corresponding LICENSE file. The PR page will open automatically so you can quickly review and merge it. Alternatively, you can click on the `Save` button and come back to continue later on.

::: warning
To access the license editor, you will need to sign in using your GitHub account. We use [GitHub OAuth](installation.html#oauth-sign-in-permissions) to authenticate users and provide access to the Codefair features.
:::

![License Editor](/license-editor.png)
The image above demonstrates the license editor UI. A license is selected from the dropdown list, and the license text is displayed in the editor. The license text is displayed in the preview section to help you understand how the license will be displayed in your repository.
