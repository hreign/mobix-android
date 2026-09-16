import Fastify from 'fastify'
import { logger } from './logger'
import { isDev } from './config'
import { loadConfig } from './config-loader'
import { detectLocale } from './i18n/locale'
import { statusRoutes } from './routes/status'
import { smsRoutes } from './routes/sms'
import { contactRoutes } from './routes/contact'
import { callLogRoutes } from './routes/callLog'
import { i18nRoutes } from './routes/i18n'
import { staticPlugin } from './static'
import { proxyPlugin } from './proxy'
import { fail } from './response'
import { InternalError, UnauthorizedError } from './termux/errors'

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

async function main() {
  const { port, password } = loadConfig()

  const app = Fastify({ logger: false })

  const lang = detectLocale()
  app.decorate('lang', lang)
  logger.info({ lang }, '系统语言探测完成')

  if (password) {
    app.addHook('onRequest', async (req, reply) => {
      if (!req.url.startsWith('/api/')) return
      const pwd = (req.headers['x-access-password'] as string) ?? ''
      if (!safeEqual(pwd, password)) {
        return reply.code(401).send(fail(new UnauthorizedError()))
      }
    })
    logger.info('已启用访问密码保护')
  } else {
    logger.warn('未设置访问密码，免密访问')
  }

  app.setErrorHandler((err, _req, reply) => {
    logger.error({ err }, '未捕获异常')
    const message = err instanceof Error ? err.message : '内部错误'
    return reply.send(fail(new InternalError(message)))
  })

  await app.register(i18nRoutes)
  await app.register(statusRoutes)
  await app.register(smsRoutes)
  await app.register(contactRoutes)
  await app.register(callLogRoutes)

  if (isDev) {
    await app.register(proxyPlugin)
  } else {
    await app.register(staticPlugin)
  }

  await app.listen({ host: '0.0.0.0', port })
  logger.info(
    { mode: isDev ? 'development' : 'production', url: `http://0.0.0.0:${port}` },
    'Mobix 后端服务已启动',
  )
}

main().catch((err) => {
  logger.error({ err }, '启动失败')
  process.exit(1)
})
