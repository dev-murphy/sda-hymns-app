<script setup lang="ts">
import { useMediaControls } from "@vueuse/core";
import { watch, ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  audioUrl: string;
}>();

const audio = ref<HTMLAudioElement>();
const { playing, currentTime, duration } = useMediaControls(audio, {
  src: props.audioUrl,
});

// Watch for changes in audioUrl prop
watch(
  () => props.audioUrl,
  (newUrl) => {
    if (audio.value) {
      audio.value.src = newUrl;
      audio.value.load();
      currentTime.value = 0;
      playing.value = false;
    }
  }
);

// Format time in MM:SS
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Handle seek position calculation
const calculateSeekPosition = (e: MouseEvent, el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const percent = Math.min(
    Math.max((e.clientX - rect.left) / rect.width, 0),
    1
  );
  return duration.value * percent;
};

// Handle seek on progress bar click
const onProgressBarClick = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLDivElement;
  currentTime.value = calculateSeekPosition(e, el);
};

// Handle seek bar dragging
const isDragging = ref(false);

const onDragStart = () => {
  isDragging.value = true;
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  const progressBar = document.querySelector(".progress-bar") as HTMLDivElement;
  if (progressBar) {
    currentTime.value = calculateSeekPosition(e, progressBar);
  }
};

const onDragEnd = () => {
  isDragging.value = false;
};

// Add and remove global event listeners
onMounted(() => {
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", onDragEnd);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", onDragEnd);
});
</script>

<template>
  <div class="flex items-center px-4">
    <audio ref="audio" />

    <div class="flex flex-shrink-0 gap-x-px rounded-lg overflow-hidden mr-">
      <button
        @click="playing = !playing"
        class="bg-neutral-300 hover:bg-neutral-400 p-2"
      >
        <Pause v-if="playing" class="w-5 h-5" />
        <Play v-else class="w-5 h-5" />
      </button>
      <button
        @click="
          currentTime = 0;
          playing = false;
        "
        class="group bg-neutral-300 disabled:bg-neutral-200 hover:bg-neutral-400 p-2"
        :disabled="currentTime === 0"
      >
        <Stop class="w-5 h-5 group-disabled:text-gray-400" />
      </button>
    </div>

    <div class="w-full flex items-center gap-x-2 ml-2">
      <span class="text-sm mr-2">{{ formatTime(currentTime) }}</span>

      <div
        class="flex-1 h-1.5 bg-neutral-400 rounded cursor-pointer"
        @click="onProgressBarClick"
      >
        <div
          class="relative h-full bg-neutral-600 rounded"
          :style="{ width: `${(currentTime / duration) * 100}%` }"
        >
          <div
            class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-600 rounded-full"
            @mousedown="onDragStart"
          ></div>
        </div>
      </div>

      <span class="text-sm">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>
