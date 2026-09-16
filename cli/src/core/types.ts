export interface EncryptedPassword {
  algorithm: string
  iv: string
  data: string
}

export interface MobixConfig {
  version: number
  port?: number
  password?: EncryptedPassword | null
}

export interface RuntimeConfig {
  port: number
  password: string
  hasPassword: boolean
}
