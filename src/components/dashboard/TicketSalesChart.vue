<template>
  <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-4 glow-panel">
    <h3 class="font-black">Tickets Sales</h3>

    <div class="mt-5 grid items-center gap-6 md:grid-cols-[180px_1fr]">
      <apexchart
        height="210"
        type="donut"
        :options="chartOptions"
        :series="series"
      />

      <div class="space-y-4 text-sm">
        <div
          v-for="item in ticketSales"
          :key="item.label"
          class="flex items-center justify-between gap-4"
        >
          <span class="flex items-center gap-2">
            <b class="h-3 w-3 rounded-full" :class="item.dot"></b>
            {{ item.label }}
          </span>
          <span class="text-gray-400">{{ item.percent }}</span>
        </div>

        <div class="border-t border-white/10 pt-4">
          <div class="flex justify-between">
            <span>Total</span>
            <b>1,284</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const series = [40, 25, 20, 15]

const ticketSales = [
  { label: 'Early Bird', percent: '40%', dot: 'bg-orange-500' },
  { label: 'VIP', percent: '25%', dot: 'bg-purple-500' },
  { label: 'General', percent: '20%', dot: 'bg-pink-500' },
  { label: 'Free', percent: '15%', dot: 'bg-indigo-500' },
]

const chartOptions = {
  chart: {
    type: 'donut',
    background: 'transparent',
  },

  theme: {
    mode: 'dark',
  },

  colors: ['#FF6A00', '#7C3AED', '#DB2777', '#4F46E5'],

  labels: ['Early Bird', 'VIP', 'General', 'Free'],

  dataLabels: {
    enabled: false,
  },

  legend: {
    show: false,
  },

  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      donut: {
        size: '62%',
        labels: {
          show: false,
        },
      },
    },
  },

  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value) => `${value}%`,
    },
  },
}
</script>

<style scoped>
.glow-panel {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.12);
}
</style>