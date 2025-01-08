<script setup lang="ts">
const appStore = useAppStore();
</script>

<template>
  <p>{{ appStore.name }}</p>
</template>
