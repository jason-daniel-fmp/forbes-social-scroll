import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@forbes/config': path.resolve(__dirname, '../../packages/config/src/index.ts'),
      '@forbes/types': path.resolve(__dirname, '../../packages/types/src/index.ts'),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
