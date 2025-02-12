import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "EditorUI",
      formats: ["es", "cjs"], // Генерируем и ES, и CJS
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@react-spring/web",
        "react/jsx-runtime",
      ], // Не встраивать в билд
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@react-spring/web": "reactSpring",
        },
      },
    },
  },
});
