<template>
  <main class="min-h-screen overflow-hidden bg-[#050505] text-white ">
    <!-- Navbar -->
<nav class="relative z-50 flex items-center justify-between px-5 py-4 md:px-9">
  <div class="flex items-center gap-2 text-2xl font-black md:text-3xl">
    <span>Event<span class="text-orange-500">Oga</span></span>
    <span class="text-2xl">🎟️</span>
  </div>

  <!-- Desktop Menu -->
  <div class="hidden gap-10 text-sm font-semibold md:flex">
    <a href="#">Events</a>
    <a href="#">Marketplace</a>
    <a href="#">For Organizers</a>
    <a href="#">Blog</a>
    <a href="#">About Us⌄</a>
  </div>

  <div class="hidden items-center gap-3 md:flex">
    <button class="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold">
      📍 Lagos⌄
    </button>
    <button class="rounded-xl border border-white/30 px-6 py-3 text-sm font-bold">
      Login
    </button>
    <button class="rounded-xl bg-orange-500 px-6 py-3 text-sm font-black text-white">
      Sign Up
    </button>
  </div>

  <!-- Mobile Menu Button -->
  <button
    @click="isMenuOpen = true"
    class="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 md:hidden"
  >
    <span class="space-y-1.5">
      <span class="block h-0.5 w-6 bg-white"></span>
      <span class="block h-0.5 w-6 bg-white"></span>
      <span class="block h-0.5 w-6 bg-white"></span>
    </span>
  </button>
</nav>

<!-- Mobile Drawer Overlay -->
<Transition name="drawer-fade">
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm md:hidden"
    @click="isMenuOpen = false"
  >
    <Transition name="drawer-slide">
      <aside
        class="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-orange-500/20 bg-[#080808] p-6 shadow-2xl"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-black">
            Event<span class="text-orange-500">Oga</span>
          </h2>

          <button
            @click="isMenuOpen = false"
            class="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-2xl"
          >
            ×
          </button>
        </div>

        <div class="mt-10 flex flex-col gap-4 text-lg font-bold">
          <a href="#" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">
            Events
          </a>
          <a href="#" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">
            Marketplace
          </a>
          <a href="#" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">
            For Organizers
          </a>
          <a href="#" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">
            Blog
          </a>
          <a href="#" @click="isMenuOpen = false" class="rounded-2xl bg-white/5 px-5 py-4 hover:bg-orange-500 hover:text-black">
            About Us
          </a>
        </div>

        <div class="mt-10 space-y-3">
          <button class="w-full rounded-xl border border-white/20 px-5 py-4 font-bold">
            📍 Lagos
          </button>
          <button class="w-full rounded-xl border border-white/20 px-5 py-4 font-bold">
            Login
          </button>
          <button class="w-full rounded-xl bg-orange-500 px-5 py-4 font-black text-black">
            Sign Up
          </button>
        </div>
      </aside>
    </Transition>
  </div>
