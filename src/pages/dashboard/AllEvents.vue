<template>
  <div class="min-h-screen bg-[#050505] p-4 text-white md:p-6">
    <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 class="text-3xl font-black md:text-4xl">All Events</h1>
        <p class="mt-2 text-gray-400">
          Review, certify, publish and manage events across EventOga.
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-5 rounded-2xl border border-purple-500/25 bg-[#0b0b0b] p-4">
      <div class="grid gap-3 md:grid-cols-4">
        <input
          v-model="filters.search"
          @input="fetchEvents"
          placeholder="Search events..."
          class="input"
        />

        <select v-model="filters.status" @change="fetchEvents" class="input">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="waiting_list">Waiting List</option>
          <option value="published">Published</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>

        <select v-model="filters.event_type" @change="fetchEvents" class="input">
          <option value="">All Types</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        <select v-model="filters.event_format" @change="fetchEvents" class="input">
          <option value="">All Formats</option>
          <option value="physical">Physical</option>
          <option value="online">Online</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
      <div v-if="isLoading" class="p-6 text-orange-400">Loading events...</div>
      <div v-else-if="errorMessage" class="p-6 text-red-400">{{ errorMessage }}</div>

      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[1100px] text-left">
          <thead class="border-b border-white/10 bg-black/40 text-xs uppercase text-gray-400">
            <tr>
              <th class="px-4 py-4">Event</th>
              <th class="px-4 py-4">Organizer</th>
              <th class="px-4 py-4">Category</th>
              <th class="px-4 py-4">Type</th>
              <th class="px-4 py-4">Format</th>
              <th class="px-4 py-4">Date</th>
              <th class="px-4 py-4">Status</th>
              <th class="px-4 py-4">Certified</th>
              <th class="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="event in events"
              :key="event.id"
              class="border-b border-white/5 transition hover:bg-white/[0.03]"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="imageUrl(event)"
                    class="h-12 w-12 rounded-xl object-cover"
                    alt=""
                  />
                  <div>
                    <p class="font-black">{{ event.title }}</p>
                    <p class="text-xs text-gray-500">#{{ event.id }}</p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4 text-sm text-gray-300">
                {{ event.organizer?.name || 'N/A' }}
              </td>

              <td class="px-4 py-4 text-sm text-gray-300">
                {{ event.category?.name || 'Uncategorized' }}
              </td>

              <td class="px-4 py-4">
                <span class="badge bg-orange-500/15 text-orange-400">
                  {{ event.event_type }}
                </span>
              </td>

              <td class="px-4 py-4">
                <span class="badge bg-purple-500/15 text-purple-300">
                  {{ event.event_format }}
                </span>
              </td>

              <td class="px-4 py-4 text-sm text-gray-300">
                {{ formatDate(event.starts_at) }}
              </td>

              <td class="px-4 py-4">
                <span class="badge" :class="statusClass(event.status)">
                  {{ readableStatus(event.status) }}
                </span>
              </td>

              <td class="px-4 py-4">
                <span
                  class="badge"
                  :class="event.is_verified ? 'bg-green-500/15 text-green-400' : 'bg-gray-500/15 text-gray-400'"
                >
                  {{ event.is_verified ? 'Certified' : 'Not Certified' }}
                </span>
              </td>

              <td class="px-4 py-4">
                <div class="flex justify-end gap-2">
                  <button @click="viewEvent(event)" class="action-btn">
                    View
                  </button>

                  <button
                    v-if="!event.is_verified"
                    @click="certifyEvent(event)"
                    class="action-btn border-green-500/40 text-green-400"
                  >
                    Certify
                  </button>

                  <button
                    v-if="event.status !== 'published'"
                    @click="publishEvent(event)"
                    class="action-btn border-orange-500/40 text-orange-400"
                  >
                    Publish
                  </button>

                  <button
                    @click="rejectEvent(event)"
                    class="action-btn border-red-500/40 text-red-400"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="events.length === 0" class="p-8 text-center text-gray-400">
          No events found.
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <p class="text-sm text-gray-400">
        Page {{ pagination.current_page }} of {{ pagination.last_page }}
      </p>

      <div class="flex gap-2">
        <button
          class="page-btn"
          :disabled="pagination.current_page <= 1"
          @click="changePage(pagination.current_page - 1)"
        >
          Previous
        </button>

        <button
          class="page-btn"
          :disabled="pagination.current_page >= pagination.last_page"
          @click="changePage(pagination.current_page + 1)"
        >
          Next
        </button>
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="selectedEvent"
      class="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
      @click="selectedEvent = null"
    >
      <div
        class="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-orange-500/30 bg-[#0b0b0b] p-6"
        @click.stop
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-2xl font-black">{{ selectedEvent.title }}</h2>
            <p class="mt-1 text-gray-400">{{ selectedEvent.short_description }}</p>
          </div>

          <button @click="selectedEvent = null" class="text-2xl text-gray-400">×</button>
        </div>

        <img
          :src="imageUrl(selectedEvent)"
          class="mt-5 h-64 w-full rounded-2xl object-cover"
          alt=""
        />

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <Info label="Organizer" :value="selectedEvent.organizer?.name || 'N/A'" />
          <Info label="Category" :value="selectedEvent.category?.name || 'N/A'" />
          <Info label="Status" :value="readableStatus(selectedEvent.status)" />
          <Info label="Date" :value="formatDate(selectedEvent.starts_at)" />
          <Info label="Location" :value="eventLocation(selectedEvent)" />
          <Info label="Format" :value="selectedEvent.event_format" />
        </div>

        <div class="mt-5">
          <h3 class="font-black text-orange-500">Description</h3>
          <p class="mt-2 leading-7 text-gray-300">
            {{ selectedEvent.description || 'No description provided.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, h, onMounted, ref } from 'vue'
import { eventService } from '@/services/eventService'
import bg1 from '@/assets/bg1.png'

const apiBaseUrl = import.meta.env.VITE_API_ROOT_URL || 'http://localhost:6969'

const events = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const selectedEvent = ref(null)

const filters = ref({
  search: '',
  status: '',
  event_type: '',
  event_format: '',
  page: 1,
})

const pagination = ref({
  current_page: 1,
  last_page: 1,
})

const Info = (props) =>
  h('div', { class: 'rounded-2xl bg-black/40 p-4' }, [
    h('p', { class: 'text-xs text-gray-500' }, props.label),
    h('p', { class: 'mt-1 font-bold text-white' }, props.value),
  ])

const fetchEvents = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await eventService.getAdminEvents(filters.value)

    events.value = response.data || []
    pagination.value = {
      current_page: response.current_page || 1,
      last_page: response.last_page || 1,
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Unable to fetch events'
  } finally {
    isLoading.value = false
  }
}

const changePage = (page) => {
  filters.value.page = page
  fetchEvents()
}

const viewEvent = (event) => {
  selectedEvent.value = event
}

const certifyEvent = async (event) => {
  await eventService.certifyEvent(event.id)
  fetchEvents()
}

const publishEvent = async (event) => {
  await eventService.publishEvent(event.id)
  fetchEvents()
}

const rejectEvent = async (event) => {
  await eventService.rejectEvent(event.id)
  fetchEvents()
}

const imageUrl = (event) => {
  if (event.banner) return `${apiBaseUrl}/storage/${event.banner}`
  if (event.thumbnail) return `${apiBaseUrl}/storage/${event.thumbnail}`
  return bg1
}

const eventLocation = (event) => {
  if (event.event_format === 'online') return event.online_platform || 'Online'
  return [event.venue_name, event.city, event.state].filter(Boolean).join(', ') || 'Location not set'
}

const formatDate = (date) => {
  if (!date) return 'Date not set'
  return new Date(date).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const readableStatus = (status) => {
  const map = {
    draft: 'Draft',
    pending_approval: 'Pending Approval',
    waiting_list: 'Waiting List',
    published: 'Published',
    completed: 'Completed',
    cancelled: 'Cancelled',
    expired: 'Expired',
    rejected: 'Rejected',
    suspended: 'Suspended',
  }

  return map[status] || status
}

const statusClass = (status) => {
  const map = {
    published: 'bg-green-500/15 text-green-400',
    waiting_list: 'bg-purple-500/15 text-purple-300',
    pending_approval: 'bg-yellow-500/15 text-yellow-300',
    rejected: 'bg-red-500/15 text-red-400',
    suspended: 'bg-red-500/15 text-red-400',
    cancelled: 'bg-red-500/15 text-red-400',
    completed: 'bg-gray-500/15 text-gray-300',
    draft: 'bg-orange-500/15 text-orange-400',
  }

  return map[status] || 'bg-white/10 text-gray-300'
}

onMounted(fetchEvents)
</script>

<style scoped>
.input {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid rgba(168, 85, 247, 0.25);
  background: rgba(0, 0, 0, 0.45);
  padding: 0.8rem 1rem;
  color: white;
  outline: none;
}

.input:focus {
  border-color: rgba(249, 115, 22, 0.7);
}

.badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
}

.action-btn {
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-radius: 0.7rem;
  padding: 0.45rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #c084fc;
  transition: 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.page-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.7rem 1rem;
  color: white;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>