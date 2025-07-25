<script setup lang="ts">
import { useShortcuts } from "../../composables/shortcuts";
import type { HymnData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();
const route = useRoute<"/hymns/[hymnNo]">();
const { isOnline } = useNetwork();
const appStore = useAppStore();

const hymnNumber = computed(() => parseInt(route.params.hymnNo));
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

  if (hymnNumber.value === 93) {
    return refrain ? [refrain, ...updatedStanzas] : updatedStanzas;
  } else {
    return updatedStanzas;
  }
});

watch(
  () => hymnNumber.value,
  (value) => {
    fetchData();
    hymnUrl.value = `${API_URL}hymns/${value}`;
  }
);

const target = useTemplateRef<HTMLElement>("target");
const { lengthX } = useSwipe(target, {
  onSwipeEnd() {
    if (!displayStanzas.value.length) return;

    if (lengthX.value < -50 && hymnNumber.value > 1) {
      router.push(`/hymns/${hymnNumber.value - 1}`); // Swipe right
    } else if (lengthX.value > 50 && hymnNumber.value < 695) {
      router.push(`/hymns/${hymnNumber.value + 1}`); // Swipe left
    }
  },
});

useShortcuts([
  {
    shortcut: "p",
    callback: () => router.push(`/slides/${hymnNumber.value}`),
    prevent: true,
  },
  {
    shortcut: "arrowleft",
    callback: () => router.push(`/hymns/${hymnNumber.value - 1}`),
    enabledWhen: () => !appStore.isSearchModalOpen,
  },
  {
    shortcut: "arrowright",
    callback: () => router.push(`/hymns/${hymnNumber.value + 1}`),
    enabledWhen: () => !appStore.isSearchModalOpen,
  },
]);

onMounted(() => {
  fetchData();
});

const relForPages = computed(() => {
  const links = [];

  if (hymnNumber.value > 1) {
    links.push({
      rel: "prev",
      href: () => `${window.location.origin}/hymns/${hymnNumber.value - 1}`,
    });
  }

  if (hymnNumber.value < 695) {
    links.push({
      rel: "next",
      href: () => `${window.location.origin}/hymns/${hymnNumber.value + 1}`,
    });
  }

  return links;
});

useHead({
  title: () => `#${hymnNumber.value} - ${data.value?.title} | SDA Hymnal App`,
  meta: [
    {
      name: "description",
      content: () =>
        data.value?.first_line ||
        `${data.value?.title} written by ${data.value?.author}`,
    },
  ],
  link: [
    ...relForPages.value,
    {
      rel: "canonical",
      href: () => window.location.href,
    },
  ],
});
</script>

<template>
  <div ref="target" class="w-full min-h-screen flex flex-col">
    <Navbar />

    <div class="sticky top-0 bg-neutral-200 py-0.5 md:py-2">
      <div
        class="relative w-full max-w-[1200px] flex items-center mx-auto px-2 md:px-5 py-2.5"
      >
        <!-- Go to previous hymn -->
        <RouterLink
          v-if="hymnNumber != 1"
          :to="`/hymns/${hymnNumber - 1}`"
          class="flex items-center bg-transparent hover:bg-neutral-300 p-1 md:pr-2 text-lg font-medium rounded-md"
        >
          <NarrowArrow class="w-6 h-6 -rotate-90" />
          <span class="hidden md:inline-block">
            #{{ Number(hymnNumber) - 1 }}
          </span>
        </RouterLink>

        <!-- Hymn Heading -->
        <p
          class="w-max max-w-[70%] mx-auto text-lg sm:text-xl md:text-2xl text-center font-bold"
        >
          <span
            class="block -mb-1.5 text-sm sm:text-base font-medium font-arima"
          >
            Hymn #{{ hymnNumber }}
          </span>
          {{ data?.title }}
        </p>

        <!-- Go to next hymn -->
        <RouterLink
          v-if="hymnNumber != 695"
          :to="`/hymns/${hymnNumber + 1}`"
          class="flex items-center bg-transparent hover:bg-neutral-300 p-1 md:pl-2 text-lg font-medium rounded-md"
        >
          <span class="hidden md:inline-block"> #{{ hymnNumber + 1 }} </span>
          <NarrowArrow class="w-6 h-6 rotate-90" />
        </RouterLink>
      </div>
    </div>

    <!-- Verses and Choruses -->
    <div class="flex-grow">
      <div v-if="displayStanzas" class="py-4 md:py-7">
        <ul
          v-for="(stanza, index) in displayStanzas"
          :key="`${stanza.type}-${index}`"
          class="px-5 text-base md:text-xl"
        >
          <li class="text-center py-3">
            <p
              class="mb-2 font-semibold font-arima"
              :class="{
                italic: stanza.type === 'REFRAIN',
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
      v-if="data?.filename && isOnline"
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
