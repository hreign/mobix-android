import { readFileSync, writeFileSync, existsSync, chmodSync, openSync, closeSync, renameSync, unlinkSync } from 'node:fs'
import { CONFIG_PATH } from './paths'
import { ensureMobixDir } from './paths'
import { encryptPassword, decryptPassword } from './crypto'
import type { MobixConfig, RuntimeConfig } from './types'

const DEFAULT_PORT = 7788

function defaultConfig(): MobixConfig {
  return { version: 1, port: undefined, password: null }
}

export function readConfig(): MobixConfig {
  if (!existsSync(CONFIG_PATH)) return defaultConfig()
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf-8')
    const cfg = JSON.parse(raw) as MobixConfig
    return { version: cfg.version ?? 1, port: cfg.port, password: cfg.password ?? null }
  } catch {
    throw new Error('配置文件损坏，请通过 mobix pwd/port 重新设置')
  }
}

function atomicWrite(path: string, content: string): void {
  ensureMobixDir()
  const tmp = path + '.tmp'
  const fd = openSync(tmp, 'w')
  writeFileSync(fd, content)
  closeSync(fd)
  chmodSync(tmp, 0o600)
  renameSync(tmp, path)
  chmodSync(path, 0o600)
}

export function writeConfig(cfg: MobixConfig): void {
  atomicWrite(CONFIG_PATH, JSON.stringify(cfg, null, 2))
}

export function getRuntimeConfig(): RuntimeConfig {
  let cfg: MobixConfig
  try {
    cfg = readConfig()
  } catch {
    cfg = defaultConfig()
  }

  const port = cfg.port ?? Number(process.env.PORT ?? DEFAULT_PORT)
  let password = ''
  if (cfg.password) {
    try {
      password = decryptPassword(cfg.password)
    } catch {
      password = ''
    }
  } else if (process.env.MOBIX_PASSWORD) {
    password = process.env.MOBIX_PASSWORD
  }

  return { port, password, hasPassword: !!password }
}

export function setPort(port: number): void {
  const cfg = readConfig()
  cfg.port = port
  writeConfig(cfg)
}

export function setPassword(plain: string): void {
  const cfg = readConfig()
  cfg.password = plain ? encryptPassword(plain) : null
  writeConfig(cfg)
}
