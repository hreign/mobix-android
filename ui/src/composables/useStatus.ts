import { ref } from 'vue'
import { getNetworkStatus, getSimStatus, getBatteryStatus } from '@/api/status'
import type { NetworkStatus, SimStatus, BatteryStatus } from '@/types'

export function useStatus() {
  const network = ref<NetworkStatus | null>(null)
  const sim = ref<SimStatus | null>(null)
  const battery = ref<BatteryStatus | null>(null)
  const networkLoading = ref(false)
  const simLoading = ref(false)
  const batteryLoading = ref(false)
  const networkError = ref('')
  const simError = ref('')
  const batteryError = ref('')

  async function refreshNetwork() {
    networkLoading.value = true
    networkError.value = ''
    try {
      network.value = await getNetworkStatus()
    } catch (e) {
      networkError.value = (e as Error).message
    } finally {
      networkLoading.value = false
    }
  }

  async function refreshSim() {
    simLoading.value = true
    simError.value = ''
    try {
      sim.value = await getSimStatus()
    } catch (e) {
      simError.value = (e as Error).message
    } finally {
      simLoading.value = false
    }
  }

  async function refreshBattery() {
    batteryLoading.value = true
    batteryError.value = ''
    try {
      battery.value = await getBatteryStatus()
    } catch (e) {
      batteryError.value = (e as Error).message
    } finally {
      batteryLoading.value = false
    }
  }

  async function refreshAll() {
    await Promise.all([refreshNetwork(), refreshSim(), refreshBattery()])
  }

  return {
    network, sim, battery,
    networkLoading, simLoading, batteryLoading,
    networkError, simError, batteryError,
    refreshNetwork, refreshSim, refreshBattery, refreshAll,
  }
}
