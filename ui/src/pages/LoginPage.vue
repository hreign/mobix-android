<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import { getLang } from '@/api/i18n'
import i18n from '@/i18n'
import AppIcon from '@/components/AppIcon.vue'
import type { IconName, LangCode } from '@/types'

const { t } = useI18n()
const router = useRouter()
const { setPassword, clearPassword } = useAuth()

const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

const features: { icon: IconName; key: string }[] = [
  { icon: 'status', key: 'nav.status' },
  { icon: 'sms', key: 'nav.sms' },
  { icon: 'call', key: 'nav.callLog' },
]

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
    <section class="login-visual">
      <div class="visual-glow visual-glow--one"></div>
      <div class="visual-glow visual-glow--two"></div>

      <div class="visual-brand">
        <span class="brand-mark">M</span>
        <span>Mobix</span>
      </div>

      <div class="visual-copy">
        <p class="visual-kicker">Termux Console</p>
        <h1>Mobix</h1>
        <ul class="feature-list">
          <li v-for="item in features" :key="item.key">
            <span class="feature-icon"><AppIcon :name="item.icon" :size="18" /></span>
            <span>{{ t(item.key) }}</span>
          </li>
        </ul>
      </div>

      <p class="visual-foot">Termux · Android</p>
    </section>

    <section class="login-form-side">
      <div class="login-card">
        <div class="mobile-brand">
          <span class="brand-mark">M</span>
          <span>Mobix</span>
        </div>

        <header class="login-head">
          <h2>{{ t('auth.title') }}</h2>
          <p>Mobix · Termux</p>
        </header>

        <form @submit.prevent="onConfirm">
          <label class="sr-only" for="access-password">{{ t('auth.password') }}</label>
          <div class="password-wrap" :class="{ invalid: error }">
            <AppIcon name="lock" :size="18" class="password-icon" />
            <input
              id="access-password"
              v-model="password"
              class="password-input"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.password')"
              autocomplete="current-password"
              autofocus
            />
            <button
              type="button"
              class="eye-btn"
              :aria-label="t('auth.password')"
              @click="showPassword = !showPassword"
            >
              <AppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="18" />
            </button>
          </div>

          <p v-if="error" class="login-error" role="alert">
            <AppIcon name="alert" :size="15" />
            <span>{{ error }}</span>
          </p>

          <button type="submit" class="btn btn-primary btn-block login-submit" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span>{{ t('auth.confirm') }}</span>
            <AppIcon v-if="!loading" name="chevron-right" :size="16" />
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.login-page {
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 100dvh;
  background: $color-surface;
}

.login-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: $spacing-xxl;
  background: linear-gradient(145deg, #0F766E 0%, #115E59 52%, #134E4A 100%);
  color: #fff;
}

.visual-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(6px);
  pointer-events: none;
}

.visual-glow--one {
  top: -120px;
  right: -80px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.38) 0%, transparent 68%);
}

.visual-glow--two {
  bottom: -140px;
  left: -100px;
  width: 420px;
  height: 420px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%);
}

.visual-brand,
.mobile-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: $font-size-title;
  font-weight: $font-weight-bold;
  letter-spacing: -0.02em;
}

.visual-brand {
  position: relative;
  z-index: 1;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 18px;
  font-weight: $font-weight-bold;
  backdrop-filter: blur(6px);
}

.visual-copy {
  position: relative;
  z-index: 1;
  max-width: 460px;

  h1 {
    margin: 0;
    font-size: clamp(54px, 7vw, 82px);
    font-weight: $font-weight-bold;
    letter-spacing: -0.05em;
    line-height: 1;
  }
}

.visual-kicker {
  margin: 0 0 14px;
  color: rgba(255, 255, 255, 0.66);
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: $spacing-xl 0 0;
  padding: 0;
  list-style: none;

  li {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: $radius-pill;
    background: rgba(255, 255, 255, 0.08);
    font-size: $font-size-caption;
    backdrop-filter: blur(6px);
  }
}

.feature-icon {
  display: inline-flex;
  color: rgba(255, 255, 255, 0.82);
}

.visual-foot {
  position: relative;
  z-index: 1;
  margin: 0;
  color: rgba(255, 255, 255, 0.45);
  font-size: $font-size-caption;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.login-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  background:
    radial-gradient(circle at 80% 10%, rgba(15, 118, 110, 0.05) 0%, transparent 46%),
    $color-surface;
}

.login-card {
  width: 100%;
  max-width: 352px;
}

.mobile-brand {
  display: none;
  margin-bottom: $spacing-xl;

  .brand-mark {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, $color-primary 0%, $color-primary-hover 100%);
    border: none;
    color: #fff;
  }
}

.login-head {
  margin-bottom: $spacing-xl;

  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: $font-weight-bold;
    letter-spacing: -0.03em;
  }

  p {
    margin: 10px 0 0;
    color: $color-text-secondary;
    font-size: $font-size-body;
    line-height: 1.5;
  }
}

.password-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 14px;
  border: 1px solid $color-border;
  border-radius: $radius-input;
  background: $color-surface;
  transition: border-color $motion-fast $motion-ease, box-shadow $motion-fast $motion-ease;

  &:focus-within {
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
  }

  &.invalid {
    border-color: $color-error;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
}

.password-icon {
  flex-shrink: 0;
  color: $color-text-disabled;
}

.password-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: $font-size-body + 1px;
  letter-spacing: 0.04em;

  &::placeholder {
    color: $color-text-disabled;
    letter-spacing: 0;
  }
}

.eye-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: $color-text-secondary;

  &:hover {
    background: $color-surface-elevated;
    color: $color-text-primary;
  }
}

.login-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 10px 0 0;
  color: $color-error;
  font-size: $font-size-caption;
}

.login-submit {
  height: 48px;
  margin-top: $spacing-lg;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
    min-height: 100dvh;
  }

  .login-visual {
    display: none;
  }

  .login-form-side {
    padding: $spacing-lg;
    background:
      radial-gradient(circle at 50% 0%, rgba(15, 118, 110, 0.08) 0%, transparent 42%),
      $color-surface;
  }

  .mobile-brand {
    display: flex;
    justify-content: center;

    .brand-mark {
      width: 40px;
      height: 40px;
    }

    span:last-child {
      font-size: $font-size-title;
    }
  }

  .login-head {
    text-align: center;

    h2 {
      font-size: 24px;
    }
  }
}
</style>