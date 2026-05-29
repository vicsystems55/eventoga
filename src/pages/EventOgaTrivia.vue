<template>
  <main class="min-h-screen overflow-hidden bg-[#050505] text-white">
    <section class="relative px-4 py-12 md:px-6 lg:px-8">
      <!-- Ambient Background -->
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 top-32 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"></div>
        <div class="absolute right-10 top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <!-- Hero -->
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-4xl font-black md:text-6xl">
            Spin & Win
            <span class="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              EventOrbs!
            </span>
            ✨
          </h1>

          <p class="mt-4 text-gray-400 md:text-lg">
            Spin the wheel once daily and win EventOrbs. Use Orbs to attend events,
            instant publish, or buy organizer packages.
          </p>
        </div>

        <!-- Content -->
        <div class="mt-12 grid gap-8 lg:grid-cols-[280px_1fr_280px] lg:items-center">
          <!-- Left -->
          <aside class="rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 backdrop-blur">
            <div class="text-center">
              <div class="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-orange-500/10 text-5xl">
                🎁
              </div>
              <h2 class="mt-4 text-2xl font-black">How It Works</h2>
            </div>

            <div class="mt-8 space-y-6">
              <InfoStep icon="📅" title="1. Spin Daily" text="You get one free spin every day." />
              <InfoStep icon="🪙" title="2. Win Orbs" text="Win between 2 and 12 EventOrbs." />
              <InfoStep icon="🛍️" title="3. Use Orbs" text="Spend your Orbs inside EventOga." />
            </div>

            <div class="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5 text-center">
              <p class="text-gray-400">Resets in:</p>
              <p class="mt-2 text-2xl font-black text-orange-500">{{ resetTime }}</p>
            </div>
          </aside>

          <!-- Wheel -->
          <section class="flex flex-col items-center">
            <div class="relative">
              <!-- Pointer -->
              <div class="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                <div
                  class="h-0 w-0 border-l-[24px] border-r-[24px] border-t-[44px] border-l-transparent border-r-transparent border-t-orange-500 drop-shadow-[0_0_22px_rgba(249,115,22,0.95)]"
                ></div>
              </div>

              <!-- Outer Glow Ring -->
              <div
                class="grid h-[340px] w-[340px] place-items-center rounded-full border-[8px] border-orange-500/50 bg-[#120905] shadow-[0_0_70px_rgba(249,115,22,0.35)] sm:h-[460px] sm:w-[460px] md:h-[560px] md:w-[560px]"
              >
                <img
                  :src="wheelImage"
                  alt="Spin the wheel"
                  draggable="false"
                  class="h-[300px] w-[300px] select-none rounded-full object-cover transition-transform duration-[4500ms] ease-out sm:h-[420px] sm:w-[420px] md:h-[520px] md:w-[520px]"
                  :style="{ transform: `rotate(${rotation}deg)` }"
                />
              </div>
            </div>

            <button
              @click="spinWheel"
              :disabled="isSpinning || !canSpin"
              class="mt-10 rounded-3xl bg-gradient-to-r from-orange-500 to-purple-600 px-10 py-5 text-xl font-black text-white shadow-[0_0_40px_rgba(249,115,22,0.35)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 md:px-20"
            >
              {{ isSpinning ? 'Spinning...' : '🌀 SPIN THE WHEEL' }}
            </button>

            <p class="mt-4 text-gray-300">
              You have
              <span class="font-black text-green-400">{{ canSpin ? 1 : 0 }}</span>
              free spin today!
            </p>

            <div
              v-if="lastReward"
              class="mt-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-6 py-4 text-center"
            >
              <p class="text-lg font-black text-orange-400">
                🎉 You won {{ lastReward }} EventOrbs!
              </p>
            </div>
          </section>

          <!-- Right -->
          <aside class="rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 backdrop-blur">
            <h2 class="text-xl font-black">Your EventOrbs</h2>

            <div class="mt-6 text-center">
              <p class="text-6xl font-black text-orange-400">
                🪙 {{ orbBalance }}
              </p>
              <p class="mt-2 text-gray-400">Orbs Available</p>
            </div>

            <div class="mt-8 border-t border-white/10 pt-6">
              <p class="mb-5 text-sm text-gray-400">You can use Orbs to:</p>

              <div class="space-y-5">
                <UseCase icon="⚡" title="Instant Publish" text="Publish your event instantly without waiting." />
                <UseCase icon="🎟️" title="Attend Events" text="Use Orbs to get discounts on events." />
                <UseCase icon="💎" title="Buy Packages" text="Save Orbs and unlock organizer packages." />
              </div>
            </div>

            <button class="mt-8 w-full rounded-xl border border-orange-500/50 px-5 py-4 font-black text-orange-400 transition hover:bg-orange-500 hover:text-white">
              View All Benefits →
            </button>
          </aside>
        </div>

        <!-- More Ways -->
        <section class="mx-auto mt-14 max-w-6xl rounded-3xl border border-white/10 bg-[#0b0b0b]/80 p-6 backdrop-blur md:p-8">
          <h2 class="text-center text-2xl font-black">More Ways to Earn EventOrbs</h2>

          <div class="mt-8 grid gap-6 md:grid-cols-4">
            <EarnCard icon="👥" title="Invite Friends" text="Earn 25 Orbs when friends sign up." action="Invite Now →" color="purple" />
            <EarnCard icon="☑️" title="Complete Tasks" text="Finish simple tasks and earn extra Orbs." action="View Tasks →" color="blue" />
            <EarnCard icon="📅" title="Daily Check-in" text="Check in daily and earn guaranteed Orbs." action="Check In →" color="green" />
            <EarnCard icon="⭐" title="Join Trivia" text="Answer trivia and win up to 10 Orbs." action="Play Now →" color="orange" />
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { defineComponent, h, ref } from 'vue'
import wheelImage from '@/assets/wheel.png'

