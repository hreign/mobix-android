import { httpGet, httpPost } from './http'
import type { SmsPageResult } from '@/types'

export function getSmsList(type: 'inbox' | 'sent', page: number, pageSize: number): Promise<SmsPageResult> {
  return httpGet<SmsPageResult>(`/sms/list?type=${type}&page=${page}&pageSize=${pageSize}`)
}

export function sendSms(number: string, content: string): Promise<{ success: boolean }> {
  return httpPost<{ success: boolean }>('/sms/send', { number, content })
}
