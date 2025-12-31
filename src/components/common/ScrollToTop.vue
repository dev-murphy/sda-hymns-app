<script setup lang="ts">
const isScrolled = ref(false);
const route = useRoute();
const { isOnline } = useNetwork();

window.addEventListener("scroll", () => {
  isScrolled.value = window.scrollY > 100;
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <Transition name="fade">
    <button
      v-if="isScrolled"
      class="fixed right-5 p-2 bg-neutral-900 rounded-full shadow-lg"
      :class="[
        route.fullPath.includes('/hymns') && isOnline
          ? 'bottom-20'
          : 'bottom-5',
      ]"
      @click="scrollToTop"
    >
      <Chevron class="relative w-7 h-7 bottom-px rotate-180 text-white" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
