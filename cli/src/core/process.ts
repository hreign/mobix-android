import { existsSync, readFileSync, writeFileSync, unlinkSync, chmodSync, openSync, closeSync, renameSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { PID_PATH, ensureMobixDir } from './paths'
import type { RuntimeConfig } from './types'

export function readPid(): number | null {
  if (!existsSync(PID_PATH)) return null
  try {
    const raw = readFileSync(PID_PATH, 'utf-8').trim()
    const pid = parseInt(raw, 10)
    return Number.isInteger(pid) && pid > 0 ? pid : null
  } catch {
    return null
  }
}

export function writePid(pid: number): void {
  ensureMobixDir()
  const tmp = PID_PATH + '.tmp'
  const fd = openSync(tmp, 'w')
  writeFileSync(fd, String(pid))
  closeSync(fd)
  chmodSync(tmp, 0o600)
  renameSync(tmp, PID_PATH)
  chmodSync(PID_PATH, 0o600)
}

export function removePid(): void {
  try {
    unlinkSync(PID_PATH)
  } catch {
    // 文件不存在时静默
    // Silently ignore if file does not exist
  }
}

export function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

export async function killProcess(pid: number, timeoutMs = 3000): Promise<boolean> {
  try {
    process.kill(pid, 'SIGTERM')
  } catch {
    return true
  }
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    if (!isAlive(pid)) return true
    await new Promise((r) => setTimeout(r, 100))
  }
  return false
}

function resolveServerPath(): string {
  const candidates = [
    resolve(__dirname, '../../server.js'),
    resolve(__dirname, '../../../app/dist/server.js'),
    resolve(__dirname, '../../../dist/server.js'),
  ]
  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  throw new Error('未找到后端服务文件，请先执行构建')
}

export async function startServer(config: RuntimeConfig): Promise<number> {
  const serverPath = resolveServerPath()
  const env: Record<string, string> = {
    ...process.env,
    NODE_ENV: 'production',
    PORT: String(config.port),
  }
  if (config.password) {
    env.MOBIX_PASSWORD = config.password
  } else {
    delete env.MOBIX_PASSWORD
  }

  const child = spawn(process.execPath, [serverPath], {
    detached: true,
    stdio: 'ignore',
    env,
  })
  child.unref()

  await new Promise((r) => setTimeout(r, 500))
  if (!isAlive(child.pid!)) {
    throw new Error(`服务启动失败，端口 ${config.port} 可能被占用，请通过 mobix port 修改端口`)
  }

  return child.pid!
}
