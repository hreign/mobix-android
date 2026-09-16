export const DEFAULT_TIMEOUT_MS = 30000

export const COMMAND_TIMEOUT_OVERRIDES: Record<string, number> = {
  'termux-call-log': 60000,
}

export function getTimeout(commandName: string): number {
  return COMMAND_TIMEOUT_OVERRIDES[commandName] ?? DEFAULT_TIMEOUT_MS
}
