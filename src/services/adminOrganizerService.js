import api from './api'

export const adminOrganizerService = {
  async applications(status = 'pending') {
    const { data } = await api.get('/admin/organizers', { params: { status } })
    return data.data
  },
  async review(id, action) {
    const { data } = await api.post(`/admin/organizers/${id}/${action}`)
    return data.data
  },
}
