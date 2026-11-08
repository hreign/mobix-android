<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

const { t } = useI18n()
defineProps<{ message?: string; retryable?: boolean }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="error-banner" role="alert">
    <span class="error-icon">
      <AppIcon name="alert" :size="18" />
    </span>
    <span class="error-text">{{ message ?? t('common.error') }}</span>
    <button v-if="retryable" type="button" class="error-retry" @click="emit('retry')">
      {{ t('common.retry') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.error-banner {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 10px 12px;
  margin-bottom: $spacing-md;
  border-radius: $radius-input;
  background: $color-error-soft;
}

.error-icon {
  display: inline-flex;
  color: $color-error;
  flex-shrink: 0;
}

.error-text {
  flex: 1;
  color: $color-text-secondary;
  font-size: $font-size-caption;
  line-height: 1.5;
}

.error-retry {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: $color-error;
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  padding: 4px 8px;
  border-radius: 8px;

  &:hover {
    background: rgba(220, 38, 38, 0.08);
  }
}
</style>