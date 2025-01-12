<script setup lang="ts">
import type { HymnData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
const route = useRoute<"/hymns/[hymnNo]">();
const hymnUrl = ref(`${API_URL}hymns/${route.params.hymnNo}`);

const { data } = useFetch<HymnData>(hymnUrl, { refetch: true }).get().json();
const stanzas = computed(
  () => JSON.parse(data.value.stanzas) as { text: string; type: string }[]
);

watch(
  () => route.params.hymnNo,
  (value) => {
    hymnUrl.value = `${API_URL}hymns/${value}`;
  }
);
</script>

<template>
  <div class="w-full">
    <Navbar />
    <div class="bg-neutral-200 py-2">
      <div
        class="relative w-full max-w-[1200px] flex items-center justify-between mx-auto px-2 md:px-5"
      >
        <RouterLink
          to="/"
          class="flex items-center justify-between gap-x-1 hover:bg-neutral-300 px-0.5 md:px-1.5 py-1 font-medium rounded-md"
        >
          <Chevron class="w-5 h-5 rotate-90" />
          <span class="hidden md:inline-block"> Back to Home </span>
        </RouterLink>
        <p class="text-2xl text-center font-bold">
          <span class="block -mb-1.5 text-sm font-normal font-arima">
            Hymn #{{ route.params.hymnNo }}
          </span>
          {{ data?.title }}
        </p>

        <div class="flex flex-col md:flex-row items-center gap-y-1">
          <RouterLink
            v-if="route.params.hymnNo !== '1'"
            :to="`/hymns/${Number(route.params.hymnNo) - 1}`"
            class="flex items-center bg-transparent hover:bg-neutral-300 p-1 md:pr-2 font-medium rounded-md"
          >
            <NarrowArrow class="w-5 h-5 -rotate-90" />
            <span class="hidden md:inline-block">
              #{{ Number(route.params.hymnNo) - 1 }}
            </span>
          </RouterLink>
          <RouterLink
            v-if="route.params.hymnNo !== '695'"
            :to="`/hymns/${Number(route.params.hymnNo) + 1}`"
            class="flex items-center bg-transparent hover:bg-neutral-300 p-1 md:pl-2 font-medium rounded-md"
          >
            <span class="hidden md:inline-block">
              #{{ Number(route.params.hymnNo) + 1 }}
            </span>
            <NarrowArrow class="w-5 h-5 rotate-90" />
          </RouterLink>
        </div>
      </div>
    </div>

    <div>
      <div v-if="data" class="py-7">
        <ul v-for="(stanza, index) in stanzas" :key="stanza.type">
          <li class="text-center">
            <p class="my-3">{{ stanza.type.replace("_", " ") }}</p>
            <p>
              <span
                v-for="(line, lineNo) in stanza.text.split('\n')"
                :key="`stanza-${index}-${lineNo}`"
                class="block"
              >
                {{ line }}
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
