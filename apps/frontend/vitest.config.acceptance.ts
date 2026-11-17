import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'acceptance',
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts'],
    exclude: [...configDefaults.exclude],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
});
