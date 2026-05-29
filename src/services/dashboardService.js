// src/services/dashboardService.js
import api from './api'

export const dashboardService = {
  async getAdminDashboardStats() {
    const { data } = await api.get('/admin/dashboard/stats')
    return data.data
  },
}