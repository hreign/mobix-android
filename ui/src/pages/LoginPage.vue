<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import { getLang } from '@/api/i18n'
import i18n from '@/i18n'
import type { LangCode } from '@/types'

const { t } = useI18n()
const router = useRouter()
const { setPassword, clearPassword } = useAuth()

const password = ref('')
const error = ref('')
const loading = ref(false)

async function onConfirm() {
  if (!password.value) {
    error.value = t('auth.error')
    return
  }
  loading.value = true
  error.value = ''
  setPassword(password.value)
  try {
    const res = await getLang()
    i18n.global.locale.value = res.lang as LangCode
    router.push('/status')
  } catch {
    error.value = t('auth.error')
    clearPassword()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <n-card :title="t('auth.title')" class="login-card" :style="{ width: '400px', maxWidth: '90vw' }">
      <n-form @submit.prevent="onConfirm">
        <n-form-item :label="t('auth.password')">
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="click"
            :placeholder="t('auth.password')"
            @keyup.enter="onConfirm"
          />
        </n-form-item>
        <span v-if="error" class="login-error">{{ error }}</span>
        <n-button type="primary" block :loading="loading" @click="onConfirm">
          {{ t('auth.confirm') }}
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: $color-background;
}

.login-card {
  margin: 0 auto;
}

.login-error {
  display: block;
  margin-bottom: $spacing-sm;
  color: $color-error;
  font-size: $font-size-caption;
}
</style>
