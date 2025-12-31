<script lang="ts" setup>
import { useMobile } from "../../composables/mobile";
import type { HymnData } from "../../types";

const router = useRouter();
const route = useRoute<"/slides/[hymnNo]">();
const { height } = useWindowSize();
const { isMobile } = useMobile();

const hymnUrl = ref(`hymns/${route.params.hymnNo}`);

const { data, fetchData } = useData<HymnData>(hymnUrl);
const stanzas = computed<{ text: string; type: string }[]>(() => {
  if (!data.value) return [];
  if (typeof data.value.stanzas !== "string") return data.value.stanzas;
  return JSON.parse(data.value.stanzas);
});

const currentVerse = ref(0);
const hasRefrain = computed(() =>
  stanzas.value.some((stanza) => stanza.type.toLowerCase() === "refrain"),
);

const displayStanzas = computed(() => {
  if (!hasRefrain.value) return stanzas.value;

  const verses = stanzas.value.filter(
    (s) => s.type.toLowerCase() !== "refrain",
  );
  const refrain = stanzas.value.find((s) => s.type.toLowerCase() === "refrain");

  const updatedStanzas = verses.reduce(
    (acc, verse) => {
      acc.push(verse);
      if (refrain) acc.push(refrain);
      return acc;
    },
    [] as typeof stanzas.value,
  );

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

  if (e.key === "Escape") {
    router.push(`/hymns/${route.params.hymnNo}`);
  }
};

const target = useTemplateRef<HTMLElement>("target");
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
  fetchData();
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("click", handleScreenClick);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("click", handleScreenClick);
});

const hymnNumber = computed(() => parseInt(route.params.hymnNo));
useHead({
  title: () =>
    ` #${hymnNumber.value} [S] - ${data.value?.title} | SDA Hymnal App`,
  meta: [
    {
      name: "description",
      content: () =>
        data.value?.first_line ||
        `${data.value?.title} written by ${data.value?.author}`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: () => window.location.href,
    },
  ],
});
</script>

<template>
  <div class="w-full min-h-screen">
    <Background />

    <div
      ref="target"
      class="absolute inset-0 flex flex-col items-center px-4 text-white"
    >
      <RouterLink
        :to="`/hymns/${route.params.hymnNo}`"
        class="group absolute top-4 right-4 flex items-center gap-x-1 bg-white hover:bg-neutral-200 active:bg-red-500 px-3 py-2 text-black active:text-white font-semibold rounded-md transition-colors active:duration-0"
      >
        Close
        <span
          class="border-2 border-b-4 border-neutral-400 group-active:border-white p-px px-1.5 mt-0.5 ml-1 text-[12px] font-mono rounded-md"
          >Esc</span
        >
      </RouterLink>
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
              '\n',
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
