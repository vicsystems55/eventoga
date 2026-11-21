import api from './api'

export const organizerProfileService = {
  async getProfile() {
    const { data } = await api.get('/organizer/profile')
    return data.data
  },
  async submitProfile(payload) {
    const { data } = await api.post('/organizer/profile', payload)
    return data
  },
}
