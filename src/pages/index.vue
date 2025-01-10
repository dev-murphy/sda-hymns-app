<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import type { HymnData } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

const currentPage = ref(1);
const route = useRoute();
const router = useRouter();

const getStringifyQuery = (query: Record<string, any>) => {
  return Object.entries(query)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => {
      if (typeof value === "number") {
        return `${key}=${value.toString()}`;
      }

      if (value === undefined) {
        return "";
      }
      return `${key}=${value}`;
    })
    .join("&");
};

// Utitlity Functions
const setOffset = (page: number, limit: number) => {
  return (page - 1) * Number(limit);
};

const getCurrentPage = (offset: number, limit: number) => {
  return Math.ceil(offset / limit) + 1;
};

const pageChanged = (page: number) => {
  currentPage.value = page;
  router.push({
    query: {
      ...route.query,
      offset: setOffset(page, Number(route.query.limit)),
    },
  });
};

const limitChanged = (limit: number) => {
  currentPage.value = getCurrentPage(Number(route.query.offset), limit);
  router.push({
    query: {
      ...route.query,
      limit,
      offset: (currentPage.value - 1) * limit,
    },
  });
};

if (route.query.offset === undefined && route.query.limit === undefined) {
  router.push({ query: { offset: 0, limit: 10 } });
} else if (route.query.offset === undefined) {
  router.push({ query: { ...route.query, offset: 0 } });
} else if (route.query.limit === undefined) {
  router.push({ query: { ...route.query, limit: 10 } });
}

const url = ref(`${API_URL}hymns?${getStringifyQuery(route.query)}`);
const { data } = useFetch<{ count: number; hymns: HymnData[] }>(url, {
  refetch: true,
})
  .get()
  .json();

watch(
  () => route.query,
  (value) => {
    url.value = `${API_URL}hymns?${getStringifyQuery(value)}`;
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="w-full max-w-[1240px] my-auto mx-auto">
    <header class="flex flex-col items-center">
      <div class="flex items-center gap-x-2">
        <img src="../../assets/images/logo.webp" alt="logo" class="w-12" />
        <h1 class="pt-3">
          <span class="block text-lg font-arima leading-3"
            >Seventh-day Adventist</span
          >
          <span class="text-3xl font-black font-open-sans leading-7"
            >Hymnal App</span
          >
        </h1>
      </div>

      <p class="max-w-[500px] pt-6 text-xl text-center font-arima italic">
        Make a joyful noise unto the LORD, all the earth: make a loud noise, and
        rejoice, and sing praise.
        <span class="block text-base text-right font-open-sans">
          - Psalm 98:4</span
        >
      </p>
    </header>

    <ListView v-if="data" :hymns="data.hymns" />

    <Pagination
      :current-page="currentPage"
      :total-pages="Math.floor(data?.count / Number(route.query.limit)) + 1"
      :current-limit="Number(route.query.limit || 10)"
      @page-changed="pageChanged"
      @limit-changed="limitChanged"
    />
  </div>
</template>