const rewards = [12, 2, 5, 8, 3, 7, 10, 4, 6, 9, 2, 11]
const segmentAngle = 360 / rewards.length

const rotation = ref(0)
const isSpinning = ref(false)
const canSpin = ref(true)
const lastReward = ref(null)
const orbBalance = ref(28)
const resetTime = ref('12h 45m 30s')

const spinWheel = () => {
  if (isSpinning.value || !canSpin.value) return

  isSpinning.value = true
  lastReward.value = null

  const winningIndex = Math.floor(Math.random() * rewards.length)
  const reward = rewards[winningIndex]

  const stopAngle = 360 - (winningIndex * segmentAngle + segmentAngle / 2)
  const extraSpins = 360 * 6

  rotation.value += extraSpins + stopAngle

  setTimeout(() => {
    lastReward.value = reward
    orbBalance.value += reward
    canSpin.value = false
    isSpinning.value = false
  }, 4500)
}

const InfoStep = defineComponent({
  props: ['icon', 'title', 'text'],
  setup(props) {
    return () =>
      h('div', { class: 'flex gap-4' }, [
        h('div', { class: 'grid h-12 w-12 shrink-0 place-items-center rounded-full border border-orange-500/50 bg-orange-500/10 text-xl' }, props.icon),
        h('div', [
          h('h3', { class: 'font-black text-white' }, props.title),
          h('p', { class: 'mt-1 text-sm leading-6 text-gray-400' }, props.text),
        ]),
      ])
  },
})

const UseCase = defineComponent({
  props: ['icon', 'title', 'text'],
  setup(props) {
    return () =>
      h('div', { class: 'flex gap-4' }, [
        h('div', { class: 'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-xl' }, props.icon),
        h('div', [
          h('h3', { class: 'font-black' }, props.title),
          h('p', { class: 'mt-1 text-sm leading-6 text-gray-400' }, props.text),
        ]),
      ])
  },
})

const EarnCard = defineComponent({
  props: ['icon', 'title', 'text', 'action', 'color'],
  setup(props) {
    const colorMap = {
      purple: 'bg-purple-500/15 text-purple-300',
      blue: 'bg-blue-500/15 text-blue-300',
      green: 'bg-green-500/15 text-green-300',
      orange: 'bg-orange-500/15 text-orange-400',
    }

    return () =>
      h('div', { class: 'border-r border-white/10 pr-4 last:border-r-0 md:min-h-[170px]' }, [
        h('div', { class: `grid h-14 w-14 place-items-center rounded-2xl text-2xl ${colorMap[props.color]}` }, props.icon),
        h('h3', { class: 'mt-4 font-black' }, props.title),
        h('p', { class: 'mt-2 text-sm leading-6 text-gray-400' }, props.text),
        h('button', { class: 'mt-4 text-sm font-black text-orange-500' }, props.action),
      ])
  },
})
</script>