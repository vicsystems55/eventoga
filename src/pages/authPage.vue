<template>
  <div class="min-h-screen bg-[#050505] p-4 text-white md:p-6">
    <div
      class="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-purple-500/30 bg-[#070707] shadow-[0_0_80px_rgba(168,85,247,0.16)] lg:grid-cols-[1fr_0.95fr]">
      <!-- Left Visual -->
      <section class="relative hidden overflow-hidden p-8 lg:block">
        <img :src="partyImage" alt="EventOga party experience"
          class="absolute inset-0 h-full w-full object-cover opacity-75" />

        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>

        <div class="relative z-10 flex h-full flex-col justify-between">
          <router-link to="/" class="flex items-center gap-3 text-3xl font-black">
            <span class="text-white">Event<span class="text-orange-500">Oga</span></span>
          </router-link>

          <div>
            <h1 class="max-w-xl text-5xl font-black leading-tight xl:text-6xl">
              Your Events.
              <span class="block text-purple-400">Your People.</span>
              <span class="block text-orange-500">Your Moments.</span>
            </h1>

            <p class="mt-6 max-w-lg text-lg leading-8 text-gray-300">
              Discover amazing events, connect with people and create unforgettable memories with EventOga.
            </p>
          </div>

          <div class="grid max-w-xl grid-cols-3 gap-5">
            <MiniFeature icon="🎟️" title="Discover" text="Find events you love" />
            <MiniFeature icon="👥" title="Connect" text="Meet people & network" />
            <MiniFeature icon="★" title="Enjoy" text="Unforgettable experiences" />
          </div>
        </div>
      </section>

      <!-- Right Auth -->
      <section class="relative flex items-center justify-center p-4 md:p-8">
        <div class="absolute -right-20 top-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div class="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl"></div>

        <div class="relative z-10 w-full max-w-xl">
          <div v-if="errorMessage"
            class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {{ errorMessage }}
          </div>

          <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-black/55 backdrop-blur-xl glow-mix">
            <!-- Tabs -->
            <div class="grid grid-cols-2 border-b border-white/10">
              <button @click="activeTab = 'login'"
                class="flex items-center justify-center gap-2 px-4 py-5 text-lg font-black transition" :class="activeTab === 'login'
                  ? 'border-b-2 border-orange-500 text-orange-500 bg-orange-500/5'
                  : 'text-gray-400 hover:text-white'">
                <span>👤</span>
                Log In
              </button>

              <button @click="activeTab = 'register'"
                class="flex items-center justify-center gap-2 px-4 py-5 text-lg font-black transition" :class="activeTab === 'register'
                  ? 'border-b-2 border-purple-500 text-purple-400 bg-purple-500/5'
                  : 'text-gray-400 hover:text-white'">
                <span>👥</span>
                Create Account
              </button>
            </div>

            <Transition name="auth-slide" mode="out-in">
              <!-- Login -->
              <div v-if="activeTab === 'login'" key="login" class="p-6 md:p-10">
                <div class="mb-8 text-center">
                  <h2 class="text-4xl font-black">Welcome Back! 👋</h2>
                  <p class="mt-3 text-gray-400">Log in to continue to your EventOga account</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-5">
                  <AuthInput v-model="loginForm.email" label="Email Address" type="email"
                    placeholder="Enter your email address" icon="✉️" />

                  <AuthInput v-model="loginForm.password" label="Password" :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter your password" icon="🔒">
                    <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-white">
                      {{ showPassword ? '🙈' : '👁️' }}
                    </button>
                  </AuthInput>

                  <div class="flex items-center justify-between">
                    <label class="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
                      <input type="checkbox" class="h-4 w-4 rounded border-purple-500/30 bg-black text-orange-500" />
                      Remember me
                    </label>

                    <a href="#" class="text-sm font-bold text-purple-400 hover:text-orange-400">
                      Forgot password?
                    </a>
                  </div>

                  <button :disabled="isLoading" type="submit"
                    class="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 px-6 py-4 text-lg font-black text-white transition hover:scale-[1.02] disabled:opacity-60">
                    {{ isLoading ? 'Please wait...' : 'Log In' }}
                    <span>→</span>
                  </button>
                </form>
              </div>

              <!-- Register -->
              <div v-else key="register" class="p-6 md:p-10">
                <div class="mb-7 text-center">
                  <h2 class="text-4xl font-black">Create Account</h2>
                  <p class="mt-3 text-gray-400">Join EventOga and start discovering events</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-4">
                  <div class="grid grid-cols-2 gap-3">
                    <AuthInput v-model="registerForm.firstName" label="First Name" placeholder="John" />
                    <AuthInput v-model="registerForm.lastName" label="Last Name" placeholder="Doe" />
                  </div>

                  <AuthInput v-model="registerForm.email" label="Email Address" type="email"
                    placeholder="you@example.com" icon="✉️" />

                  <AuthInput v-model="registerForm.phone" label="Phone Number" type="tel"
                    placeholder="+234 123 456 7890" icon="📞" />

                  <AuthInput v-model="registerForm.password" label="Password"
                    :type="showRegisterPassword ? 'text' : 'password'" placeholder="Create a password" icon="🔒">
                    <button type="button" @click="showRegisterPassword = !showRegisterPassword"
                      class="text-gray-400 hover:text-white">
                      {{ showRegisterPassword ? '🙈' : '👁️' }}
                    </button>
                  </AuthInput>

                  <AuthInput v-model="registerForm.confirmPassword" label="Confirm Password"
                    :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm your password" icon="🛡️">
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                      class="text-gray-400 hover:text-white">
                      {{ showConfirmPassword ? '🙈' : '👁️' }}
                    </button>
                  </AuthInput>

                  <!-- Organizer Toggle -->
                  <div @click="registerAsOrganizer = !registerAsOrganizer"
                    class="group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300"
                    :class="registerAsOrganizer
                        ? 'border-orange-500 bg-gradient-to-r from-orange-500/15 via-orange-500/8 to-purple-500/10 shadow-[0_0_30px_rgba(255,106,0,0.18)]'
                        : 'border-white/10 bg-white/[0.03] hover:border-orange-500/40'
                      ">
                    <div class="flex items-center gap-4 p-5">
                      <!-- Icon -->
                      <div class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition" :class="registerAsOrganizer
                          ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(255,106,0,0.35)]'
                          : 'bg-purple-500/20 text-purple-300'
                        ">
                        🎤
                      </div>

                      <!-- Text -->
                      <div class="flex-1">
                        <h3 class="text-base font-black md:text-lg">
                          Register as an Organizer
                        </h3>

                        <p class="mt-1 text-sm leading-6 text-gray-400">
                          Host events, sell tickets, manage attendees and grow your audience.
                        </p>
                      </div>

                      <!-- Switch -->
                      <button type="button" class="relative h-8 w-16 rounded-full transition-all duration-300"
                        :class="registerAsOrganizer ? 'bg-orange-500' : 'bg-gray-700'">
                        <span class="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300"
                          :class="registerAsOrganizer ? 'left-9' : 'left-1'"></span>
                      </button>
                    </div>

                    <!-- Extra note -->
                    <div v-if="registerAsOrganizer"
                      class="border-t border-orange-500/20 bg-black/20 px-5 py-4 text-sm text-orange-200">
                      After registration, you'll continue to organizer onboarding to complete your business profile.
                    </div>
                  </div>

                  <label class="flex cursor-pointer items-start gap-3 text-sm text-gray-400">
                    <input type="checkbox" required
                      class="mt-1 h-4 w-4 rounded border-purple-500/30 bg-black text-orange-500" />
                    <span>
                      I agree to the
                      <a href="#" class="text-orange-500">Terms</a>
                      and
                      <a href="#" class="text-orange-500">Privacy Policy</a>
                    </span>
                  </label>

                  <button :disabled="isLoading" type="submit"
                    class="w-full rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 px-6 py-4 text-lg font-black text-white transition hover:scale-[1.02] disabled:opacity-60">
                    {{ isLoading ? 'Please wait...' : 'Create Account' }}
                  </button>
                </form>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '@/services/authService'
