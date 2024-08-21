---
lang: en-US
title: CWL Validation
description: Overview of the CWL Validation Feature
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=CWL%20Validation&app=codefair&org=fairdataihub
---

# :sparkles: CWL Validation

This section provides an overview of the CWL Validation feature of Codefair.

## What is CWL Validation?

The Common Workflow Language (CWL) is a specification for describing analysis workflows and tools in a way that makes them portable and scalable across a variety of software and hardware environments, from workstations to cluster, cloud, and high-performance computing (HPC) environments. The CWL standard is designed to meet the needs of data-intensive science, such as Bioinformatics, Medical Imaging, Astronomy, Physics, and Chemistry. CWL is developed by the [Common Workflow Language working group](https://www.commonwl.org/).

The CWL Validation feature of Codefair will check if the CWL files in a repository are compliant with the CWL standard. The feature will automatically detect CWL files in a repository and submit a pull request with a GitHub action configuration file that includes workflows for checking the syntax and structure of the CWL files. The action will check CWL files on every commit and submit a pull request to address any syntax or structure issue. The feature will make use of existing tools such as [cwltool](https://cwltool.readthedocs.io/en/stable/) and [CWL command line validator](https://cwltool.readthedocs.io/en/stable/cli.html#cmdoption-cwltool-validate).