</Transition>

    <!-- Header -->
    <section class="w-full px-4 md:px-6 lg:px-8 pt-14">
      <div class="relative mx-auto max-w-7xl">
        <div class="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
        <!-- Left -->
        <div class="relative z-20">
          <span class="rounded-full bg-orange-500/10 px-5 py-3 text-sm font-bold text-orange-400">
            #1 Events Discovery Platform in Nigeria
          </span>

          <h1 class="mt-8 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Find Events Near You.
            <br />
            Live More,
            <span class="text-orange-500"> Worry Less.</span>
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Discover and book amazing events, connect with verified organizers and enjoy
            trusted experiences around you.
          </p>

          <!-- Search -->
          <div class="mt-8 max-w-3xl rounded-2xl bg-white p-3 shadow-2xl">
            <div class="grid gap-3 md:grid-cols-[1.3fr_1fr_auto]">
              <div class="flex items-center gap-3 rounded-xl bg-white px-4 py-4 text-gray-500 ring-1 ring-gray-200">
                <span>⌕</span>
                <input class="w-full text-sm text-black outline-none"
                  placeholder="Search events, concerts, parties..." />
              </div>

              <div class="flex items-center gap-3 rounded-xl bg-white px-4 py-4 text-gray-500 ring-1 ring-gray-200">
                <span>📍</span>
                <input class="w-full text-sm text-black outline-none" placeholder="Lagos, Nigeria" />
              </div>

              <button
                class="rounded-xl bg-orange-500 px-7 py-4 text-sm font-black text-white transition hover:bg-orange-400">
                Search Events
              </button>
            </div>
          </div>

          <!-- Trust badges -->
          <div class="mt-8 flex flex-wrap gap-8 text-sm font-bold text-gray-200">
            <span class="flex items-center gap-2">
              <b class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">✓</b>
              Verified Events
            </span>
            <span class="flex items-center gap-2">
              <b class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">📍</b>
              Safe Locations
            </span>
            <span class="flex items-center gap-2">
              <b class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">💳</b>
              Secure Payments
            </span>
            <span class="flex items-center gap-2">
              <b class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">⏱</b>
              24/7 Support
            </span>
          </div>
        </div>

        <!-- Right -->
        <div class="relative min-h-[520px]">
          <div class="absolute right-0 top-0 h-[560px] w-[760px]">
            <img src="../assets/bg1.png" alt="EventOga users"
              class="h-full w-full object-contain object-right-bottom" />
          </div>

          <!-- Premium Card -->
          <div
            class="absolute bottom-20 right-0 z-20 w-72 rounded-3xl border border-orange-500/30 bg-[#2b1208]/90 p-6 shadow-2xl backdrop-blur">
            <div class="flex gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-3xl">
                👑
              </div>

              <div>
                <h3 class="text-lg font-black">Go Premium</h3>
                <p class="mt-1 text-xs leading-5 text-gray-300">
                  Get early alerts, free passes, reserved seats and more!
                </p>
              </div>
            </div>

            <button
              class="mt-5 flex w-full items-center justify-between rounded-xl border border-orange-500/40 px-5 py-3 text-sm font-black">
              Explore Plans <span class="text-orange-500">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div
        class="relative z-30 mt-2 grid grid-cols-4 rounded-3xl border border-white/15 bg-[#080808] px-4 py-5 shadow-2xl md:grid-cols-8">
        <div v-for="item in categories" :key="item.name"
          class="flex flex-col items-center justify-center gap-2 border-white/10 px-4 py-3 text-center md:border-r last:border-r-0">
          <svg v-if="item.icon === 'parties'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M9 9a3 3 0 110-6 3 3 0 010 6zM9 19.5c0-2.25 1.5-4.5 4.5-4.5s4.5 2.25 4.5 4.5M6 8c-1.5.75-3 2.25-3 4.5 0 2.25 1.5 4.5 3 4.5M12 4.5A3 3 0 1112 10.5 3 3 0 0112 4.5z" />
          </svg>
          <svg v-else-if="item.icon === 'concerts'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M9 9l3-3m0 0l3 3m-3-3v12m0 0l-3-3m3 3l3-3M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          <svg v-else-if="item.icon === 'seminars'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M21 13.255A23.931 23.931 0 0112 15c-7.033 0-9.327-1.697-9.732-3.476C2.016 10.713 2 10.385 2 10c0-4.418 3.582-8 8-8s8 3.582 8 8c0 .385-.016.713-.268 1.524m0 0c-.460 2.784-2.96 5.022-5.466 5.022-2.505 0-5.005-2.238-5.466-5.022m19.232-4.512c.582.972.881 2.287.881 3.706 0 3.314-2.357 6.15-5.5 6.15S8.5 18.314 8.5 15c0-1.42.299-2.734.88-3.706m0 0A5.002 5.002 0 018.5 9.486" />
          </svg>
          <svg v-else-if="item.icon === 'weddings'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128v-.003c0-.402-.062-.827-.213-1.254m5.868-4.995a.75.75 0 00-.364 2.01.75.75 0 00.364-.009zm-1.22-2.855a.75.75 0 10-.531-1.405 3 3 0 013.464 3.464.75.75 0 00-1.06-1.06 1.5 1.5 0 01-1.873-1.873zm2.651 3.31a6.75 6.75 0 01-7.59 7.59.75.75 0 001.06 1.061 8.25 8.25 0 009.33-9.33.75.75 0 00-1.06 1.06z" />
          </svg>
          <svg v-else-if="item.icon === 'church'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M12 3l2.25 2.25H12V3zm0 2.25v2.5h-1.5v-2.5H12zm0 2.5v4h-1.5v-4H12zM6 13.5h12v1.5H6v-1.5zm1.5 1.5v3h2v-3h-1.5zm3 0v3h2v-3h-2zm3 0v3h2v-3h-2zm3 0v3h1.5v-3h-1.5zM3 18h18v1.5H3V18z" />
          </svg>
          <svg v-else-if="item.icon === 'comedy'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M9.5 9a1 1 0 11-2 0 1 1 0 012 0zM15.5 9a1 1 0 11-2 0 1 1 0 012 0zM12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
          <svg v-else-if="item.icon === 'sports'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 12c0-2.25 1.5-4.5 3-5.25V3h6v3.75c1.5.75 3 3 3 5.25 0 3.75-3 6.75-6 6.75s-6-3-6-6.75zM4.5 18h15" />
          </svg>
          <svg v-else class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M12 8v.01M12 12v.01M12 16v.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm6-1a1 1 0 110 2 1 1 0 010-2zm6 1a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
          <p class="text-sm font-bold">{{ item.name }}</p>
        </div>
      </div>
      </div>
    </section>


    <!-- Popular Events -->
    <section class="w-full px-4 md:px-6 lg:px-8 mt-10">
      <div class="mx-auto max-w-7xl">
        <div class="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-black">Popular Events Near You 🔥</h2>
          <a href="#" class="text-sm font-bold text-orange-500">View all events →</a>
        </div>

        <div class="grid gap-5 md:grid-cols-4">
          <div v-for="event in events" :key="event.title"
            class="overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition hover:-translate-y-2 hover:border-orange-500/50">
            <div class="relative h-36">
              <img :src="event.image" class="h-full w-full object-cover" />

              <span class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-black text-white"
                :class="event.verified ? 'bg-green-600' : 'bg-orange-500'">
                {{ event.tag }}
              </span>
            </div>

            <div class="p-4">
              <div class="flex gap-3">
                <div class="rounded-xl bg-orange-500/20 px-3 py-2 text-center">
                  <p class="text-xl font-black">{{ event.day }}</p>
                  <p class="text-xs font-bold text-orange-400">{{ event.month }}</p>
                </div>

                <div>
                  <h3 class="font-black">{{ event.title }}</h3>
                  <p class="mt-1 text-xs text-gray-400">📍 {{ event.location }}</p>
                </div>
              </div>

              <div class="mt-5 flex items-center justify-between">
                <p class="text-lg font-black">{{ event.price }}</p>
                <p class="text-sm font-bold text-gray-300">⭐ {{ event.rating }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>

    <!-- Marketplace Preview -->
    <section class="w-full px-4 md:px-6 lg:px-8 mt-8">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 rounded-3xl border border-orange-500 bg-[#120905] p-8 md:grid-cols-[1fr_2fr]">
        <div class="flex flex-col justify-center">
          <h2 class="text-4xl font-black leading-tight">
            Everything You Need
            <span class="block text-orange-500">For Your Event</span>
          </h2>

          <p class="mt-5 max-w-sm leading-7 text-gray-300">
            Rent equipment, hire vendors, book entertainers, and get everything you need in one place.
          </p>

          <button
            class="mt-7 w-fit rounded-xl bg-orange-500 px-6 py-4 font-black text-black transition hover:scale-105">
            Explore Marketplace →
          </button>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="vendor in vendors" :key="vendor.name"
            class="overflow-hidden rounded-2xl border border-orange-500/40 bg-black">
            <img :src="vendor.image" class="h-40 w-full object-cover" />

            <div class="p-4">
              <h3 class="font-black">{{ vendor.name }}</h3>
              <p class="mt-1 text-sm text-gray-400">{{ vendor.type }}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>

    <!-- Why Choose + App CTA -->
    <section class="w-full px-4 md:px-6 lg:px-8 mt-10">
      <div class="mx-auto max-w-7xl">

        <!-- Why Choose -->
        <div class="grid items-center gap-6 lg:grid-cols-[1.2fr_2fr]">
          <!-- Left -->
          <div class="relative min-h-[280px] rounded-3xl bg-[#070707] p-8 overflow-hidden">
            <h2 class="relative z-10 text-4xl font-black leading-tight">
              Why Choose
              <span class="block">Event<span class="text-orange-500">Oga?</span></span>
            </h2>

            <ul class="relative z-10 mt-8 space-y-4 text-sm font-semibold text-gray-200">
              <li class="flex gap-3">
                <svg class="h-6 w-6 flex-shrink-0 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified organizers & safe locations
              </li>
              <li class="flex gap-3">
                <svg class="h-6 w-6 flex-shrink-0 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Real reviews from real people
              </li>
              <li class="flex gap-3">
                <svg class="h-6 w-6 flex-shrink-0 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Secure ticketing & easy refunds
              </li>
              <li class="flex gap-3">
                <svg class="h-6 w-6 flex-shrink-0 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Events tailored to your interests
              </li>
            </ul>

            <img src="../assets/guy.png"
              class="absolute -bottom-6 right-0 w-80 md:w-[420px] lg:w-[500px] pointer-events-none select-none" />
          </div>

          <!-- Stats -->
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stat in whyStats" :key="stat.label"
              class="rounded-3xl border border-white/10 bg-[#090909] p-8 text-center transition hover:-translate-y-2 hover:border-orange-500/50">
              <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500/10">

                <!-- Shield -->
                <svg v-if="stat.icon === 'shield'" class="h-16 w-16 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M12 3L4 7v5c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-4z" />
                </svg>

                <!-- Users -->
                <svg v-else-if="stat.icon === 'users'" class="h-16 w-16 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z" />
                </svg>

                <!-- Check -->
                <svg v-else-if="stat.icon === 'check'" class="h-16 w-16 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>

                <!-- Grid -->
                <svg v-else-if="stat.icon === 'grid'" class="h-16 w-16 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>

              </div>

              <h3 class="text-5xl font-black">{{ stat.value }}</h3>
              <p class="mt-3 font-semibold text-gray-300">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- App CTA -->
        <div
          class="relative mt-8 overflow-hidden rounded-3xl border border-orange-500/40 bg-gradient-to-r from-[#2a0f05] to-[#120603] p-8 md:p-10">
          <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <h2 class="text-4xl font-black">Get the EventOga App</h2>
              <p class="mt-4 text-lg text-gray-300">
                Discover events on the go. Get alerts, book tickets and more!
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-4">
              <img src="../assets/google-play.png" alt="Get it on Google Play"
                class="h-14 w-auto rounded-xl transition hover:scale-105" />

              <img src="../assets/ios-store.png" alt="Download on the App Store"
                class="h-14 w-auto rounded-xl transition hover:scale-105" />
            </div>

            <div class="relative hidden h-40 lg:block">
              <img src="../assets/phone.png" alt="EventOga mobile app"
                class="absolute -bottom-16 right-0 w-72 rotate-[-8deg]" />
            </div>
          </div>

          <!-- Floating particles -->
          <div class="absolute right-20 top-8 h-3 w-3 rotate-45 bg-orange-500"></div>
          <div class="absolute right-44 top-14 h-2 w-6 rotate-45 rounded-full bg-orange-400"></div>
          <div class="absolute right-72 bottom-12 h-2 w-2 rotate-45 bg-pink-400"></div>
          <div class="absolute bottom-10 right-10 h-4 w-8 rotate-[-25deg] rounded-full bg-orange-500"></div>
        </div>

      </div>
    </section>


    <!-- Footer -->
<footer class="mt-14 border-t border-white/10 bg-[#070707] px-4 py-12 md:px-8">
  <div class="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr]">
    <div>
      <h2 class="text-3xl font-black">
        Event<span class="text-orange-500">Oga</span>
      </h2>
      <p class="mt-4 max-w-xs leading-7 text-gray-400">
        Find what’s happening near you. Discover trusted events, vendors and local experiences.
      </p>
      <p class="mt-8 text-sm text-gray-500">
        © 2026 EventOga. All rights reserved.
      </p>
    </div>

    <div>
      <h3 class="mb-4 font-black text-white">Quick Links</h3>
      <ul class="space-y-3 text-sm text-gray-400">
        <li><a href="#" class="transition hover:text-orange-500">Events</a></li>
        <li><a href="#" class="transition hover:text-orange-500">Marketplace</a></li>
        <li><a href="#" class="transition hover:text-orange-500">For Organizers</a></li>
        <li><a href="#" class="transition hover:text-orange-500">Premium</a></li>
      </ul>
    </div>

    <div>
      <h3 class="mb-4 font-black text-white">Support</h3>
      <ul class="space-y-3 text-sm text-gray-400">
        <li><a href="#" class="transition hover:text-orange-500">Help Center</a></li>
        <li><a href="#" class="transition hover:text-orange-500">Safety Policy</a></li>
        <li><a href="#" class="transition hover:text-orange-500">Terms & Conditions</a></li>
        <li><a href="#" class="transition hover:text-orange-500">Privacy Policy</a></li>
      </ul>
    </div>

    <div>
      <h3 class="mb-4 font-black text-white">Follow Us</h3>
      <div class="flex flex-wrap gap-3">
        <a href="#" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">f</a>
        <a href="#" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">x</a>
        <a href="#" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">ig</a>
        <a href="#" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-black transition hover:bg-orange-500 hover:text-black">in</a>
      </div>
    </div>

    <div>
      <h3 class="mb-4 font-black text-white">Stay Updated</h3>
      <p class="mb-4 text-sm leading-6 text-gray-400">
        Get latest events, deals and organizer updates.
      </p>

      <div class="flex overflow-hidden rounded-xl bg-white p-1">
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full px-4 text-sm text-black outline-none"
        />
        <button class="rounded-lg bg-orange-500 px-5 py-3 text-sm font-black text-black">
          Subscribe
        </button>
      </div>

      <p class="mt-6 text-sm text-gray-500">
        Made with <span class="text-orange-500">♥</span> in Nigeria 🇳🇬
      </p>
    </div>
  </div>
</footer>



  </main>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const categories = [
  { name: 'Parties', icon: 'parties' },
  { name: 'Concerts', icon: 'concerts' },
  { name: 'Seminars', icon: 'seminars' },
  { name: 'Weddings', icon: 'weddings' },
  { name: 'Church Events', icon: 'church' },
  { name: 'Comedy', icon: 'comedy' },
  { name: 'Sports', icon: 'sports' },
  { name: 'More', icon: 'more' },
]


const whyStats = [
  { value: '10K+', label: 'Events Hosted', icon: 'shield' },
  { value: '500K+', label: 'Happy Users', icon: 'users' },
  { value: '2K+', label: 'Verified Organizers', icon: 'check' },
  { value: '50+', label: 'Cities Covered', icon: 'grid' },
]

import bg1 from '../assets/bg1.png'

const events = [
  {
    title: 'Afrobeats Live Concert',
    location: 'Eko Convention Centre',
    price: '₦5,000',
    rating: '4.8',
    day: '28',
    month: 'APR',
    tag: '🔥 Trending',
    image: bg1,
  },
  {
    title: 'Tech Summit 2026',
    location: 'Landmark Centre, Lagos',
    price: '₦15,000',
    rating: '4.9',
    day: '30',
    month: 'APR',
    tag: 'Limited Seats',
    image: bg1,
  },
  {
    title: 'Lagos Beach Party',
    location: 'Elegushi Beach',
    price: '₦3,000',
    rating: '4.7',
    day: '05',
    month: 'MAY',
    tag: 'Early Bird',
    image: bg1,
  },
  {
    title: 'Business Masterclass',
    location: 'Radisson Blu, Ikeja',
    price: '₦20,000',
    rating: '4.9',
    day: '11',
    month: 'MAY',
    tag: '✅ Verified',
    verified: true,
    image: bg1,
  },
]

const vendors = [
  { name: 'DJ Neptune', type: 'DJ & Music', image: bg1 },
  { name: 'Cake by Tolu', type: 'Baker', image: bg1 },
  { name: 'Grace Decor', type: 'Event Decor', image: bg1 },
  { name: 'Prime Rentals', type: 'Equipment', image: bg1 },
]
</script>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.35s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>