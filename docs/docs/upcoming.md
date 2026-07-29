---
lang: en-US
title: Upcoming Features
description: Upcoming Features
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Upcoming%20Features&app=codefair&org=fairdataihub
---

# :fast_forward: Upcoming Features

This section provides an overview of upcoming features that will be added to Codefair.

## :art: Code formatter {#code-formatter}

In the FAIR4RS Principles, principle R3 states "Software meets domain-relevant community standards". To comply with this principle, the FAIR-BioRS guidelines instruct to follow language-specific standards and best practices such as PEP 8 Style Guide for Python Code and Google’s R Style Guide for R code. Under this feature, we plan to configure Codefair to automatically detect programming languages in a repository and submit a pull request with a GitHub action configuration file that includes workflows for checking syntax and formatting. The action will check code files on every commit and submit a pull request to address any syntax or formatting issue. The feature will make use of existing tools such as [pycodestyle](https://github.com/PyCQA/pycodestyle).

## :memo: Automated CHANGELOG update {#automated-changelog-update}

In the FAIR4RS Principles, principle F1.2. states "Different versions of the software are assigned distinct identifiers". The FAIR Bio-RS guidelines instruct to document changes between each version of a software in a CHANGELOG file using plain text or markdown syntax following the “Keep a changelog” conventions for the content of the CHANGELOG file and the Semantic Versioning v2.0.0 for version numbers. Under this feature, Codefair will check compliance of the CHANGELOG with these instructions and also automatically update the CHANGELOG file based on the commit messages.

## :package: Wider archival and registry support

Codefair already supports [quick release and archiving on Zenodo](./archive.md) — you review your software information in the Codefair UI, and Codefair mints a DOI, updates your metadata files, creates the GitHub release, and archives it on Zenodo.

The FAIR-BioRS guidelines also recommend archiving on [Software Heritage](https://www.softwareheritage.org/) and registering biomedical software on [bio.tools](https://bio.tools/). We plan to extend the existing release workflow to cover both, so a single run through the Codefair release page keeps every registration up to date.

## And more!
