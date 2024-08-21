import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // or 'jsdom' for frontend tests
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
