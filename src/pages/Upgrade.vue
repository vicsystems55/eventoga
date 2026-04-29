<template>
  <main class="ambient-checkout min-h-screen text-white">
    <!-- Topbar -->
    <nav class="border-b border-white/10 px-4 py-5 md:px-8">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <router-link to="/" class="text-2xl font-black">
          Event<span class="text-orange-500">Oga</span>
        </router-link>

        <p class="text-sm text-gray-400">🔒 Secure Checkout</p>
      </div>
    </nav>

    <section class="px-4 py-10 md:px-8">
      <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <!-- Left -->
        <div>
          <router-link to="/for-organizers" class="text-purple-300 hover:text-orange-500">
            ← Back to Pricing
          </router-link>

          <div class="mt-8 grid items-center gap-8 md:grid-cols-[1fr_320px]">
            <div>
              <h1 class="text-4xl font-black md:text-6xl">
                Upgrade to
                <span class="text-orange-500">{{ plan.name }}</span>
              </h1>

              <p class="mt-4 max-w-2xl text-lg text-gray-300">
                {{ plan.description }}
              </p>

              <div
                v-if="plan.trial"
                class="mt-6 inline-flex rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 font-bold text-green-400"
              >
                🛡️ {{ plan.trial }} · Cancel anytime
              </div>
            </div>

            <img
              src="../assets/crown.png"
              alt="Premium crown"
              class="hidden w-full drop-shadow-[0_20px_70px_rgba(255,106,0,0.35)] md:block"
            />
          </div>

          <!-- Features + Form Card -->
          <div class="mt-8 rounded-3xl border border-purple-500/25 bg-[#080808]/80 p-6 glow-panel md:p-8">
            <h2 class="text-xl font-black">What you’ll get</h2>

            <div class="mt-6 grid gap-5 md:grid-cols-2">
              <div
                v-for="feature in plan.features"
                :key="feature"
                class="flex gap-4 rounded-2xl bg-black/30 p-4"
              >
                <div class="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
                  ✓
                </div>

                <div>
                  <h3 class="font-bold">{{ feature }}</h3>
                  <p class="mt-1 text-sm text-gray-400">Included in your selected package.</p>
                </div>
              </div>
            </div>

            <div class="my-8 border-t border-white/10"></div>

            <h2 class="text-xl font-black">Your Information</h2>
            <p class="mt-2 text-gray-400">
              We’ll use this to set up your account and subscription.
            </p>

            <div class="mt-6 grid gap-4 md:grid-cols-2">
              <input v-model="form.name" placeholder="Full Name" class="input-field" />
              <input v-model="form.email" placeholder="Email Address" class="input-field" />
              <input v-model="form.phone" placeholder="Phone Number" class="input-field md:col-span-2" />
              <input v-model="form.organization" placeholder="Organization / Company (optional)" class="input-field md:col-span-2" />
            </div>
          </div>
        </div>

        <!-- Right -->
        <aside class="lg:sticky lg:top-8 h-fit">
          <div class="rounded-3xl border border-purple-500/50 bg-[#080808]/90 p-6 glow-mix md:p-8">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-black">Order Summary</h2>
              <span class="rounded-xl border border-orange-500/50 px-4 py-2 font-black text-orange-500">
                {{ plan.name }} Plan
              </span>
            </div>

            <div class="mt-8 space-y-5">
              <div class="flex justify-between gap-4">
                <span class="text-gray-300">{{ plan.name }} Plan</span>
                <span class="font-black">₦{{ formattedPrice }}/month</span>
              </div>

              <div v-if="plan.trial" class="flex justify-between gap-4 text-green-400">
                <span>Trial Period</span>
                <span>{{ trialDays }} days free</span>
              </div>

              <hr class="border-white/10" />

              <div class="flex items-end justify-between gap-4">
                <div>
                  <p class="text-xl font-black text-purple-300">Due Today</p>
                  <p class="mt-2 text-sm text-gray-400">
                    You won’t be charged until your trial ends.
                  </p>
                </div>

                <span class="text-5xl font-black text-purple-400">₦0</span>
              </div>

              <div class="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                <h3 class="font-black text-green-400">You can cancel anytime</h3>
                <p class="mt-2 text-sm leading-6 text-gray-300">
                  No commitment. Cancel before the trial ends to avoid any charges.
                </p>
              </div>

              <button
                @click="payWithPaystack"
                class="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-5 text-lg font-black text-white glow-orange transition hover:scale-[1.02]"
              >
                🔒 Start My {{ trialDays }}-Day Free Trial →
              </button>

              <p class="text-center text-sm text-gray-400">
                After trial, ₦{{ formattedPrice }} / month
              </p>

              <div class="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p class="text-sm text-gray-400">We accept</p>

                <div class="mt-4 grid grid-cols-4 gap-3 text-center text-sm font-black">
                  <span class="rounded-xl bg-white/10 py-3">VISA</span>
                  <span class="rounded-xl bg-white/10 py-3">MC</span>
                  <span class="rounded-xl bg-white/10 py-3">Verve</span>
                  <span class="rounded-xl bg-white/10 py-3">Pay</span>
                </div>

                <p class="mt-5 text-center text-sm text-gray-400">
                  🔒 Secured by <span class="font-black text-white">Paystack</span>
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 grid gap-4 text-sm text-gray-300 sm:grid-cols-3 lg:grid-cols-1">
            <div class="flex gap-3">
              <span class="text-orange-500">▣</span>
              <div>
                <b>Secure payment</b>
                <p class="text-gray-500">Encrypted & safe</p>
              </div>
            </div>

            <div class="flex gap-3">
              <span class="text-blue-400">⇩</span>
              <div>
                <b>Instant activation</b>
                <p class="text-gray-500">Get started right away</p>
              </div>
            </div>

            <div class="flex gap-3">
              <span class="text-green-400">☊</span>
              <div>
                <b>24/7 Support</b>
                <p class="text-gray-500">We’re here to help</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import crown from '../assets/crown.png'
