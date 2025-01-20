import type { HymnData } from "./../types/index";
import { filterHymnsByCategories } from "../db";
import { parseQueryString } from "../utils";

export function useData(apiUrl: Ref<string>) {
  const { isOnline } = useNetwork();
  const data = ref<{ count: number; hymns: HymnData[] }>({
    count: 0,
    hymns: [],
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (isOnline.value) {
        const { data: fetchedData, error: fetchError } = await useFetch<{
          count: number;
          hymns: HymnData[];
        }>(typeof apiUrl === "string" ? apiUrl : apiUrl.value)
          .get()
          .json<{ count: number; hymns: HymnData[] }>();

        if (fetchError.value) {
          throw new Error(fetchError.value.message);
        }

        data.value = fetchedData.value || {
          count: 0,
          hymns: [],
        };
      } else {
        const queryString = (
          typeof apiUrl === "string" ? apiUrl : apiUrl.value
        ).split("?")[1];
        const query = parseQueryString(queryString);

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

  watch(apiUrl, () => {
    fetchData();
  });

  return {
    data: computed(() => data.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    fetchData,
  };
}
