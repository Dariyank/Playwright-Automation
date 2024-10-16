import { defineConfig } from '@playwright/test';

export default defineConfig({
  testIgnore: ['**/test-assets/**', '**/objects/**'],
  testMatch: '**/*[a-z][a-zA-Z0-9]*.spec.js',
  projects: [
    {
      name: 'default',
      testMatch: '**/tests/**/*.spec.js',
    }
  ],
});