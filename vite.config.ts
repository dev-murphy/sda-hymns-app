import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import WebfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ extensions: [".vue"], dts: "src/typed-router.d.ts" }),
    AutoImport({
      imports: ["vue", "@vueuse/core", VueRouterAutoImports],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/stores", "src/composables"],
    }),
    Component({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/components.d.ts",
    }),
    Vue(),
    WebfontDownload(),
  ],
});
