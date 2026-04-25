<template>
  <div class="min-h-screen ambient-bg text-white">


    <!-- Hero Section -->
    <section class="relative w-full px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>
          <p class="text-gray-400 text-lg mb-8">Find and book the best concerts, conferences, parties, and more in your city</p>
          
          <!-- Search Bar -->
          <div class="relative">
            <div class="flex items-center gap-2 bg-black/50 rounded-2xl border border-purple-500/30 p-2 backdrop-blur-sm">
              <div class="flex-1 flex items-center gap-2 px-4 py-3">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Search events by title, artist, or venue..." 
                  class="w-full bg-transparent outline-none text-white"
                  @input="filterEvents"
                />
              </div>
              <button @click="filterEvents" class="bg-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="w-full px-4 md:px-6 lg:px-8 pb-16">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filters Sidebar -->
          <div class="lg:w-80 flex-shrink-0">
            <div class="sticky top-4 space-y-6">
              <!-- Filter Header -->
              <div class="flex items-center justify-between lg:hidden">
                <button @click="showFilters = !showFilters" class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  Filters
                </button>
                <div class="text-sm text-gray-400">{{ filteredEvents.length }} events found</div>
              </div>

              <div :class="['space-y-6', showFilters ? 'block' : 'hidden lg:block']">
                <!-- Category Filter -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"></path>
                    </svg>
                    Categories
                  </h3>
                  <div class="space-y-2">
                    <label v-for="category in categories" :key="category" class="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition">
                      <input type="checkbox" :value="category" v-model="selectedCategories" @change="filterEvents" class="rounded border-purple-500/30 bg-black/50 text-orange-500">
                      <span class="text-sm">{{ category }}</span>
                    </label>
                  </div>
                </div>

                <!-- Date Filter -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Date Range
                  </h3>
                  <div class="space-y-3">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="all" v-model="dateFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">All Dates</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="today" v-model="dateFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">Today</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="week" v-model="dateFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">This Week</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="month" v-model="dateFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">This Month</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="weekend" v-model="dateFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">This Weekend</span>
                    </label>
                  </div>
                </div>

                <!-- Price Range -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Price Range
                  </h3>
                  <div class="space-y-3">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="all" v-model="priceFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">All Prices</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="free" v-model="priceFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">Free</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="under5k" v-model="priceFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">Under ₦5,000</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="5k-20k" v-model="priceFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">₦5,000 - ₦20,000</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="20k+" v-model="priceFilter" @change="filterEvents" class="text-orange-500">
                      <span class="text-sm">₦20,000+</span>
                    </label>
                  </div>
                </div>

                <!-- Rating Filter -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    Rating
                  </h3>
                  <div class="space-y-2">
                    <label v-for="rating in [4, 3, 2]" :key="rating" class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" :value="rating" v-model="selectedRatings" @change="filterEvents" class="rounded border-purple-500/30 bg-black/50 text-orange-500">
                      <span class="text-sm">{{ rating }}+ Stars</span>
                    </label>
                  </div>
                </div>

                <!-- Clear Filters -->
                <button @click="clearFilters" class="w-full py-3 bg-white/5 rounded-xl font-semibold hover:bg-white/10 transition">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <!-- Events Grid -->
          <div class="flex-1">
            <!-- Results Header -->
            <div class="hidden lg:flex justify-between items-center mb-6">
              <p class="text-gray-400">{{ filteredEvents.length }} events found</p>
              <select v-model="sortBy" @change="sortEvents" class="bg-black/50 border border-purple-500/30 rounded-xl px-4 py-2 text-sm outline-none">
                <option value="date">Sort by: Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>

            <!-- Events Grid -->
            <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="event in paginatedEvents"
                :key="event.id"
                class="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)] cursor-pointer"
                @click="viewEventDetails(event)"
              >
                <!-- Badge -->
                <div class="absolute top-3 left-3 z-10 flex gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-bold" :class="getBadgeClass(event)">
                    {{ getBadgeText(event) }}
                  </span>
                </div>

                <!-- Image -->
                <div class="relative h-48 overflow-hidden">
                  <img :src="event.image" :alt="event.title" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex gap-3">
                      <div class="bg-orange-500/20 rounded-xl px-3 py-2 text-center min-w-[60px]">
                        <p class="text-xl font-black">{{ event.day }}</p>
                        <p class="text-xs font-bold text-orange-400">{{ event.month }}</p>
                      </div>
                      <div>
                        <h3 class="font-black text-lg group-hover:text-orange-500 transition">{{ event.title }}</h3>
                        <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {{ event.location }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p class="text-2xl font-black text-orange-500">{{ event.price }}</p>
                      <p class="text-xs text-gray-500" v-if="event.price !== 'Free'">per ticket</p>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="flex items-center gap-1">
                        <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="text-sm font-bold">{{ event.rating }}</span>
                      </div>
                      <button class="px-4 py-2 bg-orange-500 rounded-lg text-sm font-bold hover:bg-orange-600 transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-20">
              <svg class="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="text-2xl font-bold mb-2">No events found</h3>
              <p class="text-gray-400">Try adjusting your filters or search query</p>
              <button @click="clearFilters" class="mt-4 px-6 py-2 bg-orange-500 rounded-xl font-bold hover:bg-orange-600 transition">
                Clear Filters
              </button>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-10">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <div class="flex gap-2">
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-4 py-2 rounded-lg transition',
                    currentPage === page 
                      ? 'bg-orange-500 text-white' 
                      : 'border border-white/10 hover:bg-white/5'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Details Modal -->
    <Transition name="modal-fade">
      <div v-if="selectedEvent" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click="closeModal">
        <div class="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-orange-500/30 shadow-2xl" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-orange-500 transition">
            ✕
          </button>

          <!-- Modal Content -->
          <div class="relative">
            <!-- Hero Image -->
            <div class="relative h-64 md:h-96">
              <img :src="selectedEvent.image" :alt="selectedEvent.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <!-- Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-4 py-2 rounded-full text-sm font-bold" :class="getBadgeClass(selectedEvent)">
                  {{ getBadgeText(selectedEvent) }}
                </span>
              </div>

              <!-- Title -->
              <div class="absolute bottom-6 left-6 right-6">
                <h2 class="text-3xl md:text-4xl font-black mb-2">{{ selectedEvent.title }}</h2>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {{ selectedEvent.date }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ selectedEvent.time }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Details -->
            <div class="p-6 md:p-8">
              <div class="grid md:grid-cols-3 gap-6">
                <!-- Left Column -->
                <div class="md:col-span-2 space-y-6">
                  <div>
                    <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      About This Event
                    </h3>
                    <p class="text-gray-300 leading-relaxed">{{ selectedEvent.description }}</p>
                  </div>

                  <div>
                    <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Venue & Location
                    </h3>
                    <p class="text-gray-300">{{ selectedEvent.location }}</p>
                    <p class="text-gray-400 text-sm mt-1">{{ selectedEvent.address }}</p>
                  </div>

                  <div>
                    <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      Organizer
                    </h3>
                    <p class="text-gray-300">{{ selectedEvent.organizer }}</p>
                  </div>
                </div>

                <!-- Right Column - Booking -->
                <div class="space-y-4">
                  <div class="bg-orange-500/10 rounded-2xl p-5 border border-orange-500/30">
                    <div class="text-center mb-4">
                      <p class="text-4xl font-black text-orange-500">{{ selectedEvent.price }}</p>
                      <p class="text-sm text-gray-400" v-if="selectedEvent.price !== 'Free'">per ticket</p>
                    </div>

                    <div class="space-y-3">
                      <div v-if="selectedEvent.price !== 'Free'" class="flex items-center justify-between text-sm">
                        <span>Quantity:</span>
                        <div class="flex items-center gap-3">
                          <button @click="ticketQuantity--" :disabled="ticketQuantity <= 1" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-500 transition disabled:opacity-50">-</button>
                          <span class="font-bold">{{ ticketQuantity }}</span>
                          <button @click="ticketQuantity++" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-500 transition">+</button>
                        </div>
                      </div>

                      <div v-if="selectedEvent.price !== 'Free'" class="flex items-center justify-between pt-3 border-t border-white/10">
                        <span class="font-bold">Total:</span>
                        <span class="text-xl font-black text-orange-500">{{ calculateTotal(selectedEvent.price) }}</span>
                      </div>

                      <button class="w-full py-3 bg-orange-500 rounded-xl font-black hover:bg-orange-600 transition">
                        Book Now
                      </button>
                    </div>
                  </div>

                  <div class="bg-white/5 rounded-2xl p-4">
                    <div class="flex items-center gap-2 text-sm mb-2">
                      <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Verified Event</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                      </svg>
                      <span>Secure Payment</span>
                    </div>
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
import { ref, computed, onMounted } from 'vue'
import bg1 from '../assets/bg1.png'

const isMenuOpen = ref(false)
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

// Categories
const categories = [
  'Concert', 'Conference', 'Party', 'Workshop', 'Sports', 'Art', 'Food', 'Networking'
]

// Events Data
const allEvents = ref([
  {
    id: 1,
    title: 'Afrobeats Live Concert',
    category: 'Concert',
    location: 'Eko Convention Centre, Lagos',
    address: 'Victoria Island, Lagos',
    price: '₦5,000',
    rating: 4.8,
    day: '28',
    month: 'APR',
    date: 'April 28, 2026',
    time: '7:00 PM',
    tag: '🔥 Trending',
    verified: true,
    image: bg1,
    description: 'Experience the biggest Afrobeats concert of the year featuring top Nigerian artists. Get ready for an unforgettable night of music, dance, and entertainment.',
    organizer: 'Afrobeats Live Productions',
    popularity: 95
  },
  {
    id: 2,
    title: 'Tech Summit 2026',
    category: 'Conference',
    location: 'Landmark Centre, Lagos',
    address: 'Victoria Island, Lagos',
    price: '₦15,000',
    rating: 4.9,
    day: '30',
    month: 'APR',
    date: 'April 30, 2026',
    time: '10:00 AM',
    tag: 'Limited Seats',
    verified: true,
    image: bg1,
    description: 'Join industry leaders at Nigeria\'s premier tech conference. Network with professionals, learn from experts, and discover the future of technology.',
    organizer: 'Tech Nigeria',
    popularity: 88
  },
  {
    id: 3,
    title: 'Lagos Beach Party',
    category: 'Party',
    location: 'Elegushi Beach',
    address: 'Lekki, Lagos',
    price: '₦3,000',
    rating: 4.7,
    day: '05',
    month: 'MAY',
    date: 'May 5, 2026',
    time: '12:00 PM',
    tag: 'Early Bird',
    verified: true,
    image: bg1,
    description: 'The ultimate beach party experience with live DJs, games, and unlimited fun. Bring your friends and enjoy the sun!',
    organizer: 'Beach Vibes Entertainment',
    popularity: 92
  },
  {
    id: 4,
    title: 'Business Masterclass',
    category: 'Workshop',
    location: 'Radisson Blu, Ikeja',
    address: 'Ikeja, Lagos',
    price: '₦20,000',
    rating: 4.9,
    day: '11',
    month: 'MAY',
    date: 'May 11, 2026',
    time: '9:00 AM',
    tag: '✅ Verified',
    verified: true,
    image: bg1,
    description: 'Learn from successful entrepreneurs and business leaders. Master the art of scaling your business and achieving financial freedom.',
    organizer: 'Business Academy',
    popularity: 85
  },
  {
    id: 5,
    title: 'Food Festival 2026',
    category: 'Food',
    location: 'Tafawa Balewa Square',
    address: 'Lagos Island, Lagos',
    price: 'Free',
    rating: 4.6,
    day: '18',
    month: 'MAY',
    date: 'May 18, 2026',
    time: '11:00 AM',
    tag: 'Free Entry',
    verified: true,
    image: bg1,
    description: 'A celebration of Nigerian cuisine. Taste dishes from different cultures, watch cooking demonstrations, and enjoy live entertainment.',
    organizer: 'Foodies Nigeria',
    popularity: 90
  },
  {
    id: 6,
    title: 'Art Exhibition',
    category: 'Art',
    location: 'Nike Art Gallery',
    address: 'Lekki, Lagos',
    price: '₦2,000',
    rating: 4.5,
    day: '22',
    month: 'MAY',
    date: 'May 22, 2026',
    time: '2:00 PM',
    tag: 'New',
    verified: true,
    image: bg1,
    description: 'Discover contemporary African art at its finest. Featuring works from emerging and established artists.',
    organizer: 'ArtHub Nigeria',
    popularity: 75
  }
])

// Filtered and Sorted Events
const filteredEvents = computed(() => {
  let events = [...allEvents.value]

  // Search filter
  if (searchQuery.value) {
    events = events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    events = events.filter(event => selectedCategories.value.includes(event.category))
  }

  // Rating filter
  if (selectedRatings.value.length > 0) {
    events = events.filter(event => {
      return selectedRatings.value.some(rating => event.rating >= rating)
    })
  }

  // Date filter
  const today = new Date()
  if (dateFilter.value === 'today') {
    events = events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === today.toDateString()
    })
  } else if (dateFilter.value === 'week') {
    const weekEnd = new Date(today)
    weekEnd.setDate(today.getDate() + 7)
    events = events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate <= weekEnd
    })
  }

  // Price filter
  if (priceFilter.value === 'free') {
    events = events.filter(event => event.price === 'Free')
  } else if (priceFilter.value === 'under5k') {
    events = events.filter(event => {
      const price = parseInt(event.price.replace(/[^0-9]/g, ''))
      return price < 5000 && event.price !== 'Free'
    })
  } else if (priceFilter.value === '5k-20k') {
    events = events.filter(event => {
      const price = parseInt(event.price.replace(/[^0-9]/g, ''))
      return price >= 5000 && price <= 20000
    })
  } else if (priceFilter.value === '20k+') {
    events = events.filter(event => {
      const price = parseInt(event.price.replace(/[^0-9]/g, ''))
      return price > 20000
    })
  }

  return events
})

