<script lang="ts" setup>
import { useMobile } from "../../composables/mobile";
import type { HymnData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;
const route = useRoute<"/slides/[hymnNo]">();
const { height } = useWindowSize();
const { isMobile } = useMobile();

const hymnUrl = ref(`${API_URL}hymns/${route.params.hymnNo}`);

const { data } = useFetch<HymnData>(hymnUrl, { refetch: true }).get().json();
const stanzas = computed(() => {
  if (!data.value) return [];
  return JSON.parse(data.value.stanzas) as { text: string; type: string }[];
});

const currentVerse = ref(0);
const hasRefrain = computed(() =>
  stanzas.value.some((stanza) => stanza.type.toLowerCase() === "refrain")
);

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

  return route.params.hymnNo === "93"
    ? [refrain, ...updatedStanzas]
    : updatedStanzas;
});

const titleSize = computed(() => {
  if (height.value >= 900) return "text-6xl"; // Large screens
  if (height.value >= 700) return "text-5xl"; // Medium screens
  return "text-3xl"; // Small screens
});

const verseSize = computed(() => {
  if (height.value >= 900) return "text-5xl leading-[64px]";
  if (height.value >= 700) return "text-4xl leading-[52px]";
  return "text-lg ";
});

const handleKeyPress = (e: KeyboardEvent) => {
  if (!displayStanzas.value.length) return;

  if (e.key === "ArrowLeft" && currentVerse.value > 0) {
    currentVerse.value--;
  }

  if (
    e.key === "ArrowRight" &&
    currentVerse.value < displayStanzas.value.length - 1
  ) {
    currentVerse.value++;
  }
};

const target = ref(null);
const { lengthX } = useSwipe(target, {
  onSwipeEnd() {
    if (!displayStanzas.value.length) return;

    if (lengthX.value < -50 && currentVerse.value > 0) {
      currentVerse.value--; // Swipe right
    } else if (
      lengthX.value > 50 &&
      currentVerse.value < displayStanzas.value.length - 1
    ) {
      currentVerse.value++; // Swipe left
    }
  },
});

const handleScreenClick = (e: MouseEvent) => {
  if (!isMobile.value || !displayStanzas.value.length) return;

  const screenWidth = window.innerWidth;
  const clickX = e.clientX;

  if (clickX < 100 && currentVerse.value > 0) {
    currentVerse.value--;
  } else if (
    clickX >= screenWidth - 100 &&
    currentVerse.value < displayStanzas.value.length - 1
  ) {
    currentVerse.value++;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("click", handleScreenClick);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("click", handleScreenClick);
});
</script>

<template>
  <div class="w-full min-h-screen">
    <Background />
    <div
      ref="target"
      class="absolute inset-0 flex flex-col items-center px-4 text-white"
    >
      <h1
        :class="[
          titleSize,
          'mt-7  text-center',
          {
            'mb-2': isMobile,
            'mb-4': !isMobile,
          },
        ]"
      >
        <span class="font-thin" :class="{ 'block text-2xl': !isMobile }"
          >Hymn #{{ route.params.hymnNo }}</span
        >
        {{ data?.title }}
      </h1>
      <p class="text-xl lg:text-3xl font-arima text-white/80">
        {{ displayStanzas[currentVerse]?.type.replace("_", " ") }}
      </p>

      <div class="flex flex-grow items-center">
        <p
          v-if="data"
          :class="[
            'text-center',
            verseSize,
            {
              'py-2': isMobile,
              'py-7': !isMobile,
            },
          ]"
        >
          <span
            v-for="(line, index) in displayStanzas[currentVerse]?.text.split(
              '\n'
            )"
            :key="`stanza-${currentVerse}-line-${index}`"
            class="block"
            >{{ line }}</span
          >
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="w-full max-w-3xl bg-neutral-200 h-2 rounded-full mb-8">
        <div
          class="h-full bg-neutral-600 rounded-full transition-all duration-300 ease-in-out"
          :style="{
            width: `${((currentVerse + 1) / displayStanzas.length) * 100}%`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1,
p {
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);
}
</style>
