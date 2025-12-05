<template>
  <!-- 悬浮主题选择器 - 放在预览区域左下角 -->
  <div class="fixed-theme-selector" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- 展开的主题选项面板 - 放在按钮上方 -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2">
      <div v-if="isOpen" class="theme-panel">
        <div class="theme-panel-header">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ t('diagramTheme.title') }}</span>
        </div>
        <div class="theme-options">
          <button
            v-for="theme in themes"
            :key="theme.value"
            @click="selectTheme(theme.value)"
            class="theme-option"
            :class="{ active: currentTheme === theme.value }">
            <span class="theme-icon">{{ theme.icon }}</span>
            <span class="theme-label">{{ theme.label }}</span>
            <svg
              v-if="currentTheme === theme.value"
              class="check-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 收起状态的按钮 -->
    <div class="theme-trigger" :class="{ expanded: isOpen }">
      <!-- 主题/样式切换图标 - 使用更直观的图标 -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <!-- 画笔/主题图标 -->
        <circle cx="12" cy="12" r="3" stroke-width="2" />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
      <!-- 当前主题指示器 -->
      <span class="theme-indicator">{{ currentThemeIcon }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t, locale } = useI18n()

  const props = defineProps({
    modelValue: {
      type: String,
      default: 'default'
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(false)
  let closeTimer: ReturnType<typeof setTimeout> | null = null

  const currentTheme = computed(() => props.modelValue)

  // 当前主题的图标
  const currentThemeIcon = computed(() => {
    const iconMap: Record<string, string> = {
      default: '💎',
      dark: '🌑',
      forest: '🌿',
      neutral: '🔘',
      base: '🎯',
      hand: '✏️'
    }
    return iconMap[props.modelValue] || '💎'
  })

  // 鼠标进入时清除关闭定时器并打开
  const handleMouseEnter = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
    isOpen.value = true
  }

  // 主题列表
  const themes = computed(() => [
    {
      value: 'default',
      icon: '💎',
      label:
        locale.value === 'zh'
          ? '默认'
          : locale.value === 'ru'
          ? 'Стандарт'
          : locale.value === 'fr'
          ? 'Défaut'
          : locale.value === 'th'
          ? 'ค่าเริ่มต้น'
          : 'Default'
    },
    {
      value: 'dark',
      icon: '🌑',
      label:
        locale.value === 'zh'
          ? '深色'
          : locale.value === 'ru'
          ? 'Тёмная'
          : locale.value === 'fr'
          ? 'Sombre'
          : locale.value === 'th'
          ? 'มืด'
          : 'Dark'
    },
    {
      value: 'forest',
      icon: '🌿',
      label:
        locale.value === 'zh'
          ? '森林'
          : locale.value === 'ru'
          ? 'Лес'
          : locale.value === 'fr'
          ? 'Forêt'
          : locale.value === 'th'
          ? 'ป่า'
          : 'Forest'
    },
    {
      value: 'neutral',
      icon: '🔘',
      label:
        locale.value === 'zh'
          ? '中性'
          : locale.value === 'ru'
          ? 'Нейтральная'
          : locale.value === 'fr'
          ? 'Neutre'
          : locale.value === 'th'
          ? 'เป็นกลาง'
          : 'Neutral'
    },
    {
      value: 'base',
      icon: '🎯',
      label:
        locale.value === 'zh'
          ? '基础'
          : locale.value === 'ru'
          ? 'Базовая'
          : locale.value === 'fr'
          ? 'Base'
          : locale.value === 'th'
          ? 'พื้นฐาน'
          : 'Base'
    },
    {
      value: 'hand',
      icon: '✏️',
      label:
        locale.value === 'zh'
          ? '手绘'
          : locale.value === 'ru'
          ? 'Рисунок'
          : locale.value === 'fr'
          ? 'Croquis'
          : locale.value === 'th'
          ? 'วาดมือ'
          : 'Sketch'
    }
  ])

  const selectTheme = (theme: string) => {
    emit('update:modelValue', theme)

    // 选择后延迟关闭
    if (closeTimer) clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      isOpen.value = false
    }, 300)

    // 保存用户偏好
    if (process.client) {
      localStorage.setItem('mermaid-diagram-theme', theme)
    }
  }

  const handleMouseLeave = () => {
    // 延迟关闭，给用户一点缓冲时间
    if (closeTimer) clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      isOpen.value = false
    }, 200)
  }

  onUnmounted(() => {
    if (closeTimer) clearTimeout(closeTimer)
  })
</script>

<style scoped>
  .fixed-theme-selector {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 30;
  }

  .theme-trigger {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #6b7280;
  }

  .theme-indicator {
    position: absolute;
    bottom: -2px;
    right: -2px;
    font-size: 12px;
    line-height: 1;
    background: white;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .dark .theme-indicator {
    background: #374151;
  }

  .dark .theme-trigger {
    background: rgba(55, 65, 81, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
    color: #9ca3af;
  }

  .theme-trigger:hover,
  .theme-trigger.expanded {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
    color: #3b82f6;
    transform: scale(1.05);
  }

  .dark .theme-trigger:hover,
  .dark .theme-trigger.expanded {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
    color: #60a5fa;
  }

  .theme-panel {
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
    min-width: 140px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  /* 添加一个透明的连接区域，防止鼠标移动时断开 */
  .theme-panel::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100%;
    height: 12px;
  }

  .dark .theme-panel {
    background: rgba(31, 41, 55, 0.98);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .theme-panel-header {
    padding: 8px 12px 4px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dark .theme-panel-header {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .theme-options {
    padding: 4px;
  }

  .theme-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.15s ease;
    color: #374151;
  }

  .dark .theme-option {
    color: #d1d5db;
  }

  .theme-option:hover {
    background: rgba(59, 130, 246, 0.1);
  }

  .dark .theme-option:hover {
    background: rgba(59, 130, 246, 0.2);
  }

  .theme-option.active {
    background: rgba(59, 130, 246, 0.15);
    color: #2563eb;
  }

  .dark .theme-option.active {
    background: rgba(59, 130, 246, 0.25);
    color: #60a5fa;
  }

  .theme-icon {
    font-size: 16px;
    line-height: 1;
  }

  .theme-label {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
  }

  .check-icon {
    width: 14px;
    height: 14px;
    color: #2563eb;
  }

  .dark .check-icon {
    color: #60a5fa;
  }
</style>
