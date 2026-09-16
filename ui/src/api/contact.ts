import { httpGet } from './http'
import type { Contact } from '@/types'

export function getContacts(): Promise<{ list: Contact[] }> {
  return httpGet<{ list: Contact[] }>('/contacts')
}
