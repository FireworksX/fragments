import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  noExternal: ["use-sync-external-store"],
  entry: ["src/index.tsx"],
  // minify: !options.watch,
  splitting: false,
  sourcemap: !!options.watch,
  clean: true,
  format: ["esm", "cjs"],
  dts: true,
}));