import partyImage from './../assets/partying.png'

const activeTab = ref('login')
const showPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)
const registerAsOrganizer = ref(false)

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === 'register') activeTab.value = 'register'
    else if (newTab === 'login') activeTab.value = 'login'
  },
  { immediate: true }
)

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    await authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    })

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await authService.register({
      name: `${registerForm.value.firstName} ${registerForm.value.lastName}`,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      password: registerForm.value.password,
      password_confirmation: registerForm.value.confirmPassword,
      intent: registerAsOrganizer.value ? 'organizer' : 'attendee',
    })

    await router.push(response.next_step || '/dashboard')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      Object.values(error.response?.data?.errors || {})?.[0]?.[0] ||
      error.message ||
      'Registration failed'
  } finally {
    isLoading.value = false
  }
}

const MiniFeature = defineComponent({
  props: ['icon', 'title', 'text'],
  setup(props) {
    return () =>
      h('div', { class: 'flex items-start gap-3' }, [
        h('div', { class: 'grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-orange-500/40 bg-black/40 text-2xl' }, props.icon),
        h('div', [
          h('h3', { class: 'font-black text-white' }, props.title),
          h('p', { class: 'mt-1 text-sm leading-5 text-gray-300' }, props.text),
        ]),
      ])
  },
})

const AuthInput = defineComponent({
  props: ['modelValue', 'label', 'type', 'placeholder', 'icon'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('label', { class: 'text-sm font-semibold text-gray-300' }, props.label),
        h('div', { class: 'flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-orange-500' }, [
          props.icon ? h('span', { class: 'text-gray-400' }, props.icon) : null,
          h('input', {
            value: props.modelValue,
            type: props.type || 'text',
            placeholder: props.placeholder,
            required: true,
            class: 'w-full bg-transparent text-white outline-none placeholder:text-gray-500',
            onInput: (event) => emit('update:modelValue', event.target.value),
          }),
          slots.default?.(),
        ]),
      ])
  },
})
</script>

<style scoped>
.glow-mix {
  box-shadow:
    0 0 24px rgba(255, 106, 0, 0.16),
    0 0 65px rgba(168, 85, 247, 0.18);
}

.auth-slide-enter-active,
.auth-slide-leave-active {
  transition: all 0.25s ease;
}

.auth-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.auth-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>