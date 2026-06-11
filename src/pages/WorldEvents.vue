<template>
  <main class="min-h-screen bg-[#050505] px-4 py-10 text-white md:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <h1 class="text-5xl font-black md:text-7xl">
          World <span class="text-orange-500">Events</span> 🌍
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-gray-400">
          Explore major events happening across the world.
        </p>
      </div>

      <div class="mt-10">
        <WorldGlobe />
      </div>
    </div>
  </main>
</template>

<script setup>
import WorldGlobe from '@/components/WorldGlobe.vue'
</script>