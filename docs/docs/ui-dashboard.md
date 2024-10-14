---
lang: en-US
title: UI Dashboard
description: Understanding the UI Dashboard
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Understanding%20the%20UI%20Dashboard&app=codefair&org=fairdataihub
---

# :sparkles: Dashboard Overview

The Codefair app provides a UI dashboard to help manage the FAIR compliance of repositories.

## :busts_in_silhouette: Owner Dashboard

The UI dashboard shows a list of all the repositories that have installed the Codefair app. The dashboard provides a way to manage the FAIR compliance of the repositories. The dashboard is updated with each new commit to the main branch of the repositories.

![ui-dashboard](/ui-dashboard.png)

::: tip
Some repositories you installed Codefair to may not be listed on the dashboard if they have an action queued. This happens when Codefair is installed to more than 5 repositories at once. This helps prevent the Codefair app from mass opening issues on the repositories.
:::

## :card_file_box: Repository Selected

When you select a repository from the list, the dashboard will show the FAIR compliance of the selected repository. The dashboard will display a list of elements that make a software FAIR. A check mark is shown next to elements the software is complying with.

Below are some additional actions you can take on the selected repository:

### View the Repository on GitHub

Clicking the `View the repository on GitHub` button will take you to the repository on GitHub.

### Rerun all Codefair checks

Clicking the `Rerun all Codefair checks` button will rerun all the checks on the repository.

<!-- ### Rerun CWL Validation -->

<!-- Clicking the `Rerun CWL Validation` button will rerun the CWL validation on all the CWL files within the repository. -->

### View Codefair settings

Clicking the `View Codefair settings` button will take you to the GitHub settings page for managing the Codefair app.

![repository-selected](/repo-dashboard.png)
