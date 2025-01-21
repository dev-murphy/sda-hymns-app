<template>
  <div class="w-screen min-h-screen flex flex-col items-center justify-center px-5">
    <img src="../assets/music-notes.png" alt="404" class="w-20 h-20" />

    <h1 class="text-3xl md:text-5xl font-open-sans font-bold">
      404 - Page Not Found
    </h1>
    <p class="mt-2 mb-5 text-xl text-center">Oops! The page you are looking for does not exist.</p>

    <RouterLink
      to="/"
      class="w-max bg-neutral-900 px-4 py-2 flex items-center gap-x-2 text-white rounded-full"
    >
      <Home class="w-5 h-5" />
      <span>Return to Home</span>
    </RouterLink>
  </div>
</template>
