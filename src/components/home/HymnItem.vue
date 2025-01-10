<script lang="ts" setup>
import type { HymnData } from "../../types";

defineProps<{ hymn: HymnData }>();
</script>

<template>
  <div
    class="flex items-start gap-x-3 px-3 py-2 hover:bg-neutral-200 cursor-pointer"
  >
    <h2 class="pt-1 text-3xl font-arima font-black">
      {{ hymn.hymn_number }}
    </h2>
    <div>
      <p class="font-arima font-medium">
        {{ hymn.title }}
        <span v-if="hymn.author" class="text-orange-500"
          >by {{ hymn.author }}</span
        >
      </p>
      <p v-if="hymn.first_line" class="text-sm text-neutral-400 leading-3">
        {{ hymn.first_line }}
      </p>
    </div>

    <p
      v-if="hymn.key"
      class="flex-shrink-0 bg-black ml-auto px-2 text-white text-sm font-medium rounded-full"
    >
      {{ hymn.key }}
    </p>
  </div>
</template>
