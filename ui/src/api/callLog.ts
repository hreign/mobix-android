import { httpGet } from './http'
import type { CallLogRecord } from '@/types'

export function getCallLog(): Promise<{ list: CallLogRecord[] }> {
  return httpGet<{ list: CallLogRecord[] }>('/call-log', 65000)
}
