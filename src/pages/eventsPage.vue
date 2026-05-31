<template>
  <div class="min-h-screen ambient-bg text-white">
    <!-- Hero Section -->
    <section class="relative w-full px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="mb-4 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-4xl font-black text-transparent md:text-5xl lg:text-6xl">
            Discover Amazing Events
          </h1>

          <p class="mb-8 text-lg text-gray-400">
            Find and book the best concerts, conferences, parties, and more in your city
          </p>

          <div class="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-black/50 p-2 backdrop-blur-sm">
            <div class="flex flex-1 items-center gap-2 px-4 py-3">
              <span class="text-gray-500">⌕</span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search events by title, venue, city..."
                class="w-full bg-transparent text-white outline-none"
                @keyup.enter="filterEvents"
              />
            </div>

            <button
              @click="filterEvents"
              class="rounded-xl bg-orange-500 px-6 py-3 font-bold transition hover:bg-orange-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="w-full px-4 pb-16 md:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col gap-8 lg:flex-row">
          <!-- Filters Sidebar -->
          <aside class="shrink-0 lg:w-80">
            <div class="sticky top-4 space-y-6">
              <div class="flex items-center justify-between lg:hidden">
                <button
                  @click="showFilters = !showFilters"
                  class="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2"
                >
                  ⚙ Filters
                </button>

                <div class="text-sm text-gray-400">
                  {{ filteredEvents.length }} events found
                </div>
              </div>

              <div :class="['space-y-6', showFilters ? 'block' : 'hidden lg:block']">
                <!-- Category -->
                <div class="filter-card">
                  <h3 class="filter-title">Categories</h3>

                  <div class="space-y-2">
                    <label
                      v-for="category in categories"
                      :key="category.id"
                      class="flex cursor-pointer items-center gap-2 transition hover:text-orange-500"
                    >
                      <input
                        type="checkbox"
                        :value="category.slug"
                        v-model="selectedCategories"
                        @change="filterEvents"
                        class="rounded border-purple-500/30 bg-black/50 text-orange-500"
                      />

                      <span class="text-sm">{{ category.name }}</span>
                    </label>
                  </div>
                </div>

                <!-- Date -->
                <div class="filter-card">
                  <h3 class="filter-title">Date Range</h3>

                  <div class="space-y-3">
                    <label
                      v-for="item in dateOptions"
                      :key="item.value"
                      class="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        :value="item.value"
                        v-model="dateFilter"
                        @change="filterEvents"
                        class="text-orange-500"
                      />

                      <span class="text-sm">{{ item.label }}</span>
                    </label>
                  </div>
                </div>

                <!-- Price -->
                <div class="filter-card">
                  <h3 class="filter-title">Price Range</h3>

                  <div class="space-y-3">
                    <label
                      v-for="item in priceOptions"
                      :key="item.value"
                      class="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        :value="item.value"
                        v-model="priceFilter"
                        @change="filterEvents"
                        class="text-orange-500"
                      />

                      <span class="text-sm">{{ item.label }}</span>
                    </label>
                  </div>
                </div>

                <button
                  @click="clearFilters"
                  class="w-full rounded-xl bg-white/5 py-3 font-semibold transition hover:bg-white/10"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          <!-- Events Area -->
          <main class="flex-1">
            <div class="mb-6 hidden items-center justify-between lg:flex">
              <p class="text-gray-400">
                {{ filteredEvents.length }} events found
              </p>

              <select
                v-model="sortBy"
                class="rounded-xl border border-purple-500/30 bg-black/50 px-4 py-2 text-sm outline-none"
              >
                <option value="date">Sort by: Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            <!-- Loading -->
            <div
              v-if="isLoading"
              class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6 text-center text-orange-300"
            >
              Loading events...
            </div>

            <!-- Error -->
            <div
              v-else-if="errorMessage"
              class="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300"
            >
              {{ errorMessage }}
            </div>

            <!-- Events Grid -->
            <div
              v-else-if="filteredEvents.length > 0"
              class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <div
                v-for="(event, index) in paginatedEvents"
                :key="event.id"
                data-aos="zoom-in"
                :data-aos-delay="index * 100"
                class="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]"
                @click="viewEventDetails(event)"
              >
                <!-- Badge -->
                <div class="absolute left-3 top-3 z-10">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-bold"
                    :class="getBadgeClass(event)"
                  >
                    {{ getBadgeText(event) }}
                  </span>
                </div>

                <!-- Image -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="imageUrl(event)"
                    :alt="event.title"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <div class="mb-3 flex items-start gap-3">
                    <div class="min-w-[60px] rounded-xl bg-orange-500/20 px-3 py-2 text-center">
                      <p class="text-xl font-black">{{ eventDay(event.starts_at) }}</p>
                      <p class="text-xs font-bold text-orange-400">{{ eventMonth(event.starts_at) }}</p>
                    </div>

                    <div>
                      <h3 class="text-lg font-black transition group-hover:text-orange-500">
                        {{ event.title }}
                      </h3>

                      <p class="mt-1 flex items-center gap-1 text-xs text-gray-400">
                        📍 {{ eventLocation(event) }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p class="text-2xl font-black text-orange-500">
                        {{ eventPrice(event) }}
                      </p>

                      <p
                        v-if="event.event_type !== 'free'"
                        class="text-xs text-gray-500"
                      >
                        from
                      </p>
                    </div>

                    <button
                      @click.stop="goToEvent(event)"
                      class="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold transition hover:bg-orange-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty -->
            <div v-else class="py-20 text-center">
              <div class="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-white/5 text-4xl">
                🎟️
              </div>

              <h3 class="mb-2 text-2xl font-bold">No events found</h3>

              <p class="text-gray-400">
                Try adjusting your filters or search query
              </p>

              <button
                @click="clearFilters"
                class="mt-4 rounded-xl bg-orange-500 px-6 py-2 font-bold transition hover:bg-orange-600"
              >
                Clear Filters
              </button>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-10 flex justify-center gap-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="rounded-lg border border-white/10 px-4 py-2 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'rounded-lg px-4 py-2 transition',
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'border border-white/10 hover:bg-white/5'
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="rounded-lg border border-white/10 px-4 py-2 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- Event Details Modal -->
    <Transition name="modal-fade">
      <div
        v-if="selectedEvent"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        @click="closeModal"
      >
        <div
          class="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#0a0a0a] to-[#050505] shadow-2xl"
          @click.stop
        >
          <button
            @click="closeModal"
            class="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-orange-500"
          >
            ✕
          </button>

          <div class="relative h-64 md:h-96">
            <img
              :src="imageUrl(selectedEvent)"
              :alt="selectedEvent.title"
              class="h-full w-full object-cover"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div class="absolute left-4 top-4">
              <span
                class="rounded-full px-4 py-2 text-sm font-bold"
                :class="getBadgeClass(selectedEvent)"
              >
                {{ getBadgeText(selectedEvent) }}
              </span>
            </div>

            <div class="absolute bottom-6 left-6 right-6">
              <h2 class="mb-2 text-3xl font-black md:text-4xl">
                {{ selectedEvent.title }}
              </h2>

              <div class="flex flex-wrap gap-4 text-sm">
                <span>📅 {{ formatDate(selectedEvent.starts_at) }}</span>
                <span>🕒 {{ formatTime(selectedEvent.starts_at) }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <div class="grid gap-6 md:grid-cols-3">
              <div class="space-y-6 md:col-span-2">
                <div>
                  <h3 class="mb-3 text-xl font-bold text-orange-500">About This Event</h3>
                  <p class="leading-relaxed text-gray-300">
                    {{ selectedEvent.description || selectedEvent.short_description }}
                  </p>
                </div>

                <div>
                  <h3 class="mb-3 text-xl font-bold text-orange-500">Venue & Location</h3>
                  <p class="text-gray-300">{{ eventLocation(selectedEvent) }}</p>
                  <p class="mt-1 text-sm text-gray-400">{{ selectedEvent.address }}</p>
                </div>

                <div>
                  <h3 class="mb-3 text-xl font-bold text-orange-500">Organizer</h3>
                  <p class="text-gray-300">
                    {{ selectedEvent.organizer?.name || 'Event Organizer' }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-5">
                  <div class="mb-4 text-center">
                    <p class="text-4xl font-black text-orange-500">
                      {{ eventPrice(selectedEvent) }}
                    </p>

                    <p
                      v-if="selectedEvent.event_type !== 'free'"
                      class="text-sm text-gray-400"
                    >
                      starting price
                    </p>
                  </div>

                  <div class="space-y-3">
                    <div
                      v-if="selectedEvent.event_type !== 'free'"
                      class="flex items-center justify-between text-sm"
                    >
                      <span>Quantity:</span>

                      <div class="flex items-center gap-3">
                        <button
                          @click="ticketQuantity--"
                          :disabled="ticketQuantity <= 1"
                          class="h-8 w-8 rounded-lg bg-white/10 transition hover:bg-orange-500 disabled:opacity-50"
                        >
                          -
                        </button>

                        <span class="font-bold">{{ ticketQuantity }}</span>

                        <button
                          @click="ticketQuantity++"
                          class="h-8 w-8 rounded-lg bg-white/10 transition hover:bg-orange-500"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div
                      v-if="selectedEvent.event_type !== 'free'"
                      class="flex items-center justify-between border-t border-white/10 pt-3"
                    >
                      <span class="font-bold">Total:</span>
                      <span class="text-xl font-black text-orange-500">
                        {{ calculateTotal(selectedEvent) }}
                      </span>
                    </div>

                    <button @click="goToEvent(selectedEvent)" class="w-full rounded-xl bg-orange-500 py-3 font-black transition hover:bg-orange-600">
                      Book Now
                    </button>
                  </div>
                </div>

                <div class="rounded-2xl bg-white/5 p-4">
                  <div class="mb-2 flex items-center gap-2 text-sm">
                    <span class="text-green-500">✓</span>
                    <span>{{ selectedEvent.is_verified ? 'Verified Event' : 'Listed Event' }}</span>
                  </div>

                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-blue-500">✓</span>
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { eventService } from '@/services/eventService'
import { categoryService } from '@/services/categoryService'
import bg1 from '@/assets/bg1.png'

const apiBaseUrl = import.meta.env.VITE_API_ROOT_URL || 'http://localhost:6969'

const showFilters = ref(false)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedRatings = ref([])
const dateFilter = ref('all')
const priceFilter = ref('all')
const sortBy = ref('date')
const currentPage = ref(1)
const itemsPerPage = 9

const selectedEvent = ref(null)
const ticketQuantity = ref(1)
const router = useRouter()

const allEvents = ref([])
const categories = ref([])
const isLoading = ref(false)
const errorMessage = ref('')


const dateOptions = [
  { label: 'All Dates', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'This Weekend', value: 'weekend' },
]

const priceOptions = [
  { label: 'All Prices', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Under ₦5,000', value: 'under5k' },
  { label: '₦5,000 - ₦20,000', value: '5k-20k' },
  { label: '₦20,000+', value: '20k+' },
]

const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getCategories()
  } catch (error) {
    console.error('CATEGORY ERROR:', error.response || error)
  }
}

const fetchEvents = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await eventService.getPublicEvents({
      search: searchQuery.value || undefined,
      category: selectedCategories.value[0] || undefined,
      event_type: priceFilter.value === 'free' ? 'free' : undefined,
      date_filter: dateFilter.value !== 'all' ? dateFilter.value : undefined,
      page: currentPage.value,
      per_page: itemsPerPage,
    })

    allEvents.value = response.data || []
  } catch (error) {
    console.error('PUBLIC EVENTS ERROR:', error.response || error)
    errorMessage.value = error.response?.data?.message || 'Unable to fetch events'
  } finally {
    isLoading.value = false
  }
}

