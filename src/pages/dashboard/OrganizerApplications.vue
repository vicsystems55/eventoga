<template>
  <main class="space-y-6 text-white"><div><h1 class="text-3xl font-black">Organizer applications</h1><p class="mt-2 text-gray-400">Review who can publish events on EventOga.</p></div>
    <div class="flex gap-3"><select v-model="status" class="rounded-xl border border-white/10 bg-[#111] px-4 py-3" @change="load"><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="">All</option></select><button class="text-sm text-orange-400" @click="load">Refresh</button></div>
    <p v-if="error" role="alert" class="rounded-xl bg-red-500/10 p-4 text-red-300">{{ error }}</p><p v-if="loading" class="text-gray-400">Loading applications…</p><p v-else-if="!applications.length" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 text-gray-400">No applications in this view.</p>
    <div v-else class="grid gap-4 md:grid-cols-2"><article v-for="item in applications" :key="item.id" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6"><div class="flex items-start justify-between gap-4"><div><h2 class="text-xl font-bold">{{ item.business_name }}</h2><p class="mt-1 text-sm text-gray-400">{{ item.display_name }} · {{ item.email }}</p></div><span class="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold capitalize text-orange-300">{{ item.approval_status }}</span></div><p class="mt-4 text-sm text-gray-300">{{ item.description || 'No description provided.' }}</p><p class="mt-3 text-sm text-gray-400">{{ item.city }}, {{ item.state }}</p><div v-if="item.approval_status === 'pending'" class="mt-5 flex gap-4 border-t border-white/10 pt-4 text-sm font-bold"><button :disabled="busyId === item.id" class="text-green-400 disabled:opacity-50" @click="review(item,'approve')">Approve</button><button :disabled="busyId === item.id" class="text-red-300 disabled:opacity-50" @click="review(item,'reject')">Reject</button></div></article></div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { adminOrganizerService } from '@/services/adminOrganizerService'
const applications = ref([])
const status = ref('pending')
const busyId = ref('')
const loading = ref(false)
const error = ref('')
async function load() {
  loading.value = true
  error.value = ''
  try { applications.value = await adminOrganizerService.applications(status.value) }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not load applications.' }
  finally { loading.value = false }
}
async function review(item, action) {
  busyId.value = item.id
  error.value = ''
  try { await adminOrganizerService.review(item.id, action); await load() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not review the application.' }
  finally { busyId.value = '' }
}
onMounted(load)
</script>
