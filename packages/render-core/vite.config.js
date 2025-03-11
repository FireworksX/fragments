import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [preact(), cssInjectedByJsPlugin(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: "src/index.tsx",
      name: "FragmentsCore",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {
          preact: "Preact",
        },
      },
    },
  },
});
