import { SearchPlugin } from 'vitepress-plugin-search';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@braintree/sanitize-url', 'mermaid', 'dayjs'],
  },
  plugins: [
    SearchPlugin({
      buttonLabel: 'Search',
      placeholder: 'Search docs',
      tokenize: 'full',
    }),
  ],
  resolve: {
    alias: {
      dayjs: 'dayjs/',
    },
  },
});
