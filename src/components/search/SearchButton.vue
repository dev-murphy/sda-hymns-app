<template>
  <div>
    <button
      class="flex items-center gap-x-2 p-2 rounded-md bg-neutral-100 hover:bg-neutral-200"
      @click="toggleSearchCommand"
    >
      <Search class="w-5 h-5" />
      <span class="hidden md:inline text-sm">Search</span>
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
</script>
