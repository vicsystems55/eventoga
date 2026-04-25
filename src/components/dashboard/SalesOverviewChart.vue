<template>
  <div class="rounded-2xl border border-purple-500/25 bg-[#080808]/80 p-4 glow-panel">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="font-black">Sales Overview</h3>

      <select
        v-model="selectedRange"
        class="rounded-lg border border-white/10 bg-black px-3 py-1.5 text-xs text-gray-300 outline-none"
      >
        <option>This Month</option>
        <option>Last Month</option>
      </select>
    </div>

    <!-- Numbers -->
    <h2 class="mt-3 text-2xl font-black">₦2,450,000</h2>
    <p class="text-xs text-gray-400">Total Revenue</p>
    <p class="mt-1 text-xs text-green-400">↑ 22% from last month</p>

    <!-- Chart -->
    <apexchart
      class="mt-3"
      height="260"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts
const selectedRange = ref('This Month')

const series = [
  {
    name: 'Revenue',
    data: [80000, 150000, 110000, 180000, 260000, 190000, 230000, 340000, 280000, 220000, 260000, 310000],
  },
]

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent',
  },

  theme: { mode: 'dark' },

  colors: ['#FF6A00'],

  dataLabels: { enabled: false },

  stroke: {
    curve: 'smooth',
    width: 4,
  },

  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.55,
      opacityTo: 0.05,
      stops: [0, 90, 100],
      colorStops: [
        { offset: 0, color: '#FF6A00', opacity: 0.55 },
        { offset: 70, color: '#A855F7', opacity: 0.18 },
        { offset: 100, color: '#050505', opacity: 0.02 },
      ],
    },
  },

  grid: {
    borderColor: 'rgba(255,255,255,0.06)',
    strokeDashArray: 4,
  },

  xaxis: {
    // 🔥 SPACED OUT DATES
    categories: ['01 May', '', '', '07 May', '', '', '15 May', '', '', '22 May', '', '29 May'],

    labels: {
      style: {
        colors: '#9CA3AF',
        fontSize: '11px',
      },
    },

    axisBorder: { show: false },
    axisTicks: { show: false },
  },

  yaxis: {
    labels: {
      formatter: (value) => `₦${Math.round(value / 1000)}k`,
      style: { colors: '#9CA3AF' },
    },
  },

  tooltip: {
    theme: 'dark',
    y: {
      formatter: (value) => `₦${value.toLocaleString()}`,
    },
  },
}
</script>

<style scoped>
.glow-panel {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.12);
}
</style>