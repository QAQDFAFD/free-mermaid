<template>
  <aside
    v-if="showWarning"
    class="relative mx-auto max-w-xl border-b border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-gray-800"
    role="status"
    :aria-label="t('mobile.title')">
    <div class="flex items-start gap-3">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-0.5 h-5 w-5 flex-none text-amber-600 dark:text-amber-400"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd" />
      </svg>
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-semibold text-gray-900 dark:text-white">{{ t('mobile.title') }}</h2>
        <p class="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
          {{ t('mobile.description') }} {{ t('mobile.tip') }}
        </p>
      </div>
      <button
        type="button"
        class="flex min-h-[44px] min-w-[44px] flex-none items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
        :aria-label="t('mobile.continue')"
        :title="t('mobile.continue')"
        @click="closeWarning">
        <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const STORAGE_KEY = 'mermaid-drawing-mobile-warning-dismissed'
  const { t } = useI18n()
  const showWarning = ref(false)

  const isMobileDevice = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768

  const closeWarning = () => {
    showWarning.value = false
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Storage may be unavailable in private or restricted browsing contexts.
    }
  }

  onMounted(() => {
    let warningDismissed = false
    try {
      warningDismissed = localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      // Keep the notice non-blocking even when storage cannot be read.
    }

    showWarning.value = isMobileDevice() && !warningDismissed
  })
</script>
