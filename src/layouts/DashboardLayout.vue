<template>
  <div class="min-h-screen bg-[#050505] text-white">
    <!-- Mobile Topbar -->
    <nav class="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#050505]/90 px-4 py-4 backdrop-blur-xl lg:hidden">
      <button
        @click="isSidebarOpen = true"
        class="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5"
      >
        <span class="space-y-1.5">
          <span class="block h-0.5 w-6 bg-white"></span>
          <span class="block h-0.5 w-6 bg-white"></span>
          <span class="block h-0.5 w-6 bg-white"></span>
        </span>
      </button>

      <h1 class="text-2xl font-black">
        Event<span class="text-orange-500">Oga</span>
      </h1>

      <button class="grid h-11 w-11 place-items-center rounded-xl bg-orange-500 font-black text-black">
        K
      </button>
    </nav>

    <div class="flex">
      <!-- Overlay -->
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        class="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#060606]/95 p-5 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:z-10"
      >
        <!-- Logo -->
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center gap-3 text-3xl font-black">
            <span class="grid h-11 w-11 place-items-center rounded-2xl border border-orange-500/40 bg-orange-500/10 text-orange-500 glow-orange-soft">
              <svg class="h-6 w-6 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z" />
                <path d="M9 8v8" />
              </svg>
            </span>
            <span>Event<span class="text-orange-500">Oga</span></span>
          </router-link>

          <button
            @click="isSidebarOpen = false"
            class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-gray-400 lg:hidden"
          >
            ×
          </button>
        </div>

        <!-- Menu -->
        <nav class="mt-10 space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="isSidebarOpen = false"
            class="group flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition"
            :class="isExactActive(item.path)
              ? 'bg-orange-500/15 text-orange-500 glow-orange-soft border border-orange-500/30'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'"
          >
            <span class="grid h-6 w-6 place-items-center">
              <component :is="item.icon" />
            </span>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Upgrade Card -->
        <div class="mt-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-orange-500/10 p-5 text-center glow-mix">
          <div class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-orange-500/10">
            <svg class="h-9 w-9 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
              <path d="M4 17l2-9 5 5 5-8 2 12H4z" />
              <path d="M4 20h16" />
            </svg>
          </div>

          <h3 class="text-xl font-black text-orange-500">Upgrade to Pro</h3>
          <p class="mt-3 text-sm leading-6 text-gray-300">
            Unlock more features and grow your events faster.
          </p>

          <button class="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 px-5 py-3 text-sm font-black text-white transition hover:scale-105">
            Upgrade Now
          </button>
        </div>

        <!-- Profile -->
        <div class="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
          <div class="flex items-center gap-3">
            <div class="grid h-12 w-12 place-items-center rounded-full border border-orange-500/60 bg-orange-500/10 text-lg font-black text-orange-500">
              K
            </div>

            <div class="flex-1">
              <h4 class="font-black">Kelvin</h4>
              <p class="text-xs text-gray-400">Event Organizer</p>
            </div>

            <span class="text-gray-400">⌄</span>
          </div>
        </div>
      </aside>

      <!-- Content -->
      <main class="min-h-screen flex-1 overflow-hidden">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)

const isExactActive = (path) => {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(path)
}

const iconClass = 'h-6 w-6 stroke-current'

const DashboardIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }),
    h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }),
  ])

const CalendarIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2 }),
    h('path', { d: 'M16 3v4M8 3v4M3 11h18' }),
  ])

const PlusIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 3 }),
    h('path', { d: 'M12 8v8M8 12h8' }),
  ])

const TicketIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z' }),
    h('path', { d: 'M9 8v8' }),
  ])

const StoreIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 10h16l-1-5H5l-1 5z' }),
    h('path', { d: 'M6 10v10h12V10' }),
    h('path', { d: 'M9 20v-6h6v6' }),
  ])

const ChartIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 19V5' }),
    h('path', { d: 'M4 19h16' }),
    h('path', { d: 'M8 16v-5M12 16V8M16 16v-9' }),
  ])

const MessageIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 5h16v11H8l-4 4V5z' }),
    h('path', { d: 'M8 9h8M8 13h5' }),
  ])

const SettingsIcon = () =>
  h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('circle', { cx: 12, cy: 12, r: 3 }),
    h('path', { d: 'M19.4 15a1.8 1.8 0 00.36 2l.06.06-2 3-.08-.03a1.8 1.8 0 00-2.1.36 1.8 1.8 0 00-.5 1.3V22h-6v-.1a1.8 1.8 0 00-.5-1.3 1.8 1.8 0 00-2.1-.36l-.08.03-2-3 .06-.06a1.8 1.8 0 00.36-2A1.8 1.8 0 003 14H2v-4h1a1.8 1.8 0 001.7-1.2 1.8 1.8 0 00-.36-2l-.06-.06 2-3 .08.03a1.8 1.8 0 002.1-.36A1.8 1.8 0 009 2.1V2h6v.1a1.8 1.8 0 00.5 1.3 1.8 1.8 0 002.1.36l.08-.03 2 3-.06.06a1.8 1.8 0 00-.36 2A1.8 1.8 0 0021 10h1v4h-1a1.8 1.8 0 00-1.6 1z' }),
  ])

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'My Events', path: '/dashboard/my-events', icon: CalendarIcon },
  { label: 'Create Event', path: '/dashboard/create-event', icon: PlusIcon },
  { label: 'Tickets / Sales', path: '/dashboard/bookings', icon: TicketIcon },
  { label: 'Marketplace', path: '/dashboard/marketplace', icon: StoreIcon },
  { label: 'Analytics', path: '/dashboard/analytics', icon: ChartIcon },
  { label: 'Accounts', path: '/dashboard/accounts', icon: ChartIcon },
  { label: 'Messages', path: '/dashboard/messages', icon: MessageIcon },
  { label: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
]
</script>

<style scoped>
.glow-orange-soft {
  box-shadow:
    0 0 14px rgba(255, 106, 0, 0.28),
    0 0 35px rgba(255, 106, 0, 0.12);
}

.glow-mix {
  box-shadow:
    0 0 20px rgba(255, 106, 0, 0.25),
    0 0 45px rgba(168, 85, 247, 0.18);
}
</style>