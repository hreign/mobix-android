import '@/styles/global.scss'
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import router, { setAuthRequired } from './router'
import i18n from './i18n'
import { getLang } from './api/i18n'
import type { LangCode } from './types'

const app = createApp(App)
app.use(naive)
app.use(router)
app.use(i18n)

app.config.errorHandler = (err) => {
  console.error('全局错误:', err)
}

window.addEventListener('unhandledrejection', (e) => {
  console.error('未捕获 Promise 异常:', e.reason)
})

window.addEventListener('mobix:unauthorized', () => {
  sessionStorage.removeItem('mobix_password')
  setAuthRequired(true)
  router.push('/login')
})

;(async () => {
  try {
    const res = await getLang()
    i18n.global.locale.value = res.lang as LangCode
    await router.push('/status')
  } catch {
    setAuthRequired(true)
    await router.push('/login')
  }
  app.mount('#app')
})()
