import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Component from "unplugin-vue-components/vite";
import { unheadVueComposablesImports } from "@unhead/vue";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { VitePWA } from "vite-plugin-pwa";
import WebfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ extensions: [".vue"], dts: "src/typed-router.d.ts" }),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        VueRouterAutoImports,
        unheadVueComposablesImports,
      ],
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
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "images/logo.webp",
      ],
      manifest: {
        name: "SDA Hymns",
        short_name: "SDA Hymns",
        description:
          "Explore the complete Seventh-day Adventist hymnal online. Search, browse, and sing along with your favourite hymns, all in an elegant and fast-loading Vue 3 experience. Worship made simple—visit now!",
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
            purpose: "any",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",
        scope: "/",
        lang: "en",
        display: "standalone",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^\/.*/,
            handler: "CacheFirst",
            options: {
              cacheName: "app-shell",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});
