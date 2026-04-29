<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <!-- Navbar -->
    <nav class="relative z-50 flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-9 bg-[#050505]">
      <div class="flex items-center gap-2 text-2xl font-black md:text-3xl">
        <router-link to="/" class="flex items-center gap-2 hover:text-orange-500 transition">
          <span>Event<span class="text-orange-500">Oga</span></span>
          <span class="text-2xl">🎟️</span>
        </router-link>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden gap-10 text-sm font-semibold md:flex">
        <router-link
          to="/"
          :class="isActive('/') ? 'text-orange-500' : 'text-white hover:text-orange-500'"
          class="transition"
        >
          Home
        </router-link>
        <router-link
          to="/events"
          :class="isActive('/events') ? 'text-orange-500' : 'text-white hover:text-orange-500'"
          class="transition"
        >
          Events
        </router-link>
        <router-link
          to="/marketplace"
          :class="isActive('/marketplace') ? 'text-orange-500' : 'text-white hover:text-orange-500'"
          class="transition"
        >
          Marketplace
        </router-link>
        <router-link
          to="/organizers"
          :class="isActive('/organizers') ? 'text-orange-500' : 'text-white hover:text-orange-500'"
          class="transition"
        >
          For Organizers
        </router-link>
        <router-link
          to="/about"
          :class="isActive('/about') ? 'text-orange-500' : 'text-white hover:text-orange-500'"
          class="transition"
        >
          About Us
        </router-link>
      </div>

      <div class="hidden items-center gap-3 md:flex">
        <button class="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold hover:border-orange-500 transition">
          📍 Lagos⌄
        </button>
        <router-link
          to="/auth"
          class="rounded-xl border border-white/30 px-6 py-3 text-sm font-bold hover:border-orange-500 transition"
        >
          Login
        </router-link>
        <router-link
          to="/auth?tab=register"
          class="rounded-xl bg-orange-500 px-6 py-3 text-sm font-black text-white hover:bg-orange-600 transition"
        >
          Sign Up
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
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
    </nav>

    <!-- Mobile Drawer -->
    <Transition name="drawer-fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm md:hidden"
        @click="isMenuOpen = false"
      >
        <Transition name="drawer-slide">
          <div
            v-if="isMenuOpen"
            @click.stop
            class="absolute right-0 top-0 h-full w-64 overflow-y-auto bg-[#0a0a0a] p-6"
          >
            <button @click="isMenuOpen = false" class="mb-6 text-gray-400 hover:text-white">
              ✕
            </button>

            <div class="space-y-4">
              <router-link
                to="/"
                @click="isMenuOpen = false"
                :class="isActive('/') ? 'text-orange-500 font-black' : 'text-white'"
                class="block py-3 transition"
              >
                Home
              </router-link>
              <router-link
                to="/events"
                @click="isMenuOpen = false"
                :class="isActive('/events') ? 'text-orange-500 font-black' : 'text-white'"
                class="block py-3 transition"
              >
                Events
              </router-link>
              <router-link
                to="/marketplace"
                @click="isMenuOpen = false"
                :class="isActive('/marketplace') ? 'text-orange-500 font-black' : 'text-white'"
                class="block py-3 transition"
              >
                Marketplace
              </router-link>
              <router-link
                to="/organizers"
                @click="isMenuOpen = false"
                :class="isActive('/organizers') ? 'text-orange-500 font-black' : 'text-white'"
                class="block py-3 transition"
              >
                For Organizers
              </router-link>
              <router-link
                to="/about"
                @click="isMenuOpen = false"
                :class="isActive('/about') ? 'text-orange-500 font-black' : 'text-white'"
                class="block py-3 transition"
              >
                About Us
              </router-link>
              <hr class="my-4 border-white/10" />
              <router-link
                to="/auth"
                @click="isMenuOpen = false"
                class="block rounded-xl border border-white/30 px-4 py-3 text-center text-sm font-bold"
              >
                Login
              </router-link>
              <router-link
                to="/auth?tab=register"
                @click="isMenuOpen = false"
                class="block rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-black text-black"
              >
                Sign Up
              </router-link>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Page Content -->
<main>
  <router-view />
</main>

  

     <!-- Footer -->
    <footer  class="mt-14 border-t border-white/10 bg-[#070707] px-4 py-12 md:px-6 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
        <div>
          <h2 class="text-3xl font-black">Event<span class="text-orange-500">Oga</span></h2>
          <p class="mt-4 max-w-xs leading-7 text-gray-400">
            Find what’s happening near you. Discover trusted events, vendors and local experiences.
          </p>
          <p class="mt-8 text-sm text-gray-500">© 2026 EventOga. All rights reserved.</p>
        </div>

        <div>
          <h3 class="mb-4 font-black text-white">Quick Links</h3>
          <ul class="space-y-3 text-sm text-gray-400">
            <li><a href="#" class="transition hover:text-orange-500">Events</a></li>
            <li><a href="#" class="transition hover:text-orange-500">Marketplace</a></li>
            <li><a href="#" class="transition hover:text-orange-500">For Organizers</a></li>
            <li><a href="#" class="transition hover:text-orange-500">Premium</a></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-black text-white">Support</h3>
          <ul class="space-y-3 text-sm text-gray-400">
            <li><a href="#" class="transition hover:text-orange-500">Help Center</a></li>
            <li><a href="#" class="transition hover:text-orange-500">Safety Policy</a></li>
            <li><a href="#" class="transition hover:text-orange-500">Terms & Conditions</a></li>
            <li><a href="#" class="transition hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-black text-white">Follow Us</h3>
          <div class="flex flex-wrap gap-3">
            <a href="#"
              class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">f</a>
            <a href="#"
              class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">x</a>
            <a href="#"
              class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">ig</a>
            <a href="#"
              class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">in</a>
          </div>
        </div>

        <div>
          <h3 class="mb-4 font-black text-white">Stay Updated</h3>
          <p class="mb-4 text-sm leading-6 text-gray-400">
            Get latest events, deals and organizer updates.
          </p>

          <div class="flex overflow-hidden rounded-xl bg-white p-1">
            <input type="email" placeholder="Enter your email" class="w-full px-4 text-sm text-black outline-none" />
            <button class="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-black">Subscribe</button>
          </div>

          <p class="mt-6 text-sm text-gray-500">
            Made with <span class="text-orange-500">♥</span> in Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>
