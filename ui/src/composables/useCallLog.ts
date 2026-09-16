import { ref } from 'vue'
import { getCallLog } from '@/api/callLog'
import type { CallLogRecord } from '@/types'

export function useCallLog() {
  const list = ref<CallLogRecord[]>([])
  const loading = ref(false)
  const error = ref('')

  async function refresh() {
    loading.value = true
    error.value = ''
    try {
      const res = await getCallLog()
      list.value = res.list
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return { list, loading, error, refresh }
}
