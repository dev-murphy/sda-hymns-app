import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ extensions: [".vue"], dts: "src/typed-router.d.ts" }),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
    }),
    Vue(),
  ],
});
