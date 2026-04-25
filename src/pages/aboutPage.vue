<template>
  <main class="min-h-screen ambient-bg text-white">




    
<!-- About Hero + Mission Cards -->
<section class="w-full px-4 pt-12 md:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <!-- Hero -->
    <div class="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
      <!-- Left Text -->
      <div class="relative z-10">
        <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-black text-orange-400 glow-orange-soft">
          ABOUT US
        </span>

        <h1 class="mt-8 text-5xl font-black leading-tight md:text-7xl">
          We’re on a mission to
          make every experience
          <span class="text-orange-500">worth remembering.</span>
        </h1>

        <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          EventOga connects people to the best events, trusted organizers and
          top-notch vendors — all in one place. We make discovery simple,
          booking secure and experiences unforgettable.
        </p>

        <button
          class="mt-8 flex items-center gap-4 rounded-2xl border border-orange-500/40 px-7 py-4 font-bold text-white transition hover:bg-orange-500 hover:text-black glow-orange-soft"
        >
          <span class="grid h-9 w-9 place-items-center rounded-full border border-orange-500 text-orange-500">
            ▶
          </span>
          Watch Our Story
        </button>
      </div>

      <!-- Right Image -->
      <div class="relative hidden min-h-[520px] lg:block">
        <div class="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl"></div>
        <div class="absolute right-0 top-0 h-[560px] w-[760px]">
          <img
            src="../assets/bg1.png"
            alt="EventOga community"
            class="h-full w-full object-contain object-right-bottom"
          />
        </div>
      </div>
    </div>

    <!-- Mission Cards -->
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <!-- Mission -->
      <div class="rounded-3xl border border-orange-500/50 bg-[#0b0b0b]/90 p-8 glow-orange">
        <div class="grid gap-6 md:grid-cols-[auto_1fr]">
          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10 glow-orange-soft">
            <svg class="h-14 w-14 stroke-orange-500" fill="none" stroke-width="1.7" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 12l7-7" />
              <path d="M17 5h2v2" />
            </svg>
          </div>

          <div>
            <h2 class="text-3xl font-black text-orange-500">Our Mission</h2>
            <p class="mt-4 leading-8 text-gray-300">
              To help people discover safe, fun and meaningful events near them
              while giving organizers better tools to reach the right audience.
            </p>
          </div>
        </div>
      </div>

      <!-- Vision -->
      <div class="rounded-3xl border border-purple-500/50 bg-[#0b0b0b]/90 p-8 glow-purple">
        <div class="grid gap-6 md:grid-cols-[auto_1fr]">
          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10 glow-purple-soft">
            <svg class="h-14 w-14 stroke-purple-400" fill="none" stroke-width="1.7" viewBox="0 0 24 24">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <div>
            <h2 class="text-3xl font-black text-purple-400">Our Vision</h2>
            <p class="mt-4 leading-8 text-gray-300">
              To become Nigeria’s most trusted local event discovery, ticketing
              and event-service marketplace.
            </p>
          </div>
        </div>
      </div>

      <!-- Promise -->
      <div class="rounded-3xl border border-orange-500/50 bg-[#0b0b0b]/90 p-8 glow-orange">
        <div class="grid gap-6 md:grid-cols-[auto_1fr]">
          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10 glow-orange-soft">
            <svg class="h-14 w-14 stroke-orange-500" fill="none" stroke-width="1.7" viewBox="0 0 24 24">
              <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          <div>
            <h2 class="text-3xl font-black text-orange-500">Our Promise</h2>
            <p class="mt-4 leading-8 text-gray-300">
              We prioritize trust, local relevance, verified organizers, real
              reviews and simple access to event services.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    <!-- OUR STORY SECTION -->
