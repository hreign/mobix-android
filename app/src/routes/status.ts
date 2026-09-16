import { FastifyPluginAsync } from 'fastify'
import { executeCommand } from '../termux/wrapper'
import { ok, fail } from '../response'
import { mapBatteryStatus, mapBatteryPlugged, mapSimState } from '../i18n/enums'
import type { LangCode } from '../i18n/locale'

const SIM_KNOWN_STATES = [
  'READY', 'ABSENT', 'PIN_REQUIRED', 'PUK_REQUIRED', 'NETWORK_LOCKED',
  'NOT_READY', 'PERM_DISABLED', 'CARD_IO_ERROR', 'CARD_RESTRICTED', 'UNKNOWN',
]

function getLang(app: any): LangCode {
  return (app.lang as LangCode) ?? 'en'
}

export const statusRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/status/network', async () => {
    try {
      const raw = await executeCommand('termux-wifi-connectioninfo')
      return ok({
        ssid: raw?.ssid ?? '未知',
        ip: raw?.ip ?? '-',
        rssi: raw?.rssi ?? null,
        linkSpeedMbps: raw?.link_speed_mbps ?? null,
      })
    } catch (e) {
      return fail(e)
    }
  })

  app.get('/api/status/sim', async () => {
    try {
      const raw = await executeCommand('termux-telephony-deviceinfo')
      const state = String(raw?.sim_state ?? '').toUpperCase()
      const lang = getLang(app)
      const simState = SIM_KNOWN_STATES.includes(state) ? state : 'UNKNOWN'
      return ok({
        simOperatorName: raw?.sim_operator_name ?? '未知',
        simState,
        simStateText: mapSimState(lang, simState),
      })
    } catch (e) {
      return fail(e)
    }
  })

  app.get('/api/status/battery', async () => {
    try {
      const raw = await executeCommand('termux-battery-status')
      const lang = getLang(app)
      const status = raw?.status ?? 'UNKNOWN'
      const plugged = raw?.plugged ?? 'UNKNOWN'
      return ok({
        percentage: raw?.percentage ?? null,
        temperature: raw?.temperature ?? null,
        status,
        plugged,
        statusText: mapBatteryStatus(lang, status),
        pluggedText: mapBatteryPlugged(lang, plugged),
      })
    } catch (e) {
      return fail(e)
    }
  })
}
