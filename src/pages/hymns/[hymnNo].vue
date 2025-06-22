<script setup lang="ts">
import type { HymnData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();
const route = useRoute<"/hymns/[hymnNo]">();
const { isOnline } = useNetwork();

const hymnUrl = ref(`${API_URL}hymns/${route.params.hymnNo}`);

const { data, fetchData } = useData<HymnData>(hymnUrl);

const stanzas = computed<{ text: string; type: string }[]>(() => {
  if (!data.value) return [];
  if (typeof data.value.stanzas !== "string") return data.value.stanzas;
  return JSON.parse(data.value.stanzas);
});

const hasRefrain = computed(() =>
  stanzas.value.some((stanza) => stanza.type.toLowerCase() === "refrain")
);

// Parse stanzas and handle refrain repetition
const displayStanzas = computed(() => {
  if (!hasRefrain.value) return stanzas.value;

  const verses = stanzas.value.filter(
    (s) => s.type.toLowerCase() !== "refrain"
  );
  const refrain = stanzas.value.find((s) => s.type.toLowerCase() === "refrain");

  const updatedStanzas = verses.reduce((acc, verse) => {
    acc.push(verse);
    if (refrain) acc.push(refrain);
    return acc;
  }, [] as typeof stanzas.value);

  if (route.params.hymnNo === "93") {
    return refrain ? [refrain, ...updatedStanzas] : updatedStanzas;
  } else {
    return updatedStanzas;
  }
});

watch(
  () => route.params.hymnNo,
  (value) => {
    hymnUrl.value = `${API_URL}hymns/${value}`;
  }
);

const handleKeyDown = (evnt: KeyboardEvent) => {
  if (evnt.ctrlKey && evnt.key === "p") {
    evnt.preventDefault();
    router.push(`/slides/${route.params.hymnNo}`);
  }
};

onMounted(() => {
  fetchData();

  window.addEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
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

    <!-- Verses and Choruses -->
    <div class="flex-grow">
      <div v-if="displayStanzas" class="py-7">
        <ul
          v-for="(stanza, index) in displayStanzas"
          :key="`${stanza.type}-${index}`"
        >
          <li class="text-center">
            <p
              class="my-3 font-bold"
              :class="{
                'italic font-arima': stanza.type === 'REFRAIN',
              }"
            >
              {{
                stanza.type === "REFRAIN"
                  ? stanza.type
                  : stanza.type.split("_")[1]
              }}
            </p>
            <p
              :class="{
                italic: stanza.type === 'REFRAIN',
              }"
            >
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

    <!-- Music Player -->
    <div
      v-if="data && isOnline"
      class="sticky bottom-0 w-full bg-neutral-200 py-3"
    >
      <AudioPlayer
        :audio-url="`https://github.com/dev-murphy/hymn-resources/raw/refs/heads/main/mp3/${encodeURI(
          data.filename
        )}`"
      />
    </div>
  </div>
</template>
