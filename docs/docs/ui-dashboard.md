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

## :computer: Dashboard

The main UI dashboard provides a list of all the organizations and accounts that have installed the Codefair app. The dashboard provides a way to manage the FAIR compliance of repositories across all the organizations and accounts.

![main-dashboard](/main-dashboard.png)

## :busts_in_silhouette: Repo Dashboard

The UI dashboard shows a list of all the repositories that have installed the Codefair app. The dashboard provides a way to manage the FAIR compliance of the repositories and displays the latest commit made to the main branch of the repository.

![ui-dashboard](/ui-dashboard.png)

::: tip
Some repositories you installed Codefair to may not be listed on the dashboard if they have an action queued. This happens when Codefair is installed to more than 5 repositories at once. This helps prevent the Codefair app from mass opening issues on the repositories. The action will count down when events are triggered on the repositories eventually showing the repository on the dashboard.
:::

## :card_file_box: Repository Selected {#repository-selected}

When you select a repository from the list, the dashboard will show the FAIR compliance of the selected repository. The dashboard will display a list of elements that make a software FAIR. A check mark is shown next to elements the software is complying with.

Each element appears as its own card, in this order:

| Card                      | What it covers                                                           |
| :------------------------ | :----------------------------------------------------------------------- |
| **README**                | Whether a README was found, and a link to edit it.                       |
| **License**               | The detected license, or a prompt to add one. Flags custom licenses.     |
| **Code Metadata**         | `CITATION.cff` and `codemeta.json` status. Waits until a license exists. |
| **FAIR Software Release** | Your published DOI, or a button to create a release.                     |
| **CWL Validation**        | Results for `.cwl` files, when your repository has any.                  |
| **Code of Conduct**       | Whether a code of conduct was found, and a link to edit it.              |
| **Contributing**          | Whether a contributing guide was found, and a link to edit it.           |

For an explanation of what the symbols mean and why some cards wait for others, see [How Codefair Assesses FAIRness](./fairness-assessment.md).

Below are some additional actions you can take on the selected repository:

### View the Repository on GitHub

Clicking the `View the repository on GitHub` button within the `Settings` dropdown will take you to the repository on GitHub.

### Rerun all Codefair checks

Clicking the `Rerun all Codefair checks` button within the `Settings` drodown will rerun all the checks on the repository.

### Rerun CWL Validation

Clicking the `Rerun CWL Validation` button will rerun the CWL validation on all the CWL files within the repository. **Only available if the repository contains CWL files.**

### Rerun Metadata Validation

To rerun the metadata validation on a repository, locate the icon with three vertically-stacked dots next to the status badges of your metadata. Hovering over this icon will display a dropdown menu with the button `Rerun Metadata Validation`. Selecting this option will erase any metadata drafts saved on Codefair. **Only available if the repository contains a license file.**

### Rerun License Validation

To rerun the license validation on a repository, locate the icon with three vertically-stacked dots next to the status badges of your license. Hovering over this icon will display a dropdown menu with the button `Rerun License Validation`. Selecting this option will erase any license drafts saved on Codefair. **Only available if the repository contains a license file.**

### Re-fetch a file's content

The README, Contributing, and Code of Conduct cards each have their own three-dot menu with a **Re-fetch content** option. This pulls the current version of that file from your repository into Codefair, which is useful if you edited the file directly on GitHub and want the Codefair editor to catch up.

::: warning
Re-fetching replaces any unsaved draft you have stored in Codefair for that file.
:::

### View Codefair settings

Clicking the `View Codefair settings` button will take you to the GitHub settings page for managing the Codefair app.

![repository-selected](/repo-dashboard.png)

## :hourglass_flowing_sand: What happens when a check re-runs

When you trigger any of the re-runs above, Codefair opens a progress window and reports each step as it happens, so you can see what it is doing rather than waiting on a spinner. Larger repositories, particularly those with many CWL files, can take a few minutes.

When the run finishes, the window confirms completion and the cards update with the new results. The GitHub issue dashboard is refreshed at the same time, so both views stay in sync.
