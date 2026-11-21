<template>
  <main class="mx-auto max-w-3xl space-y-6 text-white">
    <div><p class="text-sm font-bold uppercase tracking-widest text-orange-400">For organizers</p><h1 class="mt-2 text-3xl font-black">Organizer profile</h1><p class="mt-2 text-gray-400">Tell us who is hosting your events. A superadmin reviews this profile before you can publish.</p></div>
    <p v-if="error" role="alert" class="rounded-xl bg-red-500/10 p-4 text-red-300">{{ error }}</p>
    <div v-if="loading" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 text-gray-400">Loading profile…</div>
    <template v-else>
      <div v-if="profile" class="rounded-2xl border border-orange-500/25 bg-orange-500/10 p-5"><p class="font-bold">{{ profile.business_name }}</p><p class="mt-1 text-sm text-gray-300">{{ profile.city }}, {{ profile.state }}</p><p class="mt-3 text-sm">Status: <strong class="capitalize text-orange-300">{{ profile.approval_status }}</strong></p><p v-if="profile.approval_status === 'pending'" class="mt-2 text-sm text-gray-400">We will review your application before you can create events.</p><router-link v-if="profile.approval_status === 'approved'" to="/dashboard/create-event" class="mt-4 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-black">Create an event</router-link></div>
      <form v-if="profile?.approval_status !== 'approved'" class="space-y-5 rounded-2xl border border-white/10 bg-[#0b0b0b] p-6" @submit.prevent="submit">
        <h2 class="text-xl font-bold">{{ profile ? 'Update your application' : 'Apply as an organizer' }}</h2>
        <div><label for="business-name" class="mb-2 block text-sm font-semibold">Business or organizer name</label><input id="business-name" v-model.trim="form.business_name" required minlength="2" maxlength="120" class="field" /></div>
        <div><label for="description" class="mb-2 block text-sm font-semibold">About your events</label><textarea id="description" v-model.trim="form.description" rows="4" maxlength="2000" class="field" placeholder="Describe the events you organize and who they are for."></textarea></div>
        <div class="grid gap-5 sm:grid-cols-2"><div><label for="city" class="mb-2 block text-sm font-semibold">City</label><input id="city" v-model.trim="form.city" required class="field" /></div><div><label for="state" class="mb-2 block text-sm font-semibold">State</label><input id="state" v-model.trim="form.state" required class="field" /></div></div>
        <button :disabled="saving" class="rounded-xl bg-orange-500 px-6 py-3 font-bold text-black disabled:opacity-50">{{ saving ? 'Submitting…' : 'Submit for review' }}</button>
      </form>
    </template>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { organizerProfileService } from '@/services/organizerProfileService'

const profile = ref(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const form = reactive({ business_name: '', description: '', city: '', state: '' })
async function load() {
  loading.value = true
  try {
    profile.value = await organizerProfileService.getProfile()
    if (profile.value) Object.assign(form, { business_name: profile.value.business_name, description: profile.value.description || '', city: profile.value.city, state: profile.value.state })
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not load your profile.' }
  finally { loading.value = false }
}
async function submit() {
  saving.value = true
  error.value = ''
  try { await organizerProfileService.submitProfile(form); await load() }
  catch (cause) { error.value = cause.response?.data?.message || 'Could not submit your profile.' }
  finally { saving.value = false }
}
onMounted(load)
</script>

<style scoped>.field{width:100%;border:1px solid rgba(255,255,255,.15);border-radius:.75rem;background:#111;padding:.8rem 1rem;color:white;outline:none}.field:focus{border-color:#f97316}</style>
