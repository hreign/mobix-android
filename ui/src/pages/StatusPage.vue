<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStatus } from '@/composables/useStatus'
import AppIcon from '@/components/AppIcon.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'

const { t } = useI18n()
const {
  network, sim, battery,
  networkLoading, simLoading, batteryLoading,
  networkError, simError, batteryError,
  refreshAll, refreshNetwork, refreshSim, refreshBattery,
} = useStatus()

onMounted(() => refreshAll())

const anyLoading = computed(() => networkLoading.value || simLoading.value || batteryLoading.value)

const signalLevel = computed(() => {
  const rssi = network.value?.rssi
  if (rssi == null) return 0
  if (rssi >= -55) return 4
  if (rssi >= -67) return 3
  if (rssi >= -75) return 2
  return 1
})

const rssiText = computed(() => {
  const rssi = network.value?.rssi
  return rssi == null ? '—' : `${rssi} dBm`
})

const batteryPercent = computed(() => battery.value?.percentage ?? null)

const batteryTone = computed(() => {
  const p = batteryPercent.value
  if (p == null) return 'neutral'
  if (p <= 20) return 'error'
  if (p <= 50) return 'warning'
  return 'success'
})

const batteryBadgeClass = computed(() => {
  const tone = batteryTone.value
  if (tone === 'error') return 'badge-error'
  if (tone === 'warning') return 'badge-warning'
  if (tone === 'neutral') return 'badge-neutral'
  return 'badge-success'
})
</script>

<template>
  <div class="page">
    <div class="page-head">
      <div>
        <h1 class="page-title">{{ t('nav.status') }}</h1>
        <p class="page-sub">
          {{ t('status.networkTitle') }} · {{ t('status.simTitle') }} · {{ t('status.batteryTitle') }}
        </p>
      </div>
      <div class="head-actions">
        <button type="button" class="btn btn-ghost" :disabled="anyLoading" @click="refreshAll">
          <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': anyLoading }" />
          <span>{{ t('common.refresh') }}</span>
        </button>
      </div>
    </div>

    <div class="status-grid">
      <section class="card card--network">
        <header class="card-head">
          <div class="card-title">
            <span class="icon-chip"><AppIcon name="wifi" :size="18" /></span>
            <h2>{{ t('status.networkTitle') }}</h2>
          </div>
          <button
            type="button"
            class="icon-btn"
            :disabled="networkLoading"
            :aria-label="t('common.refresh')"
            @click="refreshNetwork"
          >
            <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': networkLoading }" />
          </button>
        </header>

        <div class="card-body">
          <ErrorBanner
            v-if="networkError"
            :message="networkError"
            retryable
            @retry="refreshNetwork"
          />

          <div v-if="networkLoading && !network" class="skeleton-block">
            <span class="skeleton skeleton-title"></span>
            <span class="skeleton skeleton-sub"></span>
            <span class="skeleton skeleton-line"></span>
          </div>

          <div v-else-if="network" class="network-body">
            <div class="hero">
              <span class="hero-label">{{ t('status.ssid') }}</span>
              <strong class="hero-value">{{ network.ssid || '—' }}</strong>
              <span class="hero-sub">
                {{ t('status.ip') }} · <span class="mono">{{ network.ip || '—' }}</span>
              </span>
            </div>

            <div class="metric-row">
              <div class="metric">
                <span class="metric-label">{{ t('status.rssi') }}</span>
                <div class="signal" :class="'signal--' + signalLevel">
                  <span v-for="i in 4" :key="i" class="signal-bar" :class="{ on: i <= signalLevel }"></span>
                </div>
                <span class="metric-value">{{ rssiText }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">{{ t('status.linkSpeed') }}</span>
                <span class="metric-value metric-value--lg">
                  {{ network.linkSpeedMbps ?? '—' }}<small>Mbps</small>
                </span>
              </div>
            </div>
          </div>

          <div v-else class="card-empty">{{ t('common.empty') }}</div>
        </div>
      </section>

      <section class="card">
        <header class="card-head">
          <div class="card-title">
            <span class="icon-chip"><AppIcon name="sim" :size="18" /></span>
            <h2>{{ t('status.simTitle') }}</h2>
          </div>
          <button
            type="button"
            class="icon-btn"
            :disabled="simLoading"
            :aria-label="t('common.refresh')"
            @click="refreshSim"
          >
            <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': simLoading }" />
          </button>
        </header>

        <div class="card-body card-body--flex">
          <ErrorBanner v-if="simError" :message="simError" retryable @retry="refreshSim" />

          <div v-if="simLoading && !sim" class="skeleton-block">
            <span class="skeleton skeleton-title"></span>
            <span class="skeleton skeleton-sub"></span>
          </div>

          <div v-else-if="sim" class="hero hero--grow">
            <span class="hero-label">{{ t('status.operator') }}</span>
            <strong class="hero-value">{{ sim.simOperatorName || '—' }}</strong>
            <div class="hero-badge-row">
              <span class="hero-sub">{{ t('status.simState') }}</span>
              <span class="badge badge-info">{{ sim.simStateText }}</span>
            </div>
          </div>

          <div v-else class="card-empty">{{ t('common.empty') }}</div>
        </div>
      </section>

      <section class="card">
        <header class="card-head">
          <div class="card-title">
            <span class="icon-chip"><AppIcon name="battery" :size="18" /></span>
            <h2>{{ t('status.batteryTitle') }}</h2>
          </div>
          <button
            type="button"
            class="icon-btn"
            :disabled="batteryLoading"
            :aria-label="t('common.refresh')"
            @click="refreshBattery"
          >
            <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': batteryLoading }" />
          </button>
        </header>

        <div class="card-body card-body--flex">
          <ErrorBanner v-if="batteryError" :message="batteryError" retryable @retry="refreshBattery" />

          <div v-if="batteryLoading && !battery" class="skeleton-block">
            <span class="skeleton skeleton-title"></span>
            <span class="skeleton skeleton-line"></span>
            <span class="skeleton skeleton-sub"></span>
          </div>

          <div v-else-if="battery" class="battery-body">
            <div class="battery-top">
              <div class="hero">
                <span class="hero-label">{{ t('status.percentage') }}</span>
                <strong class="hero-value hero-value--display">
                  {{ battery.percentage ?? '—' }}<small>%</small>
                </strong>
              </div>
              <span class="badge" :class="batteryBadgeClass">{{ battery.statusText }}</span>
            </div>

            <div class="battery-bar" role="progressbar" :aria-valuenow="batteryPercent ?? 0">
              <span
                class="battery-fill"
                :class="'battery-fill--' + batteryTone"
                :style="{ width: (batteryPercent ?? 0) + '%' }"
              ></span>
            </div>

            <div class="stat-grid">
              <div class="stat">
                <span class="stat-label">{{ t('status.temperature') }}</span>
                <strong class="stat-value">{{ battery.temperature ?? '—' }} ℃</strong>
              </div>
              <div class="stat">
                <span class="stat-label">{{ t('status.powerConnection') }}</span>
                <strong class="stat-value">{{ battery.pluggedText || '—' }}</strong>
              </div>
            </div>
          </div>

          <div v-else class="card-empty">{{ t('common.empty') }}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-md;
  align-items: stretch;
}

