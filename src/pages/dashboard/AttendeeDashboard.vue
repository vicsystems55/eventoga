<template>
  <div class="min-h-screen bg-[#050505] p-4 text-white md:p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <!-- Welcome -->
      <section>
        <h1 class="text-3xl font-black md:text-4xl">
          Hi {{ userName }} 👋
        </h1>
        <p class="mt-2 text-gray-400">
          Welcome to EventOga. Here are events and actions picked for you.
        </p>
      </section>

      <!-- Profile Completion + Wallet -->
      <section class="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <div class="rounded-3xl border border-purple-500/30 bg-[#0b0b0b] p-5 glow-purple">
          <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-5">
              <div class="relative grid h-28 w-28 place-items-center rounded-full bg-black/60">
                <div
                  class="absolute inset-0 rounded-full"
                  :style="profileRingStyle"
                ></div>

                <div class="relative grid h-20 w-20 place-items-center rounded-full bg-[#0b0b0b] text-2xl font-black">
                  {{ stats.profileCompletion }}%
                </div>
              </div>

              <div>
                <h2 class="text-2xl font-black">Complete your profile</h2>
                <p class="mt-2 max-w-xl text-gray-400">
                  Tell us about your interests and preferences so we can recommend better events.
                </p>

                <button class="mt-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-black">
                  Complete Profile →
                </button>
              </div>
            </div>

            <div class="hidden text-7xl md:block">📋</div>
          </div>
        </div>

        <div class="rounded-3xl border border-orange-500/30 bg-[#0b0b0b] p-5 glow-orange">
          <p class="text-gray-400">EventOrbs Balance</p>

          <h2 class="mt-3 text-4xl font-black">
            {{ stats.orbsBalance.toLocaleString() }}
            <span class="text-orange-500">◈</span>
          </h2>

          <p class="mt-1 text-sm text-gray-500">
            ≈ ₦{{ (stats.orbsBalance * 10).toLocaleString() }}
          </p>

          <button class="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 py-3 font-black">
            Top Up Orbs
          </button>
        </div>
      </section>

      <!-- Stat Cards -->
      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon="📅"
          title="Upcoming Bookings"
          :value="stats.upcomingBookings"
          hint="Book your first event"
          color="purple"
        />

        <StatCard
          icon="🔖"
          title="Saved Events"
          :value="stats.savedEvents"
          hint="Save events you love"
          color="orange"
        />

        <StatCard
          icon="◈"
          title="EventOrbs Balance"
          :value="stats.orbsBalance"
          hint="Top up to get started"
          color="pink"
        />

        <StatCard
          icon="⭐"
          title="Reviews Given"
          :value="stats.reviewsGiven"
          hint="Attend events & share"
          color="green"
        />
      </section>

      <!-- Getting Started -->
      <section class="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">
        <div class="mb-5">
          <h2 class="text-2xl font-black">Getting Started</h2>
          <p class="mt-1 text-gray-400">Here are a few things you can do right now.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <GettingStartedCard
            icon="🔎"
            title="Explore Events"
            text="Discover trending events happening around you."
            button="Explore Now"
          />

          <GettingStartedCard
            icon="🔖"
            title="Save Events"
            text="Save events you like and plan ahead."
            button="Browse Events"
          />

          <GettingStartedCard
            icon="👛"
            title="Top Up Wallet"
            text="Add Orbs to book tickets and enjoy perks."
            button="Top Up Now"
          />

          <GettingStartedCard
            icon="👤"
            title="Complete Profile"
            text="Help us personalize your recommendations."
            button="Complete Now"
          />
        </div>
      </section>

      <!-- Recommended Events -->
      <section class="dashboard-section">
        <SectionHeader title="Recommended For You" link="View all →" />

        <div v-if="recommendedEvents.length" class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <EventCard
            v-for="event in recommendedEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <EmptyState
          v-else
          icon="🎯"
          title="No recommendations yet"
          text="Complete your profile so we can suggest events that fit your interests."
          button="Complete Profile"
        />
      </section>

      <!-- Main Lower Grid -->
      <section class="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <!-- Upcoming -->
        <div class="dashboard-section">
          <SectionHeader title="My Upcoming Events" link="View bookings →" />

          <div v-if="upcomingEvents.length" class="space-y-4">
            <UpcomingEventRow
              v-for="event in upcomingEvents"
              :key="event.id"
              :event="event"
            />
          </div>

          <EmptyState
            v-else
            icon="🗓️"
            title="No bookings yet"
            text="You have not booked any events. Start exploring and book your first event."
            button="Discover Events"
          />
        </div>

        <!-- Wallet + Activity -->
        <div class="space-y-6">
          <div class="dashboard-section">
            <SectionHeader title="My Wallet" link="View wallet →" />

            <div class="rounded-2xl bg-black/35 p-5">
              <p class="text-sm text-gray-400">EventOrbs Balance</p>
              <h3 class="mt-2 text-4xl font-black">
                {{ stats.orbsBalance.toLocaleString() }}
                <span class="text-orange-500">◈</span>
              </h3>

              <button class="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 py-3 font-black">
                Top Up Orbs
              </button>
            </div>

            <div v-if="walletTransactions.length" class="mt-5 space-y-3">
              <TransactionRow
                v-for="item in walletTransactions"
                :key="item.id"
                :item="item"
              />
            </div>

            <p v-else class="mt-5 rounded-2xl bg-white/5 p-4 text-sm text-gray-400">
              No wallet activity yet.
            </p>
          </div>

          <div class="dashboard-section">
            <SectionHeader title="Recent Activity" />

            <div v-if="recentActivity.length" class="space-y-4">
              <ActivityRow
                v-for="activity in recentActivity"
                :key="activity.id"
                :activity="activity"
              />
            </div>

            <p v-else class="rounded-2xl bg-white/5 p-4 text-sm text-gray-400">
              No recent activity yet.
            </p>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="dashboard-section">
        <SectionHeader title="Explore Top Categories" link="View all categories →" />

        <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          <CategoryChip icon="🎵" title="Music" />
          <CategoryChip icon="💻" title="Tech" />
          <CategoryChip icon="💼" title="Business" />
          <CategoryChip icon="🎉" title="Parties" />
          <CategoryChip icon="🍽️" title="Food" />
          <CategoryChip icon="✝️" title="Faith" />
          <CategoryChip icon="⚽" title="Sports" />
          <CategoryChip icon="…" title="More" />
        </div>
      </section>

      <!-- Saved Events -->
      <section class="dashboard-section">
        <SectionHeader title="Saved Events" link="View saved →" />

        <div v-if="savedEvents.length" class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <EventCard
            v-for="event in savedEvents"
            :key="event.id"
            :event="event"
          />
        </div>

        <EmptyState
          v-else
          icon="💜"
          title="No saved events yet"
          text="Save events you like so you can easily find them later."
          button="Explore Events"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, ref } from 'vue'

