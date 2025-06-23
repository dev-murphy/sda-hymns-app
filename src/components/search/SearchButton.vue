<script lang="ts" setup>
const appStore = useAppStore();

useShortcuts([
  {
    shortcut: "/",
    callback: appStore.toggleSearchModal,
    prevent: true,
  },
]);
</script>

<template>
  <div>
    <button
      class="flex items-center gap-x-2 p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
      @click="appStore.toggleSearchModal"
    >
      <Search class="w-5 h-5" />
      <div class="hidden md:flex items-center gap-x-1.5 text-sm">
        Search

        <span
          class="border-2 border-b-4 border-neutral-400 p-px px-1.5 text-[12px] font-mono rounded-md"
          >/</span
        >
      </div>
    </button>

    <Teleport to="#app">
      <SearchCommand
        v-if="appStore.isSearchModalOpen"
        @close="appStore.modals.search = false"
      />
    </Teleport>
  </div>
</template>
