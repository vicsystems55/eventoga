<template>
  <main class="home-shell min-h-screen overflow-hidden text-white">
    <section class="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-14 md:px-8 md:pb-20 md:pt-20 lg:grid-cols-[1.06fr_.94fr] lg:gap-4 lg:pt-24">
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-orange-300">
          <span class="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_#fb923c]"></span>
          Your next outing starts here
        </div>
        <h1 class="mt-7 max-w-3xl text-[clamp(3.15rem,7vw,6.6rem)] font-black leading-[.98] tracking-[-.055em]">
          Go where<br />the <span class="hero-accent">good stuff</span><br />happens.
        </h1>
        <p class="mt-7 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
          Explore concerts, conferences, creative gatherings and more happening across Nigeria. Find the details, then follow the original source for tickets.
        </p>

        <form class="mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/15 bg-[#141019]/90 p-2 shadow-[0_24px_70px_rgba(0,0,0,.32)] sm:flex-row" @submit.prevent="searchEvents">
          <label class="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-4 py-3 text-zinc-400">
            <Search :size="21" aria-hidden="true" />
            <span class="sr-only">Search events or cities</span>
            <input v-model.trim="search" type="search" placeholder="Search events or cities" class="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none" />
          </label>
          <button type="submit" class="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-black transition hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
            Find events <ArrowRight :size="18" aria-hidden="true" />
          </button>
        </form>

        <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-zinc-400">
          <span class="inline-flex items-center gap-2"><Compass :size="17" class="text-orange-400" aria-hidden="true" /> Discover what is coming up</span>
          <span class="inline-flex items-center gap-2"><ExternalLink :size="17" class="text-violet-400" aria-hidden="true" /> Check the original listing</span>
        </div>
      </div>

      <div class="hero-art relative mx-auto h-[350px] w-full max-w-[600px] md:h-[510px] lg:h-[620px]" aria-hidden="true">
        <div class="absolute inset-[6%_4%_6%_4%] rounded-full bg-[radial-gradient(circle,rgba(241,96,29,.38),rgba(105,34,152,.25)_46%,transparent_70%)] blur-3xl"></div>
        <div class="absolute left-[9%] top-[5%] h-28 w-28 rounded-full border border-orange-400/25"></div>
        <div class="absolute right-[4%] top-[13%] h-10 w-10 rotate-12 rounded-lg border border-violet-400/50 bg-violet-500/15"></div>
        <img :src="heroImage" alt="" class="absolute bottom-0 left-1/2 w-[115%] max-w-none -translate-x-1/2 drop-shadow-[0_35px_65px_rgba(0,0,0,.55)]" />
        <div class="absolute bottom-[5%] left-[2%] inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-[#17101d]/90 px-4 py-3 shadow-xl backdrop-blur-lg sm:left-[7%]">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-orange-500/20 text-orange-400"><CalendarDays :size="21" /></span>
          <span><strong class="block text-sm">Find your next event</strong><small class="text-xs text-zinc-400">Across Nigeria</small></span>
        </div>
      </div>
    </section>

    <section class="relative border-y border-white/10 bg-white/[.025] px-5 py-5 md:px-8">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
        <span class="mr-2 text-xs font-bold uppercase tracking-[.2em] text-zinc-500">Explore by category</span>
        <template v-if="categories.length">
          <router-link v-for="category in featuredCategories" :key="category.id" :to="{ path: '/events', query: { category: category.slug } }" class="category-pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-white">
            <component :is="categoryIcon(category.slug)" :size="15" class="text-orange-400" aria-hidden="true" />{{ category.name }}
          </router-link>
        </template>
        <router-link to="/events" class="inline-flex items-center gap-1 px-2 py-2 text-sm font-bold text-orange-400 hover:text-orange-300">All categories <ArrowRight :size="15" aria-hidden="true" /></router-link>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24" aria-labelledby="upcoming-heading">
      <div class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="mb-3 text-xs font-extrabold uppercase tracking-[.24em] text-orange-400">On the calendar</p>
          <h2 id="upcoming-heading" class="text-3xl font-black tracking-tight md:text-5xl">Upcoming events<span class="text-orange-500">.</span></h2>
          <p class="mt-3 max-w-xl text-sm leading-6 text-zinc-400">Fresh listings from organizers and public event sources. Open an event to check its details and ticket link.</p>
        </div>
        <router-link to="/events" class="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold transition hover:border-orange-400 hover:text-orange-300">Browse all events <ArrowUpRight :size="17" aria-hidden="true" /></router-link>
      </div>

      <div v-if="loading" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <div v-for="item in 6" :key="item" class="h-[370px] animate-pulse rounded-3xl border border-white/10 bg-white/5"></div>
      </div>
      <div v-else-if="error" class="rounded-3xl border border-orange-500/25 bg-orange-500/5 p-8 text-center" role="status">
        <p class="text-lg font-bold">Events are unavailable right now.</p>
        <p class="mt-2 text-sm text-zinc-400">Please try loading them again.</p>
        <button class="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-black hover:bg-orange-400" @click="loadEvents"><RefreshCw :size="17" /> Try again</button>
      </div>
      <div v-else-if="!events.length" class="rounded-3xl border border-white/10 bg-white/[.035] p-10 text-center">
        <CalendarDays :size="32" class="mx-auto text-orange-400" aria-hidden="true" />
        <h3 class="mt-4 text-xl font-bold">No upcoming events listed yet</h3>
        <p class="mt-2 text-sm text-zinc-400">Check back soon for new listings.</p>
      </div>
      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <router-link v-for="event in events" :key="event.id" :to="{ name: 'EventDetails', params: { id: event.slug } }" class="event-card group overflow-hidden rounded-3xl border border-white/10 bg-[#131018] transition duration-300 hover:-translate-y-1 hover:border-orange-400/45 focus-visible:outline-2 focus-visible:outline-orange-400">
          <div class="relative h-52 overflow-hidden bg-[linear-gradient(135deg,#382049,#17101d_55%,#5e2a16)]">
            <img v-if="event.image_url && !failedImages.has(event.id)" :src="event.image_url" :alt="event.title" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" @error="markImageFailed(event.id)" />
            <div v-else class="flex h-full items-center justify-center"><Ticket :size="52" class="text-orange-300/50" aria-hidden="true" /></div>
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131018] to-transparent"></div>
            <span class="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-bold backdrop-blur-md">{{ event.source_type === 'import' ? 'External listing' : 'Organizer event' }}</span>
          </div>
          <div class="p-5">
            <p class="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-orange-400"><CalendarDays :size="15" aria-hidden="true" /> {{ formatDate(event.starts_at) }}</p>
            <h3 class="line-clamp-2 min-h-[3.4rem] text-xl font-extrabold leading-7 tracking-tight">{{ event.title }}</h3>
            <p class="mt-3 flex items-start gap-2 text-sm text-zinc-400"><MapPin :size="16" class="mt-0.5 shrink-0 text-violet-400" aria-hidden="true" /><span class="line-clamp-1">{{ eventLocation(event) }}</span></p>
            <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span class="text-sm font-semibold text-zinc-300">{{ event.event_type === 'free' ? 'Free entry' : 'See ticket details' }}</span><span class="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-black transition group-hover:bg-orange-400"><ArrowUpRight :size="19" aria-hidden="true" /></span></div>
          </div>
        </router-link>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
      <div class="relative overflow-hidden rounded-[2rem] border border-orange-400/25 bg-[linear-gradient(135deg,#48200d,#191016_72%)] p-8 md:p-10">
        <div class="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl"></div>
        <PartyPopper :size="31" class="relative text-orange-300" aria-hidden="true" />
        <h2 class="relative mt-8 max-w-sm text-3xl font-black tracking-tight">Have an event people should know about?</h2>
        <p class="relative mt-4 max-w-md text-sm leading-7 text-zinc-300">Explore EventOga for organizers and bring your audience together.</p>
        <router-link to="/organizers" class="relative mt-7 inline-flex items-center gap-2 font-bold text-orange-300 hover:text-white">For organizers <ArrowRight :size="18" aria-hidden="true" /></router-link>
      </div>
      <div class="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-[linear-gradient(135deg,#321a4c,#15101c_72%)] p-8 md:p-10">
        <div class="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl"></div>
        <Sparkles :size="31" class="relative text-violet-300" aria-hidden="true" />
        <h2 class="relative mt-8 max-w-sm text-3xl font-black tracking-tight">The event marketplace is taking shape.</h2>
        <p class="relative mt-4 max-w-md text-sm leading-7 text-zinc-300">A place to discover event services and products is on the way.</p>
        <router-link to="/marketplace" class="relative mt-7 inline-flex items-center gap-2 font-bold text-violet-300 hover:text-white">Explore the idea <ArrowRight :size="18" aria-hidden="true" /></router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, Church, Compass, ExternalLink, HeartPulse, Laptop2, MapPin, Music2, Palette, PartyPopper, RefreshCw, Search, Sparkles, Ticket, UsersRound } from '@lucide/vue'
