import api from './api'

const TOKEN_KEY = 'eventoga_token'
const USER_KEY = 'eventoga_user'

export const authService = {
  async login(payload) {
    const { data } = await api.post('/login', payload, {
      skipAuth: true,
    })

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))
    }

    return data
  },

async register(payload) {
  const { data } = await api.post('/register', payload, {
    skipAuth: true,
  })

  if (data.token) {
    localStorage.setItem('eventoga_token', data.token)
    localStorage.setItem('eventoga_user', JSON.stringify(data.user))
  }

  return data
},

  async forgotPassword(payload) {
    return api.post('/forgot-password', payload, {
      skipAuth: true,
    })
  },

  async verifyOtp(payload) {
    return api.post('/verify-otp', payload, {
      skipAuth: true,
    })
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}