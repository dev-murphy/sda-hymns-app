<script lang="ts" setup>
import Fuse from "fuse.js";
import type { HymnData } from "../../types";

const emit = defineEmits<{ (e: "close"): void }>();

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();
const { data, fetchData, isLoading } = useData<HymnData[]>(
  `${API_URL}hymns/all`
);

const selectedHymn = ref(-1);
const query = ref("");
const fuse = ref<Fuse<Record<string, any>> | null>(null);

const searchResults = computed(() => {
  if (!query.value.trim()) return [];
  return fuse.value?.search(query.value).map((result) => result.item);
});

function goToHymn(hymnNumber: string) {
  router.push(`/hymns/${hymnNumber}`);
  emit("close");
}

watch(data, (value) => {
  if (!value) return;

  fuse.value = new Fuse(value, {
    includeScore: true,
    threshold: 0.3,
    keys: ["hymn_number", "title", "first_line", "author", "stanzas"],
  });
});

function scrollToSelected() {
  const selectedElement = document.querySelector(
    `.search-result_${selectedHymn.value + 1}`
  );

  if (selectedElement) {
    selectedElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

useShortcuts([
  {
    shortcut: "escape",
    callback: () => emit("close"),
  },
  {
    shortcut: "arrowleft",
    callback: () => {
      selectedHymn.value = Math.max(0, selectedHymn.value - 1);
      scrollToSelected();
    },
  },
  {
    shortcut: "arrowright",
    callback: () => {
      selectedHymn.value = Math.min(
        searchResults.value!.length - 1,
        selectedHymn.value + 1
      );
      scrollToSelected();
    },
  },
  {
    shortcut: "enter",
    callback: () => {
      if (searchResults.value && searchResults.value.length) {
        goToHymn(searchResults.value[selectedHymn.value]["hymn_number"]);
      }
    },
  },
]);

onMounted(() => {
  fetchData();
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>

<template>
  <div
    class="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm"
    @click="$emit('close')"
  >
    <div
      class="flex flex-col w-full max-w-[600px] h-[400px] bg-white mx-6 rounded-md overflow-hidden"
      @click.stop
    >
      <SearchInput v-model="query" placeholder="Search hymns..." />

      <div
        class="flex flex-grow items-center justify-center py-2 overflow-y-auto"
      >
        <div v-if="isLoading" class="text-center p-4 text-gray-500">
          Loading hymns...
        </div>
        <div v-else-if="searchResults?.length === 0">No hymns found.</div>
        <div v-else class="search-result w-full h-full flex flex-col">
          <button
            v-for="hymn in searchResults"
            :key="hymn.hymn_number"
            class="text-left"
            @click="goToHymn(hymn.hymn_number)"
          >
            <HymnItem :hymn="hymn" />
          </button>
        </div>
      </div>

      <div
        class="hidden md:flex flex-shrink-0 items-center gap-x-3 w-full h-12 border-t border-neutral-200 px-3"
      >
        <div class="flex items-center gap-x-2">
          <EnterKey class="w-6 h-6" />
          <p>to select</p>
        </div>

        <div class="flex">
          <NarrowArrow class="w-6 h-6" />
          <NarrowArrow class="w-6 h-6 -ml-3 rotate-180" />
          <p>to navigate</p>
        </div>
        <div class="flex gap-x-2">
          <span
            class="border-2 border-b-4 border-neutral-400 p-px px-1.5 ml-1 text-[12px] font-mono rounded-md"
            >Esc</span
          >
          <p>to close</p>
        </div>
      </div>
    </div>
  </div>
</template>
