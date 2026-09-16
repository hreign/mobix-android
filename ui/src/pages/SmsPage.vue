<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useSms } from '@/composables/useSms'
import ErrorBanner from '@/components/ErrorBanner.vue'
import EmptyState from '@/components/EmptyState.vue'
import Pagination from '@/components/Pagination.vue'
import ContactPicker from '@/components/ContactPicker.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const { t } = useI18n()
const message = useMessage()
const {
  list, total, page, pageSize, loading, error, boxType,
  contacts, contactsLoading,
  sendState, sendError,
  refreshSmsList, setBoxType, loadContacts, validateNumber, validateContent, submitSend, resetSend,
} = useSms()

const phoneNumber = ref('')
const smsContent = ref('')
const showContactPicker = ref(false)
const showConfirm = ref(false)
const showSendForm = ref(false)
const contentWarning = ref('')

watch(smsContent, (v) => {
  contentWarning.value = v.length > 70 ? t('sms.contentWarning') : ''
})
watch(page, () => refreshSmsList())

onMounted(() => refreshSmsList())

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
    message.error(t('sms.sendFailed') + '：' + sendError.value)
  }
}
function onReply(item: { address?: string; number?: string }) {
  const addr = item.address ?? item.number ?? ''
  if (!addr || !validateNumber(addr)) {
    message.error(t('sms.noNumber'))
    return
  }
  phoneNumber.value = addr
  smsContent.value = ''
  showSendForm.value = true
}
</script>

<template>
  <div class="sms-page">
    <n-card :title="t('sms.title')">
      <template #header-extra>
        <n-space>
          <n-button size="small" :loading="loading" @click="refreshSmsList">{{ t('common.refresh') }}</n-button>
          <n-button size="small" type="primary" @click="showSendForm = true">{{ t('sms.sendSms') }}</n-button>
        </n-space>
      </template>
      <n-tabs type="line" :value="boxType" @update:value="setBoxType($event as 'inbox' | 'sent')" class="sms-tabs">
        <n-tab-pane name="inbox" :tab="t('sms.inbox')" />
        <n-tab-pane name="sent" :tab="t('sms.sent')" />
      </n-tabs>
      <ErrorBanner v-if="error" :message="error" retryable @retry="refreshSmsList" />
      <n-spin :show="loading">
        <EmptyState v-if="list.length === 0" :text="t('sms.empty')" />
        <n-list v-else bordered>
          <n-list-item v-for="item in list" :key="item._id">
            <n-thing>
              <template #header>
                <n-space align="center">
                  <span class="sms-address">{{ item.address }}</span>
                  <n-tag v-if="item.type === 'inbox'" size="small" type="info">{{ t('sms.inbox') }}</n-tag>
                  <n-tag v-else size="small">{{ t('sms.sent') }}</n-tag>
                  <n-tag v-if="!item.read" size="small" type="warning">{{ t('sms.unread') }}</n-tag>
                  <n-button size="tiny" @click="onReply(item)">{{ t('sms.reply') }}</n-button>
                </n-space>
              </template>
              <template #description>{{ item.received }}</template>
              <div class="sms-body">{{ item.body }}</div>
            </n-thing>
          </n-list-item>
        </n-list>
      </n-spin>
      <Pagination :page="page" :page-size="pageSize" :total="total" @update:page="page = $event" />
    </n-card>

    <n-modal
      :show="showSendForm"
      @update:show="showSendForm = $event"
      preset="card"
      :title="t('sms.sendSms')"
      :style="{ width: '480px', maxWidth: '90vw' }"
    >
      <n-form label-placement="left" label-width="80">
        <n-form-item :label="t('sms.phoneNumber')">
          <n-space>
            <n-input v-model:value="phoneNumber" :placeholder="t('sms.phoneNumber')" class="phone-input" />
            <n-button @click="onPickContact" :loading="contactsLoading">{{ t('sms.selectContact') }}</n-button>
          </n-space>
        </n-form-item>
        <n-form-item :label="t('sms.content')">
          <n-input v-model:value="smsContent" type="textarea" :placeholder="t('sms.content')" :rows="4" />
        </n-form-item>
      </n-form>
      <span v-if="contentWarning" class="content-warning">{{ contentWarning }}</span>
      <n-space justify="end">
        <n-button @click="showSendForm = false">{{ t('common.cancel') }}</n-button>
        <n-button type="primary" :loading="sendState === 'sending'" :disabled="sendState === 'sending'" @click="onSend">{{ t('sms.sendSms') }}</n-button>
      </n-space>
    </n-modal>

    <ContactPicker
      :show="showContactPicker"
      :contacts="contacts"
      :loading="contactsLoading"
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

.sms-page {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.sms-tabs {
  margin-bottom: $spacing-md;
}

.sms-address {
  font-weight: $font-weight-medium;
  color: $color-text-primary;
}

.sms-body {
  margin-top: $spacing-xs;
  color: $color-text-secondary;
  line-height: 1.6;
}

.phone-input {
  width: 240px;
}

.content-warning {
  display: block;
  margin-bottom: $spacing-sm;
  color: $color-warning;
  font-size: $font-size-caption;
}
</style>
