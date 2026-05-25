<template>
    <div class="min-h-screen bg-[#050505] p-4 text-white md:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 class="text-3xl font-black md:text-4xl">Create Event</h1>
                    <p class="mt-2 text-gray-400">Complete each step to publish your event.</p>
                </div>

                <div class="rounded-2xl border border-orange-500/25 bg-black/40 px-5 py-4">
                    <p class="text-sm text-gray-400">Completion</p>
                    <div class="mt-2 flex items-center gap-3">
                        <div class="h-2 w-40 rounded-full bg-white/10">
                            <div class="h-full rounded-full bg-orange-500 transition-all"
                                :style="{ width: `${completion}%` }"></div>
                        </div>
                        <span class="text-lg font-black text-orange-500">{{ completion }}%</span>
                    </div>
                </div>
            </div>

            <!-- Stepper -->
            <div class="mb-6 rounded-3xl border border-purple-500/25 bg-[#0b0b0b] p-4">
                <div class="grid gap-3 md:grid-cols-6">
                    <button v-for="(step, index) in steps" :key="step.key" type="button" @click="goToStep(index)"
                        class="rounded-2xl px-3 py-4 text-left transition"
                        :class="index === currentStep ? 'bg-orange-500 text-white glow-orange' : isStepComplete(step.key) ? 'bg-purple-500/15 text-purple-300' : 'bg-black/40 text-gray-500'">
                        <div class="flex items-center gap-3">
                            <span class="grid h-8 w-8 place-items-center rounded-full bg-black/30 text-sm font-black">
                                {{ isStepComplete(step.key) ? '✓' : index + 1 }}
                            </span>
                            <span class="text-sm font-black">{{ step.title }}</span>
                        </div>
                    </button>
                </div>
            </div>

            <div class="grid gap-6 xl:grid-cols-[1fr_360px]">
                <!-- Form -->
                <div v-if="submitError"
                    class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {{ submitError }}
                </div>

                <div v-if="submitSuccess"
                    class="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                    {{ submitSuccess }}
                </div>
                <div class="card min-h-[580px]">
                    <Transition name="fade-slide" mode="out-in">
                        <!-- Step 1 -->
                        <section v-if="currentStep === 0" key="basic">
                            <h2 class="section-title">Basic Information</h2>
                            <p class="section-subtitle">Tell people what your event is about.</p>

                            <div class="mt-6 grid gap-5 md:grid-cols-2">
                                <div class="md:col-span-2">
                                    <label class="label">Event Title</label>
                                    <input v-model="form.title" class="input"
                                        placeholder="e.g. Lagos Afrobeats Night" />
                                </div>

                                <div>
                                    <label class="label">Category</label>
                                    <select v-model="form.category_id" class="input">
                                        <option value="">
                                            {{ isLoadingCategories ? 'Loading categories...' : 'Select category' }}
                                        </option>

                                        <option v-for="category in categories" :key="category.id" :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label class="label">Event Type</label>
                                    <div class="grid grid-cols-2 gap-3">
                                        <button type="button" @click="form.event_type = 'free'"
                                            :class="toggleClass(form.event_type === 'free')">Free</button>
                                        <button type="button" @click="form.event_type = 'paid'"
                                            :class="toggleClass(form.event_type === 'paid')">Paid</button>
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label class="label">Event Format</label>
                                    <div class="grid gap-3 md:grid-cols-3">
                                        <button v-for="item in formats" :key="item.value" type="button"
                                            @click="form.event_format = item.value"
                                            :class="toggleClass(form.event_format === item.value)">
                                            {{ item.label }}
                                        </button>
                                    </div>
                                </div>

                                <div class="md:col-span-2">
                                    <label class="label">Short Description</label>
                                    <input v-model="form.short_description" class="input"
                                        placeholder="A short summary of the event" />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="label">Full Description</label>
                                    <textarea v-model="form.description" rows="6" class="input resize-none"
                                        placeholder="Tell people what to expect..."></textarea>
                                </div>
                            </div>
                        </section>

                        <!-- Step 2 -->
                        <section v-else-if="currentStep === 1" key="media">
                            <h2 class="section-title">Media</h2>
                            <p class="section-subtitle">Upload visuals that make your event stand out.</p>

                            <div class="mt-6 grid gap-5 md:grid-cols-2">
                                <label class="upload-box">
                                    <input type="file" accept="image/*" class="hidden"
                                        @change="handleFile($event, 'banner')" />
                                    <p class="text-4xl">🖼️</p>
                                    <h3 class="mt-3 font-black">Upload Banner</h3>
                                    <p class="mt-1 text-sm text-gray-400">Recommended: 1600 × 900</p>
                                    <img v-if="preview.banner" :src="preview.banner"
                                        class="mt-4 h-40 w-full rounded-xl object-cover" />
                                </label>

                                <label class="upload-box">
                                    <input type="file" accept="image/*" class="hidden"
                                        @change="handleFile($event, 'thumbnail')" />
                                    <p class="text-4xl">🎟️</p>
                                    <h3 class="mt-3 font-black">Upload Thumbnail</h3>
                                    <p class="mt-1 text-sm text-gray-400">Used on event cards</p>
                                    <img v-if="preview.thumbnail" :src="preview.thumbnail"
                                        class="mt-4 h-40 w-full rounded-xl object-cover" />
                                </label>
                            </div>
                        </section>

                        <!-- Step 3 -->
                        <section v-else-if="currentStep === 2" key="time">
                            <h2 class="section-title">Date & Time</h2>
                            <p class="section-subtitle">Set when your event starts and ends.</p>

                            <div class="mt-6 grid gap-5 md:grid-cols-3">
                                <div>
                                    <label class="label">Start Date & Time</label>
                                    <input v-model="form.starts_at" type="datetime-local" class="input" />
                                </div>

                                <div>
                                    <label class="label">End Date & Time</label>
                                    <input v-model="form.ends_at" type="datetime-local" class="input" />
                                </div>

                                <div>
                                    <label class="label">Timezone</label>
                                    <select v-model="form.timezone" class="input">
                                        <option value="Africa/Lagos">Africa/Lagos</option>
                                        <option value="UTC">UTC</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <!-- Step 4 -->
                        <section v-else-if="currentStep === 3" key="location">
                            <h2 class="section-title">Location / Access</h2>
                            <p class="section-subtitle">Add physical location, online access, or both.</p>

                            <div v-if="showPhysical" class="mt-6">
                                <h3 class="mb-4 font-black text-orange-500">Physical Location</h3>
                                <div class="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label class="label">Venue Name</label>
                                        <input v-model="form.venue_name" class="input"
                                            placeholder="Eko Convention Centre" />
                                    </div>
                                    <div>
                                        <label class="label">Address</label>
                                        <input v-model="form.address" class="input" placeholder="Street address" />
                                    </div>
                                    <div>
                                        <label class="label">City</label>
                                        <input v-model="form.city" class="input" placeholder="Lagos" />
                                    </div>
                                    <div>
                                        <label class="label">State</label>
                                        <input v-model="form.state" class="input" placeholder="Lagos" />
                                    </div>
                                </div>
                            </div>

                            <div v-if="showOnline" class="mt-8">
                                <h3 class="mb-4 font-black text-purple-400">Online Access</h3>
                                <div class="grid gap-5 md:grid-cols-3">
                                    <div>
                                        <label class="label">Online Platform</label>
                                        <input v-model="form.online_platform" class="input"
                                            placeholder="Zoom, Meet, YouTube" />
                                    </div>
                                    <div>
                                        <label class="label">Online Link</label>
                                        <input v-model="form.online_link" class="input" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label class="label">Access Code</label>
                                        <input v-model="form.online_access_code" class="input" placeholder="Optional" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Step 5 -->
                        <section v-else-if="currentStep === 4" key="tickets">
                            <div class="flex items-center justify-between gap-4">
                                <div>
                                    <h2 class="section-title">Tickets</h2>
                                    <p class="section-subtitle">Set ticket types, quantity and EventOrb pricing.</p>
                                </div>

                                <button v-if="form.event_type === 'paid' && tickets.length < 3" type="button"
                                    @click="addTicket"
                                    class="rounded-xl border border-orange-500/40 px-4 py-2 text-sm font-bold text-orange-400">
                                    + Add Ticket
                                </button>
                            </div>

                            <div class="mt-6 space-y-4">
                                <div v-for="(ticket, index) in tickets" :key="index"
                                    class="rounded-2xl border border-white/10 bg-black/30 p-4">
                                    <div class="grid gap-4 md:grid-cols-4">
                                        <div>
                                            <label class="label">Ticket Name</label>
                                            <input v-model="ticket.name" class="input" placeholder="Regular" />
                                        </div>
                                        <div>
                                            <label class="label">Price Orbs</label>
                                            <input v-model.number="ticket.price_orbs"
                                                :disabled="form.event_type === 'free'" type="number" class="input" />
                                        </div>
                                        <div>
                                            <label class="label">Quantity</label>
                                            <input v-model.number="ticket.quantity" type="number" class="input" />
                                        </div>
                                        <div>
                                            <label class="label">Max Per Order</label>
                                            <input v-model.number="ticket.max_per_order" type="number" class="input" />
                                        </div>
                                    </div>

                                    <button v-if="tickets.length > 1" type="button" @click="removeTicket(index)"
                                        class="mt-3 text-sm font-bold text-red-400">
                                        Remove Ticket
                                    </button>
                                </div>
                            </div>
                        </section>

                        <!-- Step 6 -->
                        <section v-else key="publish">
                            <h2 class="section-title">Publishing Options</h2>
                            <p class="section-subtitle">Choose how your event should go live.</p>

                            <div class="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label class="label">Visibility</label>
                                    <select v-model="form.visibility" class="input">
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="invite_only">Invite Only</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="label">Publish Mode</label>
                                    <select v-model="form.publish_mode" class="input">
                                        <option value="waitlist">Waitlist</option>
                                        <option value="instant">Instant Publish</option>
                                    </select>
                                </div>
                            </div>

                            <div v-if="form.publish_mode === 'waitlist'"
                                class="mt-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
                                <h3 class="font-black text-purple-300">Waitlist Publishing</h3>
                                <p class="mt-2 text-sm text-gray-300">
                                    Your free event becomes public when 10 verified attendees join the waitlist.
                                </p>
                            </div>

                            <div v-if="form.publish_mode === 'instant'"
                                class="mt-5 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
                                <h3 class="font-black text-orange-400">Instant Publish</h3>
                                <p class="mt-2 text-sm text-gray-300">
                                    Publish immediately using 200 EventOrbs, subject to organizer approval.
                                </p>
                            </div>

                            <div class="mt-5 grid gap-4 md:grid-cols-2">
                                <label class="flex items-center gap-3 rounded-xl bg-black/30 p-4">
                                    <input v-model="form.allow_reviews" type="checkbox" />
                                    <span>Allow Reviews</span>
                                </label>

                                <label class="flex items-center gap-3 rounded-xl bg-black/30 p-4">
                                    <input v-model="form.allow_refunds" type="checkbox" />
                                    <span>Allow Refunds</span>
                                </label>
                            </div>
                        </section>
                    </Transition>

                    <!-- Navigation -->
                    <div class="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                        <button type="button" @click="prevStep" :disabled="currentStep === 0"
                            class="rounded-xl border border-white/10 px-5 py-3 font-bold text-gray-300 disabled:cursor-not-allowed disabled:opacity-40">
                            Back
                        </button>

                        <button v-if="currentStep < steps.length - 1" type="button" @click="nextStep"
                            class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange">
                            Continue
                        </button>

                        <button v-else type="button" @click="submitEvent" :disabled="isSubmitting"
                            class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white glow-orange disabled:cursor-not-allowed disabled:opacity-60">
                            {{ isSubmitting ? 'Creating Event...' : 'Create Event' }}
                        </button>
                    </div>
                </div>

                <!-- Preview -->
                <aside class="xl:sticky xl:top-6 xl:h-fit">
                    <div
                        class="rounded-3xl border border-purple-500/25 bg-[#0b0b0b]/90 p-5 shadow-[0_0_40px_rgba(168,85,247,0.16)]">
                        <h2 class="font-black text-orange-500">Live Preview</h2>

                        <div class="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                            <div
                                class="grid h-44 place-items-center bg-gradient-to-br from-orange-500/20 to-purple-500/20 text-gray-400">
                                <img v-if="preview.banner" :src="preview.banner" class="h-full w-full object-cover" />
                                <span v-else>Event Banner</span>
                            </div>

                            <div class="p-5">
                                <span class="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-400">
                                    {{ form.event_type }}
                                </span>

                                <h3 class="mt-4 text-2xl font-black">
                                    {{ form.title || 'Your Event Title' }}
                                </h3>

                                <p class="mt-2 text-sm text-gray-400">
                                    {{ form.short_description || 'Short event description appears here.' }}
                                </p>

                                <div class="mt-5 space-y-2 text-sm text-gray-300">
                                    <p>📍 {{ locationPreview }}</p>
                                    <p>📅 {{ form.starts_at || 'Start date not set' }}</p>
                                    <p>🎟️ {{ tickets.length }} ticket type(s)</p>
                                    <p>🚀 {{ form.publish_mode }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-5 rounded-2xl bg-black/30 p-4">
                            <p class="text-sm text-gray-400">Current Step</p>
                            <h3 class="mt-1 font-black">{{ steps[currentStep].title }}</h3>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { categoryService } from '@/services/categoryService'
import { eventService } from '@/services/eventService'

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')

const categories = ref([])
const isLoadingCategories = ref(false)

onMounted(async () => {
    try {
        isLoadingCategories.value = true
        categories.value = await categoryService.getCategories()
    } finally {
        isLoadingCategories.value = false
    }
})

const currentStep = ref(0)

const steps = [
    { key: 'basic', title: 'Basic' },
    { key: 'media', title: 'Media' },
    { key: 'time', title: 'Time' },
    { key: 'location', title: 'Location' },
    { key: 'tickets', title: 'Tickets' },
    { key: 'publish', title: 'Publish' },
]

const formats = [
    { label: 'Physical', value: 'physical' },
    { label: 'Online', value: 'online' },
    { label: 'Hybrid', value: 'hybrid' },
]

const form = reactive({
    title: '',
    short_description: '',
    description: '',
    category_id: '',
    event_type: 'free',
    event_format: 'physical',
    banner: null,
    thumbnail: null,
    venue_name: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    online_platform: '',
    online_link: '',
    online_access_code: '',
    starts_at: '',
    ends_at: '',
    timezone: 'Africa/Lagos',
    visibility: 'public',
    publish_mode: 'waitlist',
    waitlist_threshold: 10,
    instant_publish_cost_orbs: 200,
    allow_reviews: true,
    allow_refunds: false,
})

const preview = reactive({
    banner: null,
    thumbnail: null,
})

const tickets = reactive([
    {
        name: 'General Admission',
        description: '',
        price_orbs: 0,
        quantity: 100,
        min_per_order: 1,
        max_per_order: 10,
    },
])

const showPhysical = computed(() => ['physical', 'hybrid'].includes(form.event_format))
const showOnline = computed(() => ['online', 'hybrid'].includes(form.event_format))

const completion = computed(() => {
    const checks = [
        !!form.title,
        !!form.category_id,
        !!form.short_description,
        !!form.starts_at,
        showPhysical.value ? !!form.venue_name && !!form.city : true,
        showOnline.value ? !!form.online_platform && !!form.online_link : true,
        tickets.every((ticket) => ticket.name && ticket.quantity > 0),
        !!form.visibility,
        !!form.publish_mode,
    ]

    const done = checks.filter(Boolean).length
    return Math.round((done / checks.length) * 100)
})

const locationPreview = computed(() => {
    if (form.event_format === 'online') return form.online_platform || 'Online'
    if (form.event_format === 'hybrid') {
        return [form.venue_name, form.city].filter(Boolean).join(', ') || 'Hybrid location not set'
    }
    return [form.venue_name, form.city, form.state].filter(Boolean).join(', ') || 'Location not set'
})

const isStepComplete = (key) => {
    const map = {
        basic: !!form.title && !!form.category_id && !!form.short_description,
        media: !!form.banner || !!form.thumbnail,
        time: !!form.starts_at,
        location:
            (showPhysical.value ? !!form.venue_name && !!form.city : true) &&
            (showOnline.value ? !!form.online_platform && !!form.online_link : true),
        tickets: tickets.every((ticket) => ticket.name && ticket.quantity > 0),
        publish: !!form.visibility && !!form.publish_mode,
    }

    return map[key]
}

const goToStep = (index) => {
    currentStep.value = index
}

const nextStep = () => {
    if (currentStep.value < steps.length - 1) currentStep.value++
}

const prevStep = () => {
    if (currentStep.value > 0) currentStep.value--
}

watch(
    () => form.event_type,
    (type) => {
        if (type === 'free') {
            tickets.splice(0, tickets.length, {
                name: 'General Admission',
                description: '',
                price_orbs: 0,
                quantity: 100,
                min_per_order: 1,
                max_per_order: 10,
            })

            form.publish_mode = 'waitlist'
        }
    }
)

const toggleClass = (active) => {
    return [
        'rounded-xl px-4 py-3 font-bold transition',
        active
            ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]'
            : 'border border-white/10 bg-black/40 text-gray-400 hover:text-white',
    ]
}

