import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

const isWatch = process.argv.includes("-w");

export default defineConfig((config) => ({
  mode: isWatch ? "development" : "production",
  plugins: [dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "FragmentsClientCore",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
}));
