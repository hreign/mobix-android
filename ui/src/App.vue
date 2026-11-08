<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { buildThemeOverrides } from '@/styles/theme'
import AppIcon from '@/components/AppIcon.vue'
import type { IconName } from '@/types'

const { t } = useI18n()
const route = useRoute()
const themeOverrides = buildThemeOverrides()
const contentRef = ref<HTMLElement | null>(null)

const isLoginPage = computed(() => route.path === '/login')

const navItems = computed<{ key: string; label: string; icon: IconName }[]>(() => [
  { label: t('nav.status'), key: '/status', icon: 'status' },
  { label: t('nav.sms'), key: '/sms', icon: 'sms' },
  { label: t('nav.callLog'), key: '/call-log', icon: 'call' },
])

const pageTitle = computed(() => {
  const current = navItems.value.find((item) => item.key === route.path)
  return current?.label ?? 'Mobix'
})

watch(
  () => route.path,
  async () => {
    await nextTick()
    contentRef.value?.scrollTo({ top: 0 })
  },
)
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view v-if="isLoginPage" />
      <div v-else class="app-shell">
        <aside class="sidebar">
          <div class="brand">
            <span class="brand-mark">M</span>
            <span class="brand-copy">
              <strong>Mobix</strong>
              <small>Termux Console</small>
            </span>
          </div>

          <nav class="side-nav">
            <router-link
              v-for="item in navItems"
              :key="item.key"
              :to="item.key"
              class="nav-item"
              :class="{ active: route.path === item.key }"
            >
              <AppIcon :name="item.icon" :size="19" />
              <span>{{ item.label }}</span>
            </router-link>
          </nav>

          <div class="side-foot">
            <span class="live-dot"></span>
            <span>Mobix</span>
          </div>
        </aside>

        <div class="main">
          <header class="mobile-header">
            <div class="brand brand--compact">
              <span class="brand-mark">M</span>
              <strong>{{ pageTitle }}</strong>
            </div>
          </header>

          <main ref="contentRef" class="content">
            <div class="content-inner">
              <router-view v-slot="{ Component }">
                <transition name="fade-slide" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </main>

          <nav class="tabbar">
            <router-link
              v-for="item in navItems"
              :key="item.key"
              :to="item.key"
              class="tab-item"
              :class="{ active: route.path === item.key }"
            >
              <AppIcon :name="item.icon" :size="21" />
              <span>{{ item.label }}</span>
            </router-link>
          </nav>
        </div>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.app-shell {
  display: flex;
  min-height: 100dvh;
}

.brand {
  display: flex;
  align-items: center;
  gap: $spacing-sm + 2px;
  padding: $spacing-lg $spacing-lg $spacing-xl;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-hover 100%);
  color: #fff;
  font-size: 17px;
  font-weight: $font-weight-bold;
  letter-spacing: -0.02em;
  box-shadow: 0 8px 20px -10px rgba(15, 118, 110, 0.7);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.15;

  strong {
    font-size: $font-size-title;
    font-weight: $font-weight-bold;
    letter-spacing: -0.02em;
  }

  small {
    margin-top: 3px;
    color: $color-text-secondary;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

.sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 248px;
  height: 100dvh;
  flex-shrink: 0;
  border-right: 1px solid $color-border;
  background: $color-surface;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 $spacing-md;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  color: $color-text-secondary;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  transition: background-color $motion-fast $motion-ease, color $motion-fast $motion-ease;

  &:hover {
    background: $color-surface-elevated;
    color: $color-text-primary;
  }

  &.active {
    background: $color-primary-soft;
    color: $color-primary;
  }

  &.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 18px;
    border-radius: 0 3px 3px 0;
    background: $color-primary;
    transform: translateY(-50%);
  }
}

.side-foot {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-top: auto;
  padding: $spacing-lg;
  color: $color-text-disabled;
  font-size: $font-size-caption;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: $color-success;
  box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  height: 100dvh;
  overflow-y: auto;
}

.content {
  flex: 1;
}

.content-inner {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: $spacing-xl + 8px $spacing-xl;
}

.mobile-header {
  display: none;
}

.tabbar {
  display: none;
}

@media (max-width: 960px) {
  .sidebar {
    display: none;
  }

  .mobile-header {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 $spacing-md;
    border-bottom: 1px solid $color-border;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
  }

  .brand--compact {
    gap: 10px;
    padding: 0;

    strong {
      font-size: $font-size-body + 2px;
      font-weight: $font-weight-semibold;
      letter-spacing: -0.01em;
    }
  }

  .brand--compact .brand-mark {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    font-size: 15px;
  }

  .content-inner {
    padding: $spacing-lg $spacing-md calc(84px + env(safe-area-inset-bottom));
  }

  .tabbar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 40;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 6px $spacing-sm calc(6px + env(safe-area-inset-bottom));
    border-top: 1px solid $color-border;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(14px);
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    height: 54px;
    border-radius: 12px;
    color: $color-text-secondary;
    font-size: 11px;
    font-weight: $font-weight-medium;

    &.active {
      color: $color-primary;
      background: $color-primary-soft;
    }
  }
}

@media (max-width: 420px) {
  .tab-item span {
    font-size: 10px;
  }
}
</style>