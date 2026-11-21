<template>
  <main class="mx-auto max-w-4xl space-y-6 text-white">
    <div><p class="text-sm font-bold uppercase tracking-widest text-orange-400">Organizer studio</p><h1 class="mt-2 text-3xl font-black">{{ editing ? 'Edit event' : 'Create event' }}</h1><p class="mt-2 text-gray-400">Save a draft, then submit it for superadmin approval. Tickets and checkout are a later release.</p></div>
    <p v-if="error" role="alert" class="rounded-xl bg-red-500/10 p-4 text-red-300">{{ error }}</p>
    <div v-if="loading" class="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 text-gray-400">Loading event form…</div>
    <div v-else-if="!approved" class="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6"><h2 class="text-xl font-bold">Organizer approval required</h2><p class="mt-2 text-gray-300">Submit your organizer profile and wait for approval before creating events.</p><router-link to="/dashboard/organizer-onboarding" class="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-bold text-black">View organizer profile</router-link></div>
    <form v-else class="space-y-6" @submit.prevent="save(false)">
      <section class="card space-y-5"><h2 class="text-xl font-bold">Event details</h2><div><label for="title" class="label">Event title</label><input id="title" v-model.trim="form.title" class="field" required minlength="3" maxlength="180" /></div><div class="grid gap-5 sm:grid-cols-2"><div><label for="category" class="label">Category</label><select id="category" v-model="form.category_id" class="field" required><option value="">Choose a category</option><option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option></select></div><div><label for="event-type" class="label">Admission</label><select id="event-type" v-model="form.event_type" class="field"><option value="free">Free</option></select><p class="mt-2 text-xs text-gray-400">Paid tickets arrive with checkout in the next phase.</p></div></div><div><label for="summary" class="label">Short summary</label><textarea id="summary" v-model.trim="form.short_description" class="field" required minlength="15" maxlength="500" rows="2"></textarea></div><div><label for="description" class="label">Full description</label><textarea id="description" v-model.trim="form.description" class="field" maxlength="5000" rows="5"></textarea></div></section>
      <section class="card space-y-5"><h2 class="text-xl font-bold">When and where</h2><div class="grid gap-5 sm:grid-cols-2"><div><label for="starts-at" class="label">Starts</label><input id="starts-at" v-model="form.starts_at" type="datetime-local" class="field" required /></div><div><label for="ends-at" class="label">Ends (optional)</label><input id="ends-at" v-model="form.ends_at" type="datetime-local" class="field" /></div></div><div><label for="format" class="label">Event format</label><select id="format" v-model="form.event_format" class="field"><option value="physical">In person</option><option value="online">Online</option><option value="hybrid">Hybrid</option></select></div><div><label for="venue" class="label">{{ form.event_format === 'online' ? 'Online platform (optional)' : 'Venue name' }}</label><input id="venue" v-model.trim="form.venue_name" class="field" :required="form.event_format !== 'online'" /></div><div><label for="address" class="label">Address or access information (optional)</label><input id="address" v-model.trim="form.address" class="field" /></div><div class="grid gap-5 sm:grid-cols-2"><div><label for="city" class="label">City</label><input id="city" v-model.trim="form.city" class="field" required /></div><div><label for="state" class="label">State</label><input id="state" v-model.trim="form.state" class="field" required /></div></div></section>
      <section class="card space-y-4"><h2 class="text-xl font-bold">Cover image</h2><p class="text-sm text-gray-400">JPG, PNG, or WebP up to 5 MB. This is optional.</p><input type="file" accept="image/jpeg,image/png,image/webp" class="block w-full text-sm" @change="chooseImage" /><img v-if="imagePreview || form.image_url" :src="imagePreview || form.image_url" alt="Event cover preview" class="h-52 w-full rounded-xl object-cover" /></section>
      <div class="flex flex-wrap gap-3"><button type="submit" :disabled="saving" class="rounded-xl border border-orange-500/50 px-6 py-3 font-bold text-orange-300 disabled:opacity-50">{{ saving ? 'Saving…' : 'Save draft' }}</button><button type="button" :disabled="saving" class="rounded-xl bg-orange-500 px-6 py-3 font-bold text-black disabled:opacity-50" @click="save(true)">Save and submit for review</button><router-link to="/dashboard/my-events" class="px-4 py-3 text-gray-400">My events</router-link></div>
    </form>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoryService } from '@/services/categoryService'
import { eventService } from '@/services/eventService'
import { organizerProfileService } from '@/services/organizerProfileService'

const route = useRoute()
const router = useRouter()
const editing = computed(() => Boolean(route.params.id))
const approved = ref(false)
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const categories = ref([])
const imageFile = ref(null)
const imagePreview = ref('')
const form = reactive({ title: '', category_id: '', short_description: '', description: '', starts_at: '', ends_at: '', event_format: 'physical', event_type: 'free', visibility: 'public', venue_name: '', address: '', city: '', state: '', image_url: null })
const localTime = value => value ? new Date(value).toLocaleString('sv-SE', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(' ', 'T') : ''

async function load() {
  loading.value = true
  try {
    const [profile, available] = await Promise.all([organizerProfileService.getProfile(), categoryService.getCategories()])
    approved.value = profile?.approval_status === 'approved'
    categories.value = available
    if (approved.value && editing.value) {
      const event = await eventService.getOrganizerEvent(route.params.id)
      Object.assign(form, { title: event.title, category_id: event.category_id, short_description: event.short_description || '', description: event.description || '', starts_at: localTime(event.starts_at), ends_at: localTime(event.ends_at), event_format: event.event_format, event_type: event.event_type, visibility: event.visibility, venue_name: event.venue_name || '', address: event.address || '', city: event.city, state: event.state, image_url: event.image_url })
    }
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not load event form.' }
  finally { loading.value = false }
}
function chooseImage(event) {
  imageFile.value = event.target.files?.[0] || null
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
  imagePreview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : ''
}
async function save(submit) {
  if (!form.title || !form.category_id || !form.short_description || !form.starts_at || !form.city || !form.state) { error.value = 'Complete the required event fields first.'; return }
  saving.value = true
  error.value = ''
  try {
    const payload = { ...form, ends_at: form.ends_at || null }
    if (imageFile.value) payload.image_url = await eventService.uploadImage(imageFile.value)
    const saved = editing.value ? await eventService.updateEvent(route.params.id, payload) : await eventService.createEvent(payload)
    if (submit) { await eventService.submitEvent(saved.id); await router.push('/dashboard/my-events') }
    else if (!editing.value) await router.replace(`/dashboard/edit-event/${saved.id}`)
  } catch (cause) { error.value = cause.response?.data?.message || 'Could not save the event.' }
  finally { saving.value = false }
}
onMounted(load)
</script>

<style scoped>.card{border:1px solid rgba(255,255,255,.1);border-radius:1.5rem;background:#0b0b0b;padding:1.5rem}.label{display:block;margin-bottom:.5rem;font-size:.875rem;font-weight:600}.field{width:100%;border:1px solid rgba(255,255,255,.15);border-radius:.75rem;background:#111;padding:.8rem 1rem;color:white;outline:none}.field:focus{border-color:#f97316}</style>
