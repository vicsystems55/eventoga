<template>
  <div class="p-6">
    <h1 class="text-4xl font-black">My Events</h1>
    <p class="mt-4 text-gray-400">Manage all your events here.</p>
    
    <div class="mt-10">
      <button class="rounded-lg bg-orange-500 px-6 py-3 font-black text-black hover:bg-orange-600 transition">
        + Create New Event
      </button>
    </div>

    <div class="mt-8 rounded-2xl border border-white/10 overflow-hidden">
      <table class="w-full">
        <thead class="border-b border-white/10 bg-white/5">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-bold">Event Name</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Date</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Attendees</th>
            <th class="px-6 py-4 text-left text-sm font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-white/10">
            <td class="px-6 py-4">Afrobeats Live Concert</td>
            <td class="px-6 py-4">28 Apr 2026</td>
            <td class="px-6 py-4">234</td>
            <td class="px-6 py-4"><span class="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-500">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
