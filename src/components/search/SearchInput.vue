<template>
  <div class="relative flex items-center">
    <Search class="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5" />
    <input
      :id="id"
      class="w-full border-b border-neutral-300 p-3 pl-10 outline-none"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="onInput"
    />

    <button
      v-if="modelValue"
      class="absolute top-1/2 -translate-y-1/2 right-3"
      @click="$emit('update:modelValue', '')"
    >
      <Close class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Search from "../icons/Search.vue";

defineProps({
  modelValue: String, // The value bound to the input
  label: String, // Optional label text
  placeholder: {
    type: String,
    default: "Enter text",
  },
  type: {
    type: String,
    default: "text", // Supports text, password, email, etc.
  },
  id: {
    type: String,
    default: () => `text-input-${Math.random().toString(36).substr(2, 9)}`,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>
