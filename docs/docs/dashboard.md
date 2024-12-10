---
lang: en-US
title: GitHub Issue Dashboard
description: Understanding the GitHub Issue Dashboard
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Understanding%20the%20GitHub%20Issue%20Dashboard&app=codefair&org=fairdataihub
---

# :memo: GitHub Issue Dashboard

As soon as you install the Codefair app, it opens a GitHub issue in your repository. This issue contains a dashboard that provides a point-by-point overview of your software's compliance with elements that make a software FAIR.

The dashboard is updated with certain events that trigger a check on the repository. These events include:

- Each new commit to the main branch
- Codefair opens a pull request for you
- A release to GitHub and archive to Zenodo is made **using** Codefair

A check mark is shown next to elements your software is complying with (e.g., the dashboard in screenshot below shows that the software has a LICENSE file). A red cross is shown next to the elements that are not complied with yet (e.g., the dashboard in screenshot below shows that the software does not have required metadata files). For such elements, there is a button that takes you to the Codefair website where you can easily address the compliance issue through a convenience user interface.

::: warning
If you close the issue, Codefair will deactivate until you reopen the issue but if you delete the issue, you will need to reinstall Codefair to that repository.
:::

![GitHub Issue Dashboard](/dashboard-metadata.png)
The image above shows a Codefair issue dashboard.
