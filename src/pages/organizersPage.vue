<template>
    <main class="ambient-bg min-h-screen text-white">
        <!-- Hero -->
        <section class="w-full px-4 py-16 md:px-6 lg:px-8">
            <div class="mx-auto max-w-7xl text-center">
                <h1 class="text-5xl font-black md:text-7xl">
                    For <span
                        class="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Organizers</span>
                </h1>

                <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                    Everything you need to create, manage and grow unforgettable events.
                </p>

                <div class="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
                    <div v-for="item in benefits" :key="item.title" class="flex items-center gap-4 text-left">
                        <div class="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/10 text-orange-500">
                            <component :is="item.icon" />
                        </div>
                        <div>
                            <h3 class="font-black">{{ item.title }}</h3>
                            <p class="text-sm text-gray-400">{{ item.text }}</p>
                        </div>
                    </div>
                </div>

                <!-- Billing Toggle -->
                <div
                    class="mx-auto mt-10 flex w-fit items-center rounded-2xl border border-purple-500/40 bg-black/40 p-1">
                    <button @click="billing = 'yearly'"
                        class="rounded-xl px-8 py-3 text-sm font-bold transition-all duration-300"
                        :class="billing === 'yearly' ? 'bg-purple-600 text-white glow-purple scale-105' : 'text-gray-400'">
                        Yearly
                    </button>

                    <button @click="billing = 'monthly'"
                        class="rounded-xl px-8 py-3 text-sm font-bold transition-all duration-300"
                        :class="billing === 'monthly' ? 'bg-orange-500 text-white glow-orange scale-105' : 'text-gray-400'">
                        Monthly
                    </button>

                    <span class="ml-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">
                        Save 30%
                    </span>
                </div>
            </div>
        </section>

        <!-- Pricing Cards -->
        <section class="w-full px-4 pb-10 md:px-6 lg:px-8">
            <div class="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div v-for="plan in computedPlans" :key="plan.name"
                    class="relative rounded-3xl border bg-[#080808]/90 p-7 transition hover:-translate-y-2" :class="plan.popular
                        ? 'border-orange-500/70 glow-mix'
                        : plan.color === 'orange'
                            ? 'border-orange-500/35 hover:shadow-[0_0_35px_rgba(255,106,0,0.2)]'
                            : 'border-purple-500/35 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]'">
                    <span v-if="plan.popular"
                        class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-5 py-2 text-xs font-black text-white">
                        MOST POPULAR
                    </span>

                    <div class="mb-5 grid h-16 w-16 place-items-center rounded-2xl"
                        :class="plan.color === 'orange' ? 'bg-orange-500/15 text-orange-500' : 'bg-purple-500/15 text-purple-400'">
                        <component :is="plan.icon" />
                    </div>

                    <Transition name="price-fade" mode="out-in">
                        <div :key="billing + plan.name" class="mt-4">
                            <span class="text-4xl font-black">{{ plan.displayPrice }}</span>
                            <span v-if="plan.period" class="text-gray-400">{{ plan.period }}</span>
                        </div>
                    </Transition>

                    <p class="mt-4 min-h-[56px] leading-7 text-gray-300">
                        {{ plan.description }}
                    </p>

                    <p v-if="plan.trial"
                        class="mt-4 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-xs font-black text-green-400">
                        {{ plan.trial }}
                    </p>

                    <div class="my-6 border-t border-white/10"></div>

                    <ul class="space-y-3">
                        <li v-for="feature in plan.features" :key="feature" class="flex gap-3 text-sm">
                            <svg class="mt-0.5 h-5 w-5 flex-shrink-0"
                                :class="plan.color === 'orange' ? 'stroke-orange-500' : 'stroke-purple-400'" fill="none"
                                stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                            {{ feature }}
                        </li>
                    </ul>

                    <router-link :to="{
                        name: 'Upgrade',
                        query: { plan: plan.name.toLowerCase() }
                    }">
                        <button class="mt-10 w-full rounded-xl border px-5 py-4 font-black transition hover:scale-105"
                            :class="plan.popular
                                ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-pink-600 text-white glow-orange'
                                : plan.color === 'orange'
                                    ? 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black'
                                    : 'border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-black'">
                            {{ plan.cta }}
                        </button>
                    </router-link>

                    <p v-if="plan.note" class="mt-4 text-center text-xs text-gray-500">
                        {{ plan.note }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Trust Features -->
        <section class="w-full px-4 py-8 md:px-6 lg:px-8">
            <div
                class="mx-auto grid max-w-7xl gap-4 rounded-3xl border border-white/10 bg-[#080808]/80 p-6 glow-panel md:grid-cols-4">
                <div v-for="trust in trustItems" :key="trust.title" class="flex items-center gap-4">
                    <div class="grid h-14 w-14 place-items-center rounded-2xl"
                        :class="trust.color === 'orange' ? 'bg-orange-500/10 text-orange-500' : 'bg-purple-500/10 text-purple-400'">
                        <component :is="trust.icon" />
                    </div>

                    <div>
                        <h3 class="font-black">{{ trust.title }}</h3>
                        <p class="text-sm text-gray-400">{{ trust.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="w-full px-4 pb-16 pt-4 md:px-6 lg:px-8">
            <div
                class="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-orange-500/40 bg-gradient-to-r from-purple-900/40 to-orange-900/40 p-8 glow-mix md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-2xl font-black">Ready to host amazing events?</h2>
                    <p class="mt-2 text-gray-300">
                        Join thousands of organizers growing their audience with EventOga.
                    </p>
                </div>

                <div class="flex flex-wrap gap-4">
                    <button class="rounded-xl border border-white/20 px-8 py-4 font-bold text-white hover:bg-white/10">
                        Learn More
                    </button>
                    <button
                        class="rounded-xl bg-orange-500 px-8 py-4 font-black text-white glow-orange hover:bg-orange-600">
                        Create Your First Event →
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>

import { computed, h, ref } from 'vue'

const computedPlans = computed(() => {
    return plans.map((plan) => {
        const monthlyPrice =
            billing.value === 'yearly'
                ? plan.monthly * 0.7
                : plan.monthly

        return {
            ...plan,
            displayPrice:
                plan.name === 'Starter'
                    ? '₦0'
                    : plan.name === 'Elite / Agency'
                        ? '₦50,000+'
                        : `₦${Math.round(monthlyPrice).toLocaleString()}`,

            period:
                plan.name === 'Starter'
                    ? ''
                    : '/month',

            note:
                billing.value === 'yearly' && plan.monthly
                    ? `₦${Math.round(monthlyPrice * 12).toLocaleString()} billed yearly · Save 30%`
                    : '',
            cta:
                plan.trial
                    ? `Start ${plan.trial}`
                    : plan.cta,
        }
    })
})

const billing = ref('yearly')
const iconClass = 'h-8 w-8 stroke-current'

const LightningIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M13 2L4 14h7l-1 8 10-13h-7l1-7z' }),
])

const ChartIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-9' }),
])

const ShieldIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z' }),
    h('path', { d: 'M9 12l2 2 4-4' }),
])

const RocketIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 2C8 4 5 8 4 14l6-1 1 6c6-1 10-4 12-8l-6-1-1-6-4-2z' }),
])

const CrownIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 17l2-9 5 5 5-8 2 12H4z' }),
    h('path', { d: 'M4 20h16' }),
])

const StarIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.2 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3z' }),
])

const BriefcaseIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('rect', { x: 3, y: 7, width: 18, height: 13, rx: 2 }),
    h('path', { d: 'M9 7V5h6v2M3 12h18' }),
])

const WalletIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 7h16v12H4z' }),
    h('path', { d: 'M16 12h4' }),
])

const HeadsetIcon = () => h('svg', { class: iconClass, fill: 'none', strokeWidth: 2, viewBox: '0 0 24 24' }, [
    h('path', { d: 'M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-2v-6h4M4 13v4a2 2 0 002 2h2v-6H4' }),
])

const benefits = [
    { title: 'More visibility', text: 'Get discovered by the right audience', icon: LightningIcon },
    { title: 'Powerful analytics', text: 'Track sales and audience insights', icon: ChartIcon },
    { title: 'Secure & reliable', text: 'Safe payments and trusted platform', icon: ShieldIcon },
]

