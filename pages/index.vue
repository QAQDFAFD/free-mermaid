<template>
	<div class="flex flex-col h-screen bg-gray-50">
		<!-- 工具栏 -->
		<EditorToolbar @update:code="updateCode" :model-value="code" />

		<!-- 主内容区域 -->
		<div class="flex flex-col md:flex-row flex-1 overflow-hidden relative">
			<!-- 左侧编辑器 -->
			<div
				:style="{ width: `${leftPanelWidth}%` }"
				class="h-1/2 md:h-full border-r border-gray-200 flex flex-col">
				<div
					class="h-10 flex items-center justify-between bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
					<span>编辑器</span>
					<a
						href="https://mermaid.js.org/intro/"
						target="_blank"
						class="text-xs text-blue-600 hover:text-blue-800 flex items-center">
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
						Mermaid 教程文档
					</a>
				</div>
				<div class="flex-1 overflow-hidden">
					<MermaidEditor v-model="code" @change="updateCode" />
				</div>
			</div>

			<!-- 分隔条 -->
			<div
				class="hidden md:block absolute top-0 bottom-0 w-2 bg-gray-200 hover:bg-blue-100 cursor-col-resize z-10 transition-colors duration-200 flex items-center justify-center"
				:style="{ left: `calc(${leftPanelWidth}% - 1px)` }"
				@mousedown="startResize">
				<!-- 拖动手柄图标 - 垂直居中 -->
				<div class="absolute top-1/2 -translate-y-1/2 h-16 w-2 flex flex-col items-center justify-center">
					<div class="w-0.5 h-1 bg-gray-400 my-0.5 rounded-full"></div>
					<div class="w-0.5 h-1 bg-gray-400 my-0.5 rounded-full"></div>
					<div class="w-0.5 h-1 bg-gray-400 my-0.5 rounded-full"></div>
				</div>
			</div>

			<!-- 右侧预览 -->
			<div :style="{ width: `${100 - leftPanelWidth}%` }" class="h-1/2 md:h-full flex flex-col">
				<div
					class="h-10 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200 flex justify-between items-center">
					<div class="flex items-center">
						<span>预览 {{ currentZoom > 0 ? `(${Math.round(currentZoom * 100)}%)` : '' }}</span>
						<span class="ml-2 text-xs text-gray-500">按住 Ctrl+滚轮可缩放</span>
					</div>
					<div class="flex space-x-2">
						<!-- 缩放控制按钮 -->
						<button
							@click="zoomOut"
							class="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center"
							title="缩小">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
							</svg>
						</button>
						<button
							@click="resetView"
							class="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center"
							title="重置视图">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
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
							class="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center"
							title="放大">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-3 w-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4v16m8-8H4" />
							</svg>
						</button>
					</div>
				</div>
				<div class="flex-1 overflow-hidden">
					<MermaidPreview ref="previewRef" :code="code" @zoom-change="handleZoomChange" />
				</div>
			</div>
		</div>

		<!-- 底部信息 -->
		<footer class="bg-white border-t border-gray-200 py-2 px-4 text-center text-sm text-gray-500">
			<p>Free Mermaid - 免费的在线 Mermaid 图表编辑器</p>
		</footer>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import type { ComponentPublicInstance } from 'vue'

	// 定义 MermaidPreview 组件的方法接口
	interface MermaidPreviewMethods {
		zoomIn: () => void
		zoomOut: () => void
		resetView: () => void
	}

	// 默认示例代码
	const defaultCode = `graph TD
  A[开始] --> B{是否已登录?}
  B -->|是| C[显示主页]
  B -->|否| D[显示登录页]
  C --> E[结束]
  D --> E`

	// 编辑器代码
	const code = ref(defaultCode)

	// 预览引用
	const previewRef = ref<(ComponentPublicInstance & MermaidPreviewMethods) | null>(null)

	// 当前缩放比例
	const currentZoom = ref(1)

	// 左侧面板宽度百分比
	const leftPanelWidth = ref(50)
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

	// 页面元数据
	useHead({
		title: 'Free Mermaid - 在线 Mermaid 图表工具',
		meta: [{ name: 'description', content: '免费的在线 Mermaid 图表编辑器，支持实时预览和导出' }]
	})

	// 组件卸载时清理事件监听器
	onUnmounted(() => {
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', stopResize)
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
