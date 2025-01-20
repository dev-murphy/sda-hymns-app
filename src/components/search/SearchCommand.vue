<script lang="ts" setup>
import Fuse from "fuse.js";

const emit = defineEmits<{ (e: "close"): void }>();

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();
const { data, fetchData, isLoading } = useData<string>(`${API_URL}hymns/all`);

const selectedHymn = ref(-1);
const query = ref("");
const fuse = ref<Fuse<Record<string, any>> | null>(null);

const searchResults = computed(() => {
  if (!query.value.trim()) return [];
  return fuse.value?.search(query.value).map((result) => result.item);
});

function handleKeyDown(event: KeyboardEvent) {
  if (searchResults.value === undefined) return;

  if (event.key === "ArrowUp") {
    selectedHymn.value = Math.max(0, selectedHymn.value - 1);
    scrollToSelected();
  } else if (event.key === "ArrowDown") {
    selectedHymn.value = Math.min(
      searchResults.value.length - 1,
      selectedHymn.value + 1
    );
    scrollToSelected();
  } else if (event.key === "Enter" && searchResults.value.length) {
    goToHymn(searchResults.value[selectedHymn.value]["hymn_number"]);
  }
}

function goToHymn(hymnNumber: string) {
  router.push(`/hymns/${hymnNumber}`);
  emit("close");
}

watch(
  () => data.value,
  (value) => {
    if (value === null) return;
    let actualValue = value;

    if (typeof value === "string") {
      actualValue = JSON.stringify(value);
    }

    fuse.value = new Fuse(actualValue, {
      includeScore: true,
      threshold: 0.3,
      keys: ["hymn_number", "title", "first_line", "author", "stanzas"],
    });
  }
);

onMounted(() => {
  fetchData();
  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.body.style.overflow = "";
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
        <ul v-else class="search-result w-full h-full list-none p-0 m-0">
          <li
            v-for="(result, index) in searchResults"
            :key="result.hymn_number"
            class="py-2 px-4 cursor-pointer"
            :class="[
              { 'bg-neutral-100': index === selectedHymn },
              `search-result_${index + 1}`,
            ]"
            @mouseenter="selectedHymn = index"
            @click="goToHymn(result.hymn_number)"
          >
            {{ result.title }} ({{ result.hymn_number }})
          </li>
        </ul>
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
          <p class="mb-auto font-mono font-semibold text-sm">esc</p>
          <p>to close</p>
        </div>
      </div>
    </div>
  </div>
</template>
