import { createMemoryHistory, createRouter } from 'vue-router'

import GameTable from '@/views/GameTable.vue'

const routes = [
  { path: '/', component: GameTable },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})