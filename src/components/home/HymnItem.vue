<script lang="ts" setup>
import type { HymnData } from "../../types";

defineProps<{ hymn: HymnData }>();
</script>

<template>
  <RouterLink
    :to="`/hymns/${hymn.hymn_number}`"
    class="flex flex-col md:flex-row items-start gap-x-3 px-3 py-2 hover:bg-neutral-200 cursor-pointer"
  >
    <h2
      class="w-full md:w-fit pt-1 text-lg md:text-3xl font-arima font-black truncate"
    >
      {{ hymn.hymn_number
      }}<span class="inline md:hidden font-normal">. {{ hymn.title }}</span>
    </h2>
    <div>
      <p class="font-arima font-medium">
        <span class="hidden md:inline">
          {{ hymn.title }}
        </span>
        <span v-if="hymn.author" class="block md:inline md:pl-1 text-orange-800"
          >by {{ hymn.author }}</span
        >
      </p>
      <p v-if="hymn.first_line" class="text-sm text-neutral-500 leading-3">
        {{ hymn.first_line }}
      </p>
    </div>

    <p
      v-if="hymn.key"
      class="hidden md:inline-block flex-shrink-0 bg-black ml-auto px-2 text-white text-sm font-medium rounded-full"
    >
      {{ hymn.key }}
    </p>
  </RouterLink>
</template>
