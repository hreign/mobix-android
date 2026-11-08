<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

const { t } = useI18n()
defineProps<{ text?: string }>()
</script>

<template>
  <div class="empty-state">
    <span class="empty-icon">
      <AppIcon name="inbox" :size="22" />
    </span>
    <p>{{ text ?? t('common.empty') }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: $spacing-xxl $spacing-md;
  text-align: center;

  p {
    margin: 0;
    color: $color-text-secondary;
    font-size: $font-size-caption;
  }
}

.empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: $color-surface-elevated;
  color: $color-text-disabled;
}
</style>