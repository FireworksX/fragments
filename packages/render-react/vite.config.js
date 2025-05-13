import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import path from "path";

function replaceUwithJSX() {
  return {
    name: "replace-u-with-jsx",
    enforce: "post",
    apply: "build",

    async generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (
          file.type === "chunk" &&
          (fileName.endsWith(".js") || fileName.endsWith(".mjs"))
        ) {
          let code = file.code;

          // 1. Заменить u("div" → jsx("div"
          code = code.replace(/u\("([^"]+)"/g, 'jsx("$1"');

          // 2. Удалить import { options } from "preact";
          code = code.replace(
            /import\s*\{\s*options\s*\}\s*from\s*["']preact["'];?/g,
            ""
          );

          // 3. Удалить тело функции u(...)
          // code = code.replace(/function u\([^)]*\)\s*\{[\s\S]*?\}/, "");

          file.code = code;
          this.warn(`patched: ${fileName}`);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "preact/compat": "react",
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
        /^react/,
        "react/jsx-runtime",
        "@graph-state/react",
        "@graph-state/core",
        /^@fragmentsx\/(?!render-core$).*/, // Все пакеты из монорепозитория
        // "@fragmentsx/render-core",
        // /^@fragmentsx\//, // Все пакеты из монорепозитория
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
