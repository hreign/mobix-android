import { readPid, writePid, removePid, isAlive, startServer } from '../core/process'
import { getRuntimeConfig } from '../core/config'
import { ok, fail } from '../core/output'
import { t } from '../i18n'

export async function start(opts?: { port?: number }): Promise<void> {
  const existingPid = readPid()
  if (existingPid && isAlive(existingPid)) {
    const cfg = getRuntimeConfig()
    ok(t('serviceRunning', { port: cfg.port }))
    return
  }
  if (existingPid) {
    removePid()
  }

  const cfg = getRuntimeConfig()
  if (opts?.port) {
    cfg.port = opts.port
  }

  try {
    const pid = await startServer(cfg)
    writePid(pid)
    ok(t('serviceStarted', { port: cfg.port, pid }))
  } catch (e) {
    fail((e as Error).message)
  }
}
