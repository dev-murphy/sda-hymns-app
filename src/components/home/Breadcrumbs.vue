<script lang="ts" setup>
import { useFetch } from "@vueuse/core";

const router = useRouter();
const route = useRoute();
const API_URL = import.meta.env.VITE_API_URL;

function formatText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-");
}

const category = ref("");
const subcategory = ref("");
const subcateogryUrl = ref(
  `${API_URL}subcategories${
    category.value ? `?category=${formatText(category.value)}` : ""
  }`
);

if (route.query.categories !== undefined) {
  if (route.query.categories?.includes(":")) {
    category.value = (route.query.categories as string).split(":")[0];
    subcategory.value = (route.query.categories as string).split(":")[1];
  } else {
    category.value = route.query.categories as string;
  }
}

const { data: categories } = useFetch<string[]>(`${API_URL}categories`)
  .get()
  .json();
const { data: subcategories } = useFetch<string[]>(subcateogryUrl, {
  refetch: true,
})
  .get()
  .json();

watch(
  () => category.value,
  (value) => {
    subcategory.value = "";
    router.push({
      query: {
        ...route.query,
        offset: 0,
        categories: value === "" ? undefined : value,
      },
    });
    subcateogryUrl.value = `${API_URL}subcategories${
      category.value ? `?category=${formatText(value)}` : ""
    }`;
  }
);

watch(
  () => subcategory.value,
  (value) => {
    if (value === "") {
      router.push({
        query: {
          ...route.query,
          offset: 0,
          categories: category.value === "" ? undefined : category.value,
        },
      });
      return;
    }

    const newCategories = `${category.value}:${value}`;
    router.push({
      query: { ...route.query, offset: 0, categories: newCategories },
    });
  }
);
</script>

<template>
  <div class="flex items-center gap-x-2">
    <p>Hymns</p>
    <Chevron class="w-5 h-5 -rotate-90" />
    <XDropdown
      :value="category"
      :options="categories || []"
      @input="(value: string | number) => { category = value as string;}"
    />
    <div v-if="subcategories?.length !== 0" class="flex items-center">
      <Chevron class="w-5 h-5 -rotate-90" />
      <XDropdown
        :value="subcategory"
        :options="subcategories || []"
        @input="(value: string | number) => { subcategory = value as string;}"
      />
    </div>
  </div>
</template>
