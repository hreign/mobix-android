import { readConfig, setPort } from '../core/config'
import { ok, fail } from '../core/output'
import { t } from '../i18n'

const DEFAULT_PORT = 7788

export async function port(value?: string): Promise<void> {
  if (value === undefined) {
    try {
      const cfg = readConfig()
      ok(t('currentPort', { port: cfg.port ?? DEFAULT_PORT }))
    } catch (e) {
      fail((e as Error).message)
    }
    return
  }
  const num = parseInt(value, 10)
  if (!Number.isInteger(num) || num < 1 || num > 65535) {
    fail(t('portInvalid'))
  }
  try {
    setPort(num)
    ok(t('portSet', { port: num }))
  } catch (e) {
    fail((e as Error).message)
  }
}
