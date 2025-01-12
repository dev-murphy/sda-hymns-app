<template>
  <div class="relative flex items-center">
    <Search class="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5" />
    <input
      :id="id"
      ref="inputRef"
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
withDefaults(
  defineProps<{
    label: string;
    modelValue: string;
    id?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    id: `text-input-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    placeholder: "Enter text",
    disabled: false,
  }
);

const emit = defineEmits(["update:modelValue"]);
const inputRef = ref<HTMLInputElement | null>(null);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

onMounted(() => {
  if (inputRef.value === null) return;
  inputRef.value.focus();
});
</script>
