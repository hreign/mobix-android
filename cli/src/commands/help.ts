import { t } from '../i18n'
import type { Messages } from '../i18n/locales'

const COMMAND_HELP_KEYS: (keyof Messages)[] = [
  'helpStart', 'helpStop', 'helpStatus', 'helpRestart', 'helpPwd', 'helpPort', 'helpHelp',
]

const COMMAND_NAMES = ['start', 'stop', 'status', 'restart', 'pwd', 'port', 'help']

export function help(command?: string): void {
  if (command) {
    const idx = COMMAND_NAMES.indexOf(command)
    if (idx >= 0) {
      console.log(t(COMMAND_HELP_KEYS[idx]))
    } else {
      console.log(t('helpUnknownCommand', { command }))
      console.log('')
      console.log(t('helpText'))
    }
  } else {
    console.log(t('helpText'))
  }
}
