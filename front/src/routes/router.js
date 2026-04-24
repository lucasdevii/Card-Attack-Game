import { createWebHistory, createRouter } from 'vue-router'

import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  { path: '/game', component: Dashboard },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})