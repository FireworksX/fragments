import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  entry: ['src/index.ts', 'src/index.performance.ts', 'src/index.optimized.ts'],
  minify: !options.watch,
  splitting: false,
  sourcemap: !!options.watch,
  clean: true,
  format: ['esm', 'cjs'],
  dts: !!options.watch
}))
