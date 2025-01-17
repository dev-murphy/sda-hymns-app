export const useLandscape = () => {
  const { width, height } = useWindowSize();

  const isLandscape = computed(() => width.value >= height.value);

  return {
    isLandscape,
  };
};
