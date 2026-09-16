import { FastifyPluginAsync } from 'fastify'
import { executeCommand } from '../termux/wrapper'
import { ok, fail } from '../response'
import { mapCallType } from '../i18n/enums'
import type { LangCode } from '../i18n/locale'

function getLang(app: any): LangCode {
  return (app.lang as LangCode) ?? 'en'
}

export const callLogRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/call-log', async () => {
    try {
      const lang = getLang(app)
      const raw = await executeCommand('termux-call-log')
      const list = Array.isArray(raw)
        ? [...raw]
            .map((c: Record<string, unknown>) => {
              const type = (c?.type as string) ?? ''
              const originalName = (c?.name as string) ?? ''
              const phoneNumber = (c?.phone_number as string) ?? ''
              const isUnknown = !originalName || originalName === 'UNKNOWN_CALLER'
              return {
                name: isUnknown && phoneNumber ? phoneNumber : originalName,
                phoneNumber,
                type,
                typeLabel: mapCallType(lang, type),
                date: (c?.date as string) ?? '',
                duration: (c?.duration as string) ?? '-',
                isUnknown,
              }
            })
            .sort((a, b) => String(b.date).localeCompare(String(a.date)))
        : []
      return ok({ list })
    } catch (e) {
      return fail(e)
    }
  })
}
