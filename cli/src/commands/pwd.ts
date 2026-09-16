import { readConfig, setPassword } from '../core/config'
import { ok, fail } from '../core/output'
import { t } from '../i18n'

export async function pwd(password?: string): Promise<void> {
  if (password === undefined) {
    try {
      const cfg = readConfig()
      ok(cfg.password ? t('pwdStatusSet') : t('pwdStatusUnset'))
    } catch (e) {
      fail((e as Error).message)
    }
    return
  }
  try {
    setPassword(password)
    if (password) {
      ok(t('pwdSet'))
    } else {
      ok(t('pwdCleared'))
    }
  } catch (e) {
    fail((e as Error).message)
  }
}
