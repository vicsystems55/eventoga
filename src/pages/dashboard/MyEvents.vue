<template>
  <div class="ambient-dashboard min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 class="text-3xl font-black md:text-4xl">My Events</h1>
        <p class="mt-1 text-gray-400">
          Manage and monitor all your events in one place.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button @click="goToCreate" type="button"
          class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange transition hover:bg-orange-600">
          ＋ Create Event
        </button>

        <button
          class="rounded-xl border border-purple-500/40 px-6 py-3 font-bold text-purple-300 glow-purple-soft transition hover:bg-purple-500/10">
          ◰ View Analytics
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border p-5"
        :class="stat.color === 'orange' ? 'border-orange-500/40 glow-orange-card' : 'border-purple-500/40 glow-purple-card'">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="grid h-14 w-14 place-items-center rounded-2xl"
              :class="stat.color === 'orange' ? 'bg-orange-500/15 text-orange-500' : 'bg-purple-500/15 text-purple-400'">
              <component :is="stat.icon" />
            </div>

            <div>
              <p class="text-sm text-gray-300">{{ stat.label }}</p>
              <h2 class="mt-1 text-3xl font-black">{{ stat.value }}</h2>
              <p class="mt-1 text-xs text-green-400">{{ stat.change }}</p>
            </div>
          </div>

          <svg class="h-12 w-16 opacity-80" :class="stat.color === 'orange' ? 'stroke-orange-500' : 'stroke-purple-500'"
            fill="none" stroke-width="2" viewBox="0 0 80 40">
            <path d="M2 34 C12 30, 18 18, 28 22 S42 36, 52 18 S64 12, 72 22 S78 18, 80 10" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-5 rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-5 glow-panel">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="relative w-full xl:max-w-sm">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">⌕</span>
          <input v-model="searchQuery" type="text" placeholder="Search events..."
            class="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500" />
        </div>

        <div class="grid gap-3 sm:grid-cols-3 xl:flex">
          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Status</option>
            <option value="Live">Live</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select v-model="categoryFilter" class="filter-select">
            <option value="all">All Categories</option>
            <option value="Concert">Concert</option>
            <option value="Seminar">Seminar</option>
            <option value="Party">Party</option>
            <option value="Food">Food</option>
          </select>

          <select v-model="sortBy" class="filter-select">
            <option value="newest">Sort by: Newest</option>
            <option value="tickets">Tickets Sold</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="event in filteredEvents" :key="event.title"
        class="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]">
        <div class="relative h-44 overflow-hidden">
          <img :src="event.banner ? `${apiBaseUrl}/storage/${event.banner}` : bg1" :alt="event.title"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-110" />

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <span class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
            :class="statusClass(event.status)">
            {{ event.status }}
          </span>

          <button class="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-xl">
            ⋮
          </button>
        </div>

        <div class="p-4">
          <h3 class="font-black transition group-hover:text-orange-500">
            {{ event.title }}
          </h3>

          <p class="mt-2 text-xs text-gray-400">📅 {{ formatDate(event.starts_at) }}</p>
          <p class="mt-1 text-xs text-gray-400">📍 {{ eventLocation(event) }}</p>

          <div class="mt-4 border-t border-white/10 pt-4">
            <div class="grid grid-cols-3 items-center gap-3">
              <div>
                <p class="font-black">{{ event.tickets_sold_count || 0 }}</p>
                <p class="text-xs text-gray-500">Tickets Sold</p>
              </div>

              <div class="mx-auto">
                <div class="relative grid h-12 w-12 place-items-center rounded-full border-4 border-orange-500/30">
                  <span class="text-xs font-black">{{ event.percent }}</span>
                </div>
              </div>

              <div class="text-right">
                <p class="font-black text-green-400">{{ event.revenue }}</p>
                <p class="text-xs text-gray-500">Revenue</p>
              </div>
            </div>

            <button
              class="mt-4 flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-bold transition hover:border-orange-500 hover:text-orange-500">
              Manage Event <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center gap-2">
      <button class="page-btn">‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">...</button>
      <button class="page-btn">6</button>
      <button class="page-btn">›</button>
    </div>
  </div>
</template>

<script setup>
import { computed, h, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { eventService } from '@/services/eventService'
import bg1 from '@/assets/bg1.png'

const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_API_ROOT_URL || 'http://localhost:6969'

const events = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const sortBy = ref('newest')

const iconClass = 'h-6 w-6 stroke-current'

const makeIcon = (children) =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, children)

const CalendarIcon = () =>
  makeIcon([
    h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2 }),
    h('path', { d: 'M16 3v4M8 3v4M3 11h18' }),
  ])

const TicketIcon = () =>
  makeIcon([
    h('path', {
      d: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z',
    }),
  ])

const WalletIcon = () =>
  makeIcon([
    h('path', { d: 'M4 7h16v12H4z' }),
    h('path', { d: 'M16 12h4' }),
  ])

