<template>
  <main class="space-y-6 text-white"><header class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-sm font-bold uppercase tracking-widest text-orange-400">Organizer studio</p><h1 class="mt-2 text-3xl font-black">My events</h1><p class="mt-2 text-gray-400">Manage your drafts and track superadmin review.</p></div><router-link to="/dashboard/create-event" class="rounded-xl bg-orange-500 px-5 py-3 font-bold text-black">Create event</router-link></header>
    <p v-if="error" role="alert" class="rounded-xl bg-red-500/10 p-4 text-red-300">{{ error }}</p>
    <div v-if="loading" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 text-gray-400">Loading your events…</div>
    <div v-else-if="!events.length" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-10 text-center"><h2 class="text-xl font-bold">No events yet</h2><p class="mt-2 text-gray-400">Create a draft to get started.</p></div>
    <div v-else class="grid gap-4 md:grid-cols-2"><article v-for="event in events" :key="event.id" class="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]"><img v-if="event.image_url" :src="event.image_url" :alt="event.title" class="h-44 w-full object-cover" /><div class="p-5"><div class="flex items-start justify-between gap-3"><h2 class="text-xl font-bold">{{ event.title }}</h2><span class="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold capitalize text-orange-300">{{ event.status }}</span></div><p class="mt-3 text-sm text-gray-400">{{ event.category_name }} · {{ formatDate(event.starts_at) }}</p><p class="mt-1 text-sm text-gray-400">{{ event.city }}, {{ event.state }}</p><p v-if="event.review_note" class="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">Review note: {{ event.review_note }}</p><div class="mt-5 flex flex-wrap gap-4 text-sm font-bold"><router-link v-if="['draft','rejected'].includes(event.status)" :to="`/dashboard/edit-event/${event.id}`" class="text-orange-400 hover:underline">Edit draft</router-link><button v-if="['draft','rejected'].includes(event.status)" :disabled="busyId === event.id" class="text-purple-300 hover:underline disabled:opacity-50" @click="submit(event)">Submit for review</button><router-link v-if="event.status === 'published'" :to="`/events/${event.slug}`" class="text-green-300 hover:underline">View listing</router-link></div></div></article></div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { eventService } from '@/services/eventService'

const events = ref([])
const loading = ref(true)
const busyId = ref('')
const error = ref('')
const formatDate = value => new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lagos' }).format(new Date(value))
async function load() {
  loading.value = true
  try { events.value = await eventService.getMyEvents() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not load your events.' }
  finally { loading.value = false }
}
async function submit(event) {
  busyId.value = event.id
  error.value = ''
  try { await eventService.submitEvent(event.id); await load() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not submit the event.' }
  finally { busyId.value = '' }
}
onMounted(load)
</script>
