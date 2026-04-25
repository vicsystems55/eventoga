import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  // router/index.js
{
  path: '/auth',
  name: 'Auth',
  component: () => import('../pages/authPage.vue')
},
{
  path: '/events',
  name: 'Events',
  component: () => import('../pages/eventsPage.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router