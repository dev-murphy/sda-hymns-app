import {
  fetchAllHymns,
  fetchCategories,
  fetchHymn,
  fetchSubcategories,
  filterHymnsByCategories,
} from "../db";
import type { QueryParams } from "../types";
import { parseQueryString } from "../utils";

export function useData<T>(apiUrl: Ref<string> | string) {
  const data = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const apiValue = typeof apiUrl === "string" ? apiUrl : apiUrl.value;
      const sections = apiValue.split("/");

      if (sections[sections.length - 1].startsWith("all")) {
        data.value = await fetchAllHymns();
      }

      // Hymn fetch
      if (!isNaN(Number(sections[sections.length - 1]))) {
        if (sections[sections.length - 2].startsWith("hymns")) {
          const hymnNumber = Number(sections[sections.length - 1]);
          data.value = await fetchHymn(hymnNumber);
        }
      }

      // Categories fetch
      if (sections[sections.length - 1].startsWith("categories")) {
        data.value = await fetchCategories();
      }

      // Subcategories fetch
      if (sections[sections.length - 1].startsWith("subcategories")) {
        const queryString = (
          typeof apiUrl === "string" ? apiUrl : apiUrl.value
        ).split("?")[1];

        if (queryString !== undefined) {
          const query = parseQueryString<{ category?: string }>(queryString);
          data.value = await fetchSubcategories(query.category);
        } else {
          data.value = [];
        }
      }

      // Hymns fetch
      if (sections[sections.length - 1].startsWith("hymns")) {
        const queryString = (
          typeof apiUrl === "string" ? apiUrl : apiUrl.value
        ).split("?")[1];
        const query = parseQueryString<QueryParams>(queryString);

        data.value = await filterHymnsByCategories(
          query.categories,
          query.offset,
          query.limit
        );
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "An unknown error occurred";
    } finally {
      isLoading.value = false;
    }
  };

  if (typeof apiUrl !== "string") {
    watch(apiUrl, () => {
      fetchData();
    });
  }

  return {
    data: computed(() => data.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchData,
  };
}
