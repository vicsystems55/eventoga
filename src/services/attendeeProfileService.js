import api from './api'

export const attendeeProfileService = {
  async getOptions() {
    const { data } = await api.get('/attendee-onboarding/options', {
      skipAuth: true,
    })

    return data.data
  },

  async getProfile() {
    const { data } = await api.get('/attendee-profile')
    return data.data
  },

  async submitProfile(payload) {
    const { data } = await api.post('/attendee-profile', payload)
    return data
  },
}