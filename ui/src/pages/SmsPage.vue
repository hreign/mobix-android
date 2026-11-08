<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useSms } from '@/composables/useSms'
import AppIcon from '@/components/AppIcon.vue'
import BaseModal from '@/components/BaseModal.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import EmptyState from '@/components/EmptyState.vue'
import Pagination from '@/components/Pagination.vue'
import ContactPicker from '@/components/ContactPicker.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import type { SmsRecord } from '@/types'

const { t } = useI18n()
const message = useMessage()
const {
  list, total, page, pageSize, loading, error, boxType,
  contacts, contactsLoading, contactsError,
  sendState, sendError,
  refreshSmsList, setBoxType, loadContacts, validateNumber, validateContent, submitSend, resetSend,
} = useSms()

const phoneNumber = ref('')
const smsContent = ref('')
const showContactPicker = ref(false)
const showConfirm = ref(false)
const showSendForm = ref(false)
const expandedId = ref('')
const contentWarning = ref('')

watch(smsContent, (v) => {
  contentWarning.value = v.length > 70 ? t('sms.contentWarning') : ''
})
watch(page, () => refreshSmsList())

onMounted(() => refreshSmsList())

function itemId(item: SmsRecord, index: number) {
  return String(item._id ?? `${item.address ?? item.number ?? ''}-${index}`)
}

function isExpanded(item: SmsRecord, index: number) {
  return expandedId.value === itemId(item, index)
}

function toggleExpand(item: SmsRecord, index: number) {
  const id = itemId(item, index)
  expandedId.value = expandedId.value === id ? '' : id
}

function openSendForm() {
  resetSend()
  showSendForm.value = true
}

function onPickContact() {
  loadContacts()
  showContactPicker.value = true
}

function onSelectContact(c: { name: string; number: string }) {
  phoneNumber.value = c.number
}

function onSend() {
  if (!validateNumber(phoneNumber.value)) {
    message.error(t('sms.numberInvalid'))
    return
  }
  if (!validateContent(smsContent.value)) {
    message.error(t('sms.contentInvalid'))
    return
  }
  showConfirm.value = true
}

async function onConfirmSend() {
  await submitSend(phoneNumber.value, smsContent.value)
  if (sendState.value === 'success') {
    message.success(t('sms.sendSuccess'))
    phoneNumber.value = ''
    smsContent.value = ''
    resetSend()
    showSendForm.value = false
    refreshSmsList()
  } else {
    message.error(t('sms.sendFailed') + ' - ' + sendError.value)
  }
}

function onReply(item: SmsRecord) {
  const addr = item.address ?? item.number ?? ''
  if (!addr || !validateNumber(addr)) {
    message.error(t('sms.noNumber'))
    return
  }
  resetSend()
  phoneNumber.value = addr
  smsContent.value = ''
  showSendForm.value = true
}
</script>

