import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import path from "path";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  plugins: [
    preact(),
    cssInjectedByJsPlugin(),
    dts(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
      "process.env": JSON.stringify({}), // или конкретные переменные, например:
      // 'process.env.API_URL': JSON.stringify('https://api.example.com'),
      preventAssignment: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "FragmentsCore",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          preact: "Preact",
        },
      },
    },
  },
});
