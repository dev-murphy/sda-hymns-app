<template>
  <div class="flex justify-center items-center gap-2">
    <button
      aria-label="previous page"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      class="p-1 pl-0.5 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Chevron class="w-7 h-7 rotate-90" />
    </button>
    <button
      aria-label="next page"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      class="p-1 pr-0.5 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Chevron class="w-7 h-7 -rotate-90" />
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>

    <x-dropdown
      :options="pageLimits"
      :value="currentLimit"
      @input="(value: string | number) => changeLimit(Number(value))"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
  currentPage: number;
  currentLimit: number;
}>();

const emit = defineEmits<{
  (e: "page-changed", page: number): void;
  (e: "limit-changed", limit: number): void;
}>();

const pageLimits = ref([10, 20, 50, 100]);

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-changed", page);
  }
};

const changeLimit = (limit: number) => {
  emit("limit-changed", limit);
};
</script>
