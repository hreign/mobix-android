import { httpGet } from './http'
import type { NetworkStatus, SimStatus, BatteryStatus } from '@/types'

export function getNetworkStatus(): Promise<NetworkStatus> {
  return httpGet<NetworkStatus>('/status/network')
}

export function getSimStatus(): Promise<SimStatus> {
  return httpGet<SimStatus>('/status/sim')
}

export function getBatteryStatus(): Promise<BatteryStatus> {
  return httpGet<BatteryStatus>('/status/battery')
}
