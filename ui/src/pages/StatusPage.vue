<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStatus } from '@/composables/useStatus'
import ErrorBanner from '@/components/ErrorBanner.vue'

const { t } = useI18n()
const {
  network, sim, battery,
  networkLoading, simLoading, batteryLoading,
  networkError, simError, batteryError,
  refreshAll, refreshNetwork, refreshSim, refreshBattery,
} = useStatus()

onMounted(() => refreshAll())
</script>

<template>
  <div class="status-grid">
    <n-card class="status-card status-card--wide" :title="t('status.networkTitle')">
      <template #header-extra>
        <n-button size="small" :loading="networkLoading" @click="refreshNetwork">{{ t('common.refresh') }}</n-button>
      </template>
      <ErrorBanner v-if="networkError" :message="networkError" retryable @retry="refreshNetwork" />
      <n-spin :show="networkLoading">
        <n-descriptions v-if="network" :column="2" bordered>
          <n-descriptions-item :label="t('status.ssid')">{{ network.ssid }}</n-descriptions-item>
          <n-descriptions-item :label="t('status.ip')">{{ network.ip }}</n-descriptions-item>
          <n-descriptions-item :label="t('status.rssi')">{{ network.rssi ?? '-' }} dBm</n-descriptions-item>
          <n-descriptions-item :label="t('status.linkSpeed')">{{ network.linkSpeedMbps ?? '-' }} Mbps</n-descriptions-item>
        </n-descriptions>
      </n-spin>
    </n-card>

    <n-card class="status-card" :title="t('status.simTitle')">
      <template #header-extra>
        <n-button size="small" :loading="simLoading" @click="refreshSim">{{ t('common.refresh') }}</n-button>
      </template>
      <ErrorBanner v-if="simError" :message="simError" retryable @retry="refreshSim" />
      <n-spin :show="simLoading">
        <n-descriptions v-if="sim" :column="2" bordered>
          <n-descriptions-item :label="t('status.operator')">{{ sim.simOperatorName }}</n-descriptions-item>
          <n-descriptions-item :label="t('status.simState')">{{ sim.simStateText }}</n-descriptions-item>
        </n-descriptions>
      </n-spin>
    </n-card>

    <n-card class="status-card" :title="t('status.batteryTitle')">
      <template #header-extra>
        <n-button size="small" :loading="batteryLoading" @click="refreshBattery">{{ t('common.refresh') }}</n-button>
      </template>
      <ErrorBanner v-if="batteryError" :message="batteryError" retryable @retry="refreshBattery" />
      <n-spin :show="batteryLoading">
        <n-descriptions v-if="battery" :column="2" bordered>
          <n-descriptions-item :label="t('status.percentage')">{{ battery.percentage ?? '-' }}%</n-descriptions-item>
          <n-descriptions-item :label="t('status.temperature')">{{ battery.temperature ?? '-' }} ℃</n-descriptions-item>
          <n-descriptions-item :label="t('status.chargeStatus')">{{ battery.statusText }}</n-descriptions-item>
          <n-descriptions-item :label="t('status.powerConnection')">{{ battery.pluggedText }}</n-descriptions-item>
        </n-descriptions>
      </n-spin>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.status-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: $spacing-lg $spacing-md;
}

.status-card--wide {
  grid-column: 1 / -1;
}

@media (max-width: 1280px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .status-card--wide {
    grid-column: auto;
  }
}
</style>