const filteredEvents = computed(() => {
  let events = [...allEvents.value]

  if (selectedRatings.value.length > 0) {
    events = events.filter((event) => {
      const rating = Number(event.rating || 0)
      return selectedRatings.value.some((selected) => rating >= selected)
    })
  }

  if (priceFilter.value === 'under5k') {
    events = events.filter((event) => minTicketNaira(event) < 5000 && event.event_type !== 'free')
  }

  if (priceFilter.value === '5k-20k') {
    events = events.filter((event) => {
      const price = minTicketNaira(event)
      return price >= 5000 && price <= 20000
    })
  }

  if (priceFilter.value === '20k+') {
    events = events.filter((event) => minTicketNaira(event) > 20000)
  }

  if (sortBy.value === 'price-low') {
    events.sort((a, b) => minTicketOrbs(a) - minTicketOrbs(b))
  }

  if (sortBy.value === 'price-high') {
    events.sort((a, b) => minTicketOrbs(b) - minTicketOrbs(a))
  }

  if (sortBy.value === 'rating') {
    events.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
  }

  if (sortBy.value === 'popularity') {
    events.sort((a, b) => Number(b.views_count || 0) - Number(a.views_count || 0))
  }

  if (sortBy.value === 'date') {
    events.sort((a, b) => new Date(a.starts_at || 0) - new Date(b.starts_at || 0))
  }

  return events
})

