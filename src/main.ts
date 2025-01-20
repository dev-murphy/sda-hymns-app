import { createApp } from "vue";
import { createPinia } from "pinia";

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

const hymns = JSON.parse(JSON.stringify(jsonData)) as HymnData[];
preloadData(hymns).catch((error) =>
  console.error("Failed to preload data into Dexie: ", error)
);

createApp(App).use(router).use(createPinia()).mount("#app");