const UsersIcon = () =>
  makeIcon([
    h('path', { d: 'M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87' }),
    h('circle', { cx: 12, cy: 7, r: 4 }),
  ])

const eventLocation = (event) => {
  if (event.event_format === 'online') {
    return event.online_platform || 'Online'
  }

  return [event.venue_name, event.city, event.state].filter(Boolean).join(', ') || 'Location not set'
}

const formatDate = (date) => {
  if (!date) return 'Date not set'

  return new Date(date).toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const imageUrl = (path) => {
  if (!path) return bg1
  if (path.startsWith('http')) return path

  return `${apiBaseUrl}/storage/${path}`
}

const ticketTotal = (event) => {
  const tickets = event.ticket_types || event.ticketTypes || []

  return tickets.reduce((sum, ticket) => sum + Number(ticket.quantity || 0), 0)
}

const ticketPercent = (event) => {
  const total = ticketTotal(event)
  const sold = Number(event.tickets_sold_count || 0)

  if (!total) return 0

  return Math.round((sold / total) * 100)
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
  const classes = {
    published: 'bg-green-500/20 text-green-400',
    waiting_list: 'bg-purple-500/20 text-purple-300',
    pending_approval: 'bg-yellow-500/20 text-yellow-300',
    completed: 'bg-gray-500/20 text-gray-300',
    cancelled: 'bg-red-500/20 text-red-400',
    rejected: 'bg-red-500/20 text-red-400',
    suspended: 'bg-red-500/20 text-red-400',
    expired: 'bg-gray-500/20 text-gray-300',
    draft: 'bg-orange-500/20 text-orange-400',
  }

  return classes[status] || 'bg-orange-500/20 text-orange-400'
}

const stats = computed(() => {
  const total = events.value.length
  const upcoming = events.value.filter((event) =>
    ['waiting_list', 'pending_approval', 'published'].includes(event.status)
  ).length
  const live = events.value.filter((event) => event.status === 'published').length
  const completed = events.value.filter((event) => event.status === 'completed').length

  return [
    { label: 'Total Events', value: total, change: 'Your created events', color: 'orange', icon: CalendarIcon },
    { label: 'Upcoming', value: upcoming, change: 'Waiting or approved', color: 'purple', icon: TicketIcon },
    { label: 'Published', value: live, change: 'Visible to attendees', color: 'orange', icon: WalletIcon },
    { label: 'Completed', value: completed, change: 'Past events', color: 'purple', icon: UsersIcon },
  ]
})

const categories = computed(() => {
  const names = events.value
    .map((event) => event.category?.name)
    .filter(Boolean)

  return [...new Set(names)]
})

const filteredEvents = computed(() => {
  let result = [...events.value]

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter((event) =>
      event.title?.toLowerCase().includes(query) ||
      eventLocation(event).toLowerCase().includes(query) ||
      event.category?.name?.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value !== 'all') {
    result = result.filter((event) => event.status === statusFilter.value)
  }

  if (categoryFilter.value !== 'all') {
    result = result.filter((event) => event.category?.name === categoryFilter.value)
  }

  if (sortBy.value === 'tickets') {
    result.sort((a, b) => Number(b.tickets_sold_count || 0) - Number(a.tickets_sold_count || 0))
  }

  if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  }

  return result
})

const fetchEvents = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    console.log('Fetching my events...')

    const response = await eventService.getMyEvents()

    console.log('My events response:', response)

    events.value = response.data || []
  } catch (error) {
    console.error('My events error:', error.response || error)

    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      'Unable to fetch events'
  } finally {
    isLoading.value = false
  }
}

const goToCreate = () => {
  router.push({ name: 'CreateEvent' })
}

onMounted(() => {
  console.log('MyEvents mounted')
  fetchEvents()
})
</script>

<style scoped>
.ambient-dashboard {
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 106, 0, 0.12), transparent 24%),
    radial-gradient(circle at 90% 12%, rgba(168, 85, 247, 0.18), transparent 28%),
    radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.12), transparent 30%),
    #050505;
}

.filter-select {
  border-radius: 0.75rem;
  border: 1px solid rgba(168, 85, 247, 0.3);
  background: rgba(0, 0, 0, 0.5);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  color: white;
}

.page-btn {
  display: grid;
  height: 2.5rem;
  min-width: 2.5rem;
  place-items: center;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #080808;
  font-weight: 700;
  color: #d1d5db;
}

.page-btn.active {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
}

.glow-orange {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.35), 0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-purple-soft {
  box-shadow: 0 0 14px rgba(168, 85, 247, 0.28), 0 0 35px rgba(168, 85, 247, 0.12);
}

.glow-panel {
  box-shadow: 0 0 22px rgba(168, 85, 247, 0.12);
}

.glow-orange-card {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.22);
}

.glow-purple-card {
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.24);
}
</style>