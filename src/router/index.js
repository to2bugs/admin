import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})

export default router
