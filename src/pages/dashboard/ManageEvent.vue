<template>
  <div class="p-6">
    <h1 class="text-3xl font-black">Manage Event</h1>
    <p class="mt-2 text-gray-400">Review and publish event (admin).</p>

    <div class="mt-6">
      <p class="text-sm text-gray-300">Managing event ID: <strong>{{ id }}</strong></p>

      <div class="mt-4 flex gap-3">
        <button class="rounded px-4 py-2 bg-green-600 text-white">Publish</button>
        <button class="rounded px-4 py-2 bg-yellow-600 text-black">Request Changes</button>
        <button class="rounded px-4 py-2 bg-red-600 text-white">Reject</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id || 'unknown'
</script>

<style scoped>
</style>
