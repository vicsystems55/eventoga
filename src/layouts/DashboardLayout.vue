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

         <!-- Desktop Header -->
  <header
    class="sticky top-0 z-40 hidden items-center justify-between border-b border-white/10 bg-[#050505]/85 px-6 py-4 backdrop-blur-xl lg:flex"
  >
    <!-- Search -->
    <div class="relative w-full max-w-xl">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">⌕</span>
      <input
        type="text"
        placeholder="Search events, tickets, organizers..."
        class="w-full rounded-2xl border border-white/10 bg-black/50 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-orange-500"
      />
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-4">
      <!-- Notification -->
     <div class="relative">
  <button
    @click="showNotifications = !showNotifications"
    class="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-orange-500/40 hover:text-orange-500"
  >
    <span
      v-if="notifications.length"
      class="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-orange-500"
    ></span>

    🔔
  </button>

  <!-- Notifications Dropdown -->
  <Transition name="fade-scale">
    <div
      v-if="showNotifications"
      class="absolute right-0 top-16 z-50 w-[380px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/95 shadow-[0_0_40px_rgba(168,85,247,0.18)] backdrop-blur-xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h3 class="text-lg font-black text-white">Notifications</h3>
          <p class="text-xs text-gray-400">
            {{ notifications.length }} unread updates
          </p>
        </div>

        <button
          class="text-xs font-bold text-orange-500 hover:text-orange-400"
          @click="markAllRead"
        >
          Mark all read
        </button>
      </div>

      <!-- Notification List -->
      <div class="max-h-[420px] overflow-y-auto">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="flex gap-4 border-b border-white/5 px-5 py-4 transition hover:bg-white/5"
        >
          <div
            class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
            :class="notification.iconBg"
          >
            {{ notification.icon }}
          </div>

          <div class="flex-1">
            <p class="text-sm font-semibold text-white">
              {{ notification.title }}
            </p>

            <p class="mt-1 text-xs leading-5 text-gray-400">
              {{ notification.message }}
            </p>

            <p class="mt-2 text-[11px] text-gray-500">
              {{ notification.time }}
            </p>
          </div>
        </div>

        <div
          v-if="!notifications.length"
          class="grid place-items-center px-6 py-12 text-center"
        >
          <div
            class="grid h-16 w-16 place-items-center rounded-full bg-white/5 text-2xl"
          >
            🔔
          </div>
          <p class="mt-4 font-bold text-white">No notifications yet</p>
          <p class="mt-2 text-sm text-gray-400">
            Event updates will appear here.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-white/10 p-4">
        <button
          class="w-full rounded-2xl bg-orange-500 px-4 py-3 font-black text-white transition hover:scale-[1.02]"
        >
          View All Notifications
        </button>
      </div>
    </div>
  </Transition>
</div>

      <!-- Profile -->
      <button
        class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-orange-500/40"
      >
        <div
          class="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-orange-500/50 bg-orange-500/10 text-sm font-black text-orange-500"
        >
          <img
            v-if="currentUser.avatar"
            :src="currentUser.avatar"
            alt="Profile"
            class="h-full w-full object-cover"
          />
          <span v-else>{{ userInitial }}</span>
        </div>

        <div class="hidden text-left xl:block">
          <h4 class="text-sm font-black">{{ currentUser.name }}</h4>
          <p class="text-xs text-gray-400">{{ userRole }}</p>
        </div>

        <span class="text-gray-500">⌄</span>
      </button>
    </div>
  </header>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { useRoute } from 'vue-router'

const showNotifications = ref(false)

const notifications = ref([
  {
    id: 1,
    title: 'Event Approved',
    message: 'Your Lagos Afrobeats Night has been approved and is now live.',
    time: '5 mins ago',
    icon: '🎉',
    iconBg: 'bg-green-500/15 text-green-400',
  },
  {
    id: 2,
    title: 'Ticket Purchase',
    message: '3 attendees just booked VIP tickets for your event.',
    time: '20 mins ago',
    icon: '🎟️',
    iconBg: 'bg-orange-500/15 text-orange-400',
  },
  {
    id: 3,
    title: 'Payout Update',
    message: 'Your payout of ₦48,500 is being processed.',
    time: '1 hour ago',
    icon: '💳',
    iconBg: 'bg-purple-500/15 text-purple-300',
  },
])

const markAllRead = () => {
  notifications.value = []
}

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
  { label: 'All Events', path: '/dashboard/all-events', icon: CalendarIcon },
  { label: 'Create Event', path: '/dashboard/create-event', icon: PlusIcon },
  { label: 'Tickets / Sales', path: '/dashboard/bookings', icon: TicketIcon },
  { label: 'Marketplace', path: '/dashboard/marketplace', icon: StoreIcon },
  { label: 'Analytics', path: '/dashboard/analytics', icon: ChartIcon },
  { label: 'Accounts', path: '/dashboard/accounts', icon: ChartIcon },
  { label: 'Messages', path: '/dashboard/messages', icon: MessageIcon },
  { label: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
]


const currentUser = JSON.parse(localStorage.getItem('eventoga_user') || '{}')

const userInitial = currentUser?.name
  ? currentUser.name.charAt(0).toUpperCase()
  : 'U'

const userRole = currentUser?.roles?.[0]
  ? currentUser.roles[0].replace('_', ' ')
  : 'User'


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

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-8px);
}
</style>