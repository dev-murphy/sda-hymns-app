<script lang="ts" setup>
import type { HymnData } from "../../types";

defineProps<{ hymns: HymnData[] }>();
</script>

<template>
  <div
    class="w-full mt-5 border border-neutral-300 divide-y divide-neutral-300 rounded-xl overflow-hidden"
  >
    <template v-for="hymn in hymns" :key="hymn.hymn_number">
      <RouterLink :to="`/hymns/${hymn.hymn_number}`">
        <HymnItem :hymn="hymn" />
      </RouterLink>
    </template>
  </div>
</template>
