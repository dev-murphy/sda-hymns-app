<script setup lang="ts">
const { isLandscape } = useLandscape();
</script>

<template>
  <Transition name="fade">
    <div
      v-if="!isLandscape"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
    >
      <div class="rounded-lg bg-neutral-900 p-6 text-center">
        <div class="mb-4 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 animate-[spin_4s_linear_infinite] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
            />
          </svg>
        </div>
        <h2 class="mb-2 text-xl font-semibold text-white">
          Please Rotate Your Device
        </h2>
        <p class="text-neutral-300">
          For the best viewing experience, please rotate your device to
          landscape mode.
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
