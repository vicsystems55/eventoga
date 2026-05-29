<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AttendeeDashboard from './AttendeeDashboard.vue'
import OrganizerDashboard from './OrganizerDashboard.vue'
import SuperAdminDashboard from './SuperAdminDashboard.vue'

const role = (typeof window !== 'undefined' && localStorage.getItem('role')) || 'organizer'

const componentsMap = {
  attendee: AttendeeDashboard,
  organizer: OrganizerDashboard,
  superadmin: SuperAdminDashboard,
}

const currentComponent = computed(() => componentsMap[role] || OrganizerDashboard)
</script>

<style scoped>
</style>