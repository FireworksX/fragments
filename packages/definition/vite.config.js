import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: "src/index.ts",
      name: "FragmentsSchema",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