.status-grid > .card {
  display: flex;
  flex-direction: column;
}

.card--network {
  grid-column: 1 / -1;
}

.card-body--flex > .error-banner {
  margin-bottom: 0;
}

.card-body--flex {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: $spacing-md;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.hero--grow {
  flex: 1;
  justify-content: center;
}

.hero-label {
  color: $color-text-secondary;
  font-size: $font-size-caption;
  letter-spacing: 0.02em;
}

.hero-value {
  color: $color-text-primary;
  font-size: 24px;
  font-weight: $font-weight-semibold;
  letter-spacing: -0.02em;
  line-height: 1.2;
  word-break: break-word;
}

.hero-value--display {
  font-size: $font-size-display;
  font-weight: $font-weight-bold;
  letter-spacing: -0.04em;

  small {
    margin-left: 3px;
    color: $color-text-secondary;
    font-size: 18px;
    font-weight: $font-weight-medium;
  }
}

.hero-sub {
  color: $color-text-secondary;
  font-size: $font-size-caption;
}

.hero-badge-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-top: 4px;
}

.mono {
  font-family: $font-family-mono;
  color: $color-text-primary;
}

.network-body {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $spacing-xl;
}

.metric-row {
  display: flex;
  align-items: flex-end;
  gap: $spacing-xl;
  flex-shrink: 0;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.metric-label {
  color: $color-text-secondary;
  font-size: $font-size-caption;
}

.metric-value {
  color: $color-text-primary;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  font-family: $font-family-mono;
}

.metric-value--lg {
  font-size: 22px;
  letter-spacing: -0.02em;

  small {
    margin-left: 4px;
    color: $color-text-secondary;
    font-size: 11px;
    font-weight: $font-weight-regular;
    font-family: $font-family-base;
  }
}

.signal {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 18px;
}

.signal-bar {
  width: 4px;
  border-radius: 2px;
  background: $color-border;
  transition: background-color $motion-fast $motion-ease;

  &:nth-child(1) {
    height: 6px;
  }
  &:nth-child(2) {
    height: 10px;
  }
  &:nth-child(3) {
    height: 14px;
  }
  &:nth-child(4) {
    height: 18px;
  }

  &.on {
    background: $color-primary;
  }
}

.battery-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: $spacing-md;
}

.battery-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $spacing-md;
}

.battery-bar {
  height: 8px;
  overflow: hidden;
  border-radius: $radius-pill;
  background: $color-surface-elevated;
}

.battery-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  transition: width $motion-slow $motion-ease;

  &--success {
    background: linear-gradient(90deg, #10B981, $color-success);
  }
  &--warning {
    background: linear-gradient(90deg, #F59E0B, $color-warning);
  }
  &--error {
    background: linear-gradient(90deg, #F87171, $color-error);
  }
  &--neutral {
    background: $color-border-strong;
  }
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $spacing-sm;
  margin-top: auto;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 12px;
  background: $color-surface-elevated;
}

.stat-label {
  color: $color-text-secondary;
  font-size: 11px;
}

.stat-value {
  color: $color-text-primary;
  font-size: $font-size-caption + 1px;
  font-weight: $font-weight-semibold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skeleton-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: $spacing-sm 0;
}

.skeleton-title {
  width: 52%;
  height: 30px;
}

.skeleton-sub {
  width: 34%;
  height: 13px;
}

.skeleton-line {
  width: 100%;
  height: 8px;
}

.card-empty {
  color: $color-text-secondary;
  font-size: $font-size-caption;
}

@media (max-width: 1080px) {
  .network-body {
    flex-direction: column;
    align-items: stretch;
    gap: $spacing-lg;
  }

  .metric-row {
    gap: $spacing-lg;
  }
}

@media (max-width: 880px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .card--network {
    grid-column: auto;
  }

  .card-head {
    padding: 20px 20px 0;
  }

  .card-body {
    padding: 20px;
  }

  .hero-value {
    font-size: $font-size-title;
  }

  .hero-value--display {
    font-size: $font-size-display;
  }
}
</style>