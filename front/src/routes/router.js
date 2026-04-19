import { createWebHistory, createRouter } from 'vue-router'

import GameTable from '@/views/GameTable.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/Register', component: Register },
  { path: '/Login', component: Login },
  { path: '/GameTable', component: GameTable }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})