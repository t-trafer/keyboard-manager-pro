import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**'],
      exclude: [
        '**/*.d.ts',
        '**/types.ts',
        '**/*.types.ts',
        '**/constants.ts',
        '**/*.constants.ts',
        '**/index.ts',
      ],
    },
  },
});