<template>
  <div class="page">
    <div class="page-head">
      <div>
        <h1 class="page-title">{{ t('sms.title') }}</h1>
        <p class="page-sub">{{ total }} · {{ boxType === 'inbox' ? t('sms.inbox') : t('sms.sent') }}</p>
      </div>
      <div class="head-actions">
        <button
          type="button"
          class="icon-btn"
          :disabled="loading"
          :aria-label="t('common.refresh')"
          @click="refreshSmsList"
        >
          <AppIcon name="refresh" :size="16" :class="{ 'is-spinning': loading }" />
        </button>
        <button type="button" class="btn btn-primary" @click="openSendForm">
          <AppIcon name="send" :size="16" />
          <span>{{ t('sms.sendSms') }}</span>
        </button>
      </div>
    </div>

    <section class="card sms-card">
      <header class="sms-toolbar">
        <div class="segmented" role="tablist">
          <button
            type="button"
            :class="{ active: boxType === 'inbox' }"
            role="tab"
            :aria-selected="boxType === 'inbox'"
            @click="setBoxType('inbox')"
          >
            {{ t('sms.inbox') }}
          </button>
          <button
            type="button"
            :class="{ active: boxType === 'sent' }"
            role="tab"
            :aria-selected="boxType === 'sent'"
            @click="setBoxType('sent')"
          >
            {{ t('sms.sent') }}
          </button>
        </div>
        <span class="toolbar-count">{{ total }}</span>
      </header>

      <div class="sms-content">
        <ErrorBanner v-if="error" :message="error" retryable @retry="refreshSmsList" />

        <div v-if="loading && list.length === 0" class="sms-skeleton">
          <div v-for="i in 4" :key="i" class="sms-skeleton-row">
            <span class="skeleton skeleton-avatar"></span>
            <div class="sms-skeleton-main">
              <span class="skeleton skeleton-title"></span>
              <span class="skeleton skeleton-line"></span>
            </div>
          </div>
        </div>

        <template v-else>
          <EmptyState v-if="list.length === 0" :text="t('sms.empty')" />

          <div v-else class="sms-list" :class="{ refreshing: loading }">
            <article
              v-for="(item, index) in list"
              :key="item._id ?? index"
              class="sms-item"
              :class="{ unread: !item.read, expanded: isExpanded(item, index) }"
            >
              <span class="sms-avatar">
                <AppIcon name="sms" :size="18" />
              </span>

              <div class="sms-main">
                <div class="sms-top">
                  <span class="sms-address">
                    <span v-if="!item.read" class="unread-dot"></span>
                    {{ item.address || item.number || '—' }}
                  </span>
                  <time class="sms-time">{{ item.received }}</time>
                </div>

                <p class="sms-body">{{ item.body || '—' }}</p>

                <button type="button" class="text-btn sms-toggle" @click="toggleExpand(item, index)">
                  <AppIcon :name="isExpanded(item, index) ? 'chevron-up' : 'chevron-down'" :size="14" />
                  <span>{{ isExpanded(item, index) ? t('common.collapse') : t('common.expand') }}</span>
                </button>
              </div>

              <button type="button" class="btn btn-sm btn-soft sms-reply" @click="onReply(item)">
                <AppIcon name="reply" :size="14" />
                <span class="reply-text">{{ t('sms.reply') }}</span>
              </button>
            </article>
          </div>

          <Pagination :page="page" :page-size="pageSize" :total="total" @update:page="page = $event" />
        </template>
      </div>
    </section>

    <BaseModal
      :show="showSendForm"
      :title="t('sms.sendSms')"
      width="560px"
      @update:show="showSendForm = $event"
    >
      <div class="form">
        <div class="form-row">
          <label class="form-label" for="sms-number">{{ t('sms.phoneNumber') }}</label>
          <div class="form-control">
            <div class="input-group">
              <input
                id="sms-number"
                v-model="phoneNumber"
                class="input"
                type="tel"
                inputmode="tel"
                :placeholder="t('sms.phoneNumber')"
              />
              <button
                type="button"
                class="btn btn-ghost contact-btn"
                :disabled="contactsLoading"
                @click="onPickContact"
              >
                <span v-if="contactsLoading" class="spinner contact-spinner"></span>
                <AppIcon v-else name="contact" :size="16" />
                <span class="contact-btn-text">{{ t('sms.selectContact') }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="form-row form-row--top">
          <label class="form-label" for="sms-content">{{ t('sms.content') }}</label>
          <div class="form-control">
            <textarea
              id="sms-content"
              v-model="smsContent"
              class="input textarea"
              :placeholder="t('sms.content')"
              rows="5"
            ></textarea>
            <div class="field-meta">
              <span v-if="contentWarning" class="field-warning">{{ contentWarning }}</span>
              <span class="field-counter">{{ smsContent.length }} / 1000</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <button type="button" class="btn btn-ghost" @click="showSendForm = false">
          {{ t('common.cancel') }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="sendState === 'sending'"
          @click="onSend"
        >
          <span v-if="sendState === 'sending'" class="spinner"></span>
          <AppIcon v-else name="send" :size="15" />
          <span>{{ t('sms.sendSms') }}</span>
        </button>
      </template>
    </BaseModal>

    <ContactPicker
      :show="showContactPicker"
      :contacts="contacts"
      :loading="contactsLoading"
      :error="contactsError"
      @update:show="showContactPicker = $event"
      @select="onSelectContact"
    />

    <ConfirmDialog
      :show="showConfirm"
      :title="t('sms.confirmSend')"
      :content="`${phoneNumber} → ${smsContent}`"
      @update:show="showConfirm = $event"
      @confirm="onConfirmSend"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.sms-card {
  overflow: hidden;
}

.sms-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid $color-border;
}

.toolbar-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 24px;
  padding: 0 9px;
  border-radius: $radius-pill;
  background: $color-surface-elevated;
  color: $color-text-secondary;
  font-size: $font-size-caption;
  font-family: $font-family-mono;
}

.sms-content {
  padding: $spacing-md $spacing-lg $spacing-lg;
}

.sms-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: opacity $motion-fast $motion-ease;

  &.refreshing {
    opacity: 0.6;
  }
}

.sms-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border: 1px solid $color-border;
  border-radius: 14px;
  background: $color-surface;
  transition: border-color $motion-fast $motion-ease, background-color $motion-fast $motion-ease;

  &.unread {
    border-color: rgba(15, 118, 110, 0.22);
    background: $color-primary-soft;
  }
}

.sms-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: $color-surface;
  color: $color-text-secondary;
  border: 1px solid $color-border;

  .sms-item.unread & {
    background: #fff;
    color: $color-primary;
    border-color: transparent;
  }
}

.sms-main {
  flex: 1;
  min-width: 0;
}

.sms-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: $spacing-md;
}

.sms-address {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: $color-text-primary;
  font-size: $font-size-body;
  font-weight: $font-weight-semibold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background: $color-primary;
}

.sms-time {
  flex-shrink: 0;
  color: $color-text-secondary;
  font-size: 11px;
  font-family: $font-family-mono;
}

.sms-body {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 5px 0 0;
  color: $color-text-secondary;
  font-size: $font-size-caption + 1px;
  line-height: 1.6;
  word-break: break-word;

  .sms-item.expanded & {
    display: block;
    -webkit-line-clamp: unset;
  }
}

.sms-toggle {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-top: 4px;
  padding: 2px 0;
  font-size: 11px;

  &:hover {
    background: transparent;
    color: $color-primary-hover;
  }
}

.sms-reply {
  flex-shrink: 0;
  margin-top: 2px;
}

.sms-skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sms-skeleton-row {
  display: flex;
  gap: 12px;
  padding: 14px;
  border: 1px solid $color-border;
  border-radius: 14px;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
}

.sms-skeleton-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 9px;
  padding-top: 3px;
}

.skeleton-title {
  width: 38%;
  height: 14px;
}

.skeleton-line {
  width: 100%;
  height: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: center;
  gap: $spacing-md;
}

.form-row--top {
  align-items: start;
}

.form-label {
  color: $color-text-secondary;
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  line-height: 1.5;
  padding-top: 12px;
}

.form-row--top .form-label {
  padding-top: 13px;
}

.form-control {
  min-width: 0;
}

.input-group {
  display: flex;
  gap: $spacing-sm;
}

.input-group .input {
  flex: 1;
  min-width: 0;
  font-family: $font-family-mono;
}

.contact-btn {
  flex-shrink: 0;
  height: 44px;
  padding: 0 12px;
  font-size: $font-size-caption;
}

.contact-spinner {
  color: $color-primary;
}

.field-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: $spacing-md;
  margin-top: 7px;
}

.field-warning {
  color: $color-warning;
  font-size: 11px;
  line-height: 1.5;
}

.field-counter {
  flex-shrink: 0;
  margin-left: auto;
  color: $color-text-disabled;
  font-size: 11px;
  font-family: $font-family-mono;
}

@media (max-width: 640px) {
  .sms-toolbar {
    padding: $spacing-md;
  }

  .sms-content {
    padding: $spacing-md;
  }

  .segmented {
    flex: 1;

    button {
      flex: 1;
      padding: 0 12px;
    }
  }

  .sms-item {
    padding: 12px;
  }

  .sms-avatar {
    width: 36px;
    height: 36px;
  }

  .sms-top {
    flex-direction: column;
    gap: 2px;
  }

  .sms-reply {
    padding: 0 9px;
  }

  .reply-text {
    display: none;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .form-label,
  .form-row--top .form-label {
    padding-top: 0;
  }

  .contact-btn-text {
    display: none;
  }

  .contact-btn {
    width: 44px;
    padding: 0;
  }
}
</style>