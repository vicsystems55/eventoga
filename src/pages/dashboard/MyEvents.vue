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
        <button class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange transition hover:bg-orange-600">
          ＋ Create Event
        </button>

        <button class="rounded-xl border border-purple-500/40 px-6 py-3 font-bold text-purple-300 glow-purple-soft transition hover:bg-purple-500/10">
          ◰ View Analytics
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border p-5"
        :class="stat.color === 'orange' ? 'border-orange-500/40 glow-orange-card' : 'border-purple-500/40 glow-purple-card'"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div
              class="grid h-14 w-14 place-items-center rounded-2xl"
              :class="stat.color === 'orange' ? 'bg-orange-500/15 text-orange-500' : 'bg-purple-500/15 text-purple-400'"
            >
              <component :is="stat.icon" />
            </div>

            <div>
              <p class="text-sm text-gray-300">{{ stat.label }}</p>
              <h2 class="mt-1 text-3xl font-black">{{ stat.value }}</h2>
              <p class="mt-1 text-xs text-green-400">{{ stat.change }}</p>
            </div>
          </div>

          <svg
            class="h-12 w-16 opacity-80"
            :class="stat.color === 'orange' ? 'stroke-orange-500' : 'stroke-purple-500'"
            fill="none"
            stroke-width="2"
            viewBox="0 0 80 40"
          >
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
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search events..."
            class="w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500"
          />
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
      <div
        v-for="event in filteredEvents"
        :key="event.title"
        class="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]"
      >
        <div class="relative h-44 overflow-hidden">
          <img
            :src="event.image"
            :alt="event.title"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <span
            class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
            :class="statusClass(event.status)"
          >
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

          <p class="mt-2 text-xs text-gray-400">📅 {{ event.date }}</p>
          <p class="mt-1 text-xs text-gray-400">📍 {{ event.location }}</p>

          <div class="mt-4 border-t border-white/10 pt-4">
            <div class="grid grid-cols-3 items-center gap-3">
              <div>
                <p class="font-black">{{ event.sold }}</p>
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

            <button class="mt-4 flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-bold transition hover:border-orange-500 hover:text-orange-500">
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
import { computed, h, ref } from 'vue'
import bg1 from '../../assets/bg1.png'

const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const sortBy = ref('newest')

const iconClass = 'h-6 w-6 stroke-current'

const CalendarIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2 }),
    h('path', { d: 'M16 3v4M8 3v4M3 11h18' }),
  ])

const TicketIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z' }),
  ])

const WalletIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7h16v12H4z' }),
    h('path', { d: 'M16 12h4' }),
  ])

const UsersIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87' }),
    h('circle', { cx: 12, cy: 7, r: 4 }),
  ])

const stats = [
  { label: 'Total Events', value: '24', change: '↑ 12% from last month', color: 'orange', icon: CalendarIcon },
  { label: 'Upcoming', value: '10', change: '↑ 8% from last month', color: 'purple', icon: TicketIcon },
  { label: 'Live Now', value: '2', change: '— No change', color: 'orange', icon: WalletIcon },
  { label: 'Completed', value: '12', change: '↑ 20% from last month', color: 'purple', icon: UsersIcon },
]

const events = [
  {
    title: 'Afrobeats Live Concert',
    category: 'Concert',
    status: 'Live',
    date: 'May 24, 2025 · 7:00 PM',
    location: 'Eko Convention Centre, Lagos',
    sold: '342/500',
    percent: '68%',
    revenue: '₦1.2M',
    image: bg1,
  },
  {
    title: 'Tech Summit 2025',
    category: 'Seminar',
    status: 'Upcoming',
    date: 'May 30, 2025 · 9:00 AM',
    location: 'Landmark Centre, Lagos',
    sold: '128/300',
    percent: '43%',
    revenue: '₦850K',
    image: bg1,
  },
  {
    title: 'Beach Party Vibes',
    category: 'Party',
    status: 'Upcoming',
    date: 'Jun 7, 2025 · 4:00 PM',
    location: 'Elegushi Beach, Lagos',
    sold: '89/200',
    percent: '45%',
    revenue: '₦450K',
    image: bg1,
  },
  {
    title: 'Food & Drink Festival',
    category: 'Food',
    status: 'Completed',
    date: 'Apr 12, 2025 · 12:00 PM',
    location: 'Muri Okunola Park, Lagos',
    sold: '512/600',
    percent: '85%',
    revenue: '₦1.8M',
    image: bg1,
  },
  {
    title: 'Comedy Night Live',
    category: 'Concert',
    status: 'Completed',
    date: 'Mar 28, 2025 · 8:00 PM',
    location: 'Terra Kulture, Lagos',
    sold: '245/300',
    percent: '81%',
    revenue: '₦720K',
    image: bg1,
  },
  {
    title: 'Art & Culture Exhibition',
    category: 'Seminar',
    status: 'Cancelled',
    date: 'Apr 5, 2025 · 10:00 AM',
    location: 'Nike Art Gallery, Lagos',
    sold: '0/150',
    percent: '0%',
    revenue: '₦0',
    image: bg1,
  },
  {
    title: 'Lagos Music Festival',
    category: 'Concert',
    status: 'Upcoming',
    date: 'Jun 21, 2025 · 2:00 PM',
    location: 'TBS, Lagos',
    sold: '210/800',
    percent: '26%',
    revenue: '₦1.1M',
    image: bg1,
  },
  {
    title: 'Startup Pitch Night',
    category: 'Seminar',
    status: 'Completed',
    date: 'Feb 18, 2025 · 5:00 PM',
    location: 'Civic Centre, Lagos',
    sold: '120/150',
    percent: '80%',
    revenue: '₦360K',
    image: bg1,
  },
]

const filteredEvents = computed(() => {
  let result = [...events]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((event) =>
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value !== 'all') {
    result = result.filter((event) => event.status === statusFilter.value)
  }

  if (categoryFilter.value !== 'all') {
    result = result.filter((event) => event.category === categoryFilter.value)
  }

  return result
})

const statusClass = (status) => {
  if (status === 'Live') return 'bg-green-500/20 text-green-400'
  if (status === 'Upcoming') return 'bg-purple-500/20 text-purple-300'
  if (status === 'Completed') return 'bg-gray-500/20 text-gray-300'
  if (status === 'Cancelled') return 'bg-red-500/20 text-red-400'
  return 'bg-orange-500/20 text-orange-400'
}
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