import { eventService } from '@/services/eventService'
import { categoryService } from '@/services/categoryService'
import heroImage from '@/assets/bg1.png'

const router = useRouter()
const search = ref('')
const events = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(false)
const failedImages = ref(new Set())
const featuredCategories = computed(() => {
  const active = new Set(events.value.map(event => event.category_slug))
  return [...categories.value].sort((a, b) => Number(active.has(b.slug)) - Number(active.has(a.slug))).slice(0, 8)
})

const icons = { concerts: Music2, music: Music2, business: BriefcaseBusiness, tech: Laptop2, 'arts-culture': Palette, 'health-wellness': HeartPulse, family: UsersRound, 'church-events': Church, parties: PartyPopper, nightlife: PartyPopper }
const categoryIcon = slug => icons[slug] || CalendarDays
const formatDate = value => new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date(value))
const eventLocation = event => event.event_format === 'online' ? 'Online event' : [event.venue_name, event.city].filter(Boolean).join(', ') || 'Location to be announced'
const markImageFailed = id => { failedImages.value = new Set([...failedImages.value, id]) }

function searchEvents() {
  router.push({ path: '/events', query: search.value ? { search: search.value } : {} })
}

async function loadEvents() {
  loading.value = true
  error.value = false
  try {
    const response = await eventService.getPublicEvents({ per_page: 6 })
    events.value = response.data || []
  } catch {
    events.value = []
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEvents()
  categoryService.getCategories().then(data => { categories.value = data }).catch(() => {})
})
</script>

<style scoped>
.home-shell { background: radial-gradient(circle at 72% 8%, rgba(124, 49, 159, .24), transparent 28%), radial-gradient(circle at 10% 27%, rgba(239, 99, 29, .13), transparent 31%), #08070b; }
.hero-accent { background: linear-gradient(100deg, #ffb15d 6%, #ff682d 55%, #fb4772); -webkit-background-clip: text; background-clip: text; color: transparent; }
.event-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,.35), 0 0 35px rgba(234, 104, 42, .1); }
@media (prefers-reduced-motion: reduce) { .event-card, .event-card img { transition: none; } }
</style>
