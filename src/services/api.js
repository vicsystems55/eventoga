import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:6969/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
let refreshPromise = null
const clearSession = () => {
  localStorage.removeItem('eventoga_token')
  localStorage.removeItem('eventoga_refresh_token')
  localStorage.removeItem('eventoga_user')
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eventoga_token')

    // allow skipping auth manually
    if (config.skipAuth) {
      return config
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status !== 401 || !original || original._retried || original.url?.includes('/login') || original.url?.includes('/refresh')) return Promise.reject(error)
    const refreshToken = localStorage.getItem('eventoga_refresh_token')
    if (!refreshToken) { clearSession(); return Promise.reject(error) }
    original._retried = true
    try {
      refreshPromise ??= axios.post(`${api.defaults.baseURL.replace(/\/$/, '')}/refresh`, { refresh_token: refreshToken })
        .finally(() => { refreshPromise = null })
      const { data } = await refreshPromise
      localStorage.setItem('eventoga_token', data.token)
      localStorage.setItem('eventoga_refresh_token', data.refresh_token)
      original.headers.Authorization = `Bearer ${data.token}`
      return api(original)
    } catch (refreshError) {
      clearSession()
      return Promise.reject(refreshError)
    }
  }
)

export default api
