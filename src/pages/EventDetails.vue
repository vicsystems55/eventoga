<template>
  <main class="min-h-screen bg-[#050505] px-4 py-10 text-white md:px-6">
    <div class="mx-auto max-w-5xl">
      <router-link to="/events" class="text-sm text-orange-400 hover:underline">← All events</router-link>
      <p v-if="loading" class="mt-8 text-gray-400">Loading event…</p>
      <div v-else-if="error" class="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">{{ error }}</div>
      <article v-else-if="event" class="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">
        <div class="relative h-64 md:h-96"><img :src="event.image_url || fallback" :alt="event.title" class="h-full w-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div><h1 class="absolute bottom-6 left-6 right-6 text-3xl font-black md:text-5xl">{{ event.title }}</h1></div>
        <div class="grid gap-8 p-6 md:grid-cols-[1fr_300px] md:p-8">
          <div class="space-y-7">
            <div class="flex flex-wrap gap-2 text-sm"><span class="rounded-full bg-purple-500/15 px-3 py-1 text-purple-300">{{ event.category_name || 'Event' }}</span><span class="rounded-full bg-white/10 px-3 py-1 capitalize">{{ event.event_format }}</span><span v-if="event.source_type === 'import'" class="rounded-full bg-orange-500/15 px-3 py-1 text-orange-300">External listing</span></div>
            <section><h2 class="text-xl font-bold">About this event</h2><p class="mt-3 whitespace-pre-line leading-7 text-gray-300">{{ event.description || event.short_description || 'See the original listing for more information.' }}</p></section>
            <section><h2 class="text-xl font-bold">Location</h2><p class="mt-3 text-gray-300">{{ [event.venue_name, event.address, event.city, event.state].filter(Boolean).join(', ') }}</p></section>
            <section v-if="event.source_type === 'import'"><h2 class="text-xl font-bold">Listing source</h2><p class="mt-3 text-gray-300">{{ event.source_name || 'External event listing' }}</p><p class="mt-2 text-sm text-gray-400">EventOga has not verified this event or its ticket availability. Check details with the original source before making plans.</p><a :href="event.source_url" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block text-orange-400 underline">View original listing</a></section>
          </div>
          <aside class="h-fit rounded-2xl border border-orange-500/25 bg-orange-500/5 p-5"><h2 class="text-lg font-bold">Event information</h2><p class="mt-5 text-sm text-gray-400">Date and time</p><p class="mt-1 font-semibold">{{ formatDate(event.starts_at) }}</p><p class="mt-5 text-sm text-gray-400">Admission</p><p class="mt-1 font-semibold">{{ event.event_type === 'free' ? 'Free' : 'See original source for price' }}</p><a v-if="event.source_type === 'import'" :href="event.external_ticket_url || event.source_url" target="_blank" rel="noopener noreferrer" class="mt-6 block rounded-xl bg-orange-500 px-4 py-3 text-center font-bold hover:bg-orange-600">{{ event.external_ticket_url ? 'Tickets at original source' : 'Event information' }} ↗</a><p v-else class="mt-6 text-sm text-gray-400">EventOga ticket checkout is coming soon.</p></aside>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { eventService } from '@/services/eventService'
import fallback from '@/assets/bg1.png'

const route = useRoute()
const event = ref(null)
const loading = ref(false)
const error = ref('')
const formatDate = value => new Intl.DateTimeFormat('en-NG', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Lagos' }).format(new Date(value))
async function load() {
  loading.value = true
  error.value = ''
  try { event.value = await eventService.getEvent(route.params.id) }
  catch (cause) { event.value = null; error.value = cause.response?.status === 404 ? 'Event not found.' : 'Could not load this event.' }
  finally { loading.value = false }
}
onMounted(load)
watch(() => route.params.id, load)
</script>
