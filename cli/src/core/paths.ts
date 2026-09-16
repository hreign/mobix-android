import { homedir } from 'node:os'
import { join } from 'node:path'
import { mkdirSync } from 'node:fs'

export const MOBIX_DIR = join(homedir(), '.mobix')
export const CONFIG_PATH = join(MOBIX_DIR, 'config.json')
export const PID_PATH = join(MOBIX_DIR, 'mobix.pid')

export function ensureMobixDir(): void {
  mkdirSync(MOBIX_DIR, { recursive: true })
}
