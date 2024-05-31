import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  dts: false,
  entry: ['src/index.ts'],
  minify: !options.watch,
  splitting: false,
  sourcemap: !!options.watch,
  clean: true,
  format: ['esm', 'cjs'],
  dts: true
}))
