import api from './api'

export const categoryService = {
  async getCategories() {
    const { data } = await api.get('/categories', {
      skipAuth: true,
    })

    return data.data
  },
}