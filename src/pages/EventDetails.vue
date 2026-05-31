<template>
    <main class="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6 lg:px-8">
        <div class="relative mx-auto max-w-7xl">
            <!-- Ambient lighting -->
            <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/14 blur-3xl pointer-events-none"></div>
            <div class="absolute -top-20 right-0 h-72 w-72 rounded-full bg-purple-500/14 blur-3xl pointer-events-none"></div>
            <div class="absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-orange-500/28 blur-3xl pointer-events-none"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.021),transparent_60%)] pointer-events-none"></div>
            <!-- Back -->
            <button class="mb-5 text-sm font-semibold text-gray-400 transition hover:text-orange-500">
                ‹ Back to Events
            </button>

            <!-- Top Grid -->
            <section class="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
                <!-- Event Hero Card -->
                <div
                    class="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-[#0b0b0b] p-5 min-h-[420px]">
                    <img :src="event.image" alt="" class="absolute inset-0 h-full w-full object-cover opacity-70" />

                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10"></div>

                    <div class="relative z-10 flex h-full min-h-[380px] flex-col justify-end">
                        <div class="mb-5 flex gap-3">
                            <span class="rounded-full bg-orange-500 px-4 py-2 text-xs font-black">
                                ✦ Trending
                            </span>

                            <span class="rounded-full bg-orange-500 px-4 py-2 text-xs font-black">
                                Early Bird
                            </span>
                        </div>

                        <div class="flex items-end gap-5">
                            <div class="rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-center">
                                <p class="text-4xl font-black">{{ event.day }}</p>
                                <p class="text-lg font-black text-gray-300">{{ event.month }}</p>
                            </div>

                            <div>
                                <h1 class="text-4xl font-black md:text-5xl">
                                    {{ event.title }}
                                </h1>

                                <p class="mt-3 text-gray-300">
                                    📍 {{ event.location }}
                                </p>

                                <p class="mt-2 text-sm text-gray-300">
                                    ⭐ {{ event.rating }} ({{ event.reviewCount }} Reviews)
                                </p>
                            </div>
                        </div>

                        <p class="mt-5 max-w-3xl leading-7 text-gray-300">
                            {{ event.shortDescription }}
                        </p>

                        <div class="mt-5 flex flex-wrap gap-2">
                            <span v-for="tag in event.tags" :key="tag"
                                class="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-gray-300">
                                {{ tag }}
                            </span>
                        </div>

                        <div class="mt-6 flex gap-6 text-sm font-bold text-gray-300">
                            <button class="hover:text-orange-500">↗ Share</button>
                            <button class="hover:text-orange-500">♡ Add to Favorites</button>
                        </div>
                    </div>
                </div>

                <!-- Ticket Selector -->
                <aside
                    class="rounded-3xl border border-purple-500/30 bg-[#0b0b0b] p-5 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
                    <h2 class="text-xl font-black">Select Tickets</h2>

                    <div class="my-5 border-t border-white/10"></div>

                    <p class="text-sm font-bold text-orange-500">
                        Early Bird Ends In:
                    </p>

                    <div class="mt-3 grid grid-cols-4 gap-2">
                        <TimeBox value="02" label="Days" />
                        <TimeBox value="14" label="Hrs" />
                        <TimeBox value="36" label="Mins" />
                        <TimeBox value="45" label="Secs" />
                    </div>

                    <div class="mt-6 space-y-4">
                        <TicketRow v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"
                            @increase="ticket.quantity++" @decrease="ticket.quantity > 0 && ticket.quantity--" />
                    </div>

                    <div class="mt-6 border-t border-white/10 pt-5">
                        <div class="flex items-center justify-between">
                            <span class="text-lg font-black">Total</span>
                            <span class="text-2xl font-black">₦{{ totalAmount.toLocaleString() }}</span>
                        </div>

                        <button
                            class="mt-5 w-full rounded-xl bg-orange-500 py-4 font-black text-white shadow-[0_0_30px_rgba(249,115,22,0.35)] transition hover:bg-orange-600">
                            Get Tickets
                        </button>

                        <p class="mt-3 text-center text-xs text-gray-400">
                            🔒 Secure Payments
                        </p>
                    </div>
                </aside>
            </section>

            <!-- Event Info Cards -->
            <section class="mt-6 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">
                <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard icon="📅" title="Date & Time" :main="event.fullDate" :sub="event.time" />

                    <InfoCard icon="📍" title="Location" :main="event.venue" :sub="event.address" />

                    <InfoCard icon="🏢" title="Organizer" :main="event.organizer.name"
                        :sub="event.organizer.verified ? 'Verified Organizer' : 'Organizer'" />

                    <InfoCard icon="👥" title="Attendees" :main="event.attendees" sub="People Going" />
                </div>
            </section>

            <!-- Tabs + Social Sidebar -->
            <section class="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
                <!-- LEFT: Tabs Section -->
                <div class="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">
                    <!-- Tabs Header -->
                    <div class="flex gap-2 overflow-x-auto border-b border-white/10 px-4">
                        <button v-for="tab in tabs" :key="tab" type="button" @click="activeTab = tab"
                            class="shrink-0 border-b-2 px-5 py-4 text-sm font-black transition" :class="activeTab === tab
                                    ? 'border-orange-500 text-orange-500'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                ">
                            {{ tab }}
                        </button>
                    </div>

                    <!-- Tabs Content -->
                    <div class="p-5 md:p-6">
                        <!-- About -->
                        <div v-if="activeTab === 'About'">
                            <h2 class="text-2xl font-black">About This Event</h2>

                            <p class="mt-4 leading-8 text-gray-300">
                                {{ event.description }}
                            </p>

                            <div class="mt-6 grid gap-4 sm:grid-cols-2">
                                <FeatureItem icon="🎤" title="Top Afrobeats Artists"
                                    text="Featuring the biggest names in Afrobeats." />

                                <FeatureItem icon="✨" title="Live Performances"
                                    text="High-energy performances all night long." />

                                <FeatureItem icon="🍹" title="Food & Drinks"
                                    text="Delicious food and drinks available." />

                                <FeatureItem icon="👑" title="VIP Experience"
                                    text="Exclusive access and premium amenities." />
                            </div>

                            <div class="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
                                <img :src="event.image" alt="" class="h-[350px] w-full object-cover" />
                            </div>
                        </div>

                        <!-- Lineup -->
                        <div v-else-if="activeTab === 'Lineup'">
                            <h2 class="text-2xl font-black">Event Lineup</h2>

                            <div class="mt-5 grid gap-4 sm:grid-cols-2">
                                <div v-for="artist in event.lineup" :key="artist"
                                    class="rounded-2xl border border-white/10 bg-black/30 p-4 font-black">
                                    🎤 {{ artist }}
                                </div>
                            </div>
                        </div>

                        <!-- Schedule -->
                        <div v-else-if="activeTab === 'Schedule'">
                            <h2 class="text-2xl font-black">Event Schedule</h2>

                            <div class="mt-5 space-y-4">
                                <div v-for="item in event.schedule" :key="item.time"
                                    class="flex gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                                    <p class="w-24 font-black text-orange-500">{{ item.time }}</p>
                                    <p class="text-gray-300">{{ item.activity }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Venue -->
                        <div v-else-if="activeTab === 'Venue'">
                            <h2 class="text-2xl font-black">Venue Information</h2>

                            <div class="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
                                <h3 class="font-black">{{ event.venue }}</h3>
                                <p class="mt-2 text-gray-400">{{ event.address }}</p>
                                <p class="mt-2 text-gray-400">📍 {{ event.location }}</p>
                            </div>
                        </div>

                        <!-- Reviews -->
                        <div v-else-if="activeTab === 'Reviews'">
                            <h2 class="text-2xl font-black">Reviews</h2>

                            <div class="mt-5 space-y-5">
                                <div v-for="review in event.reviews" :key="review.id"
                                    class="rounded-2xl border border-white/10 bg-black/30 p-5">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-purple-600 font-black">
                                            {{ review.name.charAt(0) }}
                                        </div>

                                        <div class="flex-1">
                                            <div class="flex justify-between gap-4">
                                                <div>
                                                    <h3 class="font-black">{{ review.name }}</h3>
                                                    <p class="text-xs text-green-400">✓ Verified Attendee</p>
                                                </div>

                                                <div class="text-right">
                                                    <p class="text-orange-500">★★★★★</p>
                                                    <p class="text-xs text-gray-500">{{ review.date }}</p>
                                                </div>
                                            </div>

                                            <p class="mt-3 leading-7 text-gray-300">
                                                {{ review.comment }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- FAQs -->
                        <div v-else-if="activeTab === 'FAQs'">
                            <h2 class="text-2xl font-black">Frequently Asked Questions</h2>

                            <div class="mt-5 space-y-4">
                                <div v-for="faq in event.faqs" :key="faq.question"
                                    class="rounded-2xl border border-white/10 bg-black/30 p-5">
                                    <h3 class="font-black">{{ faq.question }}</h3>
                                    <p class="mt-2 text-gray-400">{{ faq.answer }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Separate Sidebar Cards -->
                <aside class="space-y-6">
                    <!-- Follow Organizer Card -->
                    <div
                        class="rounded-3xl border border-purple-500/30 bg-[#0b0b0b] p-5 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
                        <div class="flex items-center gap-4">
                            <div
                                class="grid h-14 w-14 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 font-black text-orange-500">
                                {{ organizerInitial }}
                            </div>

                            <div>
                                <h3 class="font-black">{{ event.organizer.name }}</h3>
                                <p class="mt-1 text-xs text-green-400">
                                    {{ event.organizer.verified ? '✓ Verified Organizer' : 'Organizer' }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-5 grid grid-cols-3 divide-x divide-white/10 text-center">
                            <div>
                                <p class="text-xl font-black">{{ event.organizer.eventsCount }}</p>
                                <p class="text-xs text-gray-400">Events</p>
                            </div>

                            <div>
                                <p class="text-xl font-black">{{ event.organizer.followersCount }}</p>
                                <p class="text-xs text-gray-400">Followers</p>
                            </div>

                            <div>
                                <p class="text-xl font-black">{{ event.organizer.rating }}</p>
                                <p class="text-xs text-gray-400">Rating</p>
                            </div>
                        </div>

                        <button
                            class="mt-5 w-full rounded-xl bg-orange-500 py-3 font-black text-white transition hover:bg-orange-600">
                            Follow Organizer
                        </button>

                        <p class="mt-4 text-sm leading-6 text-gray-400">
                            {{ event.organizer.description }}
                        </p>

                        <div class="mt-4 flex gap-3">
                            <a v-for="(link, name) in event.organizer.socials" :key="name" :href="link"
                                class="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-black uppercase text-gray-300 transition hover:bg-orange-500 hover:text-white">
                                {{ name.charAt(0) }}
                            </a>
                        </div>
                    </div>

                    <!-- Invite Friends Card -->
                    <div
                        class="rounded-3xl border border-orange-500/30 bg-[#0b0b0b] p-5 shadow-[0_0_30px_rgba(249,115,22,0.12)]">
                        <h3 class="text-xl font-black">Going with friends?</h3>

                        <p class="mt-2 text-sm text-gray-400">
                            Invite your friends to join this event.
                        </p>

                        <div class="mt-4 flex -space-x-3">
                            <div v-for="friend in friendsPreview" :key="friend"
                                class="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0b0b0b] bg-gradient-to-br from-orange-500 to-purple-600 text-xs font-black">
                                {{ friend }}
                            </div>

                            <div
                                class="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0b0b0b] bg-white/10 text-xs font-black">
                                +5
                            </div>
                        </div>

                        <button
                            class="mt-5 w-full rounded-xl bg-orange-500 py-3 font-black text-white transition hover:bg-orange-600">
                            Invite Friends
                        </button>
                    </div>
                </aside>
            </section>

            <!-- Reviews & Ratings -->
<section class="mt-6 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
  <!-- Rating Summary -->
  <div class="rounded-3xl border border-purple-500/30 bg-[#0b0b0b] p-5">
    <h2 class="text-2xl font-black">Reviews & Ratings</h2>

    <div class="mt-6">
      <p class="text-6xl font-black">{{ event.rating }}</p>

      <div class="mt-2 text-orange-500">
        ★★★★★
      </div>

      <p class="mt-2 text-sm text-gray-400">
        {{ event.reviewCount }} Reviews
      </p>
    </div>

    <div class="mt-6 space-y-3">
      <div
        v-for="rating in ratingBreakdown"
        :key="rating.stars"
        class="grid grid-cols-[60px_1fr_40px] items-center gap-3 text-sm"
      >
        <span class="text-gray-400">{{ rating.stars }} Stars</span>

        <div class="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-orange-500"
            :style="{ width: `${rating.percent}%` }"
          ></div>
        </div>

        <span class="text-right text-gray-400">{{ rating.percent }}%</span>
      </div>
    </div>

    <button class="mt-6 w-full rounded-xl bg-orange-500 py-3 font-black text-white">
      Write a Review
    </button>
  </div>

  <!-- Review List -->
  <div class="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">
    <div class="space-y-5">
      <div
        v-for="review in event.reviews"
        :key="review.id"
        class="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
      >
        <div class="flex items-start gap-4">
          <div class="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-purple-600 font-black">
            {{ review.name.charAt(0) }}
          </div>

          <div class="flex-1">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="font-black">{{ review.name }}</h3>
                <p class="mt-1 text-xs text-green-400">✓ Verified Attendee</p>
              </div>

              <div class="text-right">
                <p class="text-orange-500">★★★★★</p>
                <p class="mt-1 text-xs text-gray-500">{{ review.date }}</p>
              </div>
            </div>

            <p class="mt-3 leading-7 text-gray-300">
              {{ review.comment }}
            </p>

            <button class="mt-2 text-sm text-gray-400 hover:text-orange-500">
              ♡ {{ review.likes }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button class="mt-5 text-sm font-bold text-purple-400 hover:text-orange-400">
      View All Reviews
    </button>
  </div>
</section>
        </div>
    </main>
</template>

<script setup>
import { computed, defineComponent, h, reactive, ref } from 'vue'
import bg1 from '@/assets/bg1.png'

const friendsPreview = ['SA', 'DK', 'AM', 'JO', 'TV']

const ratingBreakdown = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
]

const organizerInitial = computed(() => {
  return event.organizer?.name?.charAt(0) || 'O'
})

const activeTab = ref('About')

const tabs = ['About', 'Lineup', 'Schedule', 'Venue', 'Reviews', 'FAQs']

const event = reactive({
    id: 1,
    slug: 'afrobeats-live-concert',

    title: 'Afrobeats Live Concert',

    image: bg1,

    shortDescription:
        'Experience the biggest Afrobeats concert of the year featuring top artists, exciting performances, and unforgettable vibes.',

    description:
        'Experience the biggest Afrobeats concert of the year featuring top artists, exciting performances, and unforgettable vibes. Get ready for a night of music, dance, and pure energy. This unforgettable event brings together some of the biggest names in Afrobeats alongside emerging talents for an incredible live experience.',

    day: '28',
    month: 'APR',

    fullDate: '28 April 2026',

    time: '6:00 PM - 11:00 PM',

    rating: 4.8,

    reviewCount: 230,

    attendees: '1,250+',

    location: 'Eko Convention Centre, Lagos',

    venue: 'Eko Convention Centre',

    address: 'Victoria Island, Lagos',

    category: 'Concert',

    eventType: 'Paid',

    eventFormat: 'Physical',

    status: 'Published',

    tags: [
        'Concert',
        'Afrobeats',
        'Live Music',
        'Nightlife'
    ],

    organizer: {
        id: 5,

        name: 'LiveNation Africa',

        logo: null,

        verified: true,

        eventsCount: 45,

        followersCount: '12K+',

        rating: 4.9,

        description:
            'We create unforgettable live experiences across Africa.',

        socials: {
            facebook: '#',
            instagram: '#',
            twitter: '#'
        }
    },

    lineup: [
        'Davido',
        'Asake',
        'Ayra Starr',
        'BNXN'
    ],

    schedule: [
        {
            time: '6:00 PM',
            activity: 'Doors Open'
        },
        {
            time: '7:00 PM',
            activity: 'Opening Performance'
        },
        {
            time: '8:00 PM',
            activity: 'Main Show'
        }
    ],

    reviews: [
        {
            id: 1,
            name: 'Sarah M.',
            rating: 5,
            comment:
                'Amazing event! The energy was incredible and the performances were outstanding.',
            date: '2 days ago',
            likes: 12
        },
        {
            id: 2,
            name: 'David K.',
            rating: 5,
            comment:
                'Best concert I have attended this year. Great organization and vibes.',
            date: '1 week ago',
            likes: 8
        }
    ],

    faqs: [
        {
            question: 'Can I transfer my ticket?',
            answer:
                'Yes, tickets can be transferred before the event starts.'
        },
        {
            question: 'Is parking available?',
            answer:
                'Yes, paid parking is available at the venue.'
        }
    ]
})

const tickets = reactive([
    {
        id: 1,
        name: 'Early Bird',
        note: 'Limited availability',
        price: 5000,
        quantity: 2,
    },
    {
        id: 2,
        name: 'Regular',
        note: 'Available',
        price: 7000,
        quantity: 0,
    },
    {
        id: 3,
        name: 'VIP',
        note: 'Includes lounge access',
        price: 15000,
        quantity: 0,
    },
])

const totalAmount = computed(() => {
    return tickets.reduce((sum, ticket) => {
        return sum + ticket.price * ticket.quantity
    }, 0)
})

const TimeBox = defineComponent({
    props: ['value', 'label'],
    setup(props) {
        return () =>
            h('div', { class: 'rounded-xl bg-white/5 p-3 text-center' }, [
                h('p', { class: 'text-xl font-black' }, props.value),
                h('p', { class: 'text-[11px] text-gray-400' }, props.label),
            ])
    },
})

const TicketRow = defineComponent({
    props: ['ticket'],
    emits: ['increase', 'decrease'],
    setup(props, { emit }) {
        return () =>
            h('div', { class: 'rounded-2xl border border-white/10 bg-black/30 p-4' }, [
                h('div', { class: 'flex items-center justify-between gap-4' }, [
                    h('div', [
                        h('h3', { class: 'font-black' }, props.ticket.name),
                        h('p', { class: 'mt-1 text-xs text-gray-400' }, `🟠 ${props.ticket.note}`),
                    ]),

                    h('div', { class: 'flex items-center gap-3' }, [
                        h(
                            'button',
                            {
                                class: 'grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5',
                                onClick: () => emit('decrease'),
                            },
                            '-'
                        ),
                        h('span', { class: 'w-5 text-center font-black' }, props.ticket.quantity),
                        h(
                            'button',
                            {
                                class: 'grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5',
                                onClick: () => emit('increase'),
                            },
                            '+'
                        ),
                    ]),
                ]),
            ])
    },
})
const InfoCard = defineComponent({
    props: ['icon', 'title', 'main', 'sub'],
    setup(props) {
        return () =>
            h('div', { class: 'flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-4' }, [
                h('div', { class: 'grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-2xl' }, props.icon),
                h('div', [
                    h('p', { class: 'text-sm font-black text-white' }, props.title),
                    h('p', { class: 'mt-1 text-sm text-gray-300' }, props.main),
                    h('p', { class: 'mt-1 text-xs text-gray-500' }, props.sub),
                ]),
            ])
    },
})

const FeatureItem = defineComponent({
    props: ['icon', 'title', 'text'],
    setup(props) {
        return () =>
            h('div', { class: 'flex gap-4 rounded-2xl bg-black/25 p-4' }, [
                h('div', { class: 'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-xl' }, props.icon),
                h('div', [
                    h('h3', { class: 'font-black text-white' }, props.title),
                    h('p', { class: 'mt-1 text-sm leading-6 text-gray-400' }, props.text),
                ]),
            ])
    },
})
</script>