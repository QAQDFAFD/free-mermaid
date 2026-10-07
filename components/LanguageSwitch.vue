<template>
  <div ref="container" class="relative" @keydown.esc="isOpen = false">
    <button
      @click="isOpen = !isOpen"
      class="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
      :aria-expanded="isOpen"
      :title="currentLocaleName">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      {{ currentLocale.toUpperCase() }}
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden">
      <div class="max-h-72 overflow-y-auto py-1 border border-gray-200 dark:border-gray-700 rounded-md">
        <button
          v-for="item in supportedLocales"
          :key="item.code"
          @click="changeLocale(item.code)"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20': item.code === currentLocale }">
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { supportedLocales } from '~/utils/locales'

  const { locale } = useI18n()
  const isOpen = ref(false)
  const container = ref(null)

  const currentLocale = computed(() => locale.value)
  const currentLocaleName = computed(() => supportedLocales.find(item => item.code === locale.value)?.name || 'English')

  const changeLocale = newLocale => {
    locale.value = newLocale
    isOpen.value = false
    // 更新缓存，覆盖自动检测的语言
    try { localStorage.setItem('userLocale', newLocale) } catch (_) {}
  }

  // 点击外部关闭语言菜单
  const closeMenu = e => {
    if (isOpen.value && !container.value?.contains(e.target)) {
      isOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', closeMenu)
  })

  onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
  })
</script>
