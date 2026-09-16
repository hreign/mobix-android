import { help } from './commands/help'
import { start } from './commands/start'
import { stop } from './commands/stop'
import { status } from './commands/status'
import { restart } from './commands/restart'
import { pwd } from './commands/pwd'
import { port } from './commands/port'
import { t } from './i18n'

const MIN_NODE_VERSION = 18

function checkNodeVersion(): void {
  const major = parseInt(process.versions.node.split('.')[0], 10)
  if (major < MIN_NODE_VERSION) {
    console.error(t('nodeVersionRequired', { min: MIN_NODE_VERSION, current: process.versions.node }))
    process.exit(1)
  }
}

async function main(): Promise<void> {
  checkNodeVersion()

  const args = process.argv.slice(2)
  const command = args[0]

  if (!command || command === '-h' || command === '--help') {
    help()
    return
  }

  if (command === 'help') {
    help(args[1])
    return
  }

  const rest = args.slice(1)

  switch (command) {
    case 'start': {
      let port: number | undefined
      for (let i = 0; i < rest.length; i++) {
        if (rest[i] === '--port' && rest[i + 1]) {
          port = parseInt(rest[i + 1], 10)
        }
      }
      await start({ port })
      break
    }
    case 'stop':
      await stop()
      break
    case 'status':
      await status()
      break
    case 'restart':
      await restart()
      break
    case 'pwd':
      await pwd(rest[0])
      break
    case 'port':
      await port(rest[0])
      break
    default:
      console.error(t('unknownCommand', { command }))
      console.error('')
      help()
      process.exit(1)
  }
}

main().catch((e) => {
  console.error((e as Error).message)
  process.exit(1)
})
