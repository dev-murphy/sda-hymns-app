import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";

import App from "./App.vue";
import router from "./router";

import type { HymnData } from "./types";
import { preloadData } from "./db";
import jsonData from "./db/hymns.json";

import "./style.css";

// Register Service Worker
navigator.serviceWorker
  .register("/service-worker.js")
  .then(() => console.log("Service Worker registered"))
  .catch((error) =>
    console.error("Service Worker registration failed:", error)
  );

const version = parseInt(jsonData.version);
const hymns = JSON.parse(JSON.stringify(jsonData.data)) as HymnData[];
preloadData(version, hymns).catch((error) =>
  console.error("Failed to preload data into Dexie: ", error)
);

createApp(App).use(router).use(createHead()).use(createPinia()).mount("#app");
