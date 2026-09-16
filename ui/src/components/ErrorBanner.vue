<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{ message?: string; retryable?: boolean }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="error-banner">
    <svg class="error-icon" viewBox="0 0 24 24" width="18" height="18">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 7v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
    <span class="error-text">{{ message ?? t('common.error') }}</span>
    <button v-if="retryable" class="error-retry" @click="emit('retry')">{{ t('common.retry') }}</button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.error-banner {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  margin-bottom: $spacing-md;
  border-radius: $radius-card;
  background: $color-surface-elevated;
  border: 1px solid $color-border;
}

.error-icon {
  color: $color-error;
  flex-shrink: 0;
}

.error-text {
  color: $color-text-secondary;
  font-size: $font-size-body;
  flex: 1;
}

.error-retry {
  border: none;
  background: transparent;
  color: $color-primary;
  cursor: pointer;
  font-size: $font-size-caption;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-button;

  &:hover {
    background: $color-surface-elevated;
  }
}
</style>
