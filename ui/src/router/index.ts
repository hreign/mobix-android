import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

let authRequired = false
export function setAuthRequired(v: boolean) {
  authRequired = v
}

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/status' },
  { path: '/login', name: 'login', component: () => import('@/pages/LoginPage.vue') },
  { path: '/status', name: 'status', component: () => import('@/pages/StatusPage.vue') },
  { path: '/sms', name: 'sms', component: () => import('@/pages/SmsPage.vue') },
  { path: '/call-log', name: 'callLog', component: () => import('@/pages/CallLogPage.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const pwd = sessionStorage.getItem('mobix_password')
  if (to.path === '/login') {
    if (pwd) return '/status'
    return true
  }
  if (authRequired && !pwd) return '/login'
  return true
})

export default router