const plans = [
    {
        name: 'Starter',
        monthly: 0,
        yearly: 0,
        description: 'Perfect for trying out EventOga and hosting small events.',
        features: [
            'Up to 3 events per month',
            'Standard event listing',
            'Basic event page',
            'Limited visibility',
            'No analytics',
            'Email support',
        ],
        cta: 'Get Started Free',
        color: 'purple',
        icon: RocketIcon,
    },
    {
        name: 'Basic',
        monthly: 5000,
        yearly: 5000 * 12,
        description: 'Everything you need to grow your events and audience.',
        trial: '30-day free trial',
        features: [
            'Unlimited events',
            'Standard event listing',
            'Basic analytics',
            'Discount & promo tools',
            'Email support',
        ],
        cta: 'Choose Basic',
        color: 'orange',
        icon: CrownIcon,
    },
    {
        name: 'Pro',
        monthly: 15000,
        yearly: 15000 * 12,
        trial: '30-day free trial',
        description: 'Advanced tools to boost visibility and maximize ticket sales.',
        features: [
            'Everything in Basic',
            'Priority listing',
            'Featured events',
            'Advanced analytics',
            'Audience insights',
            'Custom branding',
            'Early access tickets',
            'Priority support',
        ],
        cta: 'Choose Pro',
        color: 'purple',
        popular: true,
        icon: StarIcon,
    },
    {
        name: 'Elite / Agency',
        monthly: 50000,
        yearly: 50000 * 12,
        description: 'For large organizers and agencies.',
        features: [
            'Everything in Pro',
            'Dedicated manager',
            'Team accounts',
            'Ad credits included',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
        color: 'orange',
        icon: BriefcaseIcon,
    },
]

const trustItems = [
    { title: 'Secure Payments', text: 'Safe & encrypted transactions', color: 'purple', icon: ShieldIcon },
    { title: '24/7 Support', text: 'We’re here whenever you need us', color: 'orange', icon: HeadsetIcon },
    { title: 'Easy Payouts', text: 'Get paid quickly & reliably', color: 'purple', icon: WalletIcon },
    { title: 'Trusted Platform', text: 'Thousands of successful events', color: 'orange', icon: StarIcon },
]
</script>

<style scoped>
.ambient-bg {
    background:
        radial-gradient(circle at 10% 20%, rgba(255, 106, 0, 0.15), transparent 24%),
        radial-gradient(circle at 90% 30%, rgba(168, 85, 247, 0.18), transparent 28%),
        radial-gradient(circle at 50% 95%, rgba(255, 106, 0, 0.1), transparent 30%),
        #050505;
}

.glow-orange {
    box-shadow: 0 0 18px rgba(255, 106, 0, 0.35), 0 0 45px rgba(255, 106, 0, 0.12);
}

.glow-purple {
    box-shadow: 0 0 18px rgba(168, 85, 247, 0.35), 0 0 45px rgba(168, 85, 247, 0.14);
}

.glow-mix {
    box-shadow: 0 0 20px rgba(255, 106, 0, 0.25), 0 0 55px rgba(168, 85, 247, 0.2);
}

.glow-panel {
    box-shadow: 0 0 22px rgba(168, 85, 247, 0.12);
}

.price-fade-enter-active,
.price-fade-leave-active {
    transition: all 0.25s ease;
}

.price-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.price-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>