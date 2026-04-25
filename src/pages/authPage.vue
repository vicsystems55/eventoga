<template>
  <div class="min-h-screen ambient-bg auth-wrapper">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Back to Home Button -->
    <div class="relative z-20 w-full px-4 py-6 md:px-8">
      <div class="mx-auto max-w-7xl">
        <router-link to="/" class="inline-flex items-center gap-2 text-white/70 hover:text-orange-500 transition-all duration-300 group">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span class="font-semibold">Back to Home</span>
        </router-link>
      </div>
    </div>

    <!-- Main Auth Card -->
    <div class="relative z-10 flex items-center justify-center px-4 py-8 md:py-12">
      <div class="w-full max-w-md">
        <!-- Logo & Brand -->
        <div class="mb-8 text-center">
          <div class="inline-flex items-center gap-2 text-3xl text-white md:text-4xl">
            <span>Event<span class="text-orange-500">Oga</span></span>
            <span class="text-3xl">🎟️</span>
          </div>
          <p class="mt-2 text-sm text-gray-400">Your gateway to amazing experiences</p>
        </div>

        <!-- Auth Card -->
        <div class="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden glow-mix">
          <!-- Glass morphism overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 pointer-events-none"></div>
          
          <!-- Animated border glow -->
          <div class="absolute inset-0 rounded-3xl pointer-events-none">
            <div class="absolute -inset-[1px] bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-orange-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <!-- Tabs -->
          <div class="relative px-6 pt-8">
            <div class="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                @click="activeTab = 'login'"
                class="relative flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300"
                :class="activeTab === 'login' 
                  ? 'text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg glow-orange' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'"
              >
                <span class="relative z-10">Login</span>
                <div v-if="activeTab === 'login'" class="absolute inset-0 rounded-lg bg-orange-500/20 blur-sm -z-0"></div>
              </button>
              <button
                @click="activeTab = 'register'"
                class="relative flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300"
                :class="activeTab === 'register' 
                  ? 'text-white bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg glow-purple' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'"
              >
                <span class="relative z-10">Register</span>
                <div v-if="activeTab === 'register'" class="absolute inset-0 rounded-lg bg-purple-500/20 blur-sm -z-0"></div>
              </button>
            </div>
          </div>

          <!-- Login Form -->
          <Transition name="auth-slide" mode="out-in">
            <div v-if="activeTab === 'login'" key="login" class="p-6 md:p-8">
              <form @submit.prevent="handleLogin" class="space-y-5">
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.email"
                      type="email"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <input
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      class="w-full pl-10 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg v-if="!showPassword" class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                    <input type="checkbox" class="w-4 h-4 rounded border-purple-500/30 bg-black/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0">
                    <span>Remember me</span>
                  </label>
                  <a href="#" class="text-sm text-orange-500 hover:text-orange-400 transition-colors">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  class="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] glow-orange"
                >
                  Login to Account
                </button>

                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-white/10"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-black/40 text-gray-400 backdrop-blur-sm">Or continue with</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <button class="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button class="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>
            </div>

            <!-- Register Form -->
            <div v-else key="register" class="p-6 md:p-8">
              <form @submit.prevent="handleRegister" class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-300">First Name</label>
                    <input
                      v-model="registerForm.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-gray-300">Last Name</label>
                    <input
                      v-model="registerForm.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Email Address</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                      </svg>
                    </div>
                    <input
                      v-model="registerForm.email"
                      type="email"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Phone Number</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <input
                      v-model="registerForm.phone"
                      type="tel"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="+234 123 456 7890"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <input
                      v-model="registerForm.password"
                      :type="showRegisterPassword ? 'text' : 'password'"
                      required
                      class="w-full pl-10 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      @click="showRegisterPassword = !showRegisterPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg v-if="!showRegisterPassword" class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-gray-300">Confirm Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <input
                      v-model="registerForm.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      required
                      class="w-full pl-10 pr-12 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <svg v-else class="h-5 w-5 text-gray-500 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <label class="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" required class="mt-1 w-4 h-4 rounded border-purple-500/30 bg-black/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0">
                  <span>I agree to the <a href="#" class="text-orange-500 hover:text-orange-400">Terms of Service</a> and <a href="#" class="text-orange-500 hover:text-orange-400">Privacy Policy</a></span>
                </label>

                <button
                  type="submit"
                  class="w-full py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl font-black text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] glow-purple"
                >
                  Create Account
                </button>

                <div class="relative my-6">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-white/10"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-black/40 text-gray-400 backdrop-blur-sm">Or sign up with</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <button class="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button class="flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 text-center text-xs text-gray-500">
          <p>🔒 Your information is protected with bank-grade security</p>
          <p class="mt-2">© 2026 EventOga. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('login')
const showPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Form data
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

// Watch for route query changes
watch(() => route.query.tab, (newTab) => {
  if (newTab === 'register') {
    activeTab.value = 'register'
  } else if (newTab === 'login') {
    activeTab.value = 'login'
  }
}, { immediate: true })

// Handle login
const handleLogin = () => {
  console.log('Login:', loginForm.value)
  // Add your login logic here
}

// Handle register
const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  console.log('Register:', registerForm.value)
  // Add your registration logic here
}
</script>

<style scoped>
.auth-wrapper {
  background: radial-gradient(circle at 20% 50%, rgba(255, 106, 0, 0.08), transparent 40%),
              radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.08), transparent 40%),
              #050505;
  min-height: 100vh;
}

.ambient-bg {
  background: #050505;
}

.glow-orange {
  box-shadow: 0 0 18px rgba(255, 106, 0, 0.35);
}

.glow-purple {
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.35);
}

.glow-mix {
  box-shadow: 0 0 20px rgba(255, 106, 0, 0.15),
              0 0 55px rgba(168, 85, 247, 0.15);
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

@keyframes pulse-slower {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.2);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 8s ease-in-out infinite;
}

/* Tab transition animations */
.auth-slide-enter-active,
.auth-slide-leave-active {
  transition: all 0.3s ease;
}

.auth-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.auth-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Smooth transitions for form elements */
input, button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.1);
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}
</style>