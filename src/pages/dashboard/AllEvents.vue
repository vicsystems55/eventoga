<template>
  <div class="space-y-6 text-white">
    <header class="flex flex-wrap items-end justify-between gap-4"><div><h1 class="text-3xl font-black">All events</h1><p class="mt-2 text-gray-400">Review organizer submissions and manage published events.</p></div><router-link to="/dashboard/import-events" class="rounded-xl bg-orange-500 px-5 py-3 font-bold">Import events</router-link></header>
    <div class="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4"><input v-model="search" class="min-w-60 flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-orange-500" placeholder="Search events" @keyup.enter="load(1)" /><select v-model="status" class="rounded-xl border border-white/10 bg-black px-4 py-3" @change="load(1)"><option value="">All statuses</option><option value="submitted">Awaiting approval</option><option value="published">Published</option><option value="draft">Draft</option><option value="rejected">Rejected</option><option value="suspended">Suspended</option></select><button class="rounded-xl bg-purple-600 px-5 py-3 font-bold" @click="load(1)">Search</button></div>
    <p v-if="error" class="rounded-xl bg-red-500/10 p-4 text-red-300" role="alert">{{ error }}</p>
    <div class="overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b0b]"><table class="w-full min-w-[850px] text-left text-sm"><thead class="border-b border-white/10 text-gray-400"><tr><th class="p-4">Event</th><th class="p-4">Organizer / source</th><th class="p-4">Date</th><th class="p-4">Status</th><th class="p-4">Actions</th></tr></thead><tbody><tr v-if="loading"><td colspan="5" class="p-6 text-gray-400">Loading events…</td></tr><tr v-else-if="!events.length"><td colspan="5" class="p-6 text-gray-400">No events match this filter.</td></tr><tr v-for="event in events" :key="event.id" class="border-b border-white/10"><td class="p-4"><p class="font-bold">{{ event.title }}</p><p class="mt-1 text-xs text-gray-400">{{ event.category_name || 'Uncategorized' }} · {{ event.city }}, {{ event.state }}</p></td><td class="p-4 text-gray-300">{{ event.organizer_name || (event.source_type === 'import' ? 'Imported listing' : 'Admin') }}</td><td class="p-4 text-gray-300">{{ formatDate(event.starts_at) }}</td><td class="p-4"><span class="rounded-full bg-white/10 px-3 py-1 capitalize">{{ event.status }}</span></td><td class="space-x-2 p-4"><button v-if="event.status === 'submitted'" class="text-green-400 hover:underline" :disabled="busyId === event.id" @click="act(event, 'approve')">Approve</button><button v-if="event.status === 'submitted'" class="text-orange-400 hover:underline" :disabled="busyId === event.id" @click="act(event, 'reject')">Reject</button><button v-if="event.status === 'published' && event.source_type === 'organizer'" class="text-red-400 hover:underline" :disabled="busyId === event.id" @click="act(event, 'suspend')">Suspend</button><a v-if="event.status === 'published'" :href="`/events/${event.slug}`" class="text-purple-300 hover:underline">View</a></td></tr></tbody></table></div>
    <div class="flex items-center justify-between text-sm text-gray-400"><span>{{ total }} events</span><div class="space-x-3"><button :disabled="page <= 1 || loading" class="disabled:opacity-40" @click="load(page - 1)">Previous</button><span>{{ page }} / {{ lastPage }}</span><button :disabled="page >= lastPage || loading" class="disabled:opacity-40" @click="load(page + 1)">Next</button></div></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { eventService } from '@/services/eventService'

const route = useRoute()
const search = ref('')
const status = ref(route.query.status || '')
const events = ref([])
const page = ref(1)
const lastPage = ref(1)
const total = ref(0)
const loading = ref(false)
const busyId = ref(null)
const error = ref('')
const formatDate = value => new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeZone: 'Africa/Lagos' }).format(new Date(value))

async function load(nextPage = page.value) {
  loading.value = true
  error.value = ''
  try {
    const data = await eventService.getAdminEvents({ page: nextPage, status: status.value, search: search.value })
    events.value = data.data
    page.value = data.current_page
    lastPage.value = data.last_page
    total.value = data.total
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not load events.' }
  finally { loading.value = false }
}
async function act(event, action) {
  const note = action === 'approve' ? '' : window.prompt(`Reason to ${action} this event:`)
  if (note === null || (action !== 'approve' && !note.trim())) return
  busyId.value = event.id
  error.value = ''
  try { await eventService.reviewEvent(event.id, action, note); await load() }
  catch (cause) { error.value = cause.response?.data?.message || `Could not ${action} event.` }
  finally { busyId.value = null }
}
onMounted(() => load(1))
</script>
