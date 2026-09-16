import { FastifyPluginAsync } from 'fastify'
import { ok } from '../response'
import type { LangCode } from '../i18n/locale'

export const i18nRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/i18n/lang', async () => {
    return ok({ lang: (app as any).lang as LangCode })
  })
}
