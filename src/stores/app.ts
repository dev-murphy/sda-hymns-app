import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    name: "SDA Hymns App",
    theme: "dark",
  }),
});
