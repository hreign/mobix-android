import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthRequired = ref(false)

export function useAuth() {
  const router = useRouter()

  function getPassword(): string {
    try {
      return sessionStorage.getItem('mobix_password') ?? ''
    } catch {
      return ''
    }
  }

  function setPassword(pwd: string) {
    try {
      sessionStorage.setItem('mobix_password', pwd)
    } catch {
    }
  }

  function clearPassword() {
    try {
      sessionStorage.removeItem('mobix_password')
    } catch {
    }
  }

  function onUnauthorized() {
    clearPassword()
    isAuthRequired.value = true
    router.push('/login')
  }

  return { isAuthRequired, getPassword, setPassword, clearPassword, onUnauthorized }
}
