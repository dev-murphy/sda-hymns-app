import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    name: "SDA Hymns App",
    theme: "dark",
    modals: {
      search: false,
    },
  }),
  getters: {
    isSearchModalOpen(state) {
      return state.modals.search;
    },
  },
  actions: {
    toggleSearchModal() {
      this.modals.search = !this.modals.search;
    },
  },
});
