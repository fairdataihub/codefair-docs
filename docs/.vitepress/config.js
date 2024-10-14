import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
  defineConfig({
    lang: 'en-US',
    title: 'Codefair Documentation',
    description: 'Documentation for the Codefair platform',
    titleTemplate: 'Codefair',
    port: 3000,

    appearance: true,
    lastUpdated: true,
    ignoreDeadLinks: false,

    markdown: {
      lineNumbers: true,
    },

    mermaid: {},

    head: [
      [
        'link',
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'apple-touch-icon.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',

          href: 'favicon.ico',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'favicon-32x32.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: 'favicon-16x16.png',
        },
      ],
      ['link', { rel: 'manifest', href: 'site.webmanifest' }],
      [
        'link',
        {
          rel: 'mask-icon',
          href: 'safari-pinned-tab.svg',
          color: '#3a0839',
        },
      ],
      ['link', { rel: 'shortcut icon', href: 'favicon.ico' }],
      ['meta', { name: 'msapplication-TileColor', content: '#3a0839' }],
      [
        'meta',
        {
          name: 'msapplication-config',
          content: 'browserconfig.xml',
        },
      ],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
      // [
      //   'script',
      //   {
      //     src: 'https://umami.fairdataihub.org/mushroom',
      //     crossorigin: 'anonymous',
      //     async: true,
      //     defer: true,
      //     'data-website-id': '55e27271-19cf-40c3-b4fa-8951322298b4',
      //   },
      // ],
    ],

    themeConfig: {
      editLink: {
        pattern:
          'https://github.com/fairdataihub/codefair-docs/edit/main/docs/:path',
        text: 'Edit this page on GitHub',
      },

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/fairdataihub/codefair-app',
        },
      ],

      nav: [
        {
          text: 'Codefair UI',
          link: '/docs/intro.md',
        },
        {
          text: 'Developer Guide',
          link: '/dev/intro.md',
        },
        {
          text: 'Contact Us',
          link: 'https://tally.so/r/3E0dao',
        },
      ],

      sidebar: {
        '/dev': appSidebarGuide(),
        '/docs': portalSidebarGuide(),
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present | fairdataihub',
      },
    },
  }),
);

// Developer Guide Sidebar
function appSidebarGuide() {
  return [
    {
      text: 'Getting Started',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/dev/intro.md' },
        { text: 'Running Locally', link: '/dev/running-locally.md' },
      ],
    },
    {
      text: 'Adding a New Feature',
      collapsible: true,
      items: [
        { text: 'Bot Feature', link: '/dev/bot.md' },
        { text: 'UI Page', link: '/dev/ui.md' },
      ],
    },
  ];
}

// User guide sidebarq
function portalSidebarGuide() {
  return [
    {
      text: 'Getting Started',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/docs/intro.md' },
        { text: 'About Codefair', link: '/docs/about.md' },
        { text: 'Installation', link: '/docs/installation.md' },
      ],
    },
    {
      text: 'Codefair App',
      collapsible: true,
      items: [
        { text: 'GitHub Issue Dashboard', link: '/docs/dashboard.md' },
        { text: 'UI Dashboard', link: '/docs/ui-dashboard.md' },
        { text: 'Overview of Features', link: '/docs/features.md' },
        { text: 'LICENSE', link: '/docs/license.md' },
        { text: 'Metadata', link: '/docs/metadata.md' },
        { text: 'CWL Validation', link: '/docs/cwl.md' },
        { text: 'Software Archival', link: '/docs/archive.md' },
      ],
    },
    {
      text: 'Resources',
      collapsible: true,
      items: [
        { text: 'Upcoming Features', link: '/docs/upcoming.md' },
        { text: 'Contributing', link: '/docs/contributing.md' },
      ],
    },
  ];
}
