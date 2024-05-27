import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig((config) => ({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    preact(),
    // dts({
    //   insertTypesEntry: true
    // })
  ],
  define: {
    "import.meta.vitest": false,
  },
  build: {
    target: "es6",
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: pkg.name,
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {
          preact: "preact",
        },
      },
    },
  },
}));