const paginatedEvents = computed(() => filteredEvents.value)

const totalPages = computed(() => 1)

const displayedPages = computed(() => [1])

const filterEvents = () => {
  currentPage.value = 1
  fetchEvents()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedRatings.value = []
  dateFilter.value = 'all'
  priceFilter.value = 'all'
  sortBy.value = 'date'
  currentPage.value = 1
  fetchEvents()
}

const imageUrl = (event) => {
  if (event.banner) return `${apiBaseUrl}/storage/${event.banner}`
  if (event.thumbnail) return `${apiBaseUrl}/storage/${event.thumbnail}`
  return bg1
}

const eventLocation = (event) => {
  if (event.event_format === 'online') return event.online_platform || 'Online Event'

  return [event.venue_name, event.city, event.state]
    .filter(Boolean)
    .join(', ') || 'Location not set'
}

const formatDate = (date) => {
  if (!date) return 'Date not set'

  return new Date(date).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const formatTime = (date) => {
  if (!date) return 'Time not set'

  return new Date(date).toLocaleTimeString('en-NG', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const eventDay = (date) => {
  if (!date) return '--'
  return new Date(date).toLocaleDateString('en-NG', { day: '2-digit' })
}

const eventMonth = (date) => {
  if (!date) return '---'
  return new Date(date).toLocaleDateString('en-NG', { month: 'short' }).toUpperCase()
}

const ticketTypes = (event) => event.ticket_types || event.ticketTypes || []

const minTicketOrbs = (event) => {
  const tickets = ticketTypes(event)
  if (!tickets.length) return 0
  return Math.min(...tickets.map((ticket) => Number(ticket.price_orbs || 0)))
}

const minTicketNaira = (event) => minTicketOrbs(event) * 10

const eventPrice = (event) => {
  if (event.event_type === 'free') return 'Free'

  const amount = minTicketNaira(event)

  return amount
    ? `₦${amount.toLocaleString()}`
    : 'Paid'
}

const getBadgeText = (event) => {
  if (event.is_verified) return '✅ Verified'
  if (event.is_featured) return '🔥 Featured'
  if (event.event_type === 'free') return 'Free Entry'
  return event.category?.name || 'Event'
}

const getBadgeClass = (event) => {
  if (event.is_featured) return 'bg-orange-500'
  if (event.is_verified) return 'bg-blue-500'
  if (event.event_type === 'free') return 'bg-green-500'
  return 'bg-purple-500'
}

const viewEventDetails = (event) => {
  selectedEvent.value = event
  ticketQuantity.value = 1
  document.body.style.overflow = 'hidden'
}

const goToEvent = (event) => {
  if (!event) return
  closeModal()
  router.push({ name: 'EventDetails', params: { id: event.id } })
}

const closeModal = () => {
  selectedEvent.value = null
  document.body.style.overflow = ''
}

const calculateTotal = (event) => {
  if (!event || event.event_type === 'free') return 'Free'

  const total = minTicketNaira(event) * ticketQuantity.value
  return `₦${total.toLocaleString()}`
}

watch(currentPage, fetchEvents)

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('category')

  await fetchCategories()

  if (category) {
    selectedCategories.value = [category]
  }

  await fetchEvents()

  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
  })

  await nextTick()
  AOS.refreshHard()
})
</script>

<style scoped>

.filter-card {
  border-radius: 1rem;
  border: 1px solid rgba(168, 85, 247, 0.3);
  background: rgba(0, 0, 0, 0.3);
  padding: 1.25rem;
  backdrop-filter: blur(8px);
}

.filter-title {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: white;
} 
.ambient-bg {
    background: radial-gradient(circle at 18% 8%, rgba(255, 106, 0, 0.16), transparent 24%),
        radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.23), transparent 28%),
        #050505;
}

.glow-orange {
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.35);
}

.glow-purple-soft {
    box-shadow: 0 0 14px rgba(168, 85, 247, 0.28), 0 0 35px rgba(168, 85, 247, 0.12);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
    transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
    background: #ff6a00;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #ff8c42;
}
</style>