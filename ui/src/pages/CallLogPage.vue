<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCallLog } from '@/composables/useCallLog'
import ErrorBanner from '@/components/ErrorBanner.vue'
import EmptyState from '@/components/EmptyState.vue'

const { t } = useI18n()
const { list, loading, error, refresh } = useCallLog()
onMounted(() => refresh())

const typeColor: Record<string, 'success' | 'info' | 'error' | 'default'> = {
  INCOMING: 'success',
  OUTGOING: 'info',
  MISSED: 'error',
}
</script>

<template>
  <n-card :title="t('callLog.title')">
    <template #header-extra>
      <n-button size="small" :loading="loading" @click="refresh">{{ t('common.refresh') }}</n-button>
    </template>
    <ErrorBanner v-if="error" :message="error" retryable @retry="refresh" />
    <div v-if="loading" class="call-loading">
      <n-spin size="large" />
      <p class="call-loading-text">{{ t('callLog.loading') }}</p>
    </div>
    <template v-else-if="!error">
      <EmptyState v-if="list.length === 0" :text="t('callLog.empty')" />
      <n-list v-else bordered>
        <n-list-item v-for="(item, i) in list" :key="i">
          <n-thing>
            <template #header>
              <n-space align="center">
                <span class="call-name">{{ item.name }}</span>
                <n-tag :type="typeColor[item.type] || 'default'" size="small" :bordered="item.type === 'MISSED'">{{ item.typeLabel }}</n-tag>
              </n-space>
            </template>
            <template #description>
              <span class="call-meta">
                <template v-if="!item.isUnknown">{{ item.phoneNumber }} · </template>
                {{ item.date }} · {{ item.duration }}
              </span>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
    </template>
  </n-card>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.call-loading {
  padding: $spacing-xxl 0;
  text-align: center;
}

.call-loading-text {
  margin-top: $spacing-md;
  color: $color-text-secondary;
}

.call-name {
  font-weight: $font-weight-medium;
  color: $color-text-primary;
}

.call-meta {
  color: $color-text-secondary;
  font-size: $font-size-caption;
}
</style>
