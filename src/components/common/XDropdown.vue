<template>
  <div ref="dropdownMenu" class="relative inline-block">
    <button
      class="flex items-center gap-x-3 bg-gray-100 border border-gray-300 p-2 cursor-pointer rounded-lg"
      @click="toggleDropdown"
    >
      {{ selectedLabel }}
      <Chevron class="w-5 h-5 transition" :class="{ 'rotate-180': isOpen }" />
    </button>
    <div
      v-if="isOpen"
      class="absolute w-max bg-white border border-gray-300 rounded-lg shadow-lg z-10"
      :class="{
        'bottom-full -translate-y-1': position === 'top',
        'top-full translate-y-1': position === 'bottom',
      }"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="py-2 px-4 cursor-pointer hover:bg-gray-100"
        :class="{
          'bg-gray-100 pointer-events-none': option === value,
        }"
        @click="selectOption(option)"
      >
        {{ option === "" ? "Select an option" : String(option) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: (string | number)[];
    value: string | number;
    position?: string;
  }>(),
  {
    position: "bottom",
  }
);

const emit = defineEmits<{
  (e: "input", value: typeof props.value): void;
}>();

const dropdownMenu = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const selectedLabel = computed(() =>
  props.value === "" ? "Select an option" : String(props.value)
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: typeof props.value) => {
  isOpen.value = false;
  emit("input", option);
};

onClickOutside(dropdownMenu, () => {
  isOpen.value = false;
});
</script>
