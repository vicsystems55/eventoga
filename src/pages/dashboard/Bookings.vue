<template>
  <div class="p-6">
    <h1 class="text-4xl font-black">Bookings</h1>
    <p class="mt-4 text-gray-400">View all your ticket bookings.</p>
    
    <div class="mt-8 rounded-2xl border border-white/10 overflow-hidden">
      <table class="w-full">
        <thead class="border-b border-white/10 bg-white/5">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-bold">Event</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Date</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Tickets</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-white/10">
            <td class="px-6 py-4">Tech Summit 2026</td>
            <td class="px-6 py-4">30 Apr 2026</td>
            <td class="px-6 py-4">2</td>
            <td class="px-6 py-4">₦30,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
