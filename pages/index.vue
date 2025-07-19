<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- 工具栏 -->
    <EditorToolbar @update:code="updateCode" :model-value="code" />

    <!-- 主内容区域 -->
    <main class="flex flex-col md:flex-row flex-1 overflow-hidden relative dark:bg-gray-900" role="main">
      <!-- 左侧编辑器 -->
      <section
        :style="{ width: `${leftPanelWidth}%` }"
        class="h-1/2 md:h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div
          class="h-10 flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
          <span>{{ $t('editor.title') }}</span>
          <div class="flex items-center space-x-2">
            <NuxtLink
              to="/docs"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {{ $t('editor.documentation') }}
            </NuxtLink>
          </div>
        </div>
        <div class="flex-1 overflow-hidden dark:bg-gray-900">
          <MermaidEditor v-model="code" @change="updateCode" />
        </div>
      </section>

      <!-- 分隔条 -->
      <div
        class="hidden md:block absolute top-0 bottom-0 w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-col-resize z-10 transition-colors duration-200 flex items-center justify-center"
        :style="{ left: `calc(${leftPanelWidth}% - 1px)` }"
        @mousedown="startResize">
        <!-- 拖动手柄图标 - 垂直居中 -->
        <div class="absolute top-1/2 -translate-y-1/2 h-16 w-2 flex flex-col items-center justify-center">
          <div class="w-0.5 h-1 bg-gray-400 dark:bg-gray-500 my-0.5 rounded-full"></div>
          <div class="w-0.5 h-1 bg-gray-400 dark:bg-gray-500 my-0.5 rounded-full"></div>
          <div class="w-0.5 h-1 bg-gray-400 dark:bg-gray-500 my-0.5 rounded-full"></div>
        </div>
      </div>

      <!-- 右侧预览 -->
      <section :style="{ width: `${100 - leftPanelWidth}%` }" class="h-1/2 md:h-full flex flex-col">
        <div
          class="h-10 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div class="flex items-center">
            <span>{{ $t('preview.title') }} {{ currentZoom > 0 ? `(${Math.round(currentZoom * 100)}%)` : '' }}</span>
            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ $t('preview.zoom') }}</span>
          </div>
          <div class="flex space-x-2">
            <!-- 缩放控制按钮 -->
            <button
              @click="zoomOut"
              class="px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.zoomOut')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              @click="resetView"
              class="px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.resetView')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              @click="zoomIn"
              class="px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.zoomIn')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div class="relative export-menu-container">
              <button
                @click="isExportMenuOpen = !isExportMenuOpen"
                class="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center">
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ t('editor.export') }}
              </button>

              <div
                v-if="isExportMenuOpen"
                class="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden">
                <div class="py-1 border border-gray-200 dark:border-gray-700 rounded-md">
                  <button
                    @click="exportDiagram('png')"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                    <svg
                      class="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ t('editor.exportPNG') }}
                  </button>
                  <button
                    @click="exportDiagram('svg')"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                    <svg
                      class="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {{ t('editor.exportSVG') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-hidden">
          <MermaidPreview ref="previewRef" :code="code" @zoom-change="handleZoomChange" />
        </div>
      </section>
    </main>

    <!-- 融合的底部信息与SEO区域 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 text-center">
      <div class="max-w-6xl mx-auto">
        <!-- 主标题 -->
        <h1 class="text-base font-bold text-gray-900 dark:text-white mb-1.5">
          {{ $t('footer.title') }} - {{ $t('footer.editorTitle') }}
        </h1>

        <!-- 功能特点 -->
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-1 leading-tight" v-html="featuresText"></p>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-1.5 leading-tight" v-html="seoText"></p>

        <!-- SEO关键词标签 -->
        <div class="text-xs text-gray-600 dark:text-gray-400 leading-tight">
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.graphTdOnline') }}</span>
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidEditorFree') }}</span>
          <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidChartOnlineFree') }}</span>
          <span class="inline-block">✓ {{ $t('footer.capabilities.mermaidFreeEditor') }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import type { ComponentPublicInstance } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { exportAsPng } from '@/utils/exportUtils'
  // ThemeToggle导入已移至EditorToolbar组件

  const { t } = useI18n()

  // 计算属性：生成带HTML标签的功能描述文本
  const featuresText = computed(() => {
    const description = t('footer.features.description', {
      graphTD: `<strong>${t('footer.features.graphTD')}</strong>`,
      sequenceDiagram: `<strong>${t('footer.features.sequenceDiagram')}</strong>`,
      classDiagram: `<strong>${t('footer.features.classDiagram')}</strong>`
    })
    const desc = t('footer.desc')
    const link =
      '<a href="https://mermaid-drawing.com" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">mermaid-drawing.com</a>'

    return `${description} ${desc} ${link}`
  })

  // 计算属性：生成SEO文本
  const seoText = computed(() => {
    return t('footer.seoText', {
      mermaidDiagramOnlineFree: `<strong>${t('footer.seoKeywords.mermaidDiagramOnlineFree')}</strong>`,
      mermaidChartOnlineFree: `<strong>${t('footer.seoKeywords.mermaidChartOnlineFree')}</strong>`,
      mermaidFreeEditor: `<strong>${t('footer.seoKeywords.mermaidFreeEditor')}</strong>`
    })
  })

  // 定义 MermaidPreview 组件的方法接口
  interface MermaidPreviewMethods {
    zoomIn: () => void
    zoomOut: () => void
    resetView: () => void
  }

  // 默认示例代码
  const defaultCode = `graph TD
  A[😊 Meet Someone Special] --> B{💭 Do You Like Her?}
  B -->|❤️ Yes| C[💬 Start Conversation]
  B -->|😕 No| D[👥 Stay Friends]
  C --> E[🎯 Find Common Interests]
  E --> F{🤔 Is She Interested?}
  F -->|😍 Yes| G[💐 Ask Her Out]
  F -->|😅 Not Sure| H[⏰ Give It Time]
  F -->|😔 No| I[🤝 Respect & Stay Friends]
  G --> J{🌟 First Date Success?}
  J -->|🥰 Amazing| K[❤️ Keep Dating]
  J -->|😊 Good| L[📅 Plan Another Date]
  J -->|😐 Okay| H
  H --> E
  K --> M[💍 Happily Ever After]
  L --> K
  D --> N[😌 Friendship is Also Great]
  I --> N
  
  %% Mermaid Online Free - Create Love Flowcharts! 💕
  %% Best Free Diagram Tool for Everything`

  // 编辑器代码
  const code = ref(defaultCode)

  // 预览引用
  const previewRef = ref<(ComponentPublicInstance & MermaidPreviewMethods) | null>(null)

  // 当前缩放比例
  const currentZoom = ref(0.9)

  // 左侧面板宽度百分比
  const leftPanelWidth = ref(30)
  const isResizing = ref(false)

  // 更新代码
  const updateCode = (newCode: string) => {
    code.value = newCode
  }

  // 处理缩放变化
  const handleZoomChange = (zoom: number) => {
    currentZoom.value = zoom
  }

  // 缩放控制
  const zoomIn = () => {
    if (previewRef.value) {
      previewRef.value.zoomIn()
    }
  }

  const zoomOut = () => {
    if (previewRef.value) {
      previewRef.value.zoomOut()
    }
  }

  const resetView = () => {
    if (previewRef.value) {
      previewRef.value.resetView()
    }
  }

  const isExportMenuOpen = ref(false)

  // 开始调整大小
  const startResize = (e: MouseEvent) => {
    isResizing.value = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', stopResize)
    // 防止文本选择
    document.body.style.userSelect = 'none'
    // 添加拖动中的样式
    const resizer = e.currentTarget as HTMLElement
    if (resizer) {
      resizer.classList.add('is-resizing')
    }
  }

  // 处理鼠标移动
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.value) return

    const container = document.querySelector('.md\\:flex-row') as HTMLElement
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const containerWidth = containerRect.width
    const mouseX = e.clientX - containerRect.left

    // 计算百分比 (限制在 20% 到 80% 之间)
    let newWidth = (mouseX / containerWidth) * 100
    newWidth = Math.max(20, Math.min(80, newWidth))

    leftPanelWidth.value = newWidth
  }

  // 停止调整大小
  const stopResize = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', stopResize)
    document.body.style.userSelect = ''
    // 移除拖动中的样式
    const resizer = document.querySelector('.is-resizing')
    if (resizer) {
      resizer.classList.remove('is-resizing')
    }
  }

  // 导出图表
  const exportDiagram = async (format: 'png' | 'svg') => {
    if (format === 'png') {
      await exportAsPng('mermaid-diagram')
    } else {
      await exportAsSvg('mermaid-diagram')
    }
  }

  // 点击外部关闭导出菜单
  const closeExportMenu = (e: Event) => {
    const target = e.target as HTMLElement
    // 只要点击的不是导出按钮或导出菜单本身，就关闭菜单
    if (isExportMenuOpen.value && !target.closest('.export-menu-container')) {
      isExportMenuOpen.value = false
    }
  }

  // 页面元数据
  useHead({
    title: 'Mermaid Online Free - Graph TD Diagram Editor & Chart Maker',
    meta: [
      {
        name: 'description',
        content:
          'Mermaid online free diagram editor and chart maker. Create graph TD flowcharts, sequence diagrams, class diagrams online free. Free mermaid editor with real-time preview and export.'
      },
      {
        name: 'keywords',
        content:
          'mermaid online free, mermaid diagram online free, mermaid chart online free, mermaid free editor, graph td online, mermaid editor free, mermaid free, flowchart online, sequence diagram online, class diagram online, mermaid graph online'
      }
    ]
  })

  onMounted(() => {
    document.addEventListener('click', closeExportMenu)
  })

  // 组件卸载时清理事件监听器
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', stopResize)
    document.removeEventListener('click', closeExportMenu)
  })
</script>

<style>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    .md\:flex-row {
      flex-direction: column;
    }

    .md\:w-1\/2 {
      width: 100%;
    }

    .md\:h-full {
      height: 50%;
    }
  }

  /* 分隔条样式 */
  .cursor-col-resize:hover .w-0\.5 {
    background-color: #3b82f6; /* 蓝色 */
    height: 2px;
    transition: all 0.2s ease;
  }

  /* 拖动时的样式 */
  .is-resizing {
    background-color: #93c5fd !important; /* 浅蓝色 */
  }

  .is-resizing .w-0\.5 {
    background-color: #2563eb !important; /* 深蓝色 */
    height: 3px !important;
  }

  /* 全局滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
</style>
