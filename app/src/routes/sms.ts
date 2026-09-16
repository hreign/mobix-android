import { FastifyPluginAsync } from 'fastify'
import { executeCommand } from '../termux/wrapper'
import { ok, fail } from '../response'
import { ValidationError } from '../termux/errors'

const PHONE_RE = /^\+?\d{3,15}$/
const SENT_TYPES = new Set(['sent', 'draft', 'outbox', 'failed', 'queued'])

export const smsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/sms/list', async (req) => {
    try {
      const q = req.query as Record<string, string | undefined>
      let page = Number(q.page)
      let pageSize = Number(q.pageSize)
      if (!Number.isInteger(page) || page < 1) page = 1
      if (!Number.isInteger(pageSize) || pageSize < 1) pageSize = 20
      if (pageSize > 100) pageSize = 100

      const boxType = q.type === 'sent' ? 'sent' : 'inbox'

      const all = await executeCommand('termux-sms-list')
      const filtered = (Array.isArray(all) ? all : []).filter((item: Record<string, unknown>) => {
        const t = (item?.type as string) ?? ''
        if (boxType === 'sent') return SENT_TYPES.has(t)
        return t === 'inbox' || !SENT_TYPES.has(t)
      })
      const list = [...filtered].sort((a, b) => String(b.received).localeCompare(String(a.received)))
      const total = list.length
      const start = (page - 1) * pageSize
      const slice = list.slice(start, start + pageSize)
      return ok({ list: slice, total, page, pageSize })
    } catch (e) {
      return fail(e)
    }
  })

  app.post('/api/sms/send', async (req) => {
    try {
      const { number, content } = (req.body as Record<string, unknown>) ?? {}
      if (typeof number !== 'string' || !PHONE_RE.test(number)) {
        return fail(new ValidationError('number', '号码格式不正确'))
      }
      if (typeof content !== 'string' || content.length === 0) {
        return fail(new ValidationError('content', '短信内容不能为空'))
      }
      if (content.length > 1000) {
        return fail(new ValidationError('content', '短信内容不能超过 1000 字'))
      }
      await executeCommand('termux-sms-send', ['-n', number, content])
      return ok({ success: true })
    } catch (e) {
      return fail(e)
    }
  })
}
