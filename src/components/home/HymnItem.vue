<script lang="ts" setup>
import type { HymnData } from "../../types";

const { highlight = false } = defineProps<{
  hymn: Partial<HymnData>;
  highlight?: boolean;
}>();
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-start gap-x-3 px-3 py-2 cursor-pointer"
    :class="[highlight ? 'bg-neutral-200' : 'hover:bg-neutral-200 ']"
  >
    <h2
      class="w-full md:w-fit pt-1 text-lg md:text-3xl font-arima font-black truncate"
    >
      {{ hymn.hymn_number
      }}<span class="inline md:hidden font-normal">. {{ hymn.title }}</span>
    </h2>
    <div class="">
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
  </div>
</template>
