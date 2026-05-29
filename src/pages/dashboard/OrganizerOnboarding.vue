<template>
  <div class="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6">
    <div class="mx-auto max-w-5xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-black md:text-5xl">
          Organizer <span class="text-orange-500">Onboarding</span>
        </h1>
        <p class="mt-3 text-gray-400">
          Tell us about your brand so we can help you reach the right audience.
        </p>
      </div>

      <div v-if="errorMessage" class="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
        {{ successMessage }}
      </div>

      <form @submit.prevent="submitProfile" class="rounded-3xl border border-purple-500/25 bg-[#0b0b0b] p-5 shadow-[0_0_40px_rgba(168,85,247,0.12)] md:p-8">
        <!-- Business Info -->
        <section>
          <h2 class="section-title">Business Information</h2>

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label class="label">Business / Organizer Name</label>
              <input v-model="form.business_name" class="input" required placeholder="e.g. Lagos Nightlife Hub" />
            </div>

            <div>
              <label class="label">Tagline</label>
              <input v-model="form.tagline" class="input" placeholder="Premium events and experiences" />
            </div>

            <div class="md:col-span-2">
              <label class="label">Bio / Description</label>
              <textarea v-model="form.bio" rows="4" class="input resize-none" placeholder="Tell attendees about your brand..."></textarea>
            </div>
          </div>
        </section>

        <!-- Event Preferences -->
        <section class="mt-8">
          <h2 class="section-title">Event Preferences</h2>

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label class="label">Event Categories</label>
              <div class="grid gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 sm:grid-cols-2">
                <label v-for="category in categories" :key="category.id" class="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" :value="category.slug" v-model="form.event_categories" />
                  {{ category.name }}
                </label>
              </div>
            </div>

            <div>
              <label class="label">Preferred Event Format</label>
              <select v-model="form.preferred_event_format" class="input" required>
                <option value="physical">Physical</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
                <option value="no_preference">No Preference</option>
              </select>

              <label class="label mt-5">Event Frequency</label>
              <select v-model="form.event_frequency" class="input">
                <option value="">Select frequency</option>
                <option v-for="item in options.event_frequencies" :key="item.value" :value="item.value">
                  {{ item.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">Target Audience</label>
              <input v-model="form.target_audience" class="input" placeholder="Students, professionals, creatives..." />
            </div>

            <div>
              <label class="label">Organizer Goal</label>
              <select v-model="form.organizer_goal" class="input">
                <option value="">Select goal</option>
                <option v-for="item in options.organizer_goals" :key="item.value" :value="item.value">
                  {{ item.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">Average Ticket Price in Orbs</label>
              <input v-model.number="form.average_ticket_price_orbs" type="number" class="input" placeholder="e.g. 500" />
            </div>

            <div>
              <label class="label">Typical Capacity</label>
              <input v-model.number="form.typical_capacity" type="number" class="input" placeholder="e.g. 200" />
            </div>
          </div>
        </section>

        <!-- Contact / Location -->
        <section class="mt-8">
          <h2 class="section-title">Contact & Location</h2>

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label class="label">Business Email</label>
              <input v-model="form.business_email" type="email" class="input" placeholder="brand@example.com" />
            </div>

            <div>
              <label class="label">Business Phone</label>
              <input v-model="form.business_phone" class="input" placeholder="+234..." />
            </div>

            <div>
              <label class="label">Website</label>
              <input v-model="form.website" class="input" placeholder="https://..." />
            </div>

            <div>
              <label class="label">Country</label>
              <input v-model="form.country" class="input" />
            </div>

            <div>
              <label class="label">State</label>
              <input v-model="form.state" class="input" placeholder="Lagos" />
            </div>

            <div>
              <label class="label">City</label>
              <input v-model="form.city" class="input" placeholder="Ikeja" />
            </div>

            <div class="md:col-span-2">
              <label class="label">Address</label>
              <input v-model="form.address" class="input" placeholder="Office or business address" />
            </div>
          </div>
        </section>

        <!-- Media -->
        <section class="mt-8">
          <h2 class="section-title">Brand Media</h2>

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <label class="upload-box">
              <input type="file" accept="image/*" class="hidden" @change="handleFile($event, 'logo')" />
              <p class="text-3xl">🖼️</p>
              <p class="mt-2 font-black">Upload Logo</p>
              <img v-if="preview.logo" :src="preview.logo" class="mt-4 h-28 w-full rounded-xl object-contain" />
            </label>

            <label class="upload-box">
              <input type="file" accept="image/*" class="hidden" @change="handleFile($event, 'banner')" />
              <p class="text-3xl">🌆</p>
              <p class="mt-2 font-black">Upload Banner</p>
              <img v-if="preview.banner" :src="preview.banner" class="mt-4 h-28 w-full rounded-xl object-cover" />
            </label>
          </div>
        </section>

        <!-- Social / Bank -->
        <section class="mt-8">
          <h2 class="section-title">Socials & Payout Details</h2>

          <div class="mt-5 grid gap-5 md:grid-cols-2">
            <input v-model="form.instagram" class="input" placeholder="Instagram URL or handle" />
            <input v-model="form.facebook" class="input" placeholder="Facebook URL" />
            <input v-model="form.linkedin" class="input" placeholder="LinkedIn URL" />
            <input v-model="form.tiktok" class="input" placeholder="TikTok URL or handle" />

            <div>
              <label class="label">Bank Name</label>
              <input v-model="form.bank_name" class="input" placeholder="Bank name" />
            </div>

            <div>
              <label class="label">Account Number</label>
              <input v-model="form.account_number" class="input" placeholder="0123456789" />
            </div>

            <div class="md:col-span-2">
              <label class="label">Account Name</label>
              <input v-model="form.account_name" class="input" placeholder="Account name" />
            </div>
          </div>
        </section>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="mt-8 w-full rounded-2xl bg-orange-500 px-6 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(249,115,22,0.35)] disabled:opacity-60"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Organizer Profile' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { categoryService } from '@/services/categoryService'
import { organizerProfileService } from '@/services/organizerProfileService'

const categories = ref([])
const options = reactive({
  event_frequencies: [],
  organizer_goals: [],
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const preview = reactive({
  logo: null,
  banner: null,
})

const form = reactive({
  event_orb_package_id: null,

  business_name: '',
  tagline: '',
  bio: '',

  event_categories: [],
  preferred_event_format: 'physical',
  event_frequency: '',
  target_audience: '',
  average_ticket_price_orbs: null,
  typical_capacity: null,
  states_operated_in: [],
  organizer_goal: '',

  business_email: '',
  business_phone: '',
  website: '',

  country: 'Nigeria',
  state: '',
  city: '',
  address: '',

  logo: null,
  banner: null,

  instagram: '',
  facebook: '',
  twitter: '',
  linkedin: '',
  tiktok: '',

  bank_name: '',
  account_name: '',
  account_number: '',
})

const handleFile = (event, field) => {
  const file = event.target.files?.[0]
  if (!file) return

  form[field] = file
  preview[field] = URL.createObjectURL(file)
}

const loadData = async () => {
  const [categoryData, optionData] = await Promise.all([
    categoryService.getCategories(),
    organizerProfileService.getOptions(),
  ])

  categories.value = categoryData
  Object.assign(options, optionData)
}

const submitProfile = async () => {
  try {
    isSubmitting.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const formData = new FormData()

    Object.entries(form).forEach(([key, value]) => {
      if (value === null || value === '') return

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, value)
      }
    })

    const response = await organizerProfileService.submitProfile(formData)

    successMessage.value = response.message || 'Organizer profile submitted successfully.'
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
      'Unable to submit organizer profile'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.section-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: white;
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
  border: 1px solid rgba(168, 85, 247, 0.25);
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
</style>