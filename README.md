<div align="center">

<img src="https://freesvg.org/img/1653682897science-svgrepo-com.png" alt="logo" width="200" height="auto" />

<br />

<h1>Codefair Documentation</h1>

<p>
Documentation for the Codefair platform.
</p>

  <h4>
    <a href="https://docs.codefair.io/">docs.codefair.io</a>
  </h4>
  
<br />

<p>
  <a href="https://github.com/fairdataihub/codefair-docs/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/fairdataihub/codefair-docs.svg?style=flat-square" alt="contributors" />
  </a>
  <a href="https://github.com/fairdataihub/codefair-docs/stargazers">
    <img src="https://img.shields.io/github/stars/fairdataihub/codefair-docs.svg?style=flat-square" alt="stars" />
  </a>
  <a href="https://github.com/fairdataihub/codefair-docs/issues/">
    <img src="https://img.shields.io/github/issues/fairdataihub/codefair-docs.svg?style=flat-square" alt="open issues" />
  </a>
  <a href="https://github.com/fairdataihub/codefair-docs/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/fairdataihub/codefair-docs/issues/">Report Issues/Make suggestions</a>
  </h4>
</div>

<br />

---

## About

Codefair is a platform for that combines the power of GitHub apps and an intuitive UI to help making research software reusable and complying with the FAIR principles for Research Software (FAIR4RS Principles). This repository contains the developer and user documentation for the Codefair platform.

# :toolbox: Developer Instructions

## :bangbang: Prerequisites

This project uses `yarn` as the package manager. If you do not have `yarn` installed, you can install it with the following command:

```bash
npm install -g yarn
```

If you already have a conda environment on your machine, you can install the dependencies with:

```bash
conda install -c conda-forge yarn nodejs
```

## :running: Run Locally

Clone the project

```bash
git clone https://github.com/fairdataihub/codefair-docs.git
```

Install the dependencies

```bash
yarn install
```

Start the server

```bash
yarn dev
```

## :building_construction: Build Locally

Use this to build a local production version of the site. User `docs:serve` to preview the local build.

```bash
yarn docs:build
```

## :arrow_forward: Submitting a PR

If you are an external contributor, please make a fork of the repository and submit a PR from your fork.

1. Create a new branch from the `main` branch.
2. Make your changes. You can test your changes locally by running `yarn dev`. Make sure to check the console for any errors.
3. Test your changes on a local build by running `yarn build` and `yarn serve`. If this works, you can submit yout changes.
4. Push your changes to the remote branch.
5. Create a PR to merge your branch into `main`.

You can tag `@slugb0t` or `@megasanjay` in the PR on GitHub for a review. If your changes are approved, they will be merged into `main` and deployed to the live site.

## :triangular_flag_on_post: Deployment

You will not need to do anything to the hosted site. Continuous Delivery has been setup with Vercel. All you need to do is push your commit and wait for it to deploy.

## Contributing

<a href="https://github.com/fairdataihub/codefair-docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fairdataihub/codefair-docs" />
</a>

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by]. See [LICENSE](LICENSE.txt) for more information.

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png

[![CC BY 4.0][cc-by-image]][cc-by]

## Acknowledgements

This project is funded by the NIH under award number 1OT2OD032644. The content is solely the responsibility of the authors and does not necessarily represent the official views of the NIH.

---

<br />

<div align="center">

<a href="https://codefair.io">
  <img src="https://raw.githubusercontent.com/fairdataihub/codefair-app/main/ui/public/assets/images/codefair_logo.png" alt="logo" width="200" height="auto" />
</a>

</div>
