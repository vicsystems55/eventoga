<template>
  <div class="p-6">
    <h1 class="text-4xl font-black">Settings</h1>
    <p class="mt-4 text-gray-400">Manage your account and preferences.</p>
    
    <div class="mt-10 space-y-6">
      <!-- Profile Settings -->
      <div class="rounded-2xl border border-white/10 p-6">
        <h3 class="text-xl font-black">Profile Settings</h3>
        <div class="mt-6 space-y-4">
          <div>
            <label class="text-sm font-bold text-gray-400">Email</label>
            <input type="email" placeholder="your@email.com" class="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-orange-500" />
          </div>
          <div>
            <label class="text-sm font-bold text-gray-400">Phone</label>
            <input type="tel" placeholder="+234..." class="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-orange-500" />
          </div>
          <button class="rounded-lg bg-orange-500 px-6 py-2 font-bold text-black hover:bg-orange-600 transition">
            Save Changes
          </button>
        </div>
      </div>

      <!-- Security -->
      <div class="rounded-2xl border border-white/10 p-6">
        <h3 class="text-xl font-black">Security</h3>
        <button class="mt-6 rounded-lg border border-white/20 px-6 py-2 font-bold hover:border-orange-500 transition">
          Change Password
        </button>
      </div>
    </div>
  </div>
</template>