import PaystackPop from '@paystack/inline-js'

const route = useRoute()
const trialDays = 30

const form = reactive({
  name: '',
  email: '',
  phone: '',
  organization: '',
})

const plans = [
  {
    slug: 'starter',
    name: 'Starter',
    monthly: 0,
    description: 'Perfect for trying out EventOga and hosting small events.',
    features: [
      'Up to 3 events per month',
      'Standard event listing',
      'Basic event page',
      'Limited visibility',
      'No analytics',
      'Email support',
    ],
  },
  {
    slug: 'basic',
    name: 'Basic',
    monthly: 5000,
    trial: '30-day free trial',
    description: 'Everything you need to grow your events and audience.',
    features: [
      'Unlimited events',
      'Standard event listing',
      'Basic analytics',
      'Discount & promo tools',
      'Email support',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    monthly: 15000,
    trial: '30-day free trial',
    description: 'Advanced tools to boost visibility and maximize ticket sales.',
    features: [
      'Priority Listing',
      'Featured Events',
      'Advanced Analytics',
      'Audience Insights',
      'Custom Branding',
      'Early Access Tickets',
      'Priority Support',
    ],
  },
  {
    slug: 'elite',
    name: 'Elite',
    monthly: 50000,
    description: 'For large organizers and agencies.',
    features: [
      'Dedicated manager',
      'Team accounts',
      'Ad credits included',
      'Custom integrations',
    ],
  },
]

const plan = computed(() => {
  const selectedPlan = route.query.plan || 'pro'
  return plans.find((item) => item.slug === selectedPlan) || plans[2]
})

const formattedPrice = computed(() => {
  return plan.value.monthly.toLocaleString()
})

const payWithPaystack = () => {
  if (!form.email || !form.name || !form.phone) {
    alert('Please fill in your name, email and phone number')
    return
  }

  const paystack = new PaystackPop()

  paystack.newTransaction({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: form.email,
    amount: 100 * 100, // ₦100 card authorization / test charge
    currency: 'NGN',
    metadata: {
      plan: plan.value.slug,
      name: form.name,
      phone: form.phone,
      organization: form.organization,
    },
    onSuccess: async (transaction) => {
      console.log(transaction.reference)

      // Send reference to Laravel for verification
      await fetch('http://localhost:8000/api/subscriptions/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          reference: transaction.reference,
          plan: plan.value.slug,
          user: form,
        }),
      })

      alert('Subscription started successfully')
    },
    onCancel: () => {
      alert('Payment cancelled')
    },
  })
}

</script>

<style scoped>
.ambient-checkout {
  background:
    radial-gradient(circle at 15% 20%, rgba(168, 85, 247, 0.18), transparent 28%),
    radial-gradient(circle at 85% 25%, rgba(255, 106, 0, 0.16), transparent 26%),
    radial-gradient(circle at 55% 85%, rgba(168, 85, 247, 0.12), transparent 28%),
    #050505;
}

.input-field {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(168, 85, 247, 0.35);
  background: rgba(0, 0, 0, 0.35);
  padding: 1rem 1.25rem;
  color: white;
  outline: none;
}

.input-field:focus {
  border-color: rgba(255, 106, 0, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.12);
}

.glow-orange {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.35), 0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-mix {
  box-shadow: 0 0 25px rgba(255, 106, 0, 0.2), 0 0 65px rgba(168, 85, 247, 0.24);
}

.glow-panel {
  box-shadow: 0 0 22px rgba(168, 85, 247, 0.14);
}
</style>