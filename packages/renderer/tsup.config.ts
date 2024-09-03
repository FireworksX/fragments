import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  minify: !options.watch,
  splitting: false,
  sourcemap: !!options.watch,
  clean: true,
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom"],
  noExternal: [
    "@graph-state/core",
    "@graph-state/react",
    "preact",
    "preact/compat",
  ],
}));