const handleFile = (event, field) => {
    const file = event.target.files?.[0]
    if (!file) return

    form[field] = file
    preview[field] = URL.createObjectURL(file)
}

const addTicket = () => {
    tickets.push({
        name: '',
        description: '',
        price_orbs: 0,
        quantity: 100,
        min_per_order: 1,
        max_per_order: 10,
    })
}

const removeTicket = (index) => {
    tickets.splice(index, 1)
}

const submitEvent = async () => {
    try {
        isSubmitting.value = true
        submitError.value = ''
        submitSuccess.value = ''

        const formData = new FormData()

        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                if (typeof value === 'boolean') {
                    formData.append(key, value ? 1 : 0)
                } else {
                    formData.append(key, value)
                }
            }
        })

        tickets.forEach((ticket, index) => {
            Object.entries(ticket).forEach(([key, value]) => {
                formData.append(`tickets[${index}][${key}]`, value ?? '')
            })
        })

        const response = await eventService.createEvent(formData)

        submitSuccess.value = response.message || 'Event created successfully'

        console.log('EVENT CREATED:', response.data)
    } catch (error) {
        submitError.value =
            error.response?.data?.message ||
            Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
            'Unable to create event'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
.card {
    border: 1px solid rgba(168, 85, 247, 0.22);
    background:
        radial-gradient(circle at top right, rgba(249, 115, 22, 0.08), transparent 35%),
        #0b0b0b;
    border-radius: 1.5rem;
    padding: 1.25rem;
    box-shadow: 0 0 28px rgba(168, 85, 247, 0.08);
}

.section-title {
    font-size: 1.5rem;
    font-weight: 900;
}

.section-subtitle {
    margin-top: 0.35rem;
    color: #9ca3af;
}

.label {
    margin-bottom: 0.5rem;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    color: #d1d5db;
}

.input {
    width: 100%;
    border-radius: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.45);
    padding: 0.85rem 1rem;
    color: white;
    outline: none;
}

.input:focus {
    border-color: rgba(249, 115, 22, 0.75);
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
}

.upload-box {
    cursor: pointer;
    border: 1px dashed rgba(249, 115, 22, 0.35);
    border-radius: 1.25rem;
    background: rgba(0, 0, 0, 0.25);
    padding: 2rem;
    text-align: center;
}

.glow-orange {
    box-shadow: 0 0 22px rgba(249, 115, 22, 0.32);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.25s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(14px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-14px);
}
</style>