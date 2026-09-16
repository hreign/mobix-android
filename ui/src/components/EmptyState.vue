<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{ text?: string }>()
</script>

<template>
  <div class="empty-state">
    <n-empty :description="text ?? t('common.empty')" />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.empty-state {
  padding: $spacing-xxl 0;
  display: flex;
  justify-content: center;
}
</style>
