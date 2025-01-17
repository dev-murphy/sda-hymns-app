import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { VitePWA} from "vite-plugin-pwa"
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
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "SDA Hymns",
        short_name: "SDA Hymns",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
