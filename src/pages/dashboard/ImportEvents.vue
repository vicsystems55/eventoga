<template>
  <div class="mx-auto max-w-5xl space-y-6 text-white">
    <div>
      <h1 class="text-3xl font-black">Import events</h1>
      <p class="mt-2 text-gray-400">Upload current-month public event listings, review the rows, then publish valid entries.</p>
    </div>
    <div class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
      <label for="event-file" class="block font-semibold">Excel spreadsheet (.xlsx, up to 500 rows and 5 MB)</label>
      <input id="event-file" type="file" accept=".xlsx" class="mt-3 block w-full text-sm" @change="chooseFile" />
      <p class="mt-3 text-sm text-gray-400">Required: title, category, start_date, city, state, event_format, event_type, source_url. Dates use YYYY-MM-DD; times use HH:mm.</p>
      <button class="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-bold disabled:opacity-50" :disabled="!file || busy" @click="preview">{{ busy ? 'Checking…' : 'Preview import' }}</button>
    </div>
    <p v-if="error" class="rounded-xl bg-red-500/10 p-4 text-red-300" role="alert">{{ error }}</p>
    <p v-if="message" class="rounded-xl bg-green-500/10 p-4 text-green-300" role="status">{{ message }}</p>
    <div v-if="batch" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div><h2 class="text-xl font-bold">Preview</h2><p class="text-sm text-gray-400">{{ validCount }} valid · {{ batch.rows.length - validCount }} need review</p></div>
        <button class="rounded-xl bg-purple-600 px-5 py-3 font-bold disabled:opacity-50" :disabled="!validCount || busy || confirmed" @click="confirm">{{ busy ? 'Publishing…' : confirmed ? 'Published' : `Publish ${validCount} valid events` }}</button>
      </div>
      <div class="mt-5 max-h-[32rem] overflow-auto">
        <table class="w-full min-w-[650px] text-left text-sm">
          <thead class="border-b border-white/15 text-gray-400"><tr><th class="p-3">Row</th><th class="p-3">Event</th><th class="p-3">Status</th><th class="p-3">Issues</th></tr></thead>
          <tbody><tr v-for="row in batch.rows" :key="row.row_number" class="border-b border-white/10"><td class="p-3">{{ row.row_number }}</td><td class="p-3">{{ row.title || 'Untitled' }}</td><td class="p-3" :class="row.status === 'valid' ? 'text-green-400' : 'text-orange-400'">{{ row.status }}</td><td class="p-3 text-gray-300">{{ row.errors.join(', ') || '—' }}</td></tr></tbody>
        </table>
      </div>
    </div>
    <section class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
      <div class="flex items-center justify-between"><h2 class="text-xl font-bold">Import history</h2><button class="text-sm text-orange-400" @click="loadHistory">Refresh</button></div>
      <p v-if="!history.length" class="mt-4 text-sm text-gray-400">No imports yet.</p>
      <div v-for="item in history" :key="item.id" class="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-sm">
        <div><p class="font-bold">{{ item.filename }} <span class="ml-2 capitalize text-purple-300">{{ item.status }}</span></p><p class="mt-1 text-gray-400">{{ formatDate(item.created_at) }} · {{ item.imported_count }} imported · {{ item.rejected_count }} rejected</p></div>
        <button v-if="item.rejected_count || item.status === 'previewed'" class="text-orange-400 hover:underline" @click="downloadRejected(item)">Download rejected rows</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { importService } from '@/services/importService'

const file = ref(null)
const batch = ref(null)
const busy = ref(false)
const confirmed = ref(false)
const error = ref('')
const message = ref('')
const history = ref([])
const formatDate = value => new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeZone: 'Africa/Lagos' }).format(new Date(value))
const validCount = computed(() => batch.value?.rows.filter(row => row.status === 'valid').length || 0)

function chooseFile(event) {
  file.value = event.target.files?.[0] || null
  batch.value = null
  confirmed.value = false
  error.value = ''
}
async function preview() {
  if (!file.value) return
  if (!file.value.name.toLowerCase().endsWith('.xlsx') || file.value.size > 5 * 1024 * 1024) {
    error.value = 'Choose an .xlsx file no larger than 5 MB.'
    return
  }
  busy.value = true
  error.value = ''
  message.value = ''
  try { batch.value = await importService.preview(file.value); await loadHistory() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not preview the spreadsheet.' }
  finally { busy.value = false }
}
async function confirm() {
  busy.value = true
  error.value = ''
  try {
    const result = await importService.confirm(batch.value.batch_id)
    confirmed.value = true
    message.value = `${result.imported_count} events published.`
    await loadHistory()
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not publish the events.' }
  finally { busy.value = false }
}
async function loadHistory() {
  try { history.value = await importService.history() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not load import history.' }
}
async function downloadRejected(item) {
  try {
    const blob = await importService.rejectedRows(item.id)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `eventoga-import-${item.id}-rejections.csv`
    link.click()
    URL.revokeObjectURL(url)
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not download rejected rows.' }
}
onMounted(loadHistory)
</script>
