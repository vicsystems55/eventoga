<template>
  <div class="ambient-dashboard min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 class="text-3xl font-black md:text-4xl">User Accounts</h1>
        <p class="mt-1 text-gray-400">
          Manage all user accounts and their permissions.
        </p>
      </div>

      <button class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange hover:bg-orange-600">
        ＋ Add New User
      </button>
    </div>

    <!-- Stats -->
    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label"
        class="rounded-2xl border p-5"
        :class="stat.color === 'orange' ? 'border-orange-500/40 glow-orange-card' : 'border-purple-500/40 glow-purple-card'"
      >
        <p class="text-gray-400 text-sm">{{ stat.label }}</p>
        <h2 class="mt-2 text-3xl font-black">{{ stat.value }}</h2>
        <p class="mt-1 text-xs text-green-400">{{ stat.change }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-6 rounded-2xl border border-white/10 bg-[#0b0b0b] p-5">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        
        <!-- Search -->
        <div class="relative w-full xl:max-w-sm">
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, email or phone..."
            class="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
        </div>

        <!-- Filters -->
        <div class="grid gap-3 sm:grid-cols-3 xl:flex">
          <select v-model="roleFilter" class="filter-select">
            <option value="all">All Roles</option>
            <option value="Organizer">Organizer</option>
            <option value="Attendee">Attendee</option>
          </select>

          <select v-model="statusFilter" class="filter-select">
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select class="filter-select">
            <option>Joined: All Time</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
      <!-- Head -->
      <div class="grid grid-cols-7 gap-4 border-b border-white/10 px-5 py-4 text-xs text-gray-400">
        <span>User</span>
        <span>Role</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Status</span>
        <span>Joined</span>
        <span class="text-right">Actions</span>
      </div>

      <!-- Rows -->
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="grid grid-cols-7 items-center gap-4 px-5 py-4 border-b border-white/5 hover:bg-white/5 transition"
      >
        <!-- User -->
        <div class="flex items-center gap-3">
          <img :src="user.avatar" class="h-10 w-10 rounded-full object-cover" />
          <div>
            <p class="font-semibold">{{ user.name }}</p>
            <p class="text-xs text-gray-400">@{{ user.username }}</p>
          </div>
        </div>

        <!-- Role -->
        <span
          class="rounded-full px-3 py-1 text-xs font-bold"
          :class="user.role === 'Organizer'
            ? 'bg-orange-500/20 text-orange-400'
            : 'bg-purple-500/20 text-purple-300'"
        >
          {{ user.role }}
        </span>

        <!-- Email -->
        <span class="text-sm text-gray-300">{{ user.email }}</span>

        <!-- Phone -->
        <span class="text-sm text-gray-300">{{ user.phone }}</span>

        <!-- Status -->
        <span
          class="rounded-full px-3 py-1 text-xs font-bold"
          :class="statusClass(user.status)"
        >
          {{ user.status }}
        </span>

        <!-- Joined -->
        <span class="text-sm text-gray-400">{{ user.joined }}</span>

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <button class="action-btn">👁</button>
          <button class="action-btn">✏</button>
          <button class="action-btn">⋮</button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-center gap-2">
      <button class="page-btn">‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">›</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import bg1 from '../../assets/bg1.png'

const search = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')

const stats = [
  { label: 'Total Users', value: '2,458', change: '↑ 18%', color: 'purple' },
  { label: 'Organizers', value: '342', change: '↑ 12%', color: 'orange' },
  { label: 'Attendees', value: '2,116', change: '↑ 20%', color: 'purple' },
  { label: 'Suspended', value: '24', change: '↓ 5%', color: 'orange' },
]

const users = [
  {
    id: 1,
    name: 'Kelvin Adeyemi',
    username: 'kelvin_events',
    role: 'Organizer',
    email: 'kelvin@example.com',
    phone: '+234 801 234 5678',
    status: 'Active',
    joined: 'May 24, 2025',
    avatar: bg1,
  },
  {
    id: 2,
    name: 'Jessica Williams',
    username: 'jessica_w',
    role: 'Organizer',
    email: 'jessica@example.com',
    phone: '+234 703 456 7890',
    status: 'Active',
    joined: 'May 21, 2025',
    avatar: bg1,
  },
  {
    id: 3,
    name: 'Michael Okafor',
    username: 'michael_o',
    role: 'Attendee',
    email: 'michael@example.com',
    phone: '+234 802 345 6789',
    status: 'Active',
    joined: 'May 20, 2025',
    avatar: bg1,
  },
  {
    id: 4,
    name: 'Daniel Smith',
    username: 'daniel_s',
    role: 'Organizer',
    email: 'daniel@example.com',
    phone: '+234 701 234 5670',
    status: 'Suspended',
    joined: 'May 15, 2025',
    avatar: bg1,
  },
]

const filteredUsers = computed(() => {
  let result = [...users.value || users]

  if (search.value) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (roleFilter.value !== 'all') {
    result = result.filter(u => u.role === roleFilter.value)
  }

  if (statusFilter.value !== 'all') {
    result = result.filter(u => u.status === statusFilter.value)
  }

  return result
})

const statusClass = (status) => {
  if (status === 'Active') return 'bg-green-500/20 text-green-400'
  if (status === 'Suspended') return 'bg-red-500/20 text-red-400'
  return 'bg-yellow-500/20 text-yellow-400'
}
</script>

<style scoped>
.ambient-dashboard {
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 106, 0, 0.12), transparent 24%),
    radial-gradient(circle at 90% 12%, rgba(168, 85, 247, 0.18), transparent 28%),
    #050505;
}

.filter-select {
  border-radius: 0.75rem;
  border: 1px solid rgba(168, 85, 247, 0.3);
  background: rgba(0, 0, 0, 0.5);
  padding: 0.75rem;
  color: white;
}

.page-btn {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255,255,255,0.1);
}

.page-btn.active {
  background: #7c3aed;
  color: white;
}

.action-btn {
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  background: rgba(255,255,255,0.05);
}

.glow-orange {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.3);
}

.glow-orange-card {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.2);
}

.glow-purple-card {
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.2);
}
</style>