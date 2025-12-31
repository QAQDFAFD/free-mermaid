<template>
  <div class="flex flex-col h-screen bg-gray-50" :class="{ 'fullscreen-mode': isFullscreen }">
    <!-- SEO 主标题 - 视觉隐藏但对搜索引擎和屏幕阅读器可见 -->
    <h1 class="sr-only">{{ $t('footer.title') }} - {{ $t('footer.editorTitle') }}</h1>

    <!-- 工具栏 -->
    <EditorToolbar v-show="!isFullscreen" class="editor-toolbar" @update:code="updateCode" :model-value="code" />

    <!-- 主内容区域 -->
    <main class="flex flex-col md:flex-row flex-1 overflow-hidden relative dark:bg-gray-900" role="main">
      <!-- 左侧编辑器 -->
      <section
        id="mermaid-editor"
        :style="isMobile ? {} : { width: `${leftPanelWidth}%` }"
        class="h-[45%] md:h-full border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex flex-col"
        aria-labelledby="editor-heading">
        <h2 id="editor-heading" class="sr-only">{{ $t('editor.title') }}</h2>
        <div
          class="h-10 flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-2 md:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
          <span aria-hidden="true" class="text-xs md:text-sm truncate">{{ $t('editor.title') }}</span>
          <div class="flex items-center space-x-1 md:space-x-2">
            <NuxtLink
              to="/docs"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="hidden md:inline">{{ $t('editor.documentation') }}</span>
            </NuxtLink>
          </div>
        </div>
        <div class="flex-1 overflow-hidden dark:bg-gray-900">
          <MermaidEditor v-model="code" @change="updateCode" />
        </div>
      </section>

      <!-- 分隔条 - 仅桌面端显示 -->
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
      <section
        id="mermaid-preview"
        :style="isMobile ? {} : { width: `${100 - leftPanelWidth}%` }"
        class="h-[55%] md:h-full flex flex-col"
        aria-labelledby="preview-heading">
        <h2 id="preview-heading" class="sr-only">{{ $t('preview.title') }}</h2>
        <!-- 预览区标题栏 - 移动端优化 -->
        <div
          class="h-10 bg-gray-100 dark:bg-gray-800 px-2 md:px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div class="flex items-center min-w-0">
            <span aria-hidden="true" class="text-xs md:text-sm truncate">
              {{ $t('preview.title') }}
              <span class="hidden sm:inline">{{ currentZoom > 0 ? `(${Math.round(currentZoom * 100)}%)` : '' }}</span>
            </span>
            <!-- 缩放提示 - 仅桌面端显示 -->
            <span
              class="hidden lg:inline-block ml-2 text-xs text-black border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5"
              style="
                background: linear-gradient(
                  135deg,
                  #ff0080 0%,
                  #ff8000 20%,
                  #ffff00 40%,
                  #00ff80 60%,
                  #0080ff 80%,
                  #8000ff 100%
                );
              "
              >{{ $t('preview.zoom') }}</span
            >
          </div>
          <div class="flex items-center space-x-1 md:space-x-2">
            <!-- 缩放控制按钮 -->
            <button
              @click="zoomOut"
              class="p-1.5 md:px-2 md:py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.zoomOut')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:h-3 md:w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button
              @click="resetView"
              class="p-1.5 md:px-2 md:py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.resetView')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:h-3 md:w-3 text-gray-700 dark:text-gray-300"
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
              class="p-1.5 md:px-2 md:py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="$t('preview.zoomIn')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:h-3 md:w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <!-- 全屏按钮 -->
            <button
              @click="toggleFullscreen"
              class="p-1.5 md:px-2 md:py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
              :title="isFullscreen ? $t('preview.exitFullscreen') : $t('preview.fullscreen')">
              <svg
                v-if="!isFullscreen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:h-3 md:w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 md:h-3 md:w-3 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <!-- 导出按钮 -->
            <div class="relative export-menu-container">
              <button
                @click="isExportMenuOpen = !isExportMenuOpen"
                class="px-2 py-1.5 md:px-3 text-xs md:text-sm bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span class="hidden sm:inline">{{ t('editor.export') }}</span>
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
        <div class="flex-1 overflow-hidden relative">
          <MermaidPreview
            ref="previewRef"
            :code="previewCode"
            :typing="isTyping"
            :diagram-theme="diagramTheme"
            @zoom-change="handleZoomChange" />

          <!-- 悬浮主题选择器 - 左下角 -->
          <DiagramThemeSelector v-model="diagramTheme" />

          <!-- 正在输入提示 -->
          <Transition name="fade">
            <div
              v-if="isTyping"
              class="absolute top-2 right-2 bg-blue-500/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm z-10">
              <svg class="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ $t('preview.typing') }}</span>
            </div>
          </Transition>
        </div>
      </section>
    </main>

    <!-- 融合的底部信息与SEO区域 - 移动端隐藏 -->
    <footer
      v-show="!isFullscreen && !isMobile"
      class="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center overflow-hidden transition-all duration-300 hidden md:block"
      :class="isFooterCollapsed ? 'py-1 px-4' : 'py-2 px-4'">
      <!-- 折叠/展开按钮 -->
      <button
        @click="toggleFooter"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm"
        :title="isFooterCollapsed ? $t('footer.expand') : $t('footer.collapse')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 text-gray-600 dark:text-gray-300 transition-transform duration-300"
          :class="{ 'rotate-180': isFooterCollapsed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- 美人鱼尾巴背景动画 - 只在展开时显示 -->
      <div v-show="!isFooterCollapsed" class="absolute inset-0 pointer-events-none">
        <!-- 水波纹背景 -->
        <div class="absolute inset-0 opacity-20 dark:opacity-15">
          <div class="wave-animation"></div>
          <div class="wave-animation" style="animation-delay: -2s"></div>
          <div class="wave-animation" style="animation-delay: -4s"></div>
        </div>

        <!-- 美人鱼尾巴 -->
        <div class="absolute bottom-0 right-0 opacity-35 dark:opacity-25">
          <svg width="200" height="80" viewBox="0 0 200 80" class="mermaid-tail">
            <!-- 尾巴主体 -->
            <path
              d="M20,60 Q40,20 80,40 Q120,60 160,30 Q180,50 200,20"
              stroke="url(#tailGradient)"
              stroke-width="10"
              fill="none"
              stroke-linecap="round" />
            <!-- 尾鳍 -->
            <path d="M180,20 Q200,10 190,30 Q200,40 185,35 Q175,25 180,20" fill="url(#finGradient)" opacity="1" />
            <!-- 小鳞片装饰 -->
            <circle cx="50" cy="45" r="4" fill="url(#scaleGradient)" opacity="0.9" />
            <circle cx="90" cy="35" r="3.5" fill="url(#scaleGradient)" opacity="0.9" />
            <circle cx="130" cy="50" r="4" fill="url(#scaleGradient)" opacity="0.9" />

            <!-- 渐变定义 -->
            <defs>
              <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #1e40af; stop-opacity: 0.9" />
                <stop offset="50%" style="stop-color: #0891b2; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #059669; stop-opacity: 0.9" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #0891b2; stop-opacity: 0.9" />
                <stop offset="100%" style="stop-color: #1e40af; stop-opacity: 1" />
              </linearGradient>
              <radialGradient id="scaleGradient">
                <stop offset="0%" style="stop-color: #ffffff; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #0891b2; stop-opacity: 0.7" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <!-- 左侧美人鱼尾巴 -->
        <div class="absolute bottom-0 left-0 opacity-25 dark:opacity-15">
          <svg width="150" height="60" viewBox="0 0 150 60" class="mermaid-tail-left">
            <path
              d="M0,40 Q30,20 60,35 Q90,45 120,25 Q140,35 150,20"
              stroke="url(#tailGradient2)"
              stroke-width="8"
              fill="none"
              stroke-linecap="round" />
            <defs>
              <linearGradient id="tailGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #059669; stop-opacity: 0.8" />
                <stop offset="50%" style="stop-color: #0891b2; stop-opacity: 1" />
                <stop offset="100%" style="stop-color: #7c3aed; stop-opacity: 0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- 漂浮泡泡 -->
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <!-- 折叠状态：只显示一行简要信息（视觉层） -->
        <div
          v-show="isFooterCollapsed"
          class="flex items-center justify-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
          <span class="font-medium text-gray-900 dark:text-white">{{ $t('footer.title') }}</span>
          <span>|</span>
          <span>{{ $t('footer.capabilities.graphTdOnline') }}</span>
          <span>•</span>
          <span>{{ $t('footer.capabilities.mermaidEditorFree') }}</span>
          <a href="https://mermaid-drawing.com" class="text-blue-600 dark:text-blue-400 hover:underline ml-2"
            >mermaid-drawing.com</a
          >
        </div>

        <!-- 展开状态：显示完整内容（SEO 内容始终在 DOM 中，只是视觉隐藏） -->
        <div :class="isFooterCollapsed ? 'hidden' : ''">
          <!-- 关于编辑器 -->
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" class="text-base font-bold text-gray-900 dark:text-white mb-1.5">
              {{ $t('footer.title') }} - {{ $t('footer.editorTitle') }}
            </h2>

            <!-- 功能特点 -->
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-1 leading-tight" v-html="featuresText"></p>
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-1.5 leading-tight" v-html="seoText"></p>
          </section>

          <!-- 支持的图表类型 -->
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" class="sr-only">{{ $t('footer.capabilities.title') || 'Supported Features' }}</h2>
            <div class="text-xs text-gray-600 dark:text-gray-400 leading-tight mb-2">
              <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.graphTdOnline') }}</span>
              <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidEditorFree') }}</span>
              <span class="inline-block mr-2">✓ {{ $t('footer.capabilities.mermaidChartOnlineFree') }}</span>
              <span class="inline-block">✓ {{ $t('footer.capabilities.mermaidFreeEditor') }}</span>
            </div>
          </section>

          <!-- 导航链接 -->
          <nav aria-label="Footer navigation">
            <div class="text-center space-x-4">
              <button
                @click="() => $startTour(locale)"
                class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
                title="重新开始新手引导">
                🚀 {{ $t('footer.startTour') }}
              </button>
              <NuxtLink
                to="/about"
                class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ locale === 'zh' ? '关于我们' : 'About' }}
              </NuxtLink>
              <NuxtLink
                to="/privacy"
                class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ locale === 'zh' ? '隐私政策' : 'Privacy' }}
              </NuxtLink>
              <NuxtLink
                to="/terms"
                class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ locale === 'zh' ? '服务条款' : 'Terms' }}
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ locale === 'zh' ? '联系我们' : 'Contact' }}
              </NuxtLink>
              <NuxtLink
                to="/faq"
                class="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ locale === 'zh' ? '常见问题' : 'FAQ' }}
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>
    </footer>

    <!-- 全屏模式下的退出提示 -->
    <div
      v-if="isFullscreen"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      @click="toggleFullscreen">
      {{ $t('preview.pressEscToExit') || 'Press ESC or click to exit fullscreen' }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent, shallowRef } from 'vue'
  import type { ComponentPublicInstance } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { getExample, getExamples, exampleKeys, type ExampleSet } from '@/composables/useExamples'
  import { preloadCriticalResources } from '@/composables/useAppReady'

  // 延迟导入 exportUtils，只在需要时加载
  let exportAsPng: any = null
  const loadExportUtils = async () => {
    if (!exportAsPng) {
      const mod = await import('@/utils/exportUtils')
      exportAsPng = mod.exportAsPng
    }
    return exportAsPng
  }


  const { t, locale } = useI18n()

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

  // 当前使用的示例类型（用于语言切换时保持同类型）
  const currentExampleType = ref<keyof ExampleSet | null>('default')

  // 获取初始默认示例（使用英文作为默认值，后续会根据 locale 更新）
  const initialExample = getExample('en', 'default')

  // 编辑器代码
  const code = ref(initialExample)

  // 预览代码（防抖后更新，避免输入时频繁报错）
  const previewCode = ref(initialExample)

  // 检查代码是否匹配某个示例（用于判断用户是否修改过）
  const findMatchingExampleType = (codeToCheck: string): keyof ExampleSet | null => {
    const currentExamples = getExamples(locale.value)
    for (const key of exampleKeys) {
      if (codeToCheck === currentExamples[key]) {
        return key
      }
    }
    return null
  }

  // 初始化代码（在 onMounted 中设置，确保翻译已加载）
  const initializeCode = () => {
    const defaultExample = getExample(locale.value, 'default')
    // 如果当前代码是英文默认示例，则更新为当前语言的默认示例
    const enDefault = getExample('en', 'default')
    if (!code.value || code.value === '' || code.value === enDefault) {
      code.value = defaultExample
      previewCode.value = defaultExample
      currentExampleType.value = 'default'
    }
  }

  // 监听语言变化，自动切换示例（仅当用户没有修改代码时）
  watch(locale, (newLocale, oldLocale) => {
    if (newLocale !== oldLocale && currentExampleType.value) {
      // 用户正在使用某个示例，切换到新语言的同类型示例
      const newExample = getExample(newLocale, currentExampleType.value)
      code.value = newExample
      previewCode.value = newExample
    }
  })

  // 是否正在输入（用于显示输入提示）
  const isTyping = ref(false)

  // 图表主题
  const diagramTheme = ref('default')

  // 预览引用
  const previewRef = ref<(ComponentPublicInstance & MermaidPreviewMethods) | null>(null)

  // 当前缩放比例
  const currentZoom = ref(0.9)

  // 左侧面板宽度百分比
  const leftPanelWidth = ref(30)
  const isResizing = ref(false)

  // 移动端检测
  const isMobile = ref(false)
  const checkMobile = () => {
    if (process.client) {
      isMobile.value = window.innerWidth < 768
    }
  }

  // 全屏模式
  const isFullscreen = ref(false)

  // Footer 折叠状态
  const isFooterCollapsed = ref(false)

  // 切换全屏模式
  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
  }

  // 切换 Footer 折叠状态
  const toggleFooter = () => {
    isFooterCollapsed.value = !isFooterCollapsed.value
    // 保存用户偏好到 localStorage
    if (process.client) {
      localStorage.setItem('footerCollapsed', String(isFooterCollapsed.value))
    }
  }

  // 引导功能
  const { $startTour } = useNuxtApp()
  const hasSeenTour = useCookie('mermaid-tour-seen', { default: () => false })

  onMounted(() => {
    // 在空闲时预加载可能需要的资源（AI助手、导出工具等）
    preloadCriticalResources()
    // 检查是否有从文档页面传来的代码
    if (process.client) {
      const tryCode = sessionStorage.getItem('mermaid-try-code')
      if (tryCode) {
        code.value = tryCode
        previewCode.value = tryCode
        currentExampleType.value = null // 用户自定义代码
        sessionStorage.removeItem('mermaid-try-code')
      } else {
        // 初始化默认代码（确保翻译已加载）
        initializeCode()
      }
    } else {
      initializeCode()
    }

    // 首次访问自动启动引导（延迟执行，确保用户有时间看到界面）
    if (!hasSeenTour.value) {
      setTimeout(() => {
        $startTour(locale.value)
      }, 500)
    }

    // 恢复 Footer 折叠状态
    if (process.client) {
      const savedState = localStorage.getItem('footerCollapsed')
      if (savedState === 'true') {
        isFooterCollapsed.value = true
      }

      // 恢复图表主题偏好
      const savedTheme = localStorage.getItem('mermaid-diagram-theme')
      if (savedTheme) {
        diagramTheme.value = savedTheme
      }

      // 初始化移动端检测
      checkMobile()
      window.addEventListener('resize', checkMobile)
    }

    // 监听 ESC 键退出全屏
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen.value) {
        isFullscreen.value = false
      }
    }
    document.addEventListener('keydown', handleKeydown)

    // 清理函数
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      if (process.client) {
        window.removeEventListener('resize', checkMobile)
      }
    })
  })

  // 更新预览代码（由编辑器防抖后触发）
  // 更新代码（由工具栏或编辑器触发）
  // 更新代码（由工具栏或编辑器触发）
  const updateCode = (newCode: string) => {
    code.value = newCode
    previewCode.value = newCode
    isTyping.value = false

    // 检查是否是某个示例，更新当前示例类型
    currentExampleType.value = findMatchingExampleType(newCode)
  }

  // 监听编辑器代码变化，设置正在输入状态
  watch(code, (newCode, oldCode) => {
    if (newCode !== oldCode && newCode !== previewCode.value) {
      isTyping.value = true
      // 用户正在编辑，检查是否还是示例代码
      currentExampleType.value = findMatchingExampleType(newCode)
    }
  })

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
      const fn = await loadExportUtils()
      await fn('mermaid-diagram')
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
    title: 'Graph TD Online - Free Mermaid Editor with AI | Mermaid Online Free',
    meta: [
      {
        name: 'description',
        content:
          'Graph TD online free editor - Create mermaid diagrams with AI. Best mermaid online free tool for flowcharts, sequence diagrams. Free mermaid editor with graphtd support, real-time preview and export.'
      },
      {
        name: 'keywords',
        content:
          'graph td, mermaid online, graph td online, mermaid diagram online, mermaid online free, mermaid free, online mermaid editor, graphtd, free mermaid editor, mermaid editor free, mermaid ai, ai diagram generator'
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

  /* 屏幕阅读器专用类 - 视觉隐藏但对 SEO 和无障碍可见 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* 全屏模式样式 */
  .fullscreen-mode {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }

  .fullscreen-mode main {
    height: 100vh !important;
  }

  /* 移动端布局优化 */
  @media (max-width: 768px) {
    .md\:flex-row {
      flex-direction: column;
    }

    .md\:w-1\/2 {
      width: 100%;
    }

    .md\:h-full {
      height: auto;
    }

    /* 移动端编辑器和预览区高度 */
    #mermaid-editor {
      width: 100% !important;
      min-height: 40vh;
    }

    #mermaid-preview {
      width: 100% !important;
      min-height: 45vh;
    }

    /* 移动端滚动条更细 */
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    /* 移动端禁用水平滚动 */
    body {
      overflow-x: hidden;
    }
  }

  /* 小屏幕手机优化 */
  @media (max-width: 480px) {
    #mermaid-editor {
      min-height: 35vh;
    }

    #mermaid-preview {
      min-height: 50vh;
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

  /* 美人鱼尾巴动画样式 */
  @keyframes mermaidSwim {
    0%,
    100% {
      transform: translateX(0) rotate(0deg);
    }
    25% {
      transform: translateX(-5px) rotate(-2deg);
    }
    50% {
      transform: translateX(0) rotate(0deg);
    }
    75% {
      transform: translateX(5px) rotate(2deg);
    }
  }

  @keyframes mermaidSwimLeft {
    0%,
    100% {
      transform: translateX(0) rotate(0deg) scaleX(-1);
    }
    25% {
      transform: translateX(5px) rotate(2deg) scaleX(-1);
    }
    50% {
      transform: translateX(0) rotate(0deg) scaleX(-1);
    }
    75% {
      transform: translateX(-5px) rotate(-2deg) scaleX(-1);
    }
  }

  @keyframes mermaidTailSwim {
    0% {
      left: -80px;
      bottom: -35px;
    }
    25% {
      left: 25%;
      bottom: -25px;
    }
    50% {
      left: 50%;
      bottom: -30px;
    }
    75% {
      left: 75%;
      bottom: -20px;
    }
    100% {
      left: 100%;
      bottom: -35px;
    }
  }

  @keyframes mermaidTailWiggle {
    0%,
    100% {
      transform: scaleY(1) skewX(0deg) rotate(0deg);
    }
    25% {
      transform: scaleY(0.9) skewX(-8deg) rotate(-3deg);
    }
    50% {
      transform: scaleY(1.1) skewX(0deg) rotate(0deg);
    }
    75% {
      transform: scaleY(0.9) skewX(8deg) rotate(3deg);
    }
  }

  @keyframes bubbleFloat {
    0% {
      transform: translateY(20px) scale(0.8);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-80px) scale(1.2);
      opacity: 0;
    }
  }

  .mermaid-tail {
    animation: mermaidSwim 6s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .mermaid-tail-left {
    animation: mermaidSwimLeft 8s ease-in-out infinite;
    transform-origin: center bottom;
  }

  .wave-animation {
    position: absolute;
    bottom: -30px;
    left: 0px;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%);
    opacity: 0.8;
    clip-path: polygon(
      40% 100%,
      42% 90%,
      44% 80%,
      46% 70%,
      47% 60%,
      48% 50%,
      47% 40%,
      45% 30%,
      40% 25%,
      30% 20%,
      18% 15%,
      8% 10%,
      2% 5%,
      0% 0%,
      2% 2%,
      8% 5%,
      18% 8%,
      30% 12%,
      40% 15%,
      45% 18%,
      48% 22%,
      50% 25%,
      52% 22%,
      55% 18%,
      60% 15%,
      70% 12%,
      82% 8%,
      92% 5%,
      98% 2%,
      100% 0%,
      98% 5%,
      92% 10%,
      82% 15%,
      70% 20%,
      60% 25%,
      55% 30%,
      53% 40%,
      52% 50%,
      53% 60%,
      54% 70%,
      56% 80%,
      58% 90%,
      60% 100%
    );
    animation: mermaidTailSwim 10s linear infinite, mermaidTailWiggle 2.5s ease-in-out infinite;
  }

  .bubble {
    position: absolute;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(8, 145, 178, 0.6));
    border-radius: 50%;
    animation: bubbleFloat 4s ease-in-out infinite;
  }

  .bubble-1 {
    width: 8px;
    height: 8px;
    left: 20%;
    bottom: 0;
    animation-delay: 0s;
    animation-duration: 5s;
  }

  .bubble-2 {
    width: 6px;
    height: 6px;
    left: 40%;
    bottom: 0;
    animation-delay: -1.5s;
    animation-duration: 4s;
  }

  .bubble-3 {
    width: 10px;
    height: 10px;
    left: 60%;
    bottom: 0;
    animation-delay: -3s;
    animation-duration: 6s;
  }

  .bubble-4 {
    width: 5px;
    height: 5px;
    left: 80%;
    bottom: 0;
    animation-delay: -4.5s;
    animation-duration: 3.5s;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .mermaid-tail {
      width: 150px;
      height: 60px;
    }

    .mermaid-tail-left {
      width: 100px;
      height: 40px;
    }

    .wave-animation {
      width: 60px;
      height: 60px;
      bottom: -25px;
    }
  }

  /* Fade 过渡动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
