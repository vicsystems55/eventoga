<template>
  <div class="min-h-screen ambient-bg text-white">
    <!-- Navbar -->
    <nav class="relative z-50 w-full px-4 py-4 md:px-6 lg:px-8 border-b border-white/10">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 text-2xl font-black md:text-3xl">
          <span>Event<span class="text-orange-500">Oga</span></span>
          <span class="text-2xl">🎟️</span>
        </router-link>

        <div class="hidden gap-10 text-sm font-semibold md:flex">
          <router-link to="/events" class="transition hover:text-orange-500">Events</router-link>
          <router-link to="/marketplace" class="text-orange-500 transition hover:text-orange-400">Marketplace</router-link>
          <router-link to="/for-organizers" class="transition hover:text-orange-500">For Organizers</router-link>
          <router-link to="/blog" class="transition hover:text-orange-500">Blog</router-link>
          <router-link to="/about" class="transition hover:text-orange-500">About Us⌄</router-link>
        </div>

        <div class="hidden items-center gap-3 md:flex">
          <button class="rounded-xl border border-purple-500/40 px-5 py-3 text-sm font-bold glow-purple-soft">
            📍 Lagos⌄
          </button>
          <router-link to="/auth" class="rounded-xl border border-purple-500/40 px-6 py-3 text-sm font-bold glow-purple-soft">
            Login
          </router-link>
          <router-link to="/auth?tab=register" class="rounded-xl bg-orange-500 px-6 py-3 text-sm font-black text-white glow-orange">
            Sign Up
          </router-link>
        </div>

        <button
          @click="isMenuOpen = true"
          class="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 md:hidden"
        >
          <span class="space-y-1.5">
            <span class="block h-0.5 w-6 bg-white"></span>
            <span class="block h-0.5 w-6 bg-white"></span>
            <span class="block h-0.5 w-6 bg-white"></span>
          </span>
        </button>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <Transition name="drawer-fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm md:hidden"
        @click="isMenuOpen = false"
      >
        <aside class="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-orange-500/20 bg-[#080808] p-6 shadow-2xl" @click.stop>
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-black">Event<span class="text-orange-500">Oga</span></h2>
            <button @click="isMenuOpen = false" class="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-2xl">×</button>
          </div>
          <div class="mt-10 flex flex-col gap-4 text-lg font-bold">
            <router-link to="/events" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">Events</router-link>
            <router-link to="/marketplace" @click="isMenuOpen = false" class="rounded-2xl bg-orange-500 text-black px-5 py-4">Marketplace</router-link>
            <router-link to="/for-organizers" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">For Organizers</router-link>
            <router-link to="/blog" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">Blog</router-link>
            <router-link to="/about" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">About Us</router-link>
          </div>
          <div class="mt-10 space-y-3">
            <button class="w-full rounded-xl border border-white/20 px-5 py-4 font-bold">📍 Lagos</button>
            <router-link to="/auth" class="block w-full rounded-xl border border-white/20 px-5 py-4 text-center font-bold">Login</router-link>
            <router-link to="/auth?tab=register" class="block w-full rounded-xl bg-orange-500 px-5 py-4 text-center font-black text-black">Sign Up</router-link>
          </div>
        </aside>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="relative w-full px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
            Everything You Need For Your Event
          </h1>
          <p class="text-gray-400 text-lg mb-8">Find verified vendors, rent equipment, hire entertainers, and more - all in one place</p>
          
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
                  placeholder="Search for vendors, services, equipment..." 
                  class="w-full bg-transparent outline-none text-white"
                  @input="filterVendors"
                />
              </div>
              <button @click="filterVendors" class="bg-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Tabs -->
    <section class="w-full px-4 md:px-6 lg:px-8 mb-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id; filterVendors()"
            class="px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            :class="activeCategory === category.id 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg glow-orange' 
              : 'bg-white/5 border border-white/10 hover:bg-white/10'"
          >
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </button>
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
              <div class="flex items-center justify-between lg:hidden">
                <button @click="showFilters = !showFilters" class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  Filters
                </button>
                <div class="text-sm text-gray-400">{{ filteredVendors.length }} vendors found</div>
              </div>

              <div :class="['space-y-6', showFilters ? 'block' : 'hidden lg:block']">
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
                      <input type="radio" value="all" v-model="priceFilter" @change="filterVendors" class="text-orange-500">
                      <span class="text-sm">All Prices</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="budget" v-model="priceFilter" @change="filterVendors" class="text-orange-500">
                      <span class="text-sm">Budget (Under ₦50k)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="moderate" v-model="priceFilter" @change="filterVendors" class="text-orange-500">
                      <span class="text-sm">Moderate (₦50k - ₦200k)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="premium" v-model="priceFilter" @change="filterVendors" class="text-orange-500">
                      <span class="text-sm">Premium (₦200k+)</span>
                    </label>
                  </div>
                </div>

                <!-- Rating Filter -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                    Minimum Rating
                  </h3>
                  <div class="space-y-2">
                    <label v-for="rating in [4.5, 4, 3.5, 3]" :key="rating" class="flex items-center gap-2 cursor-pointer">
                      <input type="radio" :value="rating" v-model="ratingFilter" @change="filterVendors" class="text-orange-500">
                      <span class="text-sm">{{ rating }}+ Stars</span>
                    </label>
                  </div>
                </div>

                <!-- Availability -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <h3 class="font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Availability
                  </h3>
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" v-model="availabilityFilter.weekends" @change="filterVendors" class="rounded border-purple-500/30 bg-black/50 text-orange-500">
                      <span class="text-sm">Available on Weekends</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" v-model="availabilityFilter.evenings" @change="filterVendors" class="rounded border-purple-500/30 bg-black/50 text-orange-500">
                      <span class="text-sm">Available Evenings</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" v-model="availabilityFilter.lastMinute" @change="filterVendors" class="rounded border-purple-500/30 bg-black/50 text-orange-500">
                      <span class="text-sm">Last Minute Bookings</span>
                    </label>
                  </div>
                </div>

                <!-- Verified Only -->
                <div class="bg-black/30 rounded-2xl border border-purple-500/30 p-5 backdrop-blur-sm">
                  <label class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="font-bold">Verified Vendors Only</span>
                    </div>
                    <input type="checkbox" v-model="verifiedOnly" @change="filterVendors" class="w-5 h-5 rounded border-purple-500/30 bg-black/50 text-orange-500">
                  </label>
                </div>

                <!-- Clear Filters -->
                <button @click="clearFilters" class="w-full py-3 bg-white/5 rounded-xl font-semibold hover:bg-white/10 transition">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <!-- Vendors Grid -->
          <div class="flex-1">
            <!-- Results Header -->
            <div class="hidden lg:flex justify-between items-center mb-6">
              <p class="text-gray-400">{{ filteredVendors.length }} vendors found</p>
              <select v-model="sortBy" @change="sortVendors" class="bg-black/50 border border-purple-500/30 rounded-xl px-4 py-2 text-sm outline-none">
                <option value="rating">Sort by: Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="experience">Years of Experience</option>
              </select>
            </div>

            <!-- Vendors Grid -->
            <div v-if="filteredVendors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="vendor in paginatedVendors"
                :key="vendor.id"
                class="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)] cursor-pointer"
                @click="viewVendorDetails(vendor)"
              >
                <!-- Verified Badge -->
                <div class="absolute top-3 left-3 z-10">
                  <div v-if="vendor.verified" class="flex items-center gap-1 bg-green-500/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Verified
                  </div>
                </div>

                <!-- Featured Badge -->
                <div class="absolute top-3 right-3 z-10">
                  <div v-if="vendor.featured" class="bg-orange-500 px-2 py-1 rounded-lg text-xs font-bold">
                    ⭐ Featured
                  </div>
                </div>

                <!-- Image -->
                <div class="relative h-56 overflow-hidden">
                  <img :src="vendor.image" :alt="vendor.name" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <!-- Rating Overlay -->
                  <div class="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded-lg">
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="text-sm font-bold">{{ vendor.rating }}</span>
                    <span class="text-xs text-gray-300">({{ vendor.reviews }})</span>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <h3 class="font-black text-lg group-hover:text-orange-500 transition mb-1">{{ vendor.name }}</h3>
                  <p class="text-sm text-orange-500 mb-2">{{ vendor.category }}</p>
                  <p class="text-xs text-gray-400 mb-3 line-clamp-2">{{ vendor.description }}</p>
                  
                  <div class="flex items-center gap-3 mb-3 text-xs text-gray-400">
                    <span class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      {{ vendor.experience }} years
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {{ vendor.location }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p class="text-xl font-black text-orange-500">{{ vendor.priceRange }}</p>
                      <p class="text-xs text-gray-500">starting price</p>
                    </div>
                    <button class="px-4 py-2 bg-orange-500 rounded-lg text-sm font-bold hover:bg-orange-600 transition">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-20">
              <svg class="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <h3 class="text-2xl font-bold mb-2">No vendors found</h3>
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

    <!-- Vendor Details Modal -->
    <Transition name="modal-fade">
      <div v-if="selectedVendor" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" @click="closeModal">
        <div class="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-orange-500/30 shadow-2xl" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-orange-500 transition">
            ✕
          </button>

          <!-- Modal Content -->
          <div class="relative">
            <!-- Hero Image -->
            <div class="relative h-80">
              <img :src="selectedVendor.image" :alt="selectedVendor.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                <div v-if="selectedVendor.verified" class="bg-green-500 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Verified Vendor
                </div>
                <div v-if="selectedVendor.featured" class="bg-orange-500 px-3 py-1 rounded-lg text-sm font-bold">
                  ⭐ Featured
                </div>
              </div>

              <!-- Title -->
              <div class="absolute bottom-6 left-6 right-6">
                <h2 class="text-3xl md:text-4xl font-black mb-2">{{ selectedVendor.name }}</h2>
                <div class="flex flex-wrap gap-4 text-sm">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ selectedVendor.location }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    {{ selectedVendor.experience }} years experience
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
                      About {{ selectedVendor.name }}
                    </h3>
                    <p class="text-gray-300 leading-relaxed">{{ selectedVendor.fullDescription }}</p>
                  </div>

                  <div>
                    <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      Services Offered
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="service in selectedVendor.services" :key="service" class="px-3 py-1 bg-white/10 rounded-lg text-sm">
                        {{ service }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                      Client Reviews
                    </h3>
                    <div class="space-y-4">
                      <div v-for="review in selectedVendor.reviewsList" :key="review.id" class="border-b border-white/10 pb-4">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center font-bold">
                              {{ review.author.charAt(0) }}
                            </div>
                            <span class="font-semibold">{{ review.author }}</span>
                          </div>
                          <div class="flex items-center gap-1">
                            <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span>{{ review.rating }}</span>
                          </div>
                        </div>
                        <p class="text-sm text-gray-400">{{ review.comment }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ review.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Contact & Booking -->
                <div class="space-y-4">
                  <div class="bg-orange-500/10 rounded-2xl p-5 border border-orange-500/30">
                    <div class="text-center mb-4">
                      <p class="text-3xl font-black text-orange-500">{{ selectedVendor.priceRange }}</p>
                      <p class="text-sm text-gray-400">starting price for most services</p>
                    </div>

                    <div class="space-y-3">
                      <div class="flex items-center gap-3 py-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{{ selectedVendor.phone }}</span>
                      </div>
                      <div class="flex items-center gap-3 py-2">
                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{{ selectedVendor.email }}</span>
                      </div>
                    </div>

                    <button class="w-full mt-4 py-3 bg-orange-500 rounded-xl font-black hover:bg-orange-600 transition">
                      Contact Vendor
                    </button>
                    <button class="w-full mt-2 py-3 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition">
                      Request Quote
                    </button>
                  </div>

                  <div class="bg-white/5 rounded-2xl p-4">
                    <div class="flex items-center gap-2 text-sm mb-2">
                      <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>100% Verified Vendor</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Response within 24 hours</span>
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
import { ref, computed } from 'vue'
import bg1 from '../assets/bg1.png'

const isMenuOpen = ref(false)
const showFilters = ref(false)
const searchQuery = ref('')
const activeCategory = ref('all')
const priceFilter = ref('all')
const ratingFilter = ref(null)
const verifiedOnly = ref(false)
const sortBy = ref('rating')
const currentPage = ref(1)
const itemsPerPage = 9
const selectedVendor = ref(null)

const availabilityFilter = ref({
  weekends: false,
  evenings: false,
  lastMinute: false
})

// Categories
const categories = [
  { id: 'all', name: 'All', icon: '🎯' },
  { id: 'dj', name: 'DJs & Music', icon: '🎧' },
  { id: 'catering', name: 'Catering', icon: '🍽️' },
  { id: 'photography', name: 'Photography', icon: '📸' },
  { id: 'decoration', name: 'Decoration', icon: '🎨' },
  { id: 'equipment', name: 'Equipment', icon: '🔧' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
  { id: 'planning', name: 'Planning', icon: '📋' }
]

// Vendors Data
const allVendors = ref([
  {
    id: 1,
    name: 'DJ Spin Master',
    category: 'DJs & Music',
    categoryId: 'dj',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviews: 128,
    priceRange: '₦150k',
    experience: 8,
    verified: true,
    featured: true,
    image: bg1,
    phone: '+234 802 123 4567',
    email: 'contact@djspinmaster.com',
    description: 'Professional DJ for weddings, corporate events, and parties',
    fullDescription: 'With over 8 years of experience, DJ Spin Master has performed at over 500 events across Nigeria. Specializing in Afrobeats, Hip-Hop, and Amapiano, we guarantee an unforgettable experience for your guests.',
    services: ['Mobile DJ Services', 'Sound System', 'Lighting', 'MC Services'],
    reviewsList: [
      { id: 1, author: 'John Doe', rating: 5, comment: 'Amazing DJ! Kept the crowd dancing all night.', date: '2 weeks ago' },
      { id: 2, author: 'Jane Smith', rating: 4.8, comment: 'Professional and punctual. Highly recommend!', date: '1 month ago' }
    ]
  },
  {
    id: 2,
    name: 'Elegant Catering Services',
    category: 'Catering',
    categoryId: 'catering',
    location: 'Abuja, Nigeria',
    rating: 4.8,
    reviews: 95,
    priceRange: '₦80k',
    experience: 6,
    verified: true,
    featured: true,
    image: bg1,
    phone: '+234 803 234 5678',
    email: 'info@elegantcatering.com',
    description: 'Exquisite catering for weddings, birthdays, and corporate events',
    fullDescription: 'Elegant Catering specializes in African and continental cuisine. We offer customized menus, professional staff, and exceptional service for events of all sizes.',
    services: ['Buffet Setup', 'Beverages', 'Wait Staff', 'Custom Menus'],
    reviewsList: [
      { id: 1, author: 'Mary Johnson', rating: 5, comment: 'The food was absolutely delicious!', date: '3 weeks ago' }
    ]
  },
  {
    id: 3,
    name: 'Capture The Moment Photography',
    category: 'Photography',
    categoryId: 'photography',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviews: 210,
    priceRange: '₦120k',
    experience: 10,
    verified: true,
    featured: false,
    image: bg1,
    phone: '+234 804 345 6789',
    email: 'hello@capturethemoment.com',
    description: 'Professional photography and videography services',
    fullDescription: 'Award-winning photography team specializing in event coverage. We capture every precious moment with creativity and professionalism.',
    services: ['Photography', 'Videography', 'Photo Booth', 'Drone Shots'],
    reviewsList: [
      { id: 1, author: 'Paul Williams', rating: 5, comment: 'Beautiful photos! Very professional team.', date: '1 week ago' }
    ]
  },
  {
    id: 4,
    name: 'Royal Decor Concepts',
    category: 'Decoration',
    categoryId: 'decoration',
    location: 'Lagos, Nigeria',
    rating: 4.7,
    reviews: 87,
    priceRange: '₦200k',
    experience: 5,
    verified: true,
    featured: false,
    image: bg1,
    phone: '+234 805 456 7890',
    email: 'royaldecor@example.com',
    description: 'Luxury event decoration and floral arrangements',
    fullDescription: 'Transform your venue with our stunning decorations. From intimate gatherings to grand weddings, we create magical atmospheres.',
    services: ['Floral Design', 'Table Settings', 'Lighting', 'Backdrop Design'],
    reviewsList: []
  },
  {
    id: 5,
    name: 'Prime Event Rentals',
    category: 'Equipment',
    categoryId: 'equipment',
    location: 'Port Harcourt, Nigeria',
    rating: 4.6,
    reviews: 64,
    priceRange: '₦50k',
    experience: 7,
    verified: true,
    featured: false,
    image: bg1,
    phone: '+234 806 567 8901',
    email: 'rentals@primeevents.com',
    description: 'High-quality event equipment rental',
    fullDescription: 'Complete event equipment solutions including chairs, tables, tents, and AV equipment. Delivery and setup available.',
    services: ['Furniture Rental', 'Tents', 'AV Equipment', 'Delivery'],
    reviewsList: []
  },
  {
    id: 6,
    name: 'Laugh Factory Comedy',
    category: 'Entertainment',
    categoryId: 'entertainment',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviews: 156,
    priceRange: '₦100k',
    experience: 12,
    verified: true,
    featured: true,
    image: bg1,
    phone: '+234 807 678 9012',
    email: 'bookings@laughfactory.com',
    description: 'Top comedians for corporate events and parties',
    fullDescription: 'Nigeria\'s premier comedy collective featuring the best stand-up comedians. Guaranteed laughter for your audience.',
    services: ['Stand-up Comedy', 'MC Services', 'Improv Shows'],
    reviewsList: []
  },
  {
    id: 7,
    name: 'Perfect Planning Events',
    category: 'Planning',
    categoryId: 'planning',
    location: 'Abuja, Nigeria',
    rating: 4.8,
    reviews: 112,
    priceRange: '₦250k',
    experience: 9,
    verified: true,
    featured: false,
    image: bg1,
    phone: '+234 808 789 0123',
    email: 'info@perfectplanning.com',
    description: 'Full-service event planning and coordination',
    fullDescription: 'Stress-free event planning from concept to execution. We handle everything so you can enjoy your special day.',
    services: ['Event Coordination', 'Vendor Management', 'Timeline Creation', 'Budget Management'],
    reviewsList: []
  },
  {
    id: 8,
    name: 'Melody Makers Band',
    category: 'DJs & Music',
    categoryId: 'dj',
    location: 'Lagos, Nigeria',
    rating: 4.7,
    reviews: 73,
    priceRange: '₦180k',
    experience: 15,
    verified: true,
    featured: false,
    image: bg1,
    phone: '+234 809 890 1234',
    email: 'melodymakers@example.com',
    description: 'Live band for weddings and corporate events',
    fullDescription: 'Experience live music at its finest. Our 8-piece band plays a variety of genres to suit any occasion.',
    services: ['Live Music', 'Background Music', 'Dinner Music', 'Dance Band'],
    reviewsList: []
  },
  {
    id: 9,
    name: 'Sugarcane Catering',
    category: 'Catering',
    categoryId: 'catering',
    location: 'Lagos, Nigeria',
    rating: 4.5,
    reviews: 48,
    priceRange: '₦60k',
    experience: 4,
    verified: false,
    featured: false,
    image: bg1,
    phone: '+234 810 901 2345',
    email: 'info@sugarcanecatering.com',
    description: 'Affordable catering for all occasions',
    fullDescription: 'Delicious Nigerian cuisine at affordable prices. Perfect for birthdays, meetings, and small gatherings.',
    services: ['Small Event Catering', 'Finger Foods', 'Beverages'],
    reviewsList: []
  }
])

// Filtered and Sorted Vendors
const filteredVendors = computed(() => {
  let vendors = [...allVendors.value]

  // Search filter
  if (searchQuery.value) {
    vendors = vendors.filter(vendor => 
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (activeCategory.value !== 'all') {
    vendors = vendors.filter(vendor => vendor.categoryId === activeCategory.value)
  }

  // Price filter
  if (priceFilter.value === 'budget') {
    vendors = vendors.filter(vendor => {
      const price = parseInt(vendor.priceRange.replace(/[^0-9]/g, ''))
      return price < 50000
    })
  } else if (priceFilter.value === 'moderate') {
    vendors = vendors.filter(vendor => {
      const price = parseInt(vendor.priceRange.replace(/[^0-9]/g, ''))
      return price >= 50000 && price <= 200000
    })
  } else if (priceFilter.value === 'premium') {
    vendors = vendors.filter(vendor => {
      const price = parseInt(vendor.priceRange.replace(/[^0-9]/g, ''))
      return price > 200000
    })
  }

  // Rating filter
  if (ratingFilter.value) {
    vendors = vendors.filter(vendor => vendor.rating >= ratingFilter.value)
  }

  // Verified filter
  if (verifiedOnly.value) {
    vendors = vendors.filter(vendor => vendor.verified)
  }

  // Availability filters
  // Note: This is sample logic - in production, you'd have actual availability data
  if (availabilityFilter.value.weekends) {
    vendors = vendors.filter(vendor => vendor.experience > 3)
  }
  if (availabilityFilter.value.evenings) {
    vendors = vendors.filter(vendor => vendor.rating > 4.5)
  }
  if (availabilityFilter.value.lastMinute) {
    vendors = vendors.filter(vendor => vendor.reviews > 50)
  }

  return vendors
})

// Sorting
const sortVendors = () => {
  let vendors = filteredVendors.value
  
  if (sortBy.value === 'rating') {
    vendors.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'price-low') {
    vendors.sort((a, b) => {
      const priceA = parseInt(a.priceRange.replace(/[^0-9]/g, ''))
      const priceB = parseInt(b.priceRange.replace(/[^0-9]/g, ''))
      return priceA - priceB
    })
  } else if (sortBy.value === 'price-high') {
    vendors.sort((a, b) => {
      const priceA = parseInt(a.priceRange.replace(/[^0-9]/g, ''))
      const priceB = parseInt(b.priceRange.replace(/[^0-9]/g, ''))
      return priceB - priceA
    })
  } else if (sortBy.value === 'name') {
    vendors.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'experience') {
    vendors.sort((a, b) => b.experience - a.experience)
  }
  
  return vendors
}

// Pagination
const paginatedVendors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortVendors().slice(start, end)
})

const totalPages = computed(() => Math.ceil(sortVendors().length / itemsPerPage))

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
const filterVendors = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
  priceFilter.value = 'all'
  ratingFilter.value = null
  verifiedOnly.value = false
  sortBy.value = 'rating'
  availabilityFilter.value = { weekends: false, evenings: false, lastMinute: false }
  filterVendors()
}

const viewVendorDetails = (vendor) => {
  selectedVendor.value = vendor
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedVendor.value = null
  document.body.style.overflow = ''
}
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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