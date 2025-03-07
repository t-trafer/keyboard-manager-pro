import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  /**
   * This is a hack to attach 'use client' directive to the output files
   */
  onSuccess: './scripts/post-build.sh',
});
