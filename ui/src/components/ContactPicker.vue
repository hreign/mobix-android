<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'
import BaseModal from './BaseModal.vue'
import EmptyState from './EmptyState.vue'
import type { Contact } from '@/types'

const { t } = useI18n()
const props = defineProps<{
  show: boolean
  contacts: Contact[]
  loading?: boolean
  error?: string
}>()
const emit = defineEmits<{ 'update:show': [boolean]; select: [Contact] }>()

const keyword = ref('')

watch(
  () => props.show,
  (show) => {
    if (show) keyword.value = ''
  },
)

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return props.contacts
  return props.contacts.filter(
    (c) => c.name.toLowerCase().includes(k) || c.number.toLowerCase().includes(k),
  )
})

function initial(c: Contact) {
  const source = (c.name || c.number || '?').trim()
  return source.charAt(0).toUpperCase()
}

function onSelect(c: Contact) {
  emit('select', c)
  emit('update:show', false)
}
</script>

<template>
  <BaseModal
    :show="show"
    :title="t('contact.title')"
    width="460px"
    @update:show="emit('update:show', $event)"
  >
    <div class="search-wrap">
      <AppIcon name="search" :size="17" />
      <input v-model="keyword" class="search-input" :placeholder="t('contact.search')" />
    </div>

    <p v-if="error" class="picker-error">{{ error }}</p>

    <div class="contact-list">
      <div v-if="loading" class="skeleton-rows">
        <div v-for="i in 5" :key="i" class="skeleton-row">
          <span class="skeleton skeleton-avatar"></span>
          <span class="skeleton skeleton-line"></span>
        </div>
      </div>
      <template v-else>
        <EmptyState v-if="filtered.length === 0" :text="t('contact.empty')" />
        <button
          v-for="c in filtered"
          :key="c.number + c.name"
          type="button"
          class="contact-item"
          @click="onSelect(c)"
        >
          <span class="contact-avatar">{{ initial(c) }}</span>
          <span class="contact-copy">
            <strong>{{ c.name || t('common.unnamed') }}</strong>
            <small>{{ c.number }}</small>
          </span>
          <AppIcon name="chevron-right" :size="16" class="contact-arrow" />
        </button>
      </template>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  margin-bottom: $spacing-md;
  border: 1px solid $color-border;
  border-radius: $radius-input;
  background: $color-surface-elevated;
  color: $color-text-secondary;

  &:focus-within {
    border-color: $color-primary;
    background: $color-surface;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }
}

.search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: $font-size-body;

  &::placeholder {
    color: $color-text-disabled;
  }
}

.picker-error {
  margin: 0 0 $spacing-md;
  padding: 10px 12px;
  border-radius: $radius-input;
  background: $color-error-soft;
  color: $color-error;
  font-size: $font-size-caption;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 360px;
  overflow-y: auto;
  margin: 0 -6px;
  padding: 0 6px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 12px;
  background: transparent;
  text-align: left;

  &:hover {
    background: $color-surface-elevated;
  }
}

.contact-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 50%;
  background: $color-primary-soft;
  color: $color-primary;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
}

.contact-copy {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 2px;

  strong {
    font-size: $font-size-body;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: $color-text-secondary;
    font-size: $font-size-caption;
    font-family: $font-family-mono;
  }
}

.contact-arrow {
  color: $color-text-disabled;
  flex-shrink: 0;
}

.skeleton-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: $spacing-sm;
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.skeleton-line {
  flex: 1;
  height: 30px;
}
</style>