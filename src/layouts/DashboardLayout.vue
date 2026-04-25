<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <!-- Dashboard Navbar -->
    <nav class="relative z-50 flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-9">
      <div class="flex items-center gap-4">
        <!-- Sidebar Toggle -->
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="grid h-10 w-10 place-items-center rounded-lg border border-white/20 md:hidden"
        >
          <span class="space-y-1.5">
            <span class="block h-0.5 w-5 bg-white"></span>
            <span class="block h-0.5 w-5 bg-white"></span>
            <span class="block h-0.5 w-5 bg-white"></span>
          </span>
        </button>

        <div class="flex items-center gap-2 text-2xl font-black">
          <span>Event<span class="text-orange-500">Oga</span></span>
        </div>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-4">
        <button class="grid h-10 w-10 place-items-center rounded-lg border border-white/20 hover:bg-white/10 transition">
          🔔
        </button>
        <button class="grid h-10 w-10 place-items-center rounded-lg bg-orange-500 text-black font-bold hover:bg-orange-600 transition">
          👤
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="isSidebarOpen ? 'block' : 'hidden md:block'"
        class="border-r border-white/10 bg-[#0a0a0a] w-64 min-h-screen md:block"
      >
        <div class="p-6">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Dashboard</h3>
          
          <nav class="mt-6 space-y-2">
            <router-link
              to="/dashboard"
              @click="isSidebarOpen = false"
              :class="isActive('/dashboard') && route.path === '/dashboard' ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
            >
              <span class="text-lg">📊</span>
              Overview
            </router-link>

            <router-link
              to="/dashboard/my-events"
              @click="isSidebarOpen = false"
              :class="isActive('/dashboard/my-events') ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
            >
              <span class="text-lg">🎫</span>
              My Events
            </router-link>

            <router-link
              to="/dashboard/bookings"
              @click="isSidebarOpen = false"
              :class="isActive('/dashboard/bookings') ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
            >
              <span class="text-lg">✅</span>
              Bookings
            </router-link>

            <router-link
              to="/dashboard/analytics"
              @click="isSidebarOpen = false"
              :class="isActive('/dashboard/analytics') ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
            >
              <span class="text-lg">📈</span>
              Analytics
            </router-link>

            <router-link
              to="/dashboard/settings"
              @click="isSidebarOpen = false"
              :class="isActive('/dashboard/settings') ? 'bg-orange-500/20 text-orange-500' : 'text-gray-400 hover:text-white'"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition"
            >
              <span class="text-lg">⚙️</span>
              Settings
            </router-link>
          </nav>

          <hr class="my-6 border-white/10" />

          <router-link
            to="/"
            class="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-400 hover:text-white transition"
          >
            <span class="text-lg">🏠</span>
            Back to Home
          </router-link>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>

<style scoped>
/* Sidebar animations */
aside {
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  aside.block {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 40;
  }
}
</style>
