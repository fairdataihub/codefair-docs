---
lang: en-US
title: Upcoming Features
description: Upcoming Features
head:
  - - meta
    - name: og:image
      content: https://kalai.fairdataihub.org/api/generate?title=Codefair%20Documentation&description=Upcoming%20Features&app=codefair&org=fairdataihub
---

# Upcoming Features

This section provides an overview of upcoming features that will be added to Codefair.

## Code formatter

In the FAIR4RS Principles, principle R3 states "Software meets domain-relevant community standards". To comply with this principle, the FAIR-BioRS guidelines instruct to follow language-specific standards and best practices such as PEP 8 Style Guide for Python Code and Google’s R Style Guide for R code. Under this feature, we plan to configure Codefair to automatically detect programming languages in a repository and submit a pull request with a GitHub action configuration file that includes workflows for checking syntax and formatting. The action will check code files on every commit and submit a pull request to address any syntax or formatting issue. The feature will make use of existing tools such as [pycodestyle](https://github.com/PyCQA/pycodestyle).

## Automated CHANGELOG update

In the FAIR4RS Principles, principle F1.2. states "Different versions of the software are assigned distinct identifiers". The FAIR Bio-RS guidelines instruct to document changes between each version of a software in a CHANGELOG file using plain text or markdown syntax following the “Keep a changelog” conventions for the content of the CHANGELOG file and the Semantic Versioning v2.0.0 for version numbers. Under this feature, Codefair will check compliance of the CHANGELOG with these instructions and also automatically update the CHANGELOG file based on the commit messages.

## Quick release and archiving

To make software compliant with the the FAIR4RS Principles, the FAIR-BioRS guidelines instruct to include serveral metadata files such as README.md, CHANGELOG.md, CITATION.cff, and codemeta.json. The guidelines also instruct to archive each version of a software on Zenodo and Software Heritage, and register it on bio.tools. This requires several actions for each release of a new version of a software. For instance, for each new version release it is necessary to update the release date, authors, and version number in the CHANGELOG.md, CITATION.cff, and codemeta.json files. More information needs to be specified on Zenodo and Software Heritage during archiving and on bio.tools during subsequent registration of the new version. It is also required to get the Zenodo DOI for the new version and update it in all the metadata files before the release. Making a release of a software version while keeping it FAIR can thus become inconvenient. Under this feature, we plan to include support for simplyfing the release of a new version of a software. During a release, users will only have to review and update the software information through the Codefair UI, where some will be pre-populated automatically, and initiate the release. Then, Codefair will get a Zenodo DOI, update all the metadata files, create a GitHub release of the software, archive it on Zenodo and Software Heritage, and update its bio.tools registration.

## And more!
