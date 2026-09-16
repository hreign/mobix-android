import { execSync } from 'node:child_process'
import { messages, type Lang, type Messages } from './locales'

const SUPPORTED_LANGS: readonly string[] = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'ru']

function resolveLang(raw: string): Lang {
  const main = raw.split('-')[0].toLowerCase()
  return (SUPPORTED_LANGS.includes(main) ? main : 'en') as Lang
}

function detectLang(): Lang {
  try {
    const locale = execSync('getprop persist.sys.locale', { encoding: 'utf-8', timeout: 5000 }).trim()
    if (locale) return resolveLang(locale)
  } catch {
    // 回退至旧版探测方式
    // Fallback to legacy detection
  }

  try {
    const lang = execSync('getprop persist.sys.language', { encoding: 'utf-8', timeout: 5000 }).trim()
    if (lang) return resolveLang(lang)
  } catch {
    // 回退至默认英语
    // Fallback to default English
  }

  return 'en'
}

const lang = detectLang()
const msgs: Messages = messages[lang]

export function t(key: keyof Messages, vars?: Record<string, string | number>): string {
  let msg = msgs[key]
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      msg = msg.replaceAll(`{${k}}`, String(v))
    }
  }
  return msg
}

export { lang }
