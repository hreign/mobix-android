import { randomBytes, scryptSync, createCipheriv, createDecipheriv } from 'node:crypto'
import { userInfo } from 'node:os'
import type { EncryptedPassword } from './types'

const SALT = 'mobix-static-salt-v1'
const KEY_LENGTH = 32
const IV_LENGTH = 12

function deriveKey(): Buffer {
  return scryptSync(SALT, userInfo().username || 'mobix', KEY_LENGTH)
}

export function encryptPassword(plain: string): EncryptedPassword {
  const iv = randomBytes(IV_LENGTH)
  const key = deriveKey()
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipherAesUpdate(cipher, plain), cipher.getAuthTag()])
  return {
    algorithm: 'aes-256-gcm',
    iv: iv.toString('base64'),
    data: encrypted.toString('base64'),
  }
}

function cipherAesUpdate(cipher: ReturnType<typeof createCipheriv>, data: string): Buffer {
  return Buffer.concat([cipher.update(data, 'utf8'), cipher.final()])
}

export function decryptPassword(enc: EncryptedPassword): string {
  const iv = Buffer.from(enc.iv, 'base64')
  const data = Buffer.from(enc.data, 'base64')
  const key = deriveKey()
  const authTag = data.subarray(data.length - 16)
  const ciphertext = data.subarray(0, data.length - 16)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)
  try {
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
  } catch {
    throw new Error('密码解密失败，配置文件可能已损坏')
  }
}
