<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AttendeeDashboard from './AttendeeDashboard.vue'
import OrganizerDashboard from './OrganizerDashboard.vue'
import SuperAdminDashboard from './SuperAdminDashboard.vue'

const router = useRouter()

// Prefer the stored user object; fall back to a standalone 'role' key
let storedUser = {}
try {
  storedUser = JSON.parse(localStorage.getItem('eventoga_user') || '{}')
} catch (e) {
  storedUser = {}
}

let rawRole = (storedUser?.roles && storedUser.roles[0]) || (typeof window !== 'undefined' && localStorage.getItem('role')) || 'organizer'
// normalize role formats like 'super_admin' -> 'superadmin'
const role = String(rawRole).toLowerCase().replace(/[_\s]/g, '')

// If there's no logged-in user, redirect to auth page
if (!storedUser || !storedUser.id) {
  try {
    router.push('/auth')
  } catch (e) {
    // router might not be ready in some test environments; ignore
  }
}

const componentsMap = {
  attendee: AttendeeDashboard,
  organizer: OrganizerDashboard,
  superadmin: SuperAdminDashboard,
}

const currentComponent = computed(() => componentsMap[role] || OrganizerDashboard)
</script>

<style scoped>
</style>