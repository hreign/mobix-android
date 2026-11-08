<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

type PageItem = { type: 'page'; value: number } | { type: 'gap'; value: string }

const { t } = useI18n()
const props = defineProps<{ page: number; pageSize: number; total: number }>()
const emit = defineEmits<{ 'update:page': [number] }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))))

const pageList = computed<PageItem[]>(() => {
  const count = pageCount.value
  if (count <= 7) {
    return Array.from({ length: count }, (_, i) => ({ type: 'page' as const, value: i + 1 }))
  }

  const start = Math.max(2, props.page - 2)
  const end = Math.min(count - 1, props.page + 2)
  const items: PageItem[] = [{ type: 'page', value: 1 }]

  if (start > 2) items.push({ type: 'gap', value: 'start' })
  for (let i = start; i <= end; i += 1) items.push({ type: 'page', value: i })
  if (end < count - 1) items.push({ type: 'gap', value: 'end' })
  items.push({ type: 'page', value: count })

  return items
})

function go(target: number) {
  if (target < 1 || target > pageCount.value || target === props.page) return
  emit('update:page', target)
}
</script>

<template>
  <div v-if="pageCount > 1" class="pager">
    <button
      type="button"
      class="pager-btn"
      :disabled="page <= 1"
      :aria-label="t('common.previous')"
      @click="go(page - 1)"
    >
      <AppIcon name="chevron-left" :size="16" />
    </button>

    <div class="pager-pages">
      <template v-for="(item, index) in pageList" :key="index">
        <span v-if="item.type === 'gap'" class="pager-gap">…</span>
        <button
          v-else
          type="button"
          class="pager-btn"
          :class="{ active: item.value === page }"
          @click="go(item.value)"
        >
          {{ item.value }}
        </button>
      </template>
    </div>

    <span class="pager-counter">{{ page }} / {{ pageCount }}</span>

    <button
      type="button"
      class="pager-btn"
      :disabled="page >= pageCount"
      :aria-label="t('common.next')"
      @click="go(page + 1)"
    >
      <AppIcon name="chevron-right" :size="16" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.pager {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: $spacing-md;
}

.pager-pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pager-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  border: 1px solid $color-border;
  border-radius: 9px;
  background: $color-surface;
  color: $color-text-secondary;
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  transition: background-color $motion-fast $motion-ease, color $motion-fast $motion-ease,
    border-color $motion-fast $motion-ease;

  &:hover:not(:disabled) {
    background: $color-surface-elevated;
    border-color: $color-border-strong;
  }

  &.active {
    background: $color-primary;
    border-color: $color-primary;
    color: #fff;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.pager-gap {
  width: 20px;
  text-align: center;
  color: $color-text-disabled;
  font-size: $font-size-caption;
}

.pager-counter {
  display: none;
  color: $color-text-secondary;
  font-size: $font-size-caption;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .pager {
    justify-content: center;
  }

  .pager-pages {
    display: none;
  }

  .pager-counter {
    display: inline;
  }
}
</style>