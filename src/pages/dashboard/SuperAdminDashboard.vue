<template>
  <div class="space-y-7 text-white">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div><p class="text-sm font-bold uppercase tracking-widest text-purple-400">Superadmin</p><h1 class="mt-2 text-3xl font-black md:text-4xl">EventOga overview</h1><p class="mt-2 text-gray-400">Live activity and the work needing your review.</p></div>
      <router-link to="/dashboard/import-events" class="rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-3 font-bold">Import events</router-link>
    </header>
    <p v-if="loading" class="rounded-xl bg-orange-500/10 p-4 text-orange-300">Loading dashboard…</p>
    <div v-if="error" class="rounded-xl bg-red-500/10 p-4 text-red-300" role="alert">{{ error }} <button class="ml-3 underline" @click="load">Retry</button></div>
    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="stat in overviewCards" :key="stat.label" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5"><p class="text-sm text-gray-400">{{ stat.label }}</p><p class="mt-3 text-3xl font-black">{{ stat.value.toLocaleString() }}</p></div>
    </section>
    <section class="grid gap-5 lg:grid-cols-2">
      <router-link to="/dashboard/all-events?status=submitted" class="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 transition hover:border-purple-400"><p class="text-sm text-purple-300">Events awaiting approval</p><p class="mt-2 text-4xl font-black">{{ number(stats.action_required?.events_awaiting_approval) }}</p><p class="mt-4 text-sm font-bold">Review events →</p></router-link>
      <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6"><p class="text-sm text-orange-300">Organizer applications</p><p class="mt-2 text-4xl font-black">{{ number(stats.action_required?.organizer_applications) }}</p><p class="mt-4 text-sm text-gray-400">Approval workflow is coming in the organizer phase.</p></div>
    </section>
    <section class="grid gap-5 lg:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6"><div class="flex items-center justify-between"><h2 class="text-xl font-bold">Event status</h2><router-link to="/dashboard/all-events" class="text-sm text-orange-400">View all</router-link></div><div class="mt-5 space-y-3"><div v-for="item in eventStatuses" :key="item.label" class="flex justify-between border-b border-white/10 pb-3 text-sm"><span class="text-gray-300">{{ item.label }}</span><strong>{{ item.value }}</strong></div></div></div>
      <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6"><div class="flex items-center justify-between"><h2 class="text-xl font-bold">Recent imports</h2><router-link to="/dashboard/import-events" class="text-sm text-orange-400">New import</router-link></div><p v-if="!stats.recent_imports?.length" class="mt-5 text-sm text-gray-400">No spreadsheets imported yet.</p><div v-for="batch in stats.recent_imports" :key="batch.id" class="mt-4 border-b border-white/10 pb-4 text-sm"><div class="flex justify-between gap-3"><strong>{{ batch.filename }}</strong><span class="capitalize text-purple-300">{{ batch.status }}</span></div><p class="mt-1 text-gray-400">{{ batch.imported_count }} imported · {{ batch.rejected_count }} rejected · {{ formatDate(batch.created_at) }}</p></div></div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { dashboardService } from '@/services/dashboardService'

const stats = ref({})
const loading = ref(false)
const error = ref('')
const number = value => Number(value || 0)
const formatDate = value => new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeZone: 'Africa/Lagos' }).format(new Date(value))
const overviewCards = computed(() => [
  { label: 'Users', value: number(stats.value.overview?.total_users) },
  { label: 'Organizers', value: number(stats.value.overview?.total_organizers) },
  { label: 'Events', value: number(stats.value.overview?.total_events) },
  { label: 'Suspended accounts', value: number(stats.value.overview?.suspended_accounts) },
])
const eventStatuses = computed(() => [
  { label: 'Published', value: number(stats.value.event_status?.published_events) },
  { label: 'Awaiting approval', value: number(stats.value.action_required?.events_awaiting_approval) },
  { label: 'Rejected', value: number(stats.value.event_status?.rejected_events) },
  { label: 'Suspended', value: number(stats.value.event_status?.suspended_events) },
])
async function load() {
  loading.value = true
  error.value = ''
  try { stats.value = await dashboardService.getAdminDashboardStats() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not load the dashboard.' }
  finally { loading.value = false }
}
onMounted(load)
</script>
