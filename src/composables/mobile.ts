import { ref, onMounted } from "vue";

export function useMobile() {
  const isMobile = ref(false);

  onMounted(() => {
    // Check for mobile-specific features using navigator.userAgent
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      "android",
      "webos",
      "iphone",
      "ipad",
      "ipod",
      "blackberry",
      "windows phone",
    ];

    // Check if any mobile keywords exist in userAgent
    isMobile.value = mobileKeywords.some((keyword) => userAgent.includes(keyword));

    // Additional check for touch capability
    if ("maxTouchPoints" in navigator) {
      isMobile.value = isMobile.value || navigator.maxTouchPoints > 0;
    }
  });

  return {
    isMobile,
  };
}
