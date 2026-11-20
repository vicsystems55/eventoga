import api from './api'

export const importService = {
  async preview(file) {
    const { data } = await api.post('/admin/imports', file, {
      headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'X-File-Name': file.name },
    })
    return data.data
  },
  async confirm(batchId) {
    const { data } = await api.post(`/admin/imports/${batchId}/confirm`)
    return data.data
  },
  async history() {
    const { data } = await api.get('/admin/imports')
    return data.data
  },
  async rejectedRows(batchId) {
    const { data } = await api.get(`/admin/imports/${batchId}/rejections.csv`, { responseType: 'blob' })
    return data
  },
}
