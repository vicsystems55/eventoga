<template>
    <main class="min-h-screen ambient-bg text-white">
        <!-- HERO -->
        <section class="relative overflow-hidden px-4 pt-10 md:px-6 lg:px-8">
            <!-- full background image behind the card -->
            <div class="absolute inset-0 hidden bg-cover bg-center bg-no-repeat opacity-80 lg:block"
                :style="{ backgroundImage: `url(${organizerBg})` }"></div>

            <!-- page-level dark overlay -->
            <!-- <div class="absolute inset-0 hidden bg-black/45 lg:block"></div> -->

            <div class="relative z-10 mx-auto max-w-7xl overflow-hidden ">
                <!-- extra fade inside card -->
                <!-- <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> -->

                <!-- ambient glows -->
                <!-- <div class="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl"></div>
                <div class="absolute right-10 top-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div> -->

                <!-- content -->
                <div class="relative z-10 flex min-h-[720px] items-center">
                    <div class="w-full max-w-3xl px-8 py-14 md:px-14">
                        <p
                            class="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-black uppercase tracking-wide text-orange-500">
                            For Organizers
                        </p>

                        <h1 class="mt-6 text-5xl font-black leading-tight md:text-7xl">
                            Create, Promote &
                            <span class="text-orange-500">Profit</span>
                            from Your Events
                        </h1>

                        <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
                            Launch free or paid events, grow your audience, sell tickets, and
                            receive secure payouts — all from one powerful platform built for
                            Nigerian organizers.
                        </p>

                        <div class="mt-8 flex flex-wrap gap-4">
                            <button
                                class="rounded-xl bg-orange-500 px-8 py-4 font-black text-white transition hover:scale-105 glow-orange">
                                Start Free →
                            </button>

                            <a href="#pricing"
                                class="rounded-xl border border-purple-500/40 px-8 py-4 font-black text-purple-300 transition hover:bg-purple-500/10 glow-purple-soft">
                                See Pricing →
                            </a>
                        </div>

                        <div class="mt-10 grid gap-4 sm:grid-cols-3">
                            <MiniBadge icon="percent" title="3% Commission" />
                            <MiniBadge icon="shield" title="Secure Payments" />
                            <MiniBadge icon="wallet" title="Payouts in 24–72 hrs" />
                        </div>
                    </div>
                </div>

                <!-- floating cards -->
                <div
                    class="absolute right-10 top-16 z-20 hidden rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur lg:block glow-purple">
                    <p class="text-lg text-gray-300">Waitlist Progress</p>
                    <h3 class="mt-2 text-3xl font-black">7 / 10</h3>
                    <p class="mt-1 text-xs text-green-400">3 more to publish</p>

                    <div class="mt-4 h-2 w-44 rounded-full bg-white/10">
                        <div class="h-full w-[70%] rounded-full bg-purple-500"></div>
                    </div>
                </div>

                <div
                    class="absolute bottom-16 right-8 z-20 hidden rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur lg:block glow-orange">
                    <p class="text-sm text-gray-300">Upcoming Payout</p>
                    <h3 class="mt-2 text-3xl font-black">₦48,500</h3>
                    <p class="mt-1 text-xs text-green-400">Estimated in 24–72 hrs</p>
                </div>
            </div>
        </section>

        <!-- HOW EVENTOGA WORKS -->
        <section class="mt-12 w-full px-4 md:px-6 lg:px-8">
            <div
                class="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-purple-500/30 bg-[#050505]/90 px-8 py-8 shadow-[0_0_60px_rgba(168,85,247,0.12)]">
                <!-- Heading -->
                <p class="text-center text-lg font-black uppercase tracking-wider text-white-200">
                    How EventOga Works
                </p>

                <div class="mt-3 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                    <!-- STEP 1 -->
                    <div class="flex items-center gap-4">
                        <!-- number -->
                        <div
                            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-black text-purple-300">
                            1
                        </div>

                        <!-- icon -->
                        <div
                            class="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
                            <div class="text-purple-400">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8"
                                    viewBox="0 0 24 24">
                                    <rect x="3" y="5" width="18" height="16" rx="2" />
                                    <path d="M16 3v4M8 3v4M3 11h18" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-black">Create Event</h3>

                            <div class="mt-4 space-y-2.5">
                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Free or paid events</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Set ticket types & prices</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Smart organizer dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ARROW -->
                    <div class="hidden lg:block">
                        <img src="../assets/arrow2.png" class="h-9 w-auto opacity-90" />
                    </div>

                    <!-- STEP 2 -->
                    <div class="flex items-center gap-4">
                        <div
                            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 text-sm font-black text-orange-400">
                            2
                        </div>

                        <div
                            class="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_20px_rgba(255,106,0,0.12)]">
                            <div class="text-orange-400">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8"
                                    viewBox="0 0 24 24">
                                    <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-black">Grow Audience</h3>

                            <div class="mt-4 space-y-2.5">
                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check2.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Waitlist or instant publish</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check2.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Subscription benefits</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check2.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Boost & get discovered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ARROW -->
                    <div class="hidden lg:block">
                        <img src="../assets/arrow1.png" class="h-9 w-auto opacity-90" />
                    </div>

                    <!-- STEP 3 -->
                    <div class="flex items-center gap-4">
                        <div
                            class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-black text-purple-300">
                            3
                        </div>

                        <div
                            class="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.12)]">
                            <div class="text-purple-400">
                                <svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.8"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-black leading-tight">
                                Sell Tickets & Get Paid
                            </h3>

                            <div class="mt-4 space-y-2.5">
                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Secure ticket sales</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">3% platform commission</span>
                                </div>

                                <div class="flex items-center gap-2.5">
                                    <img src="../assets/check1.png" class="h-4 w-4" />
                                    <span class="text-sm text-gray-300">Payouts in 24–72 hrs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

 <!-- FREE MODEL -->
