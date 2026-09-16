import { FastifyPluginAsync } from 'fastify'
import { executeCommand } from '../termux/wrapper'
import { ok, fail } from '../response'

export const contactRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/contacts', async () => {
    try {
      const raw = await executeCommand('termux-contact-list')
      const list = Array.isArray(raw)
        ? raw.map((c: Record<string, unknown>) => ({
            name: (c?.name as string) ?? '',
            number: (c?.number as string) ?? '',
          }))
        : []
      return ok({ list })
    } catch (e) {
      return fail(e)
    }
  })
}
