<template>
  <div class="min-h-screen bg-[#050505] px-4 py-8 text-white md:px-6">
    <div class="mx-auto max-w-5xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-black md:text-5xl">
          Personalize Your <span class="text-orange-500">EventOga</span>
        </h1>
        <p class="mt-3 text-gray-400">
          Help us recommend events that match your interests and lifestyle.
        </p>
      </div>

      <!-- Progress -->
      <div class="mb-6 rounded-2xl border border-purple-500/25 bg-black/40 p-4">
        <div class="mb-2 flex justify-between text-sm text-gray-400">
          <span>Step {{ currentStep + 1 }} of {{ steps.length }}</span>
          <span>{{ progress }}% complete</span>
        </div>

        <div class="h-2 rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-orange-500 transition-all"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <div v-if="errorMessage" class="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
        {{ errorMessage }}
      </div>

      <form
        @submit.prevent="submitProfile"
        class="rounded-3xl border border-purple-500/25 bg-[#0b0b0b] p-5 shadow-[0_0_40px_rgba(168,85,247,0.12)] md:p-8"
      >
        <!-- Step 1 -->
        <section v-if="currentStep === 0">
          <h2 class="section-title">What events are you interested in?</h2>
          <p class="section-subtitle">Pick at least one category.</p>

          <div class="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <button
              v-for="category in categories"
              :key="category.id"
              type="button"
              @click="toggleArray(form.interests, category.slug)"
              class="option-card"
              :class="form.interests.includes(category.slug) ? 'active-option' : ''"
            >
              {{ category.name }}
            </button>
          </div>
        </section>

        <!-- Step 2 -->
        <section v-if="currentStep === 1">
          <h2 class="section-title">How do you prefer to attend events?</h2>
          <p class="section-subtitle">This helps us recommend the right event format.</p>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <button
              v-for="format in options.event_formats"
              :key="format.value"
              type="button"
              @click="form.preferred_event_format = format.value"
              class="option-card text-left"
              :class="form.preferred_event_format === format.value ? 'active-option' : ''"
            >
              {{ format.label }}
            </button>
          </div>
        </section>

        <!-- Step 3 -->
        <section v-if="currentStep === 2">
          <h2 class="section-title">Why do you attend events?</h2>
          <p class="section-subtitle">Choose all that apply.</p>

          <div class="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <button
              v-for="goal in options.event_goals"
              :key="goal.value"
              type="button"
              @click="toggleArray(form.event_goals, goal.value)"
              class="option-card"
              :class="form.event_goals.includes(goal.value) ? 'active-option' : ''"
            >
              {{ goal.label }}
            </button>
          </div>
        </section>

        <!-- Step 4 -->
        <section v-if="currentStep === 3">
          <h2 class="section-title">Spend & Experience</h2>
          <p class="section-subtitle">This helps us understand what fits your budget.</p>

          <div class="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label class="label">Average spend on events</label>
              <select v-model="form.average_spend_range" class="input">
                <option value="">Select spend range</option>
                <option v-for="range in options.spend_ranges" :key="range.value" :value="range.value">
                  {{ range.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">Physical events attended</label>
              <input v-model.number="form.physical_events_attended_count" type="number" min="0" class="input" />
            </div>

            <div>
              <label class="label">Online events attended</label>
              <input v-model.number="form.online_events_attended_count" type="number" min="0" class="input" />
            </div>
          </div>
        </section>

        <!-- Step 5 -->
        <section v-if="currentStep === 4">
          <h2 class="section-title">Basic Profile</h2>
          <p class="section-subtitle">A few extra details to personalize your experience.</p>

          <div class="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label class="label">Preferred City</label>
              <input v-model="form.preferred_city" class="input" placeholder="Abuja, Lagos..." />
            </div>

            <div>
              <label class="label">Preferred State</label>
              <input v-model="form.preferred_state" class="input" placeholder="FCT, Lagos..." />
            </div>

            <div>
              <label class="label">Age Range</label>
              <select v-model="form.age_range" class="input">
                <option value="">Select age range</option>
                <option v-for="age in options.age_ranges" :key="age.value" :value="age.value">
                  {{ age.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="label">Occupation</label>
              <input v-model="form.occupation" class="input" placeholder="Student, entrepreneur, developer..." />
            </div>
          </div>
        </section>

        <!-- Nav -->
        <div class="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <button
            type="button"
            @click="prevStep"
            :disabled="currentStep === 0"
            class="rounded-xl border border-white/10 px-5 py-3 font-bold text-gray-300 disabled:opacity-40"
          >
            Back
          </button>

          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            @click="nextStep"
            class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white"
          >
            Continue
          </button>

          <button
            v-else
            type="submit"
            :disabled="isSubmitting"
            class="rounded-xl bg-orange-500 px-6 py-3 font-black text-white disabled:opacity-60"
          >
            {{ isSubmitting ? 'Saving...' : 'Finish Setup' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categoryService } from '@/services/categoryService'
import { attendeeProfileService } from '@/services/attendeeProfileService'

const router = useRouter()

const currentStep = ref(0)
const isSubmitting = ref(false)
const errorMessage = ref('')

const categories = ref([])
const options = reactive({
  event_formats: [],
  event_goals: [],
  spend_ranges: [],
  age_ranges: [],
})

const steps = ['Interests', 'Preference', 'Goals', 'Spend', 'Profile']

const form = reactive({
  interests: [],
  preferred_event_format: 'no_preference',
  event_goals: [],
  average_spend_range: '',
  physical_events_attended_count: 0,
  online_events_attended_count: 0,
  preferred_city: '',
  preferred_state: '',
  age_range: '',
  occupation: '',
})

const progress = computed(() => Math.round(((currentStep.value + 1) / steps.length) * 100))

const toggleArray = (array, value) => {
  const index = array.indexOf(value)

  if (index >= 0) {
    array.splice(index, 1)
  } else {
    array.push(value)
  }
}

const nextStep = () => {
  errorMessage.value = ''

  if (currentStep.value === 0 && form.interests.length === 0) {
    errorMessage.value = 'Please select at least one event interest.'
    return
  }

  if (currentStep.value === 2 && form.event_goals.length === 0) {
    errorMessage.value = 'Please select at least one event goal.'
    return
  }

  if (currentStep.value === 3 && !form.average_spend_range) {
    errorMessage.value = 'Please select your average spend range.'
    return
  }

  currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const loadData = async () => {
  const [categoryData, optionData] = await Promise.all([
    categoryService.getCategories(),
    attendeeProfileService.getOptions(),
  ])

  categories.value = categoryData
  Object.assign(options, optionData)
}

const submitProfile = async () => {
  try {
    isSubmitting.value = true
    errorMessage.value = ''

    await attendeeProfileService.submitProfile(form)

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
      'Unable to save your profile'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.section-title {
  font-size: 1.6rem;
  font-weight: 900;
}

.section-subtitle {
  margin-top: 0.4rem;
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
  border: 1px solid rgba(168, 85, 247, 0.25);
  background: rgba(0, 0, 0, 0.45);
  padding: 0.85rem 1rem;
  color: white;
  outline: none;
}

.input:focus {
  border-color: rgba(249, 115, 22, 0.75);
}

.option-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.35);
  padding: 1rem;
  font-weight: 800;
  color: #d1d5db;
  transition: 0.2s;
}

.option-card:hover {
  border-color: rgba(249, 115, 22, 0.5);
  color: white;
}

.active-option {
  border-color: rgba(249, 115, 22, 0.8);
  background: rgba(249, 115, 22, 0.15);
  color: #fb923c;
  box-shadow: 0 0 24px rgba(249, 115, 22, 0.14);
}
</style>