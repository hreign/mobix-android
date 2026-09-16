<script setup lang="ts">
import { useI18n } from 'vue-i18n'

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
  <n-modal
    :show="show"
    @update:show="emit('update:show', $event)"
    preset="dialog"
    :title="title ?? t('common.confirm')"
    :content="content"
    :positive-text="t('common.confirm')"
    :negative-text="t('common.cancel')"
    @positive-click="onConfirm"
    @negative-click="onCancel"
  />
</template>
