<script lang="ts" setup>
// import { fetchCategories, fetchSubcategories } from "../../db";

const router = useRouter();
const route = useRoute();

function formatText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "-");
}

const category = ref("");
const subcategory = ref("");
const subcateogryUrl = ref(
  `subcategories${
    category.value ? `?category=${formatText(category.value)}` : ""
  }`,
);

if (route.query.categories !== undefined) {
  if (route.query.categories?.includes(":")) {
    category.value = (route.query.categories as string).split(":")[0];
    subcategory.value = (route.query.categories as string).split(":")[1];
  } else {
    category.value = route.query.categories as string;
  }
}

const { data: categories, fetchData: fetchCategories } =
  useData<string[]>(`categories`);
const { data: subcategories, fetchData: fetchSubcategories } =
  useData<string[]>(subcateogryUrl);

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
    subcateogryUrl.value = `subcategories${
      category.value ? `?category=${formatText(value)}` : ""
    }`;
  },
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
  },
);

onMounted(() => {
  fetchCategories();
  fetchSubcategories();
});
</script>

<template>
  <div class="flex items-center gap-x-1">
    <p>Hymns</p>
    <Chevron class="w-5 h-5 -rotate-90" />
    <XDropdown
      :value="category"
      :options="categories || []"
      type="flat"
      default-text="Categories"
      @input="
        (value: string | number) => {
          category = value as string;
        }
      "
    />
    <div v-if="subcategories?.length !== 0" class="flex items-center">
      <Chevron class="w-5 h-5 -rotate-90" />
      <XDropdown
        :value="subcategory"
        :options="subcategories || []"
        type="flat"
        default-text="Subcategories"
        @input="
          (value: string | number) => {
            subcategory = value as string;
          }
        "
      />
    </div>
  </div>
</template>
