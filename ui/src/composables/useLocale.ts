import i18n from '@/i18n'
import { getLang } from '@/api/i18n'
import type { LangCode } from '@/types'

export function useLocale() {
  async function init(): Promise<boolean> {
    try {
      const res = await getLang()
      i18n.global.locale.value = res.lang as LangCode
      return true
    } catch {
      return false
    }
  }

  return { init }
}
