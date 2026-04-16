import { createWebHistory, createRouter } from 'vue-router'

import GameTable from '@/views/GameTable.vue'
import Register from '@/views/auth/Register.vue'

const routes = [
  { path: '/', component: Register },
  { path: '/Register', component: GameTable }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})