<template>
  <div>
    <button
      class="flex items-center gap-x-2 p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
      @click="toggleSearchCommand"
    >
      <Search class="w-5 h-5" />
      <div class="hidden md:flex items-center gap-x-1.5 text-sm">
        Search
        <span
          class="border-2 border-b-4 border-neutral-400 p-px px-1.5 text-[12px] font-mono rounded-md"
          >Ctrl</span
        >
        <span
          class="border-2 border-b-4 border-neutral-400 p-px px-1.5 text-[12px] font-mono rounded-md"
          >K</span
        >
      </div>
    </button>

    <Teleport to="#app">
      <SearchCommand
        v-if="isSearchCommandOpen"
        @close="isSearchCommandOpen = false"
      />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const isSearchCommandOpen = ref(false);

const toggleSearchCommand = () => {
  isSearchCommandOpen.value = !isSearchCommandOpen.value;
};

const handleKeydown = (evnt: KeyboardEvent) => {
  if (evnt.ctrlKey && evnt.key === "k") {
    evnt.preventDefault();
    toggleSearchCommand();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
</script>
