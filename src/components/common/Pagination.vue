<template>
  <div class="flex justify-center items-center gap-2">
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <input
      type="number"
      v-model.number="inputPage"
      @keyup.enter="jumpToPage"
      min="1"
      :max="totalPages"
      class="w-12 text-center border border-gray-300 rounded"
    />
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
    <x-dropdown
      :options="pageLimits"
      :value="currentLimit"
      position="top"
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

const inputPage = ref(props.currentPage);
const pageLimits = ref([10, 20, 50, 100]);

watch(
  () => props.currentPage,
  (newPage) => {
    inputPage.value = newPage;
  }
);

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-changed", page);
  }
};

const jumpToPage = () => {
  changePage(inputPage.value);
};

const changeLimit = (limit: number) => {
  emit("limit-changed", limit);
};
</script>
