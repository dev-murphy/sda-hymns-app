<script lang="ts" setup>
const route = useRoute();
const appStore = useAppStore();
const colorTheme = usePreferredColorScheme();

watch(
  () => [colorTheme.value, appStore.theme],
  ([colorScheme, theme]) => {
    if (theme === "light" || colorScheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }
);

onMounted(() => {
  if (appStore.theme === "light" || colorTheme.value === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <div>
    <div
      class="min-w-screen min-h-screen flex bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-white"
    >
      <RouterView />
    </div>
    <!-- Modals -->
    <LandscapeModal v-if="route.fullPath.includes('/slides')" />
    <ScrollToTop />
  </div>
</template>
