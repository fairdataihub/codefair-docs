import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@braintree/sanitize-url', 'mermaid', 'dayjs'],
  },
  plugins: [],
  resolve: {
    alias: {
      dayjs: 'dayjs/',
    },
  },
});
