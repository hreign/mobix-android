import { TermuxError } from './termux/errors'

export interface ApiEnvelope<T = any> {
  code: number
  data: T | null
  message: string
  errorType?: string
}

export function ok<T>(data: T, message = 'ok'): ApiEnvelope<T> {
  return { code: 0, data, message }
}

export function fail(err: unknown): ApiEnvelope {
  if (err instanceof TermuxError) {
    return { code: err.code, data: null, message: err.message, errorType: err.errorType }
  }
  if (err instanceof Error) {
    return { code: 5000, data: null, message: err.message, errorType: 'INTERNAL_ERROR' }
  }
  return { code: 5000, data: null, message: '内部错误', errorType: 'INTERNAL_ERROR' }
}