<section class="mt-6 w-full px-4 md:px-6 lg:px-8">
  <div
    class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-orange-500/20 bg-[#090909]/90 p-5 shadow-[0_0_50px_rgba(255,106,0,0.06)]"
  >
    <!-- Ambient lighting -->
    <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>
    <div class="absolute -top-20 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_60%)]"></div>

    <div class="relative z-10">
      <!-- Heading -->
      <div class="text-center">
        <h2 class="text-2xl font-black">
          Free Model <span class="text-orange-500">Explained</span>
        </h2>

        <p class="mt-1 text-sm text-gray-400">
          Create events for free and publish when your audience is ready.
        </p>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-[1.4fr_auto_1fr]">
        <!-- WAITLIST -->
        <div
          class="relative rounded-3xl border border-purple-500/20 bg-black/25 p-5 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(168,85,247,0.03)]"
        >
          <h3 class="text-center text-lg font-black text-purple-400">
            Waitlist Publishing
          </h3>

          <div
            class="mt-6 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]"
          >
            <!-- Step 1 -->
            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 shadow-[0_0_18px_rgba(168,85,247,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">Create Event</p>
            </div>

            <div class="hidden md:block">
              <img src="../assets/arrow1.png" class="h-5 w-auto opacity-80" />
            </div>

            <!-- Step 2 -->
            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 shadow-[0_0_18px_rgba(168,85,247,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">Waitlist Opens</p>
            </div>

            <div class="hidden md:block">
              <img src="../assets/arrow1.png" class="h-5 w-auto opacity-80" />
            </div>

            <!-- Step 3 -->
            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_18px_rgba(255,106,0,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">10 Verified Joins</p>
            </div>

            <div class="hidden md:block">
              <img src="../assets/arrow1.png" class="h-5 w-auto opacity-80" />
            </div>

            <!-- Step 4 -->
            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_18px_rgba(255,106,0,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15l-3 3m3-3l3 3M12 15c4-2 6-6 7-12-6 1-10 3-12 7l-3 1 4 4 1-3z" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">Auto Publish</p>
            </div>
          </div>

          <p class="mt-5 text-center text-xs text-gray-400">
            Waitlist expires after
            <span class="font-bold text-orange-500">14 days</span>
            if 10 joins are not reached.
          </p>
        </div>

        <!-- OR -->
        <div class="grid place-items-center">
          <span
            class="rounded-full border border-white/10 bg-black/60 px-4 py-4 text-sm font-black shadow-[0_0_25px_rgba(255,255,255,0.04)]"
          >
            OR
          </span>
        </div>

        <!-- INSTANT -->
        <div
          class="relative rounded-3xl border border-orange-500/20 bg-black/25 p-5 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(255,106,0,0.03)]"
        >
          <h3 class="text-center text-lg font-black text-orange-500">
            Instant Publish
          </h3>

          <div class="mt-6 grid items-center gap-3 md:grid-cols-3">
            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-orange-500/40 bg-orange-500/10 shadow-[0_0_18px_rgba(255,106,0,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">Pay 200 Orbs</p>
              <p class="text-xs font-bold text-orange-400">₦2,000</p>
            </div>

            <div class="hidden text-center md:block">
              <img
                src="../assets/arrow1.png"
                class="mx-auto h-5 w-auto opacity-80"
              />
            </div>

            <div class="text-center">
              <div
                class="mx-auto grid h-18 w-18 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 shadow-[0_0_18px_rgba(168,85,247,0.1)]"
              >
                <svg
                  class="h-8 w-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15l-3 3m3-3l3 3M12 15c4-2 6-6 7-12-6 1-10 3-12 7l-3 1 4 4 1-3z" />
                </svg>
              </div>

              <p class="mt-2 text-xs font-bold">Instant Publish</p>
            </div>
          </div>

          <p class="mt-5 text-center text-xs text-gray-400">
            Skip the wait and go live instantly.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

        <!-- PRICING -->
        <section id="pricing" class="mt-8 w-full px-4 md:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl rounded-3xl border border-purple-500/30 bg-[#080808]/80 p-6 glow-purple">
                <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 class="text-3xl font-black">Choose the plan that grows with you</h2>
                        <p class="mt-2 text-gray-400">All paid plans include 3% ticket commission.</p>
                    </div>

                    <div class="flex w-fit rounded-full border border-purple-500/40 bg-black p-1">
                        <button class="rounded-full px-5 py-2 text-sm text-gray-300">Monthly</button>
                        <button
                            class="rounded-full bg-purple-600 px-5 py-2 text-sm font-bold text-white">Yearly</button>
                    </div>
                </div>

                <div class="mt-8 grid gap-5 lg:grid-cols-4">
                    <PricingCard name="Free" price="₦0" sub="/month" orb="0 Orbs" color="purple" button="Start Free"
                        :features="[
                            '2 active waitlist events',
                            'Waitlist threshold: 10',
                            'Waitlist expiry: 14 days',
                            'Standard listing',
                            'Basic organizer profile',
                            '3% ticket commission',
                            'Instant publish: 200 Orbs'
                        ]" />

                    <PricingCard name="Basic" price="₦10,000" sub="/month" orb="1,000 Orbs" color="orange"
                        button="Choose Basic" :features="[
                            'Up to 5 published events/month',
                            'Instant publishing included',
                            'Standard analytics',
                            'Event editing',
                            'Organizer dashboard access',
                            '3% ticket commission'
                        ]" />

                    <PricingCard name="Growth" price="₦25,000" sub="/month" orb="2,500 Orbs" color="purple"
                        button="Choose Growth" badge="Most Popular" :features="[
                            'Up to 15 published events/month',
                            'Instant publishing included',
                            'Enhanced analytics',
                            'Attendee insights',
                            'Priority support',
                            '3% ticket commission'
                        ]" />

                    <PricingCard name="Pro" price="₦50,000" sub="/month" orb="5,000 Orbs" color="orange" button="Go Pro"
                        :features="[
                            'Unlimited events',
                            'Advanced analytics',
                            'Custom branding',
                            'Featured listing discounts',
                            'Faster payout queue',
                            'Premium support',
                            '3% ticket commission'
                        ]" />
                </div>
            </div>
        </section>

        <!-- EVENTORBS -->
        <section class="mt-8 w-full px-4 md:px-6 lg:px-8">
            <div
                class="mx-auto grid max-w-7xl gap-5 rounded-3xl border border-orange-500/30 bg-[#080808]/80 p-6 glow-orange lg:grid-cols-[1fr_3fr]">
                <div>
                    <h2 class="text-3xl font-black">
                        Powered by <span class="text-orange-500">EventOrbs</span>
                    </h2>
                    <p class="mt-3 text-gray-400">
                        EventOrbs are internal platform credits for publishing, boosts, subscriptions and future wallet
                        features.
                    </p>
                </div>

                <div class="grid gap-4 sm:grid-cols-4">
                    <OrbCard amount="1 Orb" value="₦10" />
                    <OrbCard amount="200 Orbs" value="₦2,000" />
                    <OrbCard amount="500 Orbs" value="₦5,000" />
                    <OrbCard amount="1,500 Orbs" value="₦15,000" />
                </div>
            </div>
        </section>

        <!-- TICKET SALES -->
        <section class="mt-8 w-full px-4 md:px-6 lg:px-8">
            <div
                class="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-purple-500/30 bg-[#080808]/80 p-6 glow-purple lg:grid-cols-[1fr_2fr]">
                <div>
                    <h2 class="text-3xl font-black">
                        Ticket sales made simple
                    </h2>
                    <p class="mt-3 text-gray-400">
                        You set the prices. We handle checkout, secure payment and payout.
                    </p>

                    <button class="mt-6 rounded-xl border border-purple-500/40 px-6 py-3 font-black text-purple-300">
                        How It Works →
                    </button>
                </div>

                <div class="grid gap-5 md:grid-cols-4">
                    <ProcessItem icon="users" title="Attendee Buys Ticket" />
                    <ProcessItem icon="wallet" title="EventOga Processes Payment" />
                    <ProcessItem icon="percent" title="3% Platform Commission" />
                    <ProcessItem icon="cash" title="You Get Paid" />
                </div>
            </div>
        </section>

        <!-- TRUST -->
        <section class="mt-8 w-full px-4 pb-16 md:px-6 lg:px-8">
            <div class="mx-auto rounded-3xl border border-orange-500/30 bg-[#090909]/80 p-6 glow-mix max-w-7xl">
                <h2 class="text-3xl font-black">
                    Built on trust, secured for growth
                </h2>

                <div class="mt-6 grid gap-4 md:grid-cols-5">
                    <TrustCard icon="shield" title="Organizer Approval" />
                    <TrustCard icon="wallet" title="Secure Payments" />
                    <TrustCard icon="bolt" title="Fraud Protection" />
                    <TrustCard icon="cash" title="Reliable Payouts" />
                    <TrustCard icon="users" title="Attendee Trust" />
                </div>
            </div>

            <div
                class="mx-auto mt-8 grid max-w-7xl items-center gap-6 overflow-hidden rounded-3xl border border-purple-500/30 bg-[#080808]/80 p-6 glow-purple lg:grid-cols-[1fr_1fr_auto]">
                <img src="../assets/partying.png" class="hidden h-40 rounded-2xl object-cover lg:block" />

                <div>
                    <h2 class="text-4xl font-black">
                        Ready to Grow <span class="text-orange-500">Your Events?</span>
                    </h2>
                    <p class="mt-3 text-gray-400">
                        Join organizers using EventOga to build unforgettable experiences.
                    </p>
                </div>

                <div class="flex flex-col gap-3">
                    <button class="rounded-xl bg-orange-500 px-7 py-4 font-black text-white glow-orange">
                        Become an Organizer →
                    </button>
                    <button class="rounded-xl border border-purple-500/40 px-7 py-4 font-black text-purple-300">
                        Talk to Sales →
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { h } from 'vue'
import organizerBg from '../assets/organizer-bg.png'

const iconClass = 'h-7 w-7 stroke-current'

const Icon = (type) => {
    const icons = {
        calendar: [h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2 }), h('path', { d: 'M16 3v4M8 3v4M3 11h18' })],
        users: [h('path', { d: 'M17 21v-2a4 4 0 00-3-3.87M7 21v-2a4 4 0 013-3.87' }), h('circle', { cx: 12, cy: 7, r: 4 })],
        ticket: [h('path', { d: 'M4 7a2 2 0 012-2h12a2 2 0 012 2v3a2 2 0 010 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 010-4V7z' })],
        rocket: [h('path', { d: 'M12 15l-3 3m3-3l3 3M12 15c4-2 6-6 7-12-6 1-10 3-12 7l-3 1 4 4 1-3z' })],
        bolt: [h('path', { d: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' })],
        wallet: [h('path', { d: 'M4 7h16v12H4z' }), h('path', { d: 'M16 12h4' })],
        percent: [h('path', { d: 'M19 5L5 19' }), h('circle', { cx: 7, cy: 7, r: 2 }), h('circle', { cx: 17, cy: 17, r: 2 })],
        shield: [h('path', { d: 'M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z' }), h('path', { d: 'M9 12l2 2 4-4' })],
        cash: [h('rect', { x: 3, y: 6, width: 18, height: 12, rx: 2 }), h('circle', { cx: 12, cy: 12, r: 3 })],
    }

    return h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, icons[type] || icons.ticket)
}

const MiniBadge = {
    props: ['icon', 'title'],
    setup(props) {
        return () => h('div', { class: 'flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4' }, [
            h('span', { class: 'text-purple-400' }, [Icon(props.icon)]),
            h('p', { class: 'text-sm font-bold' }, props.title),
        ])
    },
}

const StepCard = {
    props: ['number', 'title', 'text', 'icon'],
    setup(props) {
        return () => h('div', { class: 'rounded-3xl border border-white/10 bg-black/30 p-6' }, [
            h('span', { class: 'grid h-10 w-10 place-items-center rounded-full bg-purple-500/20 font-black text-purple-300' }, props.number),
            h('div', { class: 'mt-5 text-orange-500' }, [Icon(props.icon)]),
            h('h3', { class: 'mt-4 text-xl font-black' }, props.title),
            h('p', { class: 'mt-3 text-sm leading-6 text-gray-400' }, props.text),
        ])
    },
}

const FlowItem = {
    props: ['icon', 'title', 'sub'],
    setup(props) {
        return () => h('div', { class: 'text-center' }, [
            h('div', { class: 'mx-auto grid h-16 w-16 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300' }, [Icon(props.icon)]),
            h('p', { class: 'mt-3 text-sm font-bold' }, props.title),
            props.sub ? h('p', { class: 'text-xs text-orange-400' }, props.sub) : null,
        ])
    },
}

const PricingCard = {
    props: ['name', 'price', 'sub', 'orb', 'features', 'button', 'color', 'badge'],
    setup(props) {
        return () =>
            h('div', { class: `relative rounded-3xl border p-6 ${props.color === 'orange' ? 'border-orange-500/50 glow-orange' : 'border-purple-500/50 glow-purple'}` }, [
                props.badge ? h('span', { class: 'absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-5 py-2 text-xs font-black' }, props.badge) : null,
                h('h3', { class: props.color === 'orange' ? 'font-black text-orange-500' : 'font-black text-purple-400' }, props.name),
                h('div', { class: 'mt-4 flex items-end gap-1' }, [
                    h('span', { class: 'text-4xl font-black' }, props.price),
                    h('span', { class: 'text-gray-400' }, props.sub),
                ]),
                h('p', { class: 'mt-2 text-sm font-bold text-orange-400' }, props.orb),
                h('ul', { class: 'mt-6 space-y-3 text-sm text-gray-300' }, props.features.map(f => h('li', { class: 'flex gap-2' }, [
                    h('span', { class: props.color === 'orange' ? 'text-orange-500' : 'text-purple-400' }, '✓'),
                    f,
                ]))),
                h('button', { class: props.color === 'orange' ? 'mt-8 w-full rounded-xl bg-orange-500 py-3 font-black text-white' : 'mt-8 w-full rounded-xl border border-purple-500/40 py-3 font-black text-purple-300' }, props.button),
            ])
    },
}

const OrbCard = {
    props: ['amount', 'value'],
    setup(props) {
        return () => h('div', { class: 'rounded-2xl border border-white/10 bg-black/30 p-5 text-center' }, [
            h('div', { class: 'mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-orange-500/10 text-orange-500' }, '◉'),
            h('p', { class: 'font-black' }, props.amount),
            h('p', { class: 'mt-1 text-lg font-black' }, `= ${props.value}`),
        ])
    },
}

const ProcessItem = {
    props: ['icon', 'title'],
    setup(props) {
        return () => h('div', { class: 'text-center' }, [
            h('div', { class: 'mx-auto grid h-16 w-16 place-items-center rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300' }, [Icon(props.icon)]),
            h('p', { class: 'mt-4 text-sm font-black' }, props.title),
        ])
    },
}

const TrustCard = {
    props: ['icon', 'title'],
    setup(props) {
        return () => h('div', { class: 'rounded-2xl border border-white/10 bg-black/30 p-4 text-center' }, [
            h('div', { class: 'mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-purple-500/10 text-purple-300' }, [Icon(props.icon)]),
            h('p', { class: 'text-sm font-bold' }, props.title),
        ])
    },
}
</script>

<style scoped>
.ambient-bg {
    background:
        radial-gradient(circle at 12% 8%, rgba(255, 106, 0, 0.16), transparent 25%),
        radial-gradient(circle at 85% 12%, rgba(168, 85, 247, 0.2), transparent 30%),
        radial-gradient(circle at 50% 60%, rgba(255, 106, 0, 0.07), transparent 35%),
        #050505;
}

.glow-orange {
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.3), 0 0 45px rgba(255, 106, 0, 0.1);
}

.glow-purple {
    box-shadow: 0 0 18px rgba(168, 85, 247, 0.3), 0 0 45px rgba(168, 85, 247, 0.12);
}

.glow-purple-soft {
    box-shadow: 0 0 14px rgba(168, 85, 247, 0.22);
}

.glow-mix {
    box-shadow: 0 0 20px rgba(255, 106, 0, 0.22), 0 0 55px rgba(168, 85, 247, 0.18);
}
</style>