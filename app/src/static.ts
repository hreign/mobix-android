import { FastifyPluginAsync } from 'fastify'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'

function resolveStaticDir(): string {
  const envDir = process.env.MOBIX_STATIC_DIR
  if (envDir && existsSync(envDir)) return envDir

  const candidates = [
    resolve(__dirname, '..', 'public'),
    resolve(__dirname, 'public'),
  ]
  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  return resolve(__dirname, '..', 'public')
}

export const staticPlugin: FastifyPluginAsync = async (app) => {
  const fastifyStatic = (await import('@fastify/static')).default
  await app.register(fastifyStatic, {
    root: resolveStaticDir(),
    prefix: '/',
    wildcard: false,
  })
  app.setNotFoundHandler((req, reply) => {
    if (req.method === 'GET' && !req.url.startsWith('/api')) {
      return reply.sendFile('index.html')
    }
    return reply.code(404).send({ code: 404, data: null, message: '未找到' })
  })
}
