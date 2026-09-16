import { scryptSync, createDecipheriv } from 'node:crypto'
import { userInfo } from 'node:os'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { logger } from './logger'

const SALT = 'mobix-static-salt-v1'
const CONFIG_PATH = join(homedir(), '.mobix', 'config.json')
const DEFAULT_PORT = 7788

interface EncryptedPassword {
  algorithm: string
  iv: string
  data: string
}

interface MobixConfig {
  version: number
  port?: number
  password?: EncryptedPassword | null
}

export interface RuntimeConfig {
  port: number
  password: string
}

function deriveKey(): Buffer {
  return scryptSync(SALT, userInfo().username || 'mobix', 32)
}

function decryptPassword(enc: EncryptedPassword): string {
  try {
    const iv = Buffer.from(enc.iv, 'base64')
    const data = Buffer.from(enc.data, 'base64')
    const key = deriveKey()
    const authTag = data.subarray(data.length - 16)
    const ciphertext = data.subarray(0, data.length - 16)
    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
  } catch {
    return ''
  }
}

function readConfigFile(): MobixConfig | null {
  if (!existsSync(CONFIG_PATH)) return null
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, 'utf-8')) as MobixConfig
  } catch {
    logger.warn('配置文件损坏，回退默认配置')
    return null
  }
}

export function loadConfig(): RuntimeConfig {
  const cfg = readConfigFile()

  const port = cfg?.port ?? Number(process.env.PORT ?? DEFAULT_PORT)
  let password = ''
  if (cfg?.password) {
    password = decryptPassword(cfg.password)
  } else if (process.env.MOBIX_PASSWORD) {
    password = process.env.MOBIX_PASSWORD
  }

  return { port, password }
}
