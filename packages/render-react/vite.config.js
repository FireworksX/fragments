import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  build: {
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "FragmentsReact",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "preact",
        "@graph-state/react",
        "@graph-state/core",
        "@fragmentsx/render-core",
        /^@fragmentsx\//, // Все пакеты из монорепозитория
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