<section class="w-full px-4 mt-12 md:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="grid gap-8 rounded-3xl border border-orange-500/20 bg-[#0b0b0b] p-6 glow-mix md:grid-cols-[1fr_1.3fr] md:p-8">

      <!-- LEFT IMAGE -->
      <div class="overflow-hidden rounded-3xl border border-orange-500/20">
        <img
          src="../assets/partying.png"
          alt="Event crowd"
          class="h-full w-full object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <!-- RIGHT CONTENT -->
      <div class="relative">
        <!-- Nigeria Map Background -->
        <img
          src="../assets/nigeria-svg.png"
          class="absolute right-0 top-0 z-0 w-[480px] opacity-40 md:w-[450px]"
        />

        <div class="relative z-10">
          <!-- Tag -->
          <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-400">
            OUR STORY
          </span>

          <!-- Heading -->
          <h2 class="mt-6 text-3xl font-black leading-tight md:text-5xl">
            Built from a love for
            <br />
            events and
            <span class="text-orange-500"> community.</span>
          </h2>

          <!-- Text -->
          <p class="mt-6 max-w-xl leading-7 text-gray-300">
            EventOga started with a simple idea: discovering events in Nigeria
            should be easy, trustworthy and exciting.
          </p>

          <p class="mt-4 max-w-xl leading-7 text-gray-400">
            We saw the challenges — scattered information, unverified organizers,
            limited payment options and no single place for event needs.
          </p>

          <p class="mt-4 max-w-xl leading-7 text-gray-400">
            So we built EventOga to solve that.
          </p>

          <p class="mt-6 text-lg font-black text-orange-500">
            One platform. Endless experiences.
          </p>
        </div>
      </div>
    </div>

    <!-- STATS BAR -->
    <div class="mt-8 grid gap-6 rounded-3xl border border-purple-500/30 bg-[#0a0a0a] p-6 glow-purple md:grid-cols-4">

      <!-- Stat 1 -->
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
          <svg class="h-8 w-8 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="2"/>
            <path d="M16 3v4M8 3v4M3 11h18"/>
          </svg>
        </div>

        <div>
          <h3 class="text-2xl font-black">10K+</h3>
          <p class="text-sm text-gray-400">Events Hosted</p>
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
          <svg class="h-8 w-8 stroke-purple-400" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z"/>
          </svg>
        </div>

        <div>
          <h3 class="text-2xl font-black">500K+</h3>
          <p class="text-sm text-gray-400">Happy Users</p>
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
          <svg class="h-8 w-8 stroke-orange-500" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z"/>
          </svg>
        </div>

        <div>
          <h3 class="text-2xl font-black">2K+</h3>
          <p class="text-sm text-gray-400">Verified Organizers</p>
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
          <svg class="h-8 w-8 stroke-purple-400" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z"/>
          </svg>
        </div>

        <div>
          <h3 class="text-2xl font-black">50+</h3>
          <p class="text-sm text-gray-400">Cities Covered</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- What Makes Us Different + Team -->
<section class="w-full px-4 py-20 md:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <!-- Difference -->
    <div>
      <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-black text-orange-400 glow-orange-soft">
        WHAT MAKES US DIFFERENT
      </span>

      <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in differenceItems"
          :key="item.title"
          class="rounded-3xl border p-8"
          :class="item.color === 'orange' ? 'border-orange-500/40 glow-orange' : 'border-purple-500/40 glow-purple'"
        >
          <div
            class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            :class="item.color === 'orange' ? 'bg-orange-500/10' : 'bg-purple-500/10'"
          >
            <svg
              v-if="item.icon === 'pin'"
              class="h-10 w-10 stroke-orange-500"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 21s-7-6.2-7-12a7 7 0 1114 0c0 5.8-7 12-7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>

            <svg
              v-else-if="item.icon === 'shield'"
              class="h-10 w-10 stroke-purple-400"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>

            <svg
              v-else-if="item.icon === 'ticket'"
              class="h-10 w-10 stroke-orange-500"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z" />
              <path d="M9 8v8" />
            </svg>

            <svg
              v-else
              class="h-10 w-10 stroke-purple-400"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c3 3 3 15 0 18" />
              <path d="M12 3c-3 3-3 15 0 18" />
            </svg>
          </div>

          <h3
            class="text-xl font-black"
            :class="item.color === 'orange' ? 'text-orange-500' : 'text-purple-400'"
          >
            {{ item.title }}
          </h3>

          <p class="mt-4 leading-7 text-gray-300">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="mt-12 rounded-3xl border border-purple-500/30 bg-[#070707] p-6 glow-purple md:p-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
        <div>
          <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-black text-orange-400 glow-orange-soft">
            OUR TEAM
          </span>

          <h2 class="mt-6 text-4xl font-black leading-tight md:text-5xl">
            The people behind
            <span class="block text-orange-500">EventOga</span>
          </h2>

          <p class="mt-6 max-w-sm text-lg leading-8 text-gray-300">
            A passionate team working hard to empower organizers and create unforgettable experiences across Nigeria.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div
            v-for="member in teamMembers"
            :key="member.name"
            class="group overflow-hidden rounded-3xl border border-orange-500/40 bg-[#0b0b0b] transition hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,106,0,0.25)]"
          >
            <div class="h-72 overflow-hidden bg-gradient-to-b from-orange-500/20 to-purple-500/10">
              <img
                :src="member.image"
                :alt="member.name"
                class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              />
            </div>

            <div class="relative p-5">
              <h3 class="text-xl font-black">{{ member.name }}</h3>
              <p class="mt-1 text-sm text-gray-400">{{ member.role }}</p>

              <a
                href="#"
                class="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 font-black transition hover:bg-orange-500 hover:text-black"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

   
  </main>
</template>

<script setup>

import kelvin from '../assets/kelvin.png'
import victor from '../assets/victor.png'

const differenceItems = [
  {
    title: 'Local-first discovery',
    text: 'We focus on events close to home, based on location, interest and community relevance.',
    icon: 'pin',
    color: 'orange',
  },
  {
    title: 'Trust & safety',
    text: 'Verified organizers, safe locations and user reviews help people feel more confident.',
    icon: 'shield',
    color: 'purple',
  },
  {
    title: 'More than tickets',
    text: 'From tickets to equipment rental and vendor booking, we’ve got everything you need.',
    icon: 'ticket',
    color: 'orange',
  },
  {
    title: 'Built for Nigeria',
    text: 'We understand our culture, events, vendors and communities because we’re part of it.',
    icon: 'globe',
    color: 'purple',
  },
]

const teamMembers = [
  {
    name: 'Kelvin',
    role: 'CEO & Co-founder',
    image: kelvin,
  },
  {
    name: 'Victor Asuquo',
    role: 'CTO',
    image: victor,
  },
]
const values = [
  {
    title: 'Local-first discovery',
    text: 'We focus on events close to home, based on location, interest and community relevance.',
  },
  {
    title: 'Trust and safety',
    text: 'Verified organizers, vetted locations and user reports help people feel more confident.',
  },
  {
    title: 'More than tickets',
    text: 'Organizers can promote events, sell items, rent materials and hire event vendors.',
  },
  {
    title: 'Built for Nigeria',
    text: 'EventOga starts with Nigerian cities, culture, events, vendors and local communities.',
  },
]
</script>

<style scoped>
.ambient-bg {
  background:
    radial-gradient(circle at 18% 8%, rgba(255, 106, 0, 0.16), transparent 24%),
    radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.23), transparent 28%),
    #050505;
}

.glow-orange {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.28), 0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-purple {
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.3), 0 0 55px rgba(168, 85, 247, 0.14);
}

.glow-mix {
  box-shadow: 0 0 20px rgba(255, 106, 0, 0.25), 0 0 55px rgba(168, 85, 247, 0.2);
}
</style>