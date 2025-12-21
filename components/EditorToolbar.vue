<template>
  <div
    class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 py-1.5 md:p-2 flex items-center justify-between">
    <!-- 左侧 Logo 和图表类型 -->
    <div class="flex items-center space-x-2 md:space-x-4 min-w-0">
      <!-- Logo - 移动端简化 -->
      <div class="flex items-center flex-shrink-0">
        <svg class="h-5 w-5 md:h-6 md:w-6 text-blue-600 md:mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path d="M7 14H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M14 11L17 14L14 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <h2 class="hidden sm:block text-base md:text-xl font-bold text-gray-900 dark:text-white truncate">Mermaid Drawing</h2>
      </div>

      <!-- 图表类型按钮 - 仅桌面端显示 -->
      <div class="hidden lg:flex space-x-1 xl:space-x-2">
        <button
          v-for="example in examples"
          :key="example.name"
          @click="loadExample(example.code)"
          :class="[
            'px-2 py-1 text-sm rounded transition-colors duration-200',
            isCurrentType(example.code)
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]">
          {{ t(`tools.${example.key}`) }}
        </button>
      </div>

      <!-- 移动端图表类型下拉菜单 -->
      <div class="lg:hidden relative">
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="px-2 py-1 text-xs md:text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 md:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span class="hidden md:inline">{{ t('tools.flowchart') }}</span>
        </button>
        <!-- 移动端下拉菜单 -->
        <div
          v-if="showMobileMenu"
          class="absolute left-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700 py-1"
        >
          <button
            v-for="example in examples"
            :key="example.name"
            @click="loadExample(example.code); showMobileMenu = false"
            class="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="isCurrentType(example.code) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''"
          >
            {{ t(`tools.${example.key}`) }}
          </button>
        </div>
      </div>
    </div>

    <!-- 右侧工具按钮 -->
    <div class="flex items-center space-x-1 md:space-x-2">
      <!-- AI 助手按钮 -->
      <AiAssistant :current-code="currentCode" @update:code="handleAiCodeUpdate" />

      <!-- 清空按钮 - 移动端仅显示图标 -->
      <button
        @click="clearEditor"
        class="p-1.5 md:px-3 md:py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded flex items-center transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 md:mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span class="hidden md:inline">{{ t('editor.clear') }}</span>
      </button>

      <ThemeToggle />

      <!-- 语言切换按钮 -->
      <LanguageSwitch />
    </div>

    <!-- 点击外部关闭移动端菜单 -->
    <div v-if="showMobileMenu" class="fixed inset-0 z-40" @click="showMobileMenu = false"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import ThemeToggle from '~/components/ThemeToggle.vue'
  import LanguageSwitch from '~/components/LanguageSwitch.vue'
  import AiAssistant from '~/components/AiAssistant.vue'
  import { useI18n } from 'vue-i18n'
  import { getExamples, type ExampleSet } from '~/composables/useExamples'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:code'])
  const { t, locale } = useI18n()

  const currentCode = ref(props.modelValue || '')
  const error = ref(null)
  const showMobileMenu = ref(false)

  // AI 代码更新处理
  const handleAiCodeUpdate = (code: string) => {
    currentCode.value = code
    emit('update:code', code)
  }

  // 示例图表类型列表（不包含 default）
  const toolbarExampleKeys: (keyof ExampleSet)[] = ['flowchart', 'sequence', 'class', 'state', 'entity', 'gantt', 'pie']

  // 使用计算属性获取当前语言的示例
  const examples = computed(() => {
    const currentExamples = getExamples(locale.value)
    return toolbarExampleKeys.map(key => ({
      name: key,
      key: key,
      code: currentExamples[key]
    }))
  })

  // 检查当前代码是否匹配某个示例类型
  const isCurrentType = (exampleCode: string) => {
    // 获取当前代码和示例代码的第一行（图表类型声明）
    const currentFirstLine = currentCode.value.trim().split('\n')[0]?.trim() || ''
    const exampleFirstLine = exampleCode.trim().split('\n')[0]?.trim() || ''

    // 比较第一行来确定图表类型
    return currentFirstLine === exampleFirstLine
  }

  // 加载示例
  const loadExample = (code: string) => {
    currentCode.value = code
    emit('update:code', code)
  }

  // 清空编辑器
  const clearEditor = () => {
    // 先将错误状态重置为null
    error.value = null

    // 先将代码更新为空
    emit('update:code', '')

    // 使用setTimeout确保代码清空被处理后再发送重置事件
    setTimeout(() => {
      // 发送重置事件以便预览组件重置视图
      const resetEvent = new CustomEvent('resetMermaidView')
      document.dispatchEvent(resetEvent)
    }, 50)
  }

  // 监听代码变化
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue !== undefined) {
        currentCode.value = newValue
      }
    }
  )
</script>
