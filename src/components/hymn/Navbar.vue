<template>
  <header class="w-full border-b border-neutral-300">
    <nav
      class="w-full max-w-[1200px] flex items-center justify-between mx-auto py-2 px-2 md:px-5"
    >
      <RouterLink to="/" class="flex items-center gap-x-2">
        <img src="../../assets/images/logo.webp" alt="logo" class="w-7" />
        <div class="text-2xl font-bold">
          <p class="block text-base text-neutral-500 font-arima font-medium">
            Seventh-Day Adventist
          </p>
          <p class="-mt-3 text-2xl">Hymnal App</p>
        </div>
      </RouterLink>
      <SearchButton />
    </nav>
  </header>
</template>
