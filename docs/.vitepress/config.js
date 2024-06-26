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
        { icon: 'github', link: 'https://github.com/fairdataihub' },
      ],

      nav: [
        {
          text: 'Codefair UI',
          link: '/docs/intro.md',
        },
        {
          text: 'Developer Guide',
          link: '/app/intro.md',
        },
      ],

      sidebar: {
        '/app': appSidebarGuide(),
        '/docs': portalSidebarGuide(),
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present | fairdataihub',
      },
    },
  }),
);

function appSidebarGuide() {
  return [
    {
      text: 'Getting Started',
      collapsible: true,
      items: [{ text: 'What is the Codefair App?', link: '/app/intro.md' }],
    },
  ];
}

function portalSidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [{ text: 'What is Codefair?', link: '/docs/intro.md' }],
    },
    {
      text: 'Codefair App',
      collapsible: true,
      items: [
        { text: 'GitHub Issue Dashboard', link: '/docs/github-issue.md' },
        { text: 'LICENSE Check', link: '/docs/license-issue.md' },
        { text: 'Metadata Checks', link: '/docs/metadata-issue.md' },
      ],
    },
    {
      text: 'Codefair UI',
      collapsible: true,
      items: [
        { text: 'LICENSE Editor', link: '/docs/license-editor.md' },
        { text: 'Metadata Editor', link: '/docs/metadata-editor.md' },
      ],
    },
  ];
}
