import { readPid, removePid, isAlive, killProcess, startServer, writePid } from '../core/process'
import { getRuntimeConfig } from '../core/config'
import { ok, fail } from '../core/output'
import { t } from '../i18n'

export async function restart(): Promise<void> {
  const pid = readPid()
  if (pid && isAlive(pid)) {
    const success = await killProcess(pid)
    if (!success) {
      fail(t('serviceStopFailed', { pid }))
    }
  }
  if (pid) removePid()

  const cfg = getRuntimeConfig()
  try {
    const newPid = await startServer(cfg)
    writePid(newPid)
    ok(t('serviceRestarted', { port: cfg.port, pid: newPid }))
  } catch (e) {
    fail((e as Error).message)
  }
}