const currentUser = JSON.parse(localStorage.getItem('eventoga_user') || '{}')

const userName = computed(() => {
  const name = currentUser?.name || 'there'
  return name.split(' ')[0]
})

const stats = ref({
  profileCompletion: 10,
  upcomingBookings: 0,
  savedEvents: 0,
  orbsBalance: 0,
  reviewsGiven: 0,
})

const recommendedEvents = ref([])
const upcomingEvents = ref([])
const savedEvents = ref([])
const walletTransactions = ref([])
const recentActivity = ref([])

const profileRingStyle = computed(() => {
  return {
    background: `conic-gradient(#f97316 ${stats.value.profileCompletion}%, rgba(255,255,255,0.08) 0)`,
  }
})

const SectionHeader = defineComponent({
  props: ['title', 'link'],
  setup(props) {
    return () =>
      h('div', { class: 'mb-5 flex items-center justify-between gap-4' }, [
        h('h2', { class: 'text-xl font-black md:text-2xl' }, props.title),
        props.link
          ? h('button', { class: 'text-sm font-bold text-purple-400 hover:text-orange-400' }, props.link)
          : null,
      ])
  },
})

const StatCard = defineComponent({
  props: ['icon', 'title', 'value', 'hint', 'color'],
  setup(props) {
    const colorMap = {
      purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      pink: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
      green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    }

    return () =>
      h('div', { class: 'rounded-3xl border border-white/10 bg-[#0b0b0b] p-5 transition hover:border-orange-500/40' }, [
        h('div', { class: `grid h-14 w-14 place-items-center rounded-2xl border text-2xl ${colorMap[props.color]}` }, props.icon),
        h('h3', { class: 'mt-5 text-3xl font-black' }, props.value),
        h('p', { class: 'mt-1 text-sm text-gray-300' }, props.title),
        h('p', { class: 'mt-4 text-sm font-bold text-purple-400' }, props.hint),
      ])
  },
})

