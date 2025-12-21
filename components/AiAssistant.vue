<template>
  <div class="relative">
    <!-- AI 按钮 -->
    <button
      @click="togglePanel"
      class="ai-trigger-btn group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300"
      :class="
        isPanelOpen
          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
          : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 dark:text-blue-300 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-300/50 dark:border-blue-600/50'
      ">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <span>AI</span>
      <span class="text-xs opacity-70 hidden sm:inline">{{ isPanelOpen ? '▲' : '▼' }}</span>
    </button>

    <!-- AI 面板 - 移动端全屏 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95">
      <div
        v-if="isPanelOpen"
        class="fixed md:absolute inset-4 md:inset-auto md:top-full md:right-0 md:mt-2 md:w-[420px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[80vh]">
        <!-- 面板头部 -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 px-3 md:px-4 py-2.5 md:py-3 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-white">
              <svg class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <span class="font-semibold text-sm md:text-base">{{ t('ai.title') }}</span>
              <span class="text-xs bg-white/20 px-1.5 py-0.5 rounded">DeepSeek</span>
            </div>
            <div class="flex items-center gap-1">
              <button
                @click="showSettings = !showSettings"
                class="text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                :title="t('ai.settings')">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <!-- 移动端关闭按钮 -->
              <button
                @click="isPanelOpen = false"
                class="md:hidden text-white/80 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 设置面板 -->
        <div
          v-show="showSettings"
          class="p-3 md:p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex-1 overflow-y-auto">
          <!-- Key 来源选择 -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('ai.keySource') }}
            </label>
            <div class="flex gap-2">
              <button
                @click="hasDefaultKey && (config.keySource = 'default')"
                class="flex-1 px-3 py-2 text-sm rounded-lg border-2 transition-all duration-200"
                :class="[
                  config.keySource === 'default'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400',
                  !hasDefaultKey && 'opacity-50 cursor-not-allowed'
                ]"
                :disabled="!hasDefaultKey">
                <div class="font-medium flex items-center justify-center gap-1">
                  <span>🎁</span>
                  {{ t('ai.freeKey') }}
                </div>
                <div class="text-xs opacity-70">
                  {{ hasDefaultKey ? t('ai.freeKeyDesc') : t('ai.freeKeyUnavailable') }}
                </div>
              </button>
              <button
                @click="config.keySource = 'custom'"
                class="flex-1 px-3 py-2 text-sm rounded-lg border-2 transition-all duration-200"
                :class="
                  config.keySource === 'custom'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                ">
                <div class="font-medium flex items-center justify-center gap-1">
                  <span>🔑</span>
                  {{ t('ai.customKey') }}
                </div>
                <div class="text-xs opacity-70">{{ t('ai.customKeyDesc') }}</div>
              </button>
            </div>
          </div>

          <!-- 自定义 API Key 输入（仅在选择自定义时显示） -->
          <div v-show="config.keySource === 'custom'" class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> DeepSeek API Key </label>
              <input
                v-model="config.deepseekKey"
                type="password"
                :placeholder="t('ai.enterApiKey')"
                class="w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="config.keySource === 'custom' && !config.deepseekKey.trim() 
                  ? 'border-amber-300 dark:border-amber-600' 
                  : 'border-gray-300 dark:border-gray-600'" />
            </div>
            <!-- 未输入 Key 时的提示 -->
            <div
              v-if="!config.deepseekKey.trim()"
              class="p-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg">
              <p class="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <span>⚠️</span>
                <span>{{ t('ai.customKeyHint') }}</span>
              </p>
            </div>
          </div>

          <!-- 免费额度提示（仅在选择默认时显示） -->
          <div
            v-show="config.keySource === 'default'"
            class="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p class="text-sm text-blue-600 dark:text-blue-400 flex items-start gap-2">
              <span class="text-lg">✨</span>
              <span>{{ t('ai.freeKeyNotice') }}</span>
            </p>
          </div>

          <button
            @click="handleSaveConfig"
            :disabled="config.keySource === 'custom' && !config.deepseekKey.trim()"
            class="w-full mt-4 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :class="config.keySource === 'custom' && !config.deepseekKey.trim()
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'">
            {{ t('ai.saveSettings') }}
          </button>
        </div>

        <!-- 主内容区域 -->
        <div v-show="!showSettings" class="p-3 md:p-4 flex-1 overflow-y-auto">
          <!-- 免费额度提示条 -->
          <div
            v-if="config.keySource === 'default' && hasDefaultKey && !dismissedTip"
            class="mb-4 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300">
              <span class="text-base">💡</span>
              <span
                >{{ t('ai.freeTip') }}，<button
                  @click="showSettings = true"
                  class="underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-200 transition-colors">
                  {{ t('ai.configureKey') }}
                </button></span
              >
            </div>
            <button
              @click="dismissTip"
              class="p-1 text-amber-400 hover:text-amber-600 dark:hover:text-amber-200 transition-colors shrink-0"
              :title="t('ai.dismissTip')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 模式切换 -->
          <div class="flex gap-2 mb-4">
            <button
              v-for="m in modes"
              :key="m.id"
              @click="mode = m.id"
              class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
              :class="
                mode === m.id
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              ">
              <span v-html="m.icon"></span>
              {{ m.label }}
            </button>
          </div>

          <!-- 优化模式 -->
          <div v-if="mode === 'optimize'" class="space-y-3">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('ai.optimizeDesc') }}
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-32 overflow-auto">
              <pre class="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">{{
                currentCode || t('ai.noCode')
              }}</pre>
            </div>
          </div>

          <!-- 生成模式 -->
          <div v-if="mode === 'generate'" class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('ai.topicLabel') }}
              </label>
              <textarea
                v-model="topic"
                :placeholder="t('ai.topicPlaceholder')"
                rows="3"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('ai.diagramType') }}
              </label>
              <select
                v-model="selectedDiagramType"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">{{ t('ai.autoDetect') }}</option>
                <option value="flowchart">{{ t('tools.flowchart') }}</option>
                <option value="sequence">{{ t('tools.sequence') }}</option>
                <option value="class">{{ t('tools.class') }}</option>
                <option value="state">{{ t('tools.state') }}</option>
                <option value="entity">{{ t('tools.entity') }}</option>
                <option value="gantt">{{ t('tools.gantt') }}</option>
                <option value="pie">{{ t('tools.pie') }}</option>
              </select>
            </div>
          </div>

          <!-- 输出预览 -->
          <div v-if="streamOutput" class="mt-4">
            <div class="flex items-center mb-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('ai.output') }}
              </span>
            </div>
            <div class="p-3 bg-gray-900 rounded-lg max-h-48 overflow-auto">
              <pre
                class="text-xs text-green-400 whitespace-pre-wrap font-mono">{{ streamOutput }}<span v-if="isLoading" class="animate-pulse">▌</span></pre>
            </div>
          </div>

          <!-- 错误提示 -->
          <div
            v-if="error"
            class="mt-3 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- 操作按钮 -->
          <div class="mt-4 flex gap-2">
            <!-- 生成完成后显示应用按钮 -->
            <button
              v-if="!isLoading && streamOutput"
              @click="applyResult"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ t('ai.applyToEditor') }}</span>
            </button>
            <!-- 生成/优化按钮 -->
            <button
              @click="handleAction"
              :disabled="
                isLoading ||
                !hasValidKey ||
                (mode === 'generate' && !topic.trim()) ||
                (mode === 'optimize' && !currentCode.trim())
              "
              class="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="[
                isLoading
                  ? 'bg-gray-400'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30',
                !isLoading && streamOutput ? 'flex-none' : 'flex-1'
              ]">
              <svg v-if="isLoading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{
                isLoading
                  ? t('ai.generating')
                  : streamOutput
                  ? t('ai.regenerate')
                  : mode === 'optimize'
                  ? t('ai.optimize')
                  : t('ai.generate')
              }}</span>
            </button>
          </div>

          <!-- 未配置 API Key 提示 -->
          <div
            v-if="!hasValidKey"
            class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p class="text-sm text-amber-600 dark:text-amber-400">
              {{ t('ai.noApiKey') }}
              <button @click="showSettings = true" class="underline font-medium">{{ t('ai.configureNow') }}</button>
            </p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 点击外部关闭 -->
    <div v-if="isPanelOpen" class="fixed inset-0 z-40" @click="isPanelOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAI } from '~/composables/useAI'

  const props = defineProps<{
    currentCode: string
  }>()

  const emit = defineEmits<{
    (e: 'update:code', code: string): void
  }>()

  const { t } = useI18n()
  const { config, isLoading, error, hasValidKey, hasDefaultKey, saveConfig, optimizeMermaid, generateMermaid } = useAI()

  const isPanelOpen = ref(false)
  const showSettings = ref(false)
  const mode = ref<'optimize' | 'generate'>('optimize')
  const topic = ref('')
  const selectedDiagramType = ref('')
  const streamOutput = ref('')
  const dismissedTip = ref(false)

  // 从 localStorage 读取提示是否已关闭
  if (process.client) {
    dismissedTip.value = localStorage.getItem('ai-tip-dismissed') === 'true'
  }

  const dismissTip = () => {
    dismissedTip.value = true
    if (process.client) {
      localStorage.setItem('ai-tip-dismissed', 'true')
    }
  }

  // 模式列表
  const modes = computed(() => [
    { id: 'optimize' as const, label: t('ai.optimizeMode'), icon: '✨' },
    { id: 'generate' as const, label: t('ai.generateMode'), icon: '🎨' }
  ])

  const togglePanel = () => {
    isPanelOpen.value = !isPanelOpen.value
    if (!isPanelOpen.value) {
      showSettings.value = false
    }
  }

  const handleSaveConfig = () => {
    saveConfig()
    showSettings.value = false
  }

  const handleAction = async () => {
    streamOutput.value = ''

    const callbacks = {
      onToken: (token: string) => {
        streamOutput.value += token
      },
      onComplete: (fullText: string) => {
        streamOutput.value = cleanMermaidCode(fullText)
      },
      onError: (err: Error) => {
        console.error('AI Error:', err)
      }
    }

    if (mode.value === 'optimize') {
      await optimizeMermaid(props.currentCode, callbacks)
    } else {
      await generateMermaid(topic.value, selectedDiagramType.value || null, callbacks)
    }
  }

  // 清理 AI 输出中可能的 markdown 代码块
  const cleanMermaidCode = (code: string): string => {
    let cleaned = code.trim()
    // 移除 ```mermaid 或 ``` 包裹
    if (cleaned.startsWith('```mermaid')) {
      cleaned = cleaned.slice(10)
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3)
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3)
    }
    return cleaned.trim()
  }

  const applyResult = () => {
    if (streamOutput.value) {
      emit('update:code', streamOutput.value)
      isPanelOpen.value = false
      streamOutput.value = ''
    }
  }

  // 监听面板关闭时重置状态
  watch(isPanelOpen, open => {
    if (!open) {
      streamOutput.value = ''
    }
  })
</script>

<style scoped>
  .ai-trigger-btn {
    position: relative;
    overflow: hidden;
  }

  .ai-trigger-btn::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) rotate(45deg);
    }
  }
</style>
