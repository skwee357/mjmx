import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@mjmx/core',
  },
  resolve: {
    alias: {
      '@mjmx/core/jsx-runtime': resolve(__dirname, 'src/jsx-runtime.ts'),
      '@mjmx/core/jsx-dev-runtime': resolve(__dirname, 'src/jsx-dev-runtime.ts'),
      '@mjmx/core': resolve(__dirname, 'src/index.ts'),
    },
  },
});
