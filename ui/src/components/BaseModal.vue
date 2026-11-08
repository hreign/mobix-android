<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import AppIcon from './AppIcon.vue'
import { acquireLayer, releaseLayer, isTopLayer } from '@/utils/modalLayer'

const props = withDefaults(defineProps<{ show: boolean; title?: string; width?: string }>(), {
  width: '520px',
})
const emit = defineEmits<{ 'update:show': [boolean] }>()

const layerId = Symbol('modal')

watch(
  () => props.show,
  (show, prev) => {
    if (show && !prev) acquireLayer(layerId)
    else if (!show && prev) releaseLayer(layerId)
  },
  { immediate: true },
)

function close() {
  emit('update:show', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show && isTopLayer(layerId)) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  releaseLayer(layerId)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask" @mousedown.self="close">
        <div class="modal-panel" role="dialog" aria-modal="true" :style="{ maxWidth: width }">
          <header class="modal-head">
            <h2>{{ title }}</h2>
            <button type="button" class="icon-btn modal-close" @click="close">
              <AppIcon name="close" :size="16" />
            </button>
          </header>
          <div class="modal-body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="modal-foot">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
  background: $color-overlay;
  backdrop-filter: blur(3px);
}

.modal-panel {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 28px);
  max-height: min(86vh, 780px);
  overflow: hidden;
  border-radius: $radius-card;
  background: $color-surface;
  box-shadow: $shadow-modal;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid $color-border;

  h2 {
    margin: 0;
    font-size: $font-size-title;
    font-weight: $font-weight-semibold;
    letter-spacing: -0.01em;
  }
}

.modal-close {
  width: 34px;
  height: 34px;
  border-color: transparent;
  background: $color-surface-elevated;
}

.modal-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: $spacing-lg;
}

.modal-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-lg;
  border-top: 1px solid $color-border;
  background: $color-surface;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity $motion-normal $motion-ease;

  .modal-panel {
    transition: transform $motion-normal $motion-ease, opacity $motion-normal $motion-ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-panel {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
}

@media (max-width: 640px) {
  .modal-mask {
    align-items: flex-end;
    padding: 0;
  }

  .modal-panel {
    width: 100%;
    max-height: 90vh;
    border-radius: $radius-card $radius-card 0 0;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .modal-enter-from,
  .modal-leave-to {
    .modal-panel {
      transform: translateY(100%);
    }
  }
}
</style>