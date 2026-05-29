<template>
  <div class="min-h-screen bg-[#050505] p-4 text-white md:p-6">
    <div class="mx-auto space-y-6">
      <!-- Header -->
      <section class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-sm font-black uppercase text-purple-400">Super Admin</p>
          <h1 class="mt-2 text-3xl font-black md:text-4xl">
            Welcome back, Super Admin 👋
          </h1>
          <p class="mt-2 text-gray-400">
            Here’s what’s happening on EventOga today.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <select class="input w-auto">
            <option>Last 30 days</option>
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>

          <button class="rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-3 font-black">
            Export Report
          </button>
        </div>
      </section>
      <div v-if="isLoading" class="rounded-xl bg-orange-500/10 p-4 text-orange-300">
        Loading dashboard...
      </div>

      <div v-if="errorMessage" class="rounded-xl bg-red-500/10 p-4 text-red-300">
        {{ errorMessage }}
      </div>

      <!-- Executive Stats -->
      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Users" :value="formatNumber(overview.total_users)" change="Live data" icon="👤"
          color="purple" />
        <StatCard title="Total Organizers" :value="formatNumber(overview.total_organizers)" change="Live data" icon="👥"
          color="orange" />
        <StatCard title="Total Events" :value="formatNumber(overview.total_events)" change="Live data" icon="📅"
          color="blue" />
        <StatCard title="Wallet Balance" :value="formatOrbs(overview.total_wallet_balance)" change="Live data" icon="👛"
          color="green" />
        <StatCard title="Orbs in Circulation" :value="formatOrbs(overview.orbs_in_circulation)" change="Live data"
          icon="◈" color="yellow" />
      </section>

      <!-- Action Required + Activity -->
      <section class="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div class="dashboard-card">
          <SectionHeader title="Action Required" />

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <ActionCard title="Events Awaiting Approval" :value="formatNumber(actionRequired.events_awaiting_approval)"
              icon="📅" color="purple" />
            <ActionCard title="Organizer Applications" :value="formatNumber(actionRequired.organizer_applications)"
              icon="👥" color="orange" />
            <ActionCard title="Flagged Events" :value="formatNumber(actionRequired.flagged_events)" icon="🚩"
              color="red" />
            <ActionCard title="Suspended Accounts" :value="formatNumber(actionRequired.suspended_accounts)" icon="⚠️"
              color="yellow" />
            <ActionCard title="Payouts Pending" :value="formatNumber(actionRequired.payouts_pending)" icon="💳"
              color="blue" />
          </div>
        </div>

        <div class="dashboard-card">
          <SectionHeader title="Recent Activity" link="View all" />

          <div class="space-y-4">
            <ActivityRow icon="📅" title="New event “Afro Beats Night”" text="created by Victor Ade" time="2m ago" />
            <ActivityRow icon="✅" title="Organizer approved" text="Rhythm Events verified" time="15m ago" />
            <ActivityRow icon="💰" title="₦350,000 payout processed" text="to Luxe Events" time="1h ago" />
            <ActivityRow icon="🎟️" title="Tech Conference sold 50 tickets" text="ticket sales update" time="2h ago" />
          </div>
        </div>
      </section>

      <!-- Charts -->
      <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div class="dashboard-card">
          <SectionHeader title="Revenue Overview" />

          <apexchart height="320" type="line" :options="revenueChartOptions" :series="revenueSeries" />
        </div>

        <div class="dashboard-card">
          <SectionHeader title="User Growth" />

          <apexchart height="320" type="bar" :options="userGrowthOptions" :series="userGrowthSeries" />
        </div>
      </section>

      <!-- Lower Grid -->
      <section class="grid gap-6 xl:grid-cols-[0.75fr_1fr_1fr_360px]">
        <div class="dashboard-card">
          <SectionHeader title="Event Status" />

          <apexchart height="260" type="donut" :options="eventStatusOptions" :series="eventStatusSeries" />
        </div>

        <div class="dashboard-card">
          <SectionHeader title="Top Organizers" link="View all" />

          <div class="space-y-3">
            <TableRow v-for="organizer in topOrganizers" :key="organizer.id"
              :title="organizer.business_name || organizer.user?.name || 'Organizer'"
              :meta="`${organizer.total_events || 0} events`" :value="`${organizer.total_tickets_sold || 0} tickets`" />
          </div>
        </div>

        <div class="dashboard-card">
          <SectionHeader title="Top Events" link="View all" />

          <div class="space-y-3">
            <TableRow v-for="event in topEvents" :key="event.id" :title="event.title"
              :meta="`${event.tickets_sold_count || 0} tickets sold`" :value="`${event.views_count || 0} views`" />
          </div>
        </div>

        <div class="dashboard-card">
          <SectionHeader title="Payout Summary" />

          <div class="space-y-4">
            <div class="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
              <p class="text-sm text-gray-400">Available Balance</p>
              <h3 class="mt-2 text-2xl font-black">
                {{ formatOrbs(payoutSummary.pending_amount) }}
              </h3>
            </div>

            <div class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
              <p class="text-sm text-gray-400">Pending Payouts</p>
              <h3 class="mt-2 text-2xl font-black">₦4.25M</h3>
              <p class="mt-1 text-xs text-gray-400">12 requests</p>
            </div>

            <div class="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
              <p class="text-sm text-gray-400">Paid This Month</p>
              <h3 class="mt-2 text-2xl font-black">₦12.65M</h3>
              <p class="mt-1 text-xs text-gray-400">26 payouts</p>
            </div>

            <button class="w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 py-3 font-black">
              Manage Payouts →
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { dashboardService } from '@/services/dashboardService'

