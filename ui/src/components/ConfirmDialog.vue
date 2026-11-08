<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseModal from './BaseModal.vue'

const { t } = useI18n()
defineProps<{ show: boolean; title?: string; content?: string }>()
const emit = defineEmits<{ 'update:show': [boolean]; confirm: []; cancel: [] }>()

function onConfirm() {
  emit('confirm')
  emit('update:show', false)
}

function onCancel() {
  emit('cancel')
  emit('update:show', false)
}
</script>

<template>
  <BaseModal
    :show="show"
    :title="title ?? t('common.confirm')"
    width="420px"
    @update:show="emit('update:show', $event)"
  >
    <p class="confirm-content">{{ content }}</p>
    <template #footer>
      <button type="button" class="btn btn-ghost" @click="onCancel">{{ t('common.cancel') }}</button>
      <button type="button" class="btn btn-primary" @click="onConfirm">{{ t('common.confirm') }}</button>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.confirm-content {
  margin: 0;
  color: $color-text-secondary;
  font-size: $font-size-body;
  line-height: 1.7;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>