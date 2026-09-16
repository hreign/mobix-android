import { ref } from 'vue'
import { getSmsList, sendSms } from '@/api/sms'
import { getContacts } from '@/api/contact'
import type { SmsRecord, Contact } from '@/types'

const PHONE_RE = /^\+?\d{3,15}$/

export type SendState = 'idle' | 'invalid' | 'pending' | 'sending' | 'success' | 'failed'
export type BoxType = 'inbox' | 'sent'

export function useSms() {
  const list = ref<SmsRecord[]>([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(20)
  const loading = ref(false)
  const error = ref('')
  const boxType = ref<BoxType>('inbox')

  const contacts = ref<Contact[]>([])
  const contactsLoading = ref(false)
  const contactsError = ref('')

  const sendState = ref<SendState>('idle')
  const sendError = ref('')

  async function refreshSmsList() {
    loading.value = true
    error.value = ''
    try {
      const res = await getSmsList(boxType.value, page.value, pageSize.value)
      list.value = res.list
      total.value = res.total
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  function setBoxType(t: BoxType) {
    if (boxType.value === t) return
    boxType.value = t
    page.value = 1
    refreshSmsList()
  }

  async function loadContacts() {
    contactsLoading.value = true
    contactsError.value = ''
    try {
      const res = await getContacts()
      contacts.value = res.list
    } catch (e) {
      contactsError.value = (e as Error).message
    } finally {
      contactsLoading.value = false
    }
  }

  function validateNumber(n: string) {
    return PHONE_RE.test(n)
  }
  function validateContent(c: string) {
    return c.length > 0 && c.length <= 1000
  }

  async function submitSend(number: string, content: string) {
    sendState.value = 'sending'
    sendError.value = ''
    try {
      await sendSms(number, content)
      sendState.value = 'success'
    } catch (e) {
      sendState.value = 'failed'
      sendError.value = (e as Error).message
    }
  }

  function resetSend() {
    sendState.value = 'idle'
    sendError.value = ''
  }

  return {
    list, total, page, pageSize, loading, error, boxType,
    contacts, contactsLoading, contactsError,
    sendState, sendError,
    refreshSmsList, setBoxType, loadContacts, validateNumber, validateContent, submitSend, resetSend,
  }
}