// Sorting
const sortEvents = () => {
  let events = filteredEvents.value
  
  if (sortBy.value === 'price-low') {
    events.sort((a, b) => {
      const priceA = a.price === 'Free' ? 0 : parseInt(a.price.replace(/[^0-9]/g, ''))
      const priceB = b.price === 'Free' ? 0 : parseInt(b.price.replace(/[^0-9]/g, ''))
      return priceA - priceB
    })
  } else if (sortBy.value === 'price-high') {
    events.sort((a, b) => {
      const priceA = a.price === 'Free' ? 0 : parseInt(a.price.replace(/[^0-9]/g, ''))
      const priceB = b.price === 'Free' ? 0 : parseInt(b.price.replace(/[^0-9]/g, ''))
      return priceB - priceA
    })
  } else if (sortBy.value === 'rating') {
    events.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'popularity') {
    events.sort((a, b) => b.popularity - a.popularity)
  }
  
  return events
}

// Pagination
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortEvents().slice(start, end)
})

const totalPages = computed(() => Math.ceil(sortEvents().length / itemsPerPage))

const displayedPages = computed(() => {
  const pages = []
  const maxVisible = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)
  
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const filterEvents = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedRatings.value = []
  dateFilter.value = 'all'
  priceFilter.value = 'all'
  sortBy.value = 'date'
  filterEvents()
}

const getBadgeClass = (event) => {
  if (event.tag === '🔥 Trending') return 'bg-orange-500'
  if (event.tag === 'Limited Seats') return 'bg-red-500'
  if (event.tag === 'Early Bird') return 'bg-green-500'
  if (event.tag === '✅ Verified') return 'bg-blue-500'
  return 'bg-purple-500'
}

const getBadgeText = (event) => {
  return event.tag
}

const viewEventDetails = (event) => {
  selectedEvent.value = event
  ticketQuantity.value = 1
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedEvent.value = null
  document.body.style.overflow = ''
}

const calculateTotal = (price) => {
  if (price === 'Free') return 'Free'
  const numericPrice = parseInt(price.replace(/[^0-9]/g, ''))
  return `₦${(numericPrice * ticketQuantity.value).toLocaleString()}`
}

onMounted(() => {
  // Check URL params for category filter
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('category')
  if (category && categories.includes(category)) {
    selectedCategories.value = [category]
  }
})
</script>

<style scoped>
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