---
lang: en-US
title: CWL Validation
description: Overview of the CWL Validation Feature
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=CWL%20Validation&app=codefair&org=fairdataihub
---

# CWL Validation

This section provides an overview of the CWL Validation feature of Codefair.

## What is CWL Validation?

The Common Workflow Language (CWL) is a specification for describing analysis workflows and tools in a way that makes them portable and scalable across a variety of software and hardware environments, from workstations to cluster, cloud, and high-performance computing (HPC) environments. The CWL standard is designed to meet the needs of data-intensive science, such as Bioinformatics, Medical Imaging, Astronomy, Physics, and Chemistry. CWL is developed by the [Common Workflow Language working group](https://www.commonwl.org/).

The CWL Validation feature of Codefair checks whether the CWL files in your repository are compliant with the CWL standard. Codefair searches your repository for every file ending in `.cwl`, wherever it lives in the directory tree, and validates each one with [cwltool](https://cwltool.readthedocs.io/en/stable/) using its [`--validate` mode](https://cwltool.readthedocs.io/en/stable/cli.html#cmdoption-cwltool-validate). The results are written to the CWL section of your issue dashboard and to a detailed results page in the Codefair web app.

Validation happens on Codefair's servers. **Nothing is added to your repository**. Codefair does not commit a GitHub Actions workflow, and it does not open a pull request for CWL. Your files are only ever read.

::: tip
If your repository contains no `.cwl` files, the CWL section is left off your dashboard entirely rather than shown as a failure. CWL is a language-specific standard, so it is only reported for the projects it applies to.
:::

::: info
The repository-wide scan for `.cwl` files runs during full Codefair checks rather than on every single push. If you have just added your first CWL file and don't see the section yet, use **Rerun CWL Validation** from the repository page in the Codefair dashboard.
:::

## CWL Issue Dashboard

The CWL section on the GitHub issue dashboard appears under **Language Specific Standards** and summarises the validation of your repository. It shows a ✔️ when every CWL file is valid and a ❗ when one or more are not, along with a count (for example, "2/5 CWL file(s) in your repository are not valid"). A collapsible summary table lists each file and its individual result, and a **View CWL Report** button links to the full results page.

![CWL Issue Dashboard](/cwl-dashboard.png)

## CWL Validation Results

The CWL validation results page shows the details of each file that was checked. Every file is listed with its status, the date it was last validated, a **View file** link back to that file on GitHub, and, when validation failed, the full message produced by `cwltool` so you can see exactly which line caused the problem.

You can re-run the validation at any time using the **Rerun CWL Validation** button on the repository page. This may take a few minutes for repositories with many workflows, and progress is shown while it runs.

![CWL Validation Results](/cwl-results-ui.png)
