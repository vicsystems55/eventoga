<template>
  <div class="ambient-bg">
    <!-- Header -->
    <section data-aos="fade-up" class="w-full px-4 pt-10 md:px-6 md:pt-14 lg:px-8">
      <div class="relative mx-auto max-w-7xl">
        <div class="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <div class="relative z-20">
            <span data-aos="fade-up" data-aos-delay="100"
              class="rounded-full bg-orange-500/10 px-4 py-3 text-xs font-bold text-orange-400 glow-orange-soft md:px-5 md:text-sm">
              #1 Events Discovery Platform in Nigeria
            </span>

            <h1 data-aos="fade-up" data-aos-delay="200"
              class="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight md:mt-8 md:max-w-2xl md:text-7xl">
              Find Events Near Me.
              <br />
              Live More,
              <span class="text-orange-500"> Worry Less.</span>
            </h1>

            <p data-aos="fade-up" data-aos-delay="300"
              class="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
              Discover and book amazing events, connect with verified organizers and enjoy
              trusted experiences around you.
            </p>

            <div data-aos="fade-up" data-aos-delay="400"
              class="mt-8 max-w-3xl rounded-2xl bg-[#080808] p-3 glow-purple">
              <div class="grid gap-3 md:grid-cols-[1.3fr_1fr_auto]">
                <div
                  class="flex items-center gap-3 rounded-xl bg-black px-4 py-4 text-gray-400 ring-1 ring-purple-500/30">
                  <span>⌕</span>
                  <input class="w-full bg-transparent text-sm text-white outline-none"
                    placeholder="Search events, concerts, parties..." />
                </div>

                <div
                  class="flex items-center gap-3 rounded-xl bg-black px-4 py-4 text-gray-400 ring-1 ring-purple-500/30">
                  <span>📍</span>
                  <input class="w-full bg-transparent text-sm text-white outline-none" placeholder="Lagos, Nigeria" />
                </div>

                <button
                  class="rounded-xl bg-orange-500 px-7 py-4 text-sm font-black text-white transition hover:bg-orange-400 glow-orange">
                  Search Events
                </button>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="500"
              class="mt-8 flex flex-wrap gap-4 text-sm font-bold text-gray-200 md:gap-8">
              <span class="flex items-center gap-2"><b
                  class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">✓</b>Verified Events</span>
              <span class="flex items-center gap-2"><b
                  class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">📍</b>Safe Locations</span>
              <span class="flex items-center gap-2"><b
                  class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">💳</b>Secure Payments</span>
              <span class="flex items-center gap-2"><b
                  class="rounded-full bg-orange-500/15 px-2 py-1 text-orange-500">⏱</b>24/7 Support</span>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="200" class="relative hidden min-h-[520px] md:block">
            <div class="absolute right-0 top-0 h-[560px] w-[760px]">
              <img src="../assets/bg1.png" alt="EventOga users"
                class="h-full w-full object-contain object-right-bottom" />
            </div>

            <div data-aos="fade-up" data-aos-delay="400"
              class="absolute bottom-20 right-0 z-20 w-72 rounded-3xl border border-orange-500/30 bg-[#2b1208]/90 p-6 shadow-2xl backdrop-blur glow-mix">
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
      </div>
    </section>

    <!-- Popular Events -->
    <section data-aos="fade-up" class="mt-10 w-full px-4 md:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="rounded-3xl border border-purple-500/30 bg-[#0b0b0b] p-5 glow-purple">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-black">Popular Events Near You 🔥</h2>
            <router-link to="/events" class="text-sm font-bold text-orange-500">View all events →</router-link>
          </div>

          <div class="grid gap-5 md:grid-cols-4">
            <div v-for="(event, index) in events" :key="event.title" data-aos="zoom-in" :data-aos-delay="index * 100"
              class="overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]">
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

    <!-- Marketplace -->
    <section data-aos="fade-up" class="mt-8 w-full px-4 md:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div
          class="grid gap-8 rounded-3xl border border-orange-500 bg-[#120905] p-8 glow-orange md:grid-cols-[1fr_2fr]">
          <div data-aos="fade-right" class="flex flex-col justify-center">
            <h2 class="text-4xl font-black leading-tight">
              Everything You Need
              <span class="block text-orange-500">For Your Event</span>
            </h2>

            <p class="mt-5 max-w-sm leading-7 text-gray-300">
              Rent equipment, hire vendors, book entertainers, and get everything you need in one place.
            </p>

            <router-link to="/marketplace"
              class="mt-7 w-fit rounded-xl bg-orange-500 px-6 py-4 font-black text-black transition hover:scale-105 glow-orange inline-block">
              Explore Marketplace →
            </router-link>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(vendor, index) in vendors" :key="vendor.name" data-aos="flip-left"
              :data-aos-delay="index * 100"
              class="overflow-hidden rounded-2xl border border-orange-500/40 bg-black transition hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]">
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
    <section class="mt-10 w-full px-4 md:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div
          class="grid items-center gap-8 rounded-3xl border border-purple-500/25 bg-[#070707] p-8 glow-purple lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 data-aos="fade-right" class="text-4xl font-black leading-tight">
              Why Choose
              <span class="block">Event<span class="text-orange-500">Oga?</span></span>
            </h2>

            <ul class="mt-8 grid gap-4 text-sm font-semibold text-gray-200 sm:grid-cols-2">
              <li v-for="(item, index) in checklist" :key="item" data-aos="fade-up" :data-aos-delay="index * 100"
                class="flex gap-3">
                <svg class="h-6 w-6 flex-shrink-0 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ item }}
              </li>
            </ul>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="(stat, index) in whyStats" :key="stat.label" data-aos="zoom-in-up"
                :data-aos-delay="index * 100"
                class="rounded-2xl border border-white/10 bg-[#090909] p-5 text-center transition hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.28)]">
                <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10">
                  <svg v-if="stat.icon === 'shield'" class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path d="M12 3L4 7v5c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-4z" />
                  </svg>

                  <svg v-else-if="stat.icon === 'users'" class="h-10 w-10 stroke-orange-500" fill="none"
                    stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z" />
                  </svg>

                  <svg v-else-if="stat.icon === 'check'" class="h-10 w-10 stroke-orange-500" fill="none"
                    stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>

                  <svg v-else class="h-10 w-10 stroke-orange-500" fill="none" stroke-width="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>

                <h3 class="text-3xl font-black">{{ stat.value }}</h3>
                <p class="mt-2 text-sm font-semibold text-gray-300">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <div data-aos="fade-left"
            class="relative hidden min-h-[520px] overflow-hidden rounded-3xl bg-orange-500/10 md:block">
            <div class="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-purple-500/10"></div>
            <img src="../assets/guy.png" alt="EventOga assistant"
              class="absolute bottom-[-40px] left-1/2 w-[520px] -translate-x-1/2 pointer-events-none select-none" />
          </div>
        </div>

        <!-- App CTA -->
        <div data-aos="fade-up"
          class="relative mt-8 overflow-visible rounded-3xl border border-orange-500/40 bg-gradient-to-r from-[#2a0f05] to-[#120603] p-8 glow-mix md:p-10">
          <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[1.3fr_1.1fr_1fr]">
            <div>
              <h2 class="text-4xl font-black">Get the EventOga App</h2>
              <p class="mt-4 text-lg text-gray-300">
                Discover events on the go. Get alerts, book tickets and more!
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-5">
              <img data-aos="flip-right" data-aos-delay="100" src="../assets/google-play.png"
                alt="Get it on Google Play" class="h-20 w-auto rounded-xl transition hover:scale-105" />
              <img data-aos="flip-right" data-aos-delay="200" src="../assets/ios-store.png"
                alt="Download on the App Store" class="h-20 w-auto rounded-xl transition hover:scale-105" />
            </div>

            <div class="relative hidden h-52 lg:block">
              <img src="../assets/phone.png" alt="EventOga mobile app"
                class="absolute -bottom-28 -top-24 right-0 w-[640px] rotate-[-8deg] drop-shadow-[0_20px_60px_rgba(255,106,0,0.35)]" />
            </div>
          </div>

          <div class="absolute right-20 top-8 h-3 w-3 rotate-45 bg-orange-500"></div>
          <div class="absolute right-44 top-14 h-2 w-6 rotate-45 rounded-full bg-orange-400"></div>
          <div class="absolute right-72 bottom-12 h-2 w-2 rotate-45 bg-pink-400"></div>
          <div class="absolute bottom-10 right-10 h-4 w-8 rotate-[-25deg] rounded-full bg-orange-500"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import bg1 from '../assets/bg1.png'

const checklist = [
  'Verified organizers & safe locations',
  'Real reviews from real people',
  'Secure ticketing & easy refunds',
  'Events tailored to your interests',
]

const whyStats = [
  { value: '10K+', label: 'Events Hosted', icon: 'shield' },
  { value: '500K+', label: 'Happy Users', icon: 'users' },
  { value: '2K+', label: 'Verified Organizers', icon: 'check' },
  { value: '50+', label: 'Cities Covered', icon: 'grid' },
]

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

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    delay: 0,
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
  })
})
</script>

