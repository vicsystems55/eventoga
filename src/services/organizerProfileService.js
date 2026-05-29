import api from './api'

export const organizerProfileService = {
  async getOptions() {
    const { data } = await api.get('/organizer-onboarding/options', {
      skipAuth: true,
    })

    return data.data
  },

  async getProfile() {
    const { data } = await api.get('/organizer-profile')
    return data.data
  },

  async submitProfile(payload) {
    const { data } = await api.post('/organizer-profile', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },
}