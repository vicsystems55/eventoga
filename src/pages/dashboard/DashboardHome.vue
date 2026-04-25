<template>
    <div class="ambient-dashboard min-h-screen p-4 md:p-6">
        <!-- Header -->
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 class="text-3xl font-black md:text-4xl">
                    Hello Kelvin 👋
                </h1>
                <p class="mt-1 text-gray-400">
                    Here’s what’s happening with your events today.
                </p>
            </div>

            <div class="flex flex-wrap gap-3">
                <button
                    class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange transition hover:bg-orange-600">
                    ＋ Create Event
                </button>
                <button
                    class="rounded-xl border border-purple-500/40 px-6 py-3 font-bold text-purple-300 glow-purple-soft transition hover:bg-purple-500/10">
                    ◰ View Analytics
                </button>
            </div>
        </div>

        <!-- Stats -->
        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border p-5"
                :class="stat.color === 'orange' ? 'border-orange-500/40 glow-orange-card' : 'border-purple-500/40 glow-purple-card'">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="grid h-14 w-14 place-items-center rounded-2xl"
                            :class="stat.color === 'orange' ? 'bg-orange-500/15 text-orange-500' : 'bg-purple-500/15 text-purple-400'">
                            <component :is="stat.icon" />
                        </div>

                        <div>
                            <p class="text-sm text-gray-300">{{ stat.label }}</p>
                            <h2 class="mt-1 text-3xl font-black">{{ stat.value }}</h2>
                            <p class="mt-1 text-xs text-green-400">↑ {{ stat.change }} from last month</p>
                        </div>
                    </div>

                    <svg class="h-12 w-16 opacity-80"
                        :class="stat.color === 'orange' ? 'stroke-orange-500' : 'stroke-purple-500'" fill="none"
                        stroke-width="2" viewBox="0 0 80 40">
                        <path d="M2 34 C12 30, 18 18, 28 22 S42 36, 52 18 S64 12, 72 22 S78 18, 80 10" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.9fr_0.9fr]">
            <!-- Sales Overview -->
            <SalesOverviewChart />

            <!-- Ticket Sales -->
           <TicketSalesChart />

            <!-- Calendar -->
         <DashboardCalendar />
        </div>

        <!-- Bottom -->
        <div class="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.9fr_0.9fr]">
            <!-- Recent Events -->
            <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-5 glow-panel">
                <div class="mb-5 flex items-center justify-between">
                    <h3 class="font-black">Recent Events</h3>
                    <a href="#" class="text-sm text-purple-300">View All</a>
                </div>

                <div class="space-y-4">
                    <div v-for="event in recentEvents" :key="event.title"
                        class="grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                        <img :src="event.image" class="h-16 w-16 rounded-xl object-cover" />

                        <div>
                            <h4 class="font-black">{{ event.title }}</h4>
                            <p class="mt-1 text-xs text-gray-400">📅 {{ event.date }}</p>
                            <p class="text-xs text-gray-400">📍 {{ event.location }}</p>
                        </div>

                        <div class="text-right">
                            <span class="rounded-full px-3 py-1 text-xs font-bold"
                                :class="event.live ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-300'">
                                {{ event.status }}
                            </span>
                            <p class="mt-3 text-sm text-gray-400">Tickets Sold</p>
                            <p class="font-black">{{ event.sold }}</p>
                            <div class="mt-2 h-1.5 w-20 rounded-full bg-white/10">
                                <div class="h-full rounded-full bg-orange-500" :style="{ width: event.progress }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-5 glow-panel">
                <div class="mb-5 flex items-center justify-between">
                    <h3 class="font-black">Recent Activity</h3>
                    <a href="#" class="text-sm text-purple-300">View All</a>
                </div>

                <div class="space-y-5">
                    <div v-for="activity in activities" :key="activity.title" class="flex gap-4">
                        <div class="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/15 text-orange-500">
                            <component :is="activity.icon" />
                        </div>

                        <div class="flex-1">
                            <div class="flex justify-between gap-4">
                                <h4 class="font-bold">{{ activity.title }}</h4>
                                <span class="text-xs text-gray-500">{{ activity.time }}</span>
                            </div>
                            <p class="mt-1 text-sm text-gray-400">{{ activity.text }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tasks -->
            <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-5 glow-panel">
                <div class="mb-5 flex items-center justify-between">
                    <h3 class="font-black">Tasks</h3>
                    <a href="#" class="text-sm text-purple-300">View All</a>
                </div>

                <div class="space-y-5">
                    <div v-for="task in tasks" :key="task.title" class="flex gap-4">
                        <span class="mt-1 grid h-5 w-5 place-items-center rounded-full border"
                            :class="task.done ? 'border-purple-500 bg-purple-600 text-white' : 'border-orange-500'">
                            <span v-if="task.done" class="text-xs">✓</span>
                        </span>

                        <div>
                            <p class="font-semibold" :class="task.done ? 'line-through text-gray-500' : ''">
                                {{ task.title }}
                            </p>
                            <p class="mt-1 text-sm text-gray-400">{{ task.sub }}</p>
                        </div>
                    </div>
                </div>

                <button
                    class="mt-8 flex w-full items-center justify-between rounded-xl border border-purple-500/40 px-5 py-3 font-bold text-purple-300 hover:bg-purple-500/10">
                    Add New Task <span>＋</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { h } from 'vue'
import bg1 from '../../assets/bg1.png'

import SalesOverviewChart from '../../components/dashboard/SalesOverviewChart.vue'
import TicketSalesChart from '../../components/dashboard/TicketSalesChart.vue'
import DashboardCalendar from '../../components/dashboard/DashboardCalendar.vue'


const iconClass = 'h-6 w-6 stroke-current'

const CalendarIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2 }),
    h('path', { d: 'M16 3v4M8 3v4M3 11h18' }),
])

const TicketIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z' }),
])

const WalletIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7h16v12H4z' }),
    h('path', { d: 'M16 12h4' }),
])

const UsersIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87' }),
    h('circle', { cx: 12, cy: 7, r: 4 }),
])

const stats = [
    { label: 'Total Events', value: '24', change: '12%', color: 'orange', icon: CalendarIcon },
    { label: 'Tickets Sold', value: '1,284', change: '18%', color: 'purple', icon: TicketIcon },
    { label: 'Revenue', value: '₦2.45M', change: '22%', color: 'orange', icon: WalletIcon },
    { label: 'Active Bookings', value: '312', change: '8%', color: 'purple', icon: UsersIcon },
]

const ticketSales = [
    { label: 'Early Bird', percent: '40%', dot: 'bg-orange-500' },
    { label: 'VIP', percent: '25%', dot: 'bg-purple-500' },
    { label: 'General', percent: '20%', dot: 'bg-pink-500' },
    { label: 'Free', percent: '15%', dot: 'bg-indigo-500' },
]

const calendarDates = Array.from({ length: 35 }, (_, i) => ({
    value: i < 4 ? 27 + i : i - 3,
    active: i === 25,
    purple: i === 15,
}))

const recentEvents = [
    { title: 'Afrobeats Live Concert', date: 'May 24, 2025 · 7:00 PM', location: 'Eko Convention Centre, Lagos', status: 'Live', live: true, sold: '342/500', progress: '75%', image: bg1 },
    { title: 'Tech Summit 2025', date: 'May 30, 2025 · 9:00 AM', location: 'Landmark Centre, Lagos', status: 'Upcoming', sold: '128/300', progress: '45%', image: bg1 },
    { title: 'Beach Party Vibes', date: 'Jun 7, 2025 · 4:00 PM', location: 'Elegushi Beach, Lagos', status: 'Upcoming', sold: '89/200', progress: '35%', image: bg1 },
]

const activities = [
    { title: 'New ticket sale', text: 'VIP ticket for Afrobeats Live Concert', time: '2m ago', icon: TicketIcon },
    { title: 'New booking', text: '12 tickets for Tech Summit 2025', time: '15m ago', icon: UsersIcon },
    { title: 'Payout processed', text: 'Transfer to GTBank •••• 5678', time: '1h ago', icon: WalletIcon },
    { title: 'New review', text: 'Great event experience! 🔥', time: '2h ago', icon: TicketIcon },
]

const tasks = [
    { title: 'Complete event setup', sub: 'Afrobeats Live Concert' },
    { title: 'Review vendor applications', sub: '3 pending reviews' },
    { title: 'Send event reminder', sub: 'Tech Summit 2025', done: true },
]
</script>

<style scoped>
.ambient-dashboard {
    background:
        radial-gradient(circle at 12% 8%, rgba(255, 106, 0, 0.12), transparent 24%),
        radial-gradient(circle at 90% 12%, rgba(168, 85, 247, 0.18), transparent 28%),
        radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.12), transparent 30%),
        #050505;
}

.glow-orange {
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.35), 0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-orange-soft {
    box-shadow: 0 0 14px rgba(255, 106, 0, 0.24), 0 0 35px rgba(255, 106, 0, 0.1);
}

.glow-purple-soft {
    box-shadow: 0 0 14px rgba(168, 85, 247, 0.28), 0 0 35px rgba(168, 85, 247, 0.12);
}

.glow-panel {
    box-shadow: 0 0 22px rgba(168, 85, 247, 0.12);
}

.glow-orange-card {
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.22);
}

.glow-purple-card {
    box-shadow: 0 0 18px rgba(168, 85, 247, 0.24);
}
</style>