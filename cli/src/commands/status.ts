import { readPid, removePid, isAlive } from '../core/process'
import { getRuntimeConfig } from '../core/config'
import { ok } from '../core/output'
import { t } from '../i18n'

export async function status(): Promise<void> {
  const pid = readPid()
  if (!pid || !isAlive(pid)) {
    if (pid) removePid()
    ok(t('statusStopped'))
    return
  }
  const cfg = getRuntimeConfig()
  ok(t('statusRunning', { pid, port: cfg.port }))
}
