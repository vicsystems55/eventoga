<template>
  <div class="min-h-screen bg-[#080808] text-white lg:flex">
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/70 lg:hidden" @click="sidebarOpen = false"></div>
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'" class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#101010] p-5 transition-transform lg:sticky lg:top-0 lg:h-screen">
      <div class="flex items-center justify-between"><router-link to="/" class="text-2xl font-black">Event<span class="text-orange-500">Oga</span></router-link><button class="text-2xl text-gray-400 lg:hidden" aria-label="Close menu" @click="sidebarOpen = false">×</button></div>
      <p class="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-500">{{ roleLabel }} workspace</p>
      <nav class="mt-10 space-y-2" aria-label="Dashboard"><router-link v-for="item in menu" :key="item.path" :to="item.path" @click="sidebarOpen = false" class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition" :class="active(item.path) ? 'bg-orange-500/15 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'"><component :is="item.icon" :size="19" aria-hidden="true" />{{ item.label }}</router-link></nav>
      <div class="mt-auto rounded-2xl border border-white/10 bg-white/[.03] p-4"><p class="truncate font-bold">{{ currentUser.name || currentUser.email || 'EventOga user' }}</p><p class="mt-1 text-xs text-gray-400">{{ roleLabel }}</p><button class="mt-4 text-sm font-bold text-orange-400 hover:underline" @click="logout">Sign out</button></div>
    </aside>
    <div class="min-w-0 flex-1"><header class="flex h-16 items-center justify-between border-b border-white/10 px-5 lg:px-8"><button class="rounded-lg border border-white/15 p-2 lg:hidden" aria-label="Open menu" @click="sidebarOpen = true"><Menu :size="21" /></button><span class="hidden text-sm font-semibold text-gray-400 lg:block">{{ roleLabel }} workspace</span><router-link to="/" class="text-sm font-semibold text-gray-400 hover:text-orange-400">View EventOga <ArrowUpRight :size="16" class="inline" /></router-link></header><main class="mx-auto max-w-7xl p-5 lg:p-8"><router-view /></main></div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowUpRight, CalendarDays, FilePlus2, LayoutDashboard, Menu, ShieldCheck, Upload, UserRoundCheck } from '@lucide/vue'
import { authService } from '@/services/authService'
const router = useRouter(), route = useRoute(), sidebarOpen = ref(false)
let currentUser = {}
try { currentUser = JSON.parse(localStorage.getItem('eventoga_user') || '{}') || {} } catch { currentUser = {} }
const role = currentUser.roles?.[0] || 'attendee'
const roleLabel = role === 'superadmin' ? 'Superadmin' : role === 'organizer' ? 'Organizer' : 'Attendee'
const menu = computed(() => role === 'superadmin' ? [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Organizer applications', path: '/dashboard/organizer-applications', icon: UserRoundCheck },
  { label: 'Event review', path: '/dashboard/all-events', icon: ShieldCheck },
  { label: 'Import events', path: '/dashboard/import-events', icon: Upload },
] : role === 'organizer' ? [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Organizer profile', path: '/dashboard/organizer-onboarding', icon: UserRoundCheck },
  { label: 'My events', path: '/dashboard/my-events', icon: CalendarDays },
  { label: 'Create event', path: '/dashboard/create-event', icon: FilePlus2 },
] : [{ label: 'Overview', path: '/dashboard', icon: LayoutDashboard }])
const active = path => path === '/dashboard' ? route.path === path : route.path.startsWith(path)
function logout() { authService.logout(); localStorage.removeItem('role'); router.push('/auth?tab=login') }
</script>
