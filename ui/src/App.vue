<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { buildThemeOverrides } from '@/styles/theme'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const activeKey = computed(() => route.path)
const themeOverrides = buildThemeOverrides()
const isLoginPage = computed(() => route.path === '/login')

const menuOptions = computed(() => [
  { label: t('nav.status'), key: '/status' },
  { label: t('nav.sms'), key: '/sms' },
  { label: t('nav.callLog'), key: '/call-log' },
])

function onSelect(key: string) {
  router.push(key)
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <router-view v-if="isLoginPage" />
        <n-layout v-else class="app-layout">
          <n-layout-header bordered class="app-header">
            <div class="brand">
              <span class="brand-mark"></span>
              <span class="brand-text">Mobix</span>
            </div>
          </n-layout-header>
          <n-layout has-sider class="app-body">
            <n-layout-sider bordered class="app-sider" :width="200">
              <n-menu
                :options="menuOptions"
                :value="activeKey"
                @update:value="onSelect"
              />
            </n-layout-sider>
            <n-layout-content class="app-content">
              <div class="content-inner">
                <router-view v-slot="{ Component }">
                  <transition name="fade-slide" mode="out-in">
                    <component :is="Component" />
                  </transition>
                </router-view>
              </div>
            </n-layout-content>
          </n-layout>
        </n-layout>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.app-layout {
  min-height: 100vh;
}

.app-header {
  height: 56px;
  padding: 0 $spacing-xl;
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.brand-mark {
  width: 10px;
  height: 10px;
  border-radius: $radius-tag;
  background: $color-primary;
}

.brand-text {
  font-size: $font-size-title;
  font-weight: $font-weight-bold;
  letter-spacing: 0.5px;
  color: $color-text-primary;
}

.app-body {
  height: calc(100vh - 56px);
}

.app-sider {
  background: $color-surface;
}

.app-content {
  background: transparent;
  overflow-y: auto;
}

.content-inner {
  padding: $spacing-xl;
}
</style>
