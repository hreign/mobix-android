<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCallLog } from '@/composables/useCallLog'
import AppIcon from '@/components/AppIcon.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { CallLogRecord, IconName } from '@/types'

const { t } = useI18n()
const { list, loading, error, refresh } = useCallLog()

onMounted(() => refresh())

type Tone = 'success' | 'info' | 'error' | 'neutral'

const typeMeta: Record<string, { icon: IconName; tone: Tone }> = {
  INCOMING: { icon: 'phone-in', tone: 'success' },
  OUTGOING: { icon: 'phone-out', tone: 'info' },
  MISSED: { icon: 'phone-missed', tone: 'error' },
}

function meta(item: CallLogRecord) {
  return typeMeta[item.type] ?? { icon: 'call' as IconName, tone: 'neutral' as Tone }
}

function badgeClass(item: CallLogRecord) {
  return `badge-${meta(item).tone}`
}
</script>

<template>
  <div class="page">
    <div class="page-head">
      <div>
        <h1 class="page-title">{{ t('callLog.title') }}</h1>
      </div>
      <div class="head-actions">
        <button
          type="button"
          class="btn btn-ghost"
          :disabled="loading"
          @click="refresh"
        >
          <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': loading }" />
          <span>{{ t('common.refresh') }}</span>
        </button>
      </div>
    </div>

    <section class="card call-card">
      <div class="call-content">
        <ErrorBanner v-if="error" :message="error" retryable @retry="refresh" />

        <div v-if="loading && list.length === 0" class="call-skeleton">
          <div v-for="i in 5" :key="i" class="call-skeleton-row">
            <span class="skeleton skeleton-icon"></span>
            <div class="call-skeleton-main">
              <span class="skeleton skeleton-title"></span>
              <span class="skeleton skeleton-line"></span>
            </div>
          </div>
        </div>

        <template v-else>
          <EmptyState v-if="list.length === 0" :text="t('callLog.empty')" />

          <div v-else class="call-list" :class="{ refreshing: loading }">
            <article v-for="(item, index) in list" :key="index" class="call-item">
              <span class="call-icon" :class="'call-icon--' + meta(item).tone">
                <AppIcon :name="meta(item).icon" :size="19" />
              </span>

              <div class="call-main">
                <div class="call-top">
                  <span class="call-name">{{ item.name || t('common.unknown') }}</span>
                  <span class="badge" :class="badgeClass(item)">{{ item.typeLabel }}</span>
                </div>
                <div class="call-meta">
                  <span v-if="!item.isUnknown" class="mono">{{ item.phoneNumber }}</span>
                  <span>{{ item.date }}</span>
                  <span class="call-duration">
                    <AppIcon name="clock" :size="12" />
                    {{ item.duration }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.call-card {
  overflow: hidden;
}

.call-content {
  padding: $spacing-md $spacing-lg $spacing-lg;
}

.call-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: opacity $motion-fast $motion-ease;

  &.refreshing {
    opacity: 0.6;
  }
}

.call-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 13px 12px;
  border-radius: 12px;
  transition: background-color $motion-fast $motion-ease;

  & + .call-item {
    border-top: 1px solid $color-border;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &:hover {
    background: $color-surface-elevated;
  }
}

.call-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;

  &--success {
    background: $color-success-soft;
    color: $color-success;
  }
  &--info {
    background: $color-info-soft;
    color: $color-info;
  }
  &--error {
    background: $color-error-soft;
    color: $color-error;
  }
  &--neutral {
    background: $color-surface-elevated;
    color: $color-text-secondary;
  }
}

.call-main {
  flex: 1;
  min-width: 0;
}

.call-top {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  min-width: 0;
}

.call-name {
  min-width: 0;
  color: $color-text-primary;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.call-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  color: $color-text-secondary;
  font-size: $font-size-caption;
  line-height: 1.4;

  span + span::before {
    content: '·';
    margin-right: 6px;
    color: $color-text-disabled;
  }
}

.mono {
  font-family: $font-family-mono;
}

.call-duration {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  svg {
    color: $color-text-disabled;
  }
}

.call-skeleton {
  display: flex;
  flex-direction: column;
}

.call-skeleton-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 12px;
}

.skeleton-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
}

.call-skeleton-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
}

.skeleton-title {
  width: 30%;
  height: 14px;
}

.skeleton-line {
  width: 60%;
  height: 10px;
}

@media (max-width: 640px) {
  .call-content {
    padding: $spacing-sm $spacing-sm $spacing-md;
  }

  .call-item {
    padding: 12px 10px;
  }

  .call-meta {
    gap: 4px;
  }

  .call-top {
    justify-content: space-between;
  }

  .call-name {
    flex: 1;
  }
}
</style>