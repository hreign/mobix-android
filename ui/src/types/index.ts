export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
  errorType?: string
}

export type LangCode = 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru'

export interface NetworkStatus {
  ssid: string
  ip: string
  rssi: number | null
  linkSpeedMbps: number | null
}

export interface SimStatus {
  simOperatorName: string
  simState: string
  simStateText: string
}

export interface BatteryStatus {
  percentage: number | null
  temperature: number | null
  status: string
  plugged: string
  statusText: string
  pluggedText: string
}

export interface SmsRecord {
  threadid?: number
  type?: string
  read?: boolean
  address?: string
  number?: string
  received?: string
  body?: string
  _id?: number
}

export interface SmsPageResult {
  list: SmsRecord[]
  total: number
  page: number
  pageSize: number
}

export interface Contact {
  name: string
  number: string
}

export interface CallLogRecord {
  name: string
  phoneNumber: string
  type: string
  typeLabel: string
  date: string
  duration: string
  isUnknown: boolean
}

export interface SendSmsRequest {
  number: string
  content: string
}

export class ApiError extends Error {
  constructor(
    public code: number,
    public errorType: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
