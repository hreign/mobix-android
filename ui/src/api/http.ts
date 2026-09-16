import { type ApiResponse, ApiError } from '@/types'
import i18n from '@/i18n'

const BASE = '/api'

function getPassword(): string {
  try {
    return sessionStorage.getItem('mobix_password') ?? ''
  } catch {
    return ''
  }
}

async function request<T>(url: string, init: RequestInit, timeoutMs: number): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const headers: Record<string, string> = { ...(init.headers as Record<string, string>) }
    const pwd = getPassword()
    if (pwd) headers['X-Access-Password'] = pwd
    const res = await fetch(url, { ...init, headers, signal: controller.signal })
    if (res.status === 401) {
      window.dispatchEvent(new CustomEvent('mobix:unauthorized'))
      throw new ApiError(4011, 'UNAUTHORIZED', i18n.global.t('error.unauthorized'))
    }
    const json: ApiResponse<T> = await res.json()
    if (json.code !== 0) {
      throw new ApiError(json.code, json.errorType ?? 'INTERNAL_ERROR', json.message)
    }
    return json.data
  } catch (e) {
    if (e instanceof ApiError) throw e
    throw new ApiError(5000, 'INTERNAL_ERROR', i18n.global.t('error.network'))
  } finally {
    clearTimeout(timer)
  }
}

export function httpGet<T>(path: string, timeoutMs = 35000): Promise<T> {
  return request<T>(BASE + path, { method: 'GET' }, timeoutMs)
}

export function httpPost<T>(path: string, body: unknown, timeoutMs = 35000): Promise<T> {
  return request<T>(
    BASE + path,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    timeoutMs,
  )
}