const GettingStartedCard = defineComponent({
  props: ['icon', 'title', 'text', 'button'],
  setup(props) {
    return () =>
      h('div', { class: 'rounded-2xl border border-white/10 bg-black/30 p-5' }, [
        h('div', { class: 'grid h-14 w-14 place-items-center rounded-2xl bg-orange-500/15 text-2xl' }, props.icon),
        h('h3', { class: 'mt-4 font-black' }, props.title),
        h('p', { class: 'mt-2 text-sm leading-6 text-gray-400' }, props.text),
        h('button', { class: 'mt-4 rounded-lg border border-orange-500/40 px-4 py-2 text-sm font-bold text-orange-400' }, props.button),
      ])
  },
})

const EmptyState = defineComponent({
  props: ['icon', 'title', 'text', 'button'],
  setup(props) {
    return () =>
      h('div', { class: 'rounded-3xl border border-white/10 bg-black/30 p-8 text-center' }, [
        h('div', { class: 'mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/5 text-4xl' }, props.icon),
        h('h3', { class: 'mt-4 text-xl font-black' }, props.title),
        h('p', { class: 'mx-auto mt-2 max-w-md text-gray-400' }, props.text),
        props.button
          ? h('button', { class: 'mt-5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 font-black' }, props.button)
          : null,
      ])
  },
})

const CategoryChip = defineComponent({
  props: ['icon', 'title'],
  setup(props) {
    return () =>
      h('button', { class: 'rounded-2xl border border-white/10 bg-black/30 p-4 text-center transition hover:border-orange-500/50 hover:text-orange-400' }, [
        h('div', { class: 'text-2xl' }, props.icon),
        h('p', { class: 'mt-2 text-sm font-bold' }, props.title),
      ])
  },
})

const EventCard = defineComponent({
  props: ['event'],
  setup(props) {
    return () =>
      h('div', { class: 'overflow-hidden rounded-2xl border border-white/10 bg-black/30' }, [
        h('div', { class: 'grid h-40 place-items-center bg-gradient-to-br from-orange-500/20 to-purple-500/20 text-gray-400' }, 'Event Image'),
        h('div', { class: 'p-4' }, [
          h('h3', { class: 'font-black' }, props.event.title),
          h('p', { class: 'mt-1 text-sm text-gray-400' }, props.event.location),
          h('button', { class: 'mt-4 w-full rounded-xl bg-orange-500 py-2 font-bold' }, 'Book Now'),
        ]),
      ])
  },
})

const UpcomingEventRow = defineComponent({
  props: ['event'],
  setup(props) {
    return () =>
      h('div', { class: 'flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4' }, [
        h('div', [
          h('h3', { class: 'font-black' }, props.event.title),
          h('p', { class: 'mt-1 text-sm text-gray-400' }, props.event.date),
        ]),
        h('button', { class: 'rounded-xl border border-purple-500/40 px-4 py-2 text-sm font-bold text-purple-300' }, 'View Ticket'),
      ])
  },
})

const TransactionRow = defineComponent({
  props: ['item'],
  setup(props) {
    return () =>
      h('div', { class: 'flex items-center justify-between rounded-xl bg-black/30 p-3' }, [
        h('div', [
          h('p', { class: 'font-bold' }, props.item.title),
          h('p', { class: 'text-xs text-gray-500' }, props.item.date),
        ]),
        h('p', { class: props.item.amount > 0 ? 'font-black text-green-400' : 'font-black text-orange-400' }, props.item.amount),
      ])
  },
})

const ActivityRow = defineComponent({
  props: ['activity'],
  setup(props) {
    return () =>
      h('div', { class: 'rounded-xl bg-black/30 p-4' }, [
        h('p', { class: 'font-bold' }, props.activity.title),
        h('p', { class: 'mt-1 text-xs text-gray-500' }, props.activity.time),
      ])
  },
})
</script>

<style scoped>
.dashboard-section {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0b0b0b;
  border-radius: 1.5rem;
  padding: 1.25rem;
}

.glow-purple {
  box-shadow: 0 0 35px rgba(168, 85, 247, 0.15);
}

.glow-orange {
  box-shadow: 0 0 35px rgba(249, 115, 22, 0.16);
}
</style>