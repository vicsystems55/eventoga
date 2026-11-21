<template>
  <main class="space-y-7 text-white">
    <header><p class="text-sm font-bold uppercase tracking-widest text-orange-400">Organizer studio</p><h1 class="mt-2 text-3xl font-black">Your events, from draft to discovery</h1><p class="mt-2 text-gray-400">Complete your profile, create an event, and send it to the EventOga team for review.</p></header>
    <p v-if="error" role="alert" class="rounded-xl bg-red-500/10 p-4 text-red-300">{{ error }}</p>
    <section class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-[#111] p-6"><p class="text-sm text-gray-400">Organizer profile</p><p class="mt-3 text-2xl font-black capitalize" :class="profile?.approval_status === 'approved' ? 'text-green-400' : 'text-orange-400'">{{ profile?.approval_status || 'Not submitted' }}</p><router-link to="/dashboard/organizer-onboarding" class="mt-5 inline-block text-sm font-bold text-orange-400">View profile →</router-link></div>
      <div class="rounded-2xl border border-white/10 bg-[#111] p-6"><p class="text-sm text-gray-400">Your events</p><p class="mt-3 text-3xl font-black">{{ events.length }}</p><router-link to="/dashboard/my-events" class="mt-5 inline-block text-sm font-bold text-orange-400">Manage events →</router-link></div>
      <div class="rounded-2xl border border-white/10 bg-[#111] p-6"><p class="text-sm text-gray-400">Awaiting event review</p><p class="mt-3 text-3xl font-black">{{ events.filter(event => event.status === 'submitted').length }}</p><router-link v-if="profile?.approval_status === 'approved'" to="/dashboard/create-event" class="mt-5 inline-block text-sm font-bold text-orange-400">Create event →</router-link></div>
    </section>
    <section class="rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-purple-500/10 p-6"><h2 class="text-xl font-bold">{{ profile?.approval_status === 'approved' ? 'Ready to publish?' : 'Start with your organizer profile' }}</h2><p class="mt-2 text-sm text-gray-300">{{ profile?.approval_status === 'approved' ? 'Save an event draft and submit it for superadmin approval.' : 'The EventOga team reviews each organizer before event creation is enabled.' }}</p><router-link :to="profile?.approval_status === 'approved' ? '/dashboard/create-event' : '/dashboard/organizer-onboarding'" class="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-black">{{ profile?.approval_status === 'approved' ? 'Create event' : 'Open profile' }}</router-link></section>
  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { organizerProfileService } from '@/services/organizerProfileService'
import { eventService } from '@/services/eventService'
const profile = ref(null), events = ref([]), error = ref('')
onMounted(async () => { try { profile.value = await organizerProfileService.getProfile(); if (profile.value?.approval_status === 'approved') events.value = await eventService.getMyEvents() } catch (cause) { error.value = cause.response?.data?.message || 'Could not load your workspace.' } })
</script>
