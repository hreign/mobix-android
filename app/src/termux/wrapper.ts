import { exec } from 'node:child_process'
import { logger } from '../logger'
import {
  CommandExecutionError,
  CommandNotInstalledError,
  CommandTimeoutError,
  OutputParseError,
} from './errors'
import { getTimeout } from './timeout'

function shellEscape(arg: string): string {
  if (/^[A-Za-z0-9_\-./:=@]+$/.test(arg)) return arg
  return `'${arg.replace(/'/g, "'\\''")}'`
}

function buildCommand(commandName: string, args: string[]): string {
  return [commandName, ...args.map(shellEscape)].join(' ')
}

export async function executeCommand(
  commandName: string,
  args: string[] = [],
  timeout?: number,
): Promise<any> {
  const timeoutMs = timeout ?? getTimeout(commandName)
  const cmd = buildCommand(commandName, args)
  const start = Date.now()

  return new Promise((resolve, reject) => {
    let settled = false
    const child = exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      const durationMs = Date.now() - start

      if (err) {
        const code = (err as NodeJS.ErrnoException).code
        if (code === 'ENOENT') {
          logger.error({ commandName }, '命令未安装')
          return reject(new CommandNotInstalledError(commandName))
        }
        if (err.killed && err.signal === 'SIGTERM') {
          logger.error({ commandName, timeoutMs }, '命令执行超时')
          return reject(new CommandTimeoutError(commandName, timeoutMs))
        }
        logger.error({ commandName, exitCode: err.code, stderr, durationMs }, '命令执行失败')
        return reject(new CommandExecutionError(Number(err.code ?? -1), stderr))
      }

      logger.info({ commandName, durationMs, exitCode: 0 }, '命令执行完成')

      if (commandName === 'termux-sms-send' && !stdout.trim()) {
        return resolve({ success: true })
      }

      try {
        resolve(JSON.parse(stdout))
      } catch {
        logger.error({ commandName, rawSnippet: stdout.slice(0, 500) }, '命令输出解析失败')
        reject(new OutputParseError(stdout.slice(0, 500)))
      }
    })

    const timer = setTimeout(() => {
      if (!settled) child.kill('SIGTERM')
    }, timeoutMs)
  })
}
