<script setup lang="ts">
import type { HymnData } from "../types";
import { getCurrentPage, getStringifyQuery, setOffset } from "../utils";

const currentPage = ref(1);
const route = useRoute();
const router = useRouter();

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

const url = ref(`hymns?${getStringifyQuery(route.query)}`);
const { data, fetchData } = useData<{ count: number; hymns: HymnData[] }>(url);

watch(
  () => route.query,
  (value) => {
    url.value = `hymns?${getStringifyQuery(value)}`;
  },
  {
    deep: true,
  },
);

watch(
  () => route.query.offset,
  (value) => {
    if (Number(value) === 0) currentPage.value = 1;
  },
);

onMounted(fetchData);
</script>

<template>
  <div class="w-full max-w-[1240px] py-10 px-6 mx-auto">
    <header class="flex flex-col items-center">
      <div class="flex items-center gap-x-2">
        <img src="/images/logo.webp" alt="logo" class="w-12 h-14" />
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

    <div class="flex flex-col md:flex-row items-center gap-y-2 mt-5">
      <SearchButton class="mr-2" />
      <Breadcrumbs />
      <Pagination
        v-if="data"
        class="md:ml-auto"
        :current-page="currentPage"
        :total-pages="Math.floor(data.count / Number(route.query.limit)) + 1"
        :current-limit="Number(route.query.limit || 10)"
        @page-changed="pageChanged"
        @limit-changed="limitChanged"
      />
    </div>

    <ListView v-if="data" :hymns="data.hymns" />
  </div>
</template>
