/**
 * 应用就绪状态管理
 * 用于优化首屏加载体验，确保关键资源加载完成后再显示完整内容
 */
import { ref, onMounted } from 'vue'

// 全局状态
const isAppReady = ref(false)
const isHydrated = ref(false)

export function useAppReady() {
  onMounted(() => {
    // 标记为已 hydrated
    isHydrated.value = true
    
    // 使用 requestAnimationFrame 确保 DOM 已更新
    requestAnimationFrame(() => {
      // 再等一帧确保样式已应用
      requestAnimationFrame(() => {
        isAppReady.value = true
      })
    })
  })

  return {
    isAppReady,
    isHydrated
  }
}

/**
 * 预加载关键资源
 * 在空闲时预加载可能需要的资源
 */
export function preloadCriticalResources() {
  if (!process.client) return

  // 预加载 AI 助手组件（用户可能会使用）
  const preloadAiAssistant = () => {
    import('@/components/AiAssistant.vue').catch(() => {})
  }

  // 预加载导出工具（用户可能会导出）
  const preloadExportUtils = () => {
    import('@/utils/exportUtils').catch(() => {})
  }

  // 使用 requestIdleCallback 在空闲时预加载
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      preloadAiAssistant()
      preloadExportUtils()
    }, { timeout: 3000 })
  } else {
    // 延迟 2 秒后预加载
    setTimeout(() => {
      preloadAiAssistant()
      preloadExportUtils()
    }, 2000)
  }
}

