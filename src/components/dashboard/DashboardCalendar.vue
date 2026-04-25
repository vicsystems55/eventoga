<template>
    <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-4 glow-panel">
        <div class="mb-4 flex items-center justify-between">
            <h3 class="font-black">Calendar</h3>
            <span class="text-sm text-purple-300">Event schedule</span>
        </div>

        <VueDatePicker v-model="selectedDate" inline auto-apply dark :enable-time-picker="false"
            :highlight="highlightedDates" class="eventoga-calendar w-full" />

        <div class="mt-4 space-y-3">
            <div v-for="event in upcomingEvents" :key="event.title"
                class="rounded-xl border border-white/10 bg-black/40 p-3">
                <p class="text-sm font-bold">{{ event.title }}</p>
                <p class="mt-1 text-xs text-gray-400">{{ event.date }} • {{ event.time }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'




const selectedDate = ref(new Date())

const highlightedDates = [
    new Date(2026, 3, 28),
    new Date(2026, 3, 30),
    new Date(2026, 4, 5),
    new Date(2026, 4, 11),
]

const upcomingEvents = [
    {
        title: 'Afrobeats Live Concert',
        date: 'Apr 28, 2026',
        time: '7:00 PM',
    },
    {
        title: 'Tech Summit 2026',
        date: 'Apr 30, 2026',
        time: '10:00 AM',
    },
]
</script>

<style scoped>

/* FORCE FULL WIDTH */
:deep(.eventoga-calendar),
:deep(.dp__main),
:deep(.dp__menu),
:deep(.dp__calendar) {
  width: 100% !important;
  max-width: 100% !important;
}

/* Make calendar grid stretch nicely */
:deep(.dp__calendar) {
  padding: 0 6px;
}

/* Better spacing between days */
:deep(.dp__calendar_row) {
  justify-content: space-between;
}

/* Make cells expand evenly */
:deep(.dp__cell_inner) {
  width: 100%;
}
.glow-panel {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.12);
}

/* Calendar dark customization */
:deep(.dp__main) {
    font-family: inherit;
}

:deep(.dp__theme_dark) {
    --dp-background-color: transparent;
    --dp-text-color: #ffffff;
    --dp-hover-color: rgba(255, 106, 0, 0.16);
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #ff6a00;
    --dp-primary-color: #ff6a00;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #a855f7;
    --dp-border-color: rgba(168, 85, 247, 0.25);
    --dp-menu-border-color: transparent;
    --dp-border-radius: 16px;
}

:deep(.dp__menu) {
    border: none;
    background: transparent;
}

:deep(.dp__calendar_header) {
    color: #9ca3af;
}

:deep(.dp__cell_inner) {
    border-radius: 999px;
}

:deep(.dp__active_date) {
    background: #ff6a00;
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.5);
}

:deep(.dp__today) {
    border: 1px solid rgba(168, 85, 247, 0.7);
}

:deep(.dp__calendar_item .dp__date_hover:hover) {
    background: rgba(255, 106, 0, 0.16);
}

:deep(.dp__marker_dot) {
    background-color: #a855f7;
}
</style>