<template>
  <div
    class="fixed w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-500 to-blue-500"
  >
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="absolute rounded-full blur-[30px] opacity-60 animate-float"
      :style="bubble.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Define a bubble type
interface Bubble {
  id: number;
  style: Record<string, string>;
}

const bubbles = reactive<Bubble[]>([]);
const bubbleCount = 20;

// Function to generate a random number within a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Function to create bubble styles
const createBubbleStyle = (): Record<string, string> => {
  const size = random(250, 1000);
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${random(0, 100)}%`,
    left: `${random(0, 100)}%`,
    background: `radial-gradient(circle, hsl(${random(
      0,
      360
    )}, 70%, 60%) 0%, transparent 70%)`,
  };
};

// Create bubbles on mount
onMounted(() => {
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({ id: i, style: createBubbleStyle() });
  }
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-20px, -50px) scale(1.5);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}
</style>
