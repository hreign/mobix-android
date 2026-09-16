import { execSync } from 'node:child_process'
import { logger } from '../logger'

export const SUPPORTED_LANGS = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'ru'] as const
export type LangCode = (typeof SUPPORTED_LANGS)[number]

type ExecFn = (cmd: string) => string

const defaultExecFn: ExecFn = (cmd) => execSync(cmd, { encoding: 'utf-8', timeout: 5000 }).trim()

function resolveLang(raw: string): string {
  const main = raw.split('-')[0].toLowerCase()
  return (SUPPORTED_LANGS as readonly string[]).includes(main) ? main : 'en'
}

export function detectLocale(execFn: ExecFn = defaultExecFn): LangCode {
  try {
    const locale = execFn('getprop persist.sys.locale')
    if (locale) {
      return resolveLang(locale) as LangCode
    }
  } catch {
    // 回退至旧版探测方式
    // Fallback to legacy detection
  }

  try {
    const lang = execFn('getprop persist.sys.language')
    if (lang) {
      return resolveLang(lang) as LangCode
    }
  } catch {
    // 回退至默认英语
    // Fallback to default English
  }

  logger.warn({ locale: 'en' }, '系统语言探测失败，回退英语')
  return 'en'
}
