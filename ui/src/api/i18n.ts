import { httpGet } from './http'
import type { LangCode } from '@/types'

export function getLang(): Promise<{ lang: LangCode }> {
  return httpGet<{ lang: LangCode }>('/i18n/lang')
}
