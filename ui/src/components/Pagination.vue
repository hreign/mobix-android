<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ page: number; pageSize: number; total: number }>()
const emit = defineEmits<{ 'update:page': [number] }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
function onChange(p: number) {
  emit('update:page', p)
}
</script>

<template>
  <n-space justify="end" class="pagination-wrap">
    <n-pagination :page="page" :page-count="pageCount" @update:page="onChange" />
  </n-space>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.pagination-wrap {
  margin-top: $spacing-md;
}
</style>