<style scoped>
.ambient-bg {
  background:
    radial-gradient(circle at 18% 8%, rgba(255, 106, 0, 0.16), transparent 24%),
    radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.23), transparent 28%),
    radial-gradient(circle at 50% 45%, rgba(168, 85, 247, 0.12), transparent 34%),
    radial-gradient(circle at 18% 68%, rgba(255, 106, 0, 0.12), transparent 28%),
    radial-gradient(circle at 88% 78%, rgba(168, 85, 247, 0.18), transparent 30%),
    #050505;
}

.glow-orange {
  box-shadow:
    0 0 18px rgba(255, 106, 0, 0.35),
    0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-orange-soft {
  box-shadow:
    0 0 14px rgba(255, 106, 0, 0.24),
    0 0 35px rgba(255, 106, 0, 0.1);
}

.glow-purple {
  box-shadow:
    0 0 18px rgba(168, 85, 247, 0.35),
    0 0 55px rgba(168, 85, 247, 0.16);
}

.glow-purple-soft {
  box-shadow:
    0 0 14px rgba(168, 85, 247, 0.28),
    0 0 35px rgba(168, 85, 247, 0.12);
}

.glow-mix {
  box-shadow:
    0 0 20px rgba(255, 106, 0, 0.28),
    0 0 55px rgba(168, 85, 247, 0.22);
}
</style>