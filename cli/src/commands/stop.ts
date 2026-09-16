import { readPid, removePid, isAlive, killProcess } from '../core/process'
import { ok, fail } from '../core/output'
import { t } from '../i18n'

export async function stop(): Promise<void> {
  const pid = readPid()
  if (!pid) {
    ok(t('serviceNotRunning'))
    return
  }
  if (!isAlive(pid)) {
    removePid()
    ok(t('serviceNotRunning'))
    return
  }
  const success = await killProcess(pid)
  if (success) {
    removePid()
    ok(t('serviceStopped'))
  } else {
    fail(t('serviceStopFailed', { pid }))
  }
}
