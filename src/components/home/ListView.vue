<script lang="ts" setup>
import { useFetch } from "@vueuse/core";
import type { HymnData } from "../../types";
const API_URL = import.meta.env.VITE_API_URL;

const limit = ref(10);
const offset = ref(10);

const { data } = useFetch<HymnData[]>(
  `${API_URL}hymns?limit=${limit.value}&offset=${offset.value}`
)
  .get()
  .json();
</script>

<template>
  <div
    class="w-full mt-5 border border-neutral-300 divide-y divide-neutral-300 rounded-xl overflow-hidden"
  >
    <HymnItem v-for="hymn in data" :key="hymn.hymn_number" :hymn="hymn" />
  </div>
</template>
