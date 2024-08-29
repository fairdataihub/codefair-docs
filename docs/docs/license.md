---
lang: en-US
title: LICENSE
description: LICENSE
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=LICENSE&app=codefair&org=fairdataihub
---

# :page_facing_up: LICENSE

In the [FAIR4RS Principles](https://doi.org/10.1038/s41597-022-01710-x), principle R1.1 states "Software is given a clear and accessible license". This is critical because without a license, a software cannot be legally reused. To comply with this principle, the [FAIR-BioRS guidelines](https://doi.org/10.1038/s41597-023-02463-x) instruct to include a LICENSE file with license terms.

## How to fix the LICENSE issue

The Codefair issue dashboard will show a compliance issue with the license requirement if no file named "LICENSE", "LICENSE.txt" or "LICENSE.md" is found in at the root of the repository. To fix the LICENSE issue, you can simply click on the `Add License` button provided in the issue dashboard. You will be directed to the Codefair's license editor UI where you will be able to select a license, review/edit the license terms, and submit a PR for adding a LICENSE file to your repository. Details about Codefair's license editor UI are provided below.

![LICENSE Issue](/license-issue-dashboard.png)
The image above demonstrates the LICENSE issue in the issue dashboard.

## License editor UI

The license editor UI is a user-friendly interface that allows you to add a license to your research software or edit it. The license editor provides you with a list of common licenses that you can choose from. Once selected, the license content is displayed in the editor allowing you to review and update the license text, if needed. You can then click on the `Save and push license to repository` button and codefair will create a PR with a corresponding LICENSE file. The PR page will open automatically so you can quickly review and merge it. Alternatively, you can click on the `Save` button and come back to continue later on.

::: warning
To access the license editor, you will need to sign in using your GitHub account. We use GitHub OAuth to authenticate users and provide access to the Codefair features.
:::

![License Editor](/license-editor.png)
The image above demonstrates the license editor UI. A license is selected from the dropdown list, and the license text is displayed in the editor. The license text is displayed in the preview section to help you understand how the license will be displayed in your repository.
