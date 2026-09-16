<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Contact } from '@/types'

const { t } = useI18n()
const props = defineProps<{ show: boolean; contacts: Contact[]; loading?: boolean }>()
const emit = defineEmits<{ 'update:show': [boolean]; select: [Contact] }>()

const keyword = ref('')
const filtered = computed(() => {
  const k = keyword.value.trim()
  if (!k) return props.contacts
  return props.contacts.filter((c) => c.name.includes(k) || c.number.includes(k))
})

function onSelect(c: Contact) {
  emit('select', c)
  emit('update:show', false)
}
</script>

<template>
  <n-modal
    :show="show"
    @update:show="emit('update:show', $event)"
    preset="card"
    :title="t('contact.title')"
    :style="{ width: '420px', maxWidth: '90vw' }"
  >
    <n-input v-model:value="keyword" :placeholder="t('contact.search')" clearable />
    <n-spin :show="loading">
      <div :style="{ maxHeight: '320px', overflow: 'auto', marginTop: '8px' }">
        <n-empty v-if="filtered.length === 0" :description="t('contact.empty')" />
        <n-list v-else hoverable clickable>
          <n-list-item v-for="c in filtered" :key="c.number + c.name" @click="onSelect(c)">
            <n-thing :title="c.name || t('common.unnamed')" :description="c.number" />
          </n-list-item>
        </n-list>
      </div>
    </n-spin>
  </n-modal>
</template>
