import { FastifyPluginAsync } from 'fastify'
import { VITE_PORT } from './config'

export const proxyPlugin: FastifyPluginAsync = async (app) => {
  const proxy = (await import('@fastify/http-proxy')).default
  await app.register(proxy, {
    upstream: `http://127.0.0.1:${VITE_PORT}`,
    prefix: '/',
    rewritePrefix: '/',
  })
}
