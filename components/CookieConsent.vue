<template>
  <div v-if="visible" class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
    <div
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        <p>
          {{ t('cookies.message') }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <NuxtLink to="/privacy" class="underline">
            {{ t('cookies.privacy') }}
          </NuxtLink>
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="decline"
          class="px-3 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          {{ t('cookies.decline') }}
        </button>
        <button @click="accept" class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700">
          {{ t('cookies.accept') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const visible = ref(false)

  const accept = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted')
      window.dispatchEvent(new CustomEvent('cookie-consent-accepted'))
    } catch (_) {}
    visible.value = false
  }

  const decline = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined')
      window.dispatchEvent(new CustomEvent('cookie-consent-declined'))
    } catch (_) {}
    visible.value = false
  }

  onMounted(() => {
    try {
      const v = localStorage.getItem('cookieConsent')
      visible.value = v !== 'accepted' && v !== 'declined'
    } catch (_) {
      visible.value = true
    }
  })
</script>