const apexchart = VueApexCharts

const isLoading = ref(false)
const errorMessage = ref('')
const dashboard = ref(null)

const fetchDashboardStats = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    dashboard.value = await dashboardService.getAdminDashboardStats()

    console.log('ADMIN DASHBOARD:', dashboard.value)
  } catch (error) {
    console.log('ADMIN DASHBOARD ERROR:', error.response || error)

    errorMessage.value =
      error.response?.data?.message || 'Unable to load dashboard stats'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchDashboardStats)

const overview = computed(() => dashboard.value?.overview || {})
const actionRequired = computed(() => dashboard.value?.action_required || {})
const eventStatus = computed(() => dashboard.value?.event_status || {})
const topOrganizers = computed(() => dashboard.value?.top_organizers || [])
const topEvents = computed(() => dashboard.value?.top_events || [])
const payoutSummary = computed(() => dashboard.value?.payout_summary || {})

const formatNumber = (value) => Number(value || 0).toLocaleString()
const formatOrbs = (value) => `${formatNumber(value)} Orbs`

const chartBase = {
  chart: {
    toolbar: { show: false },
    background: 'transparent',
    foreColor: '#9ca3af',
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  theme: {
    mode: 'dark',
  },
}

const revenueSeries = computed(() => {
  return dashboard.value?.revenue_chart?.series || [
    { name: 'Revenue', data: [0, 0, 0, 0, 0, 0] },
  ]
})

const revenueChartOptions = computed(() => ({
  ...chartBase,
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#a855f7', '#f97316', '#22c55e'],
  xaxis: {
    categories: dashboard.value?.revenue_chart?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
}))

const userGrowthSeries = computed(() => {
  return dashboard.value?.user_growth_chart?.series || [
    { name: 'Users', data: [0, 0, 0, 0, 0, 0] },
  ]
})

const userGrowthOptions = computed(() => ({
  ...chartBase,
  colors: ['#a855f7'],
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '45%',
    },
  },
  xaxis: {
    categories: dashboard.value?.user_growth_chart?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
}))

const eventStatusSeries = computed(() => [
  Number(eventStatus.value.published || 0),
  Number(eventStatus.value.draft || 0),
  Number(eventStatus.value.pending_approval || 0),
  Number(eventStatus.value.completed || 0),
  Number(eventStatus.value.cancelled || 0),
  Number(eventStatus.value.rejected || 0),
])

const eventStatusOptions = computed(() => ({
  ...chartBase,
  labels: ['Published', 'Draft', 'Pending', 'Completed', 'Cancelled', 'Rejected'],
  colors: ['#22c55e', '#3b82f6', '#facc15', '#a855f7', '#ef4444', '#f97316'],
  legend: {
    position: 'bottom',
  },
}))

const SectionHeader = defineComponent({
  props: ['title', 'link'],
  setup(props) {
    return () =>
      h('div', { class: 'mb-5 flex items-center justify-between gap-4' }, [
        h('h2', { class: 'text-xl font-black' }, props.title),
        props.link
          ? h('button', { class: 'text-sm font-bold text-purple-400 hover:text-orange-400' }, props.link)
          : null,
      ])
  },
})

const StatCard = defineComponent({
  props: ['title', 'value', 'change', 'icon', 'color'],
  setup(props) {
    const colors = {
      purple: 'bg-purple-500/15 text-purple-300',
      orange: 'bg-orange-500/15 text-orange-400',
      blue: 'bg-blue-500/15 text-blue-400',
      green: 'bg-green-500/15 text-green-400',
      yellow: 'bg-yellow-500/15 text-yellow-400',
    }

    return () =>
      h('div', { class: 'rounded-3xl border border-white/10 bg-[#0b0b0b] p-5' }, [
        h('div', { class: `grid h-14 w-14 place-items-center rounded-2xl text-2xl ${colors[props.color]}` }, props.icon),
        h('p', { class: 'mt-4 text-sm text-gray-400' }, props.title),
        h('h3', { class: 'mt-1 text-2xl font-black' }, props.value),
        h('p', { class: 'mt-2 text-xs font-bold text-green-400' }, props.change),
      ])
  },
})

const ActionCard = defineComponent({
  props: ['title', 'value', 'icon', 'color'],
  setup(props) {
    const colors = {
      purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
      orange: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
      red: 'border-red-500/30 bg-red-500/10 text-red-400',
      yellow: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
      blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    }

    return () =>
      h('button', { class: `rounded-2xl border p-4 text-left transition hover:scale-[1.02] ${colors[props.color]}` }, [
        h('div', { class: 'text-2xl' }, props.icon),
        h('h3', { class: 'mt-3 text-3xl font-black text-white' }, props.value),
        h('p', { class: 'mt-1 text-sm text-gray-300' }, props.title),
        h('p', { class: 'mt-4 text-sm font-bold' }, 'Review now →'),
      ])
  },
})

const ActivityRow = defineComponent({
  props: ['icon', 'title', 'text', 'time'],
  setup(props) {
    return () =>
      h('div', { class: 'flex gap-3 rounded-2xl bg-black/30 p-3' }, [
        h('div', { class: 'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple-500/15 text-xl' }, props.icon),
        h('div', { class: 'flex-1' }, [
          h('p', { class: 'text-sm font-black' }, props.title),
          h('p', { class: 'mt-1 text-xs text-gray-400' }, props.text),
        ]),
        h('p', { class: 'text-xs text-gray-500' }, props.time),
      ])
  },
})

const TableRow = defineComponent({
  props: ['title', 'meta', 'value'],
  setup(props) {
    return () =>
      h('div', { class: 'flex items-center justify-between rounded-xl bg-black/30 p-3' }, [
        h('div', [
          h('p', { class: 'font-black' }, props.title),
          h('p', { class: 'mt-1 text-xs text-gray-500' }, props.meta),
        ]),
        h('p', { class: 'font-black text-orange-400' }, props.value),
      ])
  },
})
</script>

<style scoped>
.dashboard-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0b0b0b;
  border-radius: 1.5rem;
  padding: 1.25rem;
}

.input {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.45);
  color: white;
  border-radius: 0.85rem;
  padding: 0.75rem 1rem;
  outline: none;
}

.input:focus {
  border-color: rgba(249, 115, 22, 0.7);
}
</style>