<template>
	<div class="h-full w-full flex flex-col">
		<div v-if="error" class="bg-red-50 p-3 rounded-md mb-2 overflow-auto max-h-[30%]">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div class="ml-3 flex-1">
					<h3 class="text-sm font-medium text-red-800">Mermaid Drawing Syntax Error</h3>
					<div class="mt-1 text-sm text-red-700">
						<p>{{ formatErrorMessage(error) }}</p>
					</div>
					<div class="mt-2">
						<button
							@click="showHelp = !showHelp"
							class="text-xs text-blue-600 hover:text-blue-800 underline">
							{{ showHelp ? 'Hide Help' : 'View Help' }}
						</button>
					</div>
					<div v-if="showHelp" class="mt-2 text-xs text-gray-700 bg-gray-50 p-2 rounded">
						<p class="font-medium mb-1">Common Mermaid Drawing Error Fixing Suggestions:</p>
						<ul class="list-disc pl-4 space-y-1">
							<li>Ensure the chart type is correct (e.g. graph TD, sequenceDiagram, etc.)</li>
							<li>Check if node definitions and connection syntax are correct</li>
							<li>Make sure all brackets and quotes are properly closed</li>
							<li>Check if there are any undefined nodes being referenced</li>
							<li>Try simplifying complex chart structures</li>
						</ul>
						<p class="mt-2">
							<a
								href="https://mermaid.js.org/syntax/flowchart.html"
								target="_blank"
								class="text-blue-600 hover:underline">
								View Mermaid Drawing Syntax Documentation →
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-grow overflow-hidden bg-white rounded-md custom-scrollbar" :class="{ 'flex-1': !error }">
			<div
				ref="previewContainer"
				class="w-full h-full overflow-auto relative custom-scrollbar"
				@wheel.prevent="handleWheel"
				@mousedown="startPan"
				@mousemove="pan"
				@mouseup="stopPan"
				@mouseleave="stopPan">
				<div
					id="mermaid-diagram"
					ref="diagramRef"
					class="mermaid-diagram"
					:style="{
						transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
						transformOrigin: 'center center',
						transition: isTransitioning ? 'transform 0.3s ease' : 'none'
					}"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue'

	const { $mermaid } = useNuxtApp()

	const props = defineProps({
		code: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['zoom-change'])

	const diagramRef = ref<HTMLElement | null>(null)
	const previewContainer = ref<HTMLElement | null>(null)
	const error = ref<string | null>(null)
	const showHelp = ref(false)

	// 缩放和平移状态
	const scale = ref(0.5)
	const translateX = ref(0)
	const translateY = ref(0)
	const isPanning = ref(false)
	const lastX = ref(0)
	const lastY = ref(0)
	const isTransitioning = ref(false)

	// 格式化错误信息，使其更易读
	const formatErrorMessage = (errorMsg: string) => {
		// 移除常见的冗长前缀
		let formatted = errorMsg.replace('Error: ', '').replace('Parse error: ', '')

		// 如果错误信息太长，截断它
		if (formatted.length > 150) {
			formatted = formatted.substring(0, 150) + '...'
		}

		return formatted
	}

	// 渲染 Mermaid 图表
	const renderDiagram = async () => {
		if (!diagramRef.value) return

		try {
			error.value = null
			showHelp.value = false

			// 清空之前的内容
			diagramRef.value.innerHTML = ''

			// 创建一个新的容器用于渲染
			const id = `mermaid-${Date.now()}`
			const container = document.createElement('div')
			container.id = id
			container.textContent = props.code
			diagramRef.value.appendChild(container)

			try {
				// 先尝试解析代码，检查语法
				await $mermaid.parse(props.code)

				// 配置mermaid以确保可导出完整图表
				$mermaid.initialize({
					securityLevel: 'loose',
					startOnLoad: false
				})

				// 使用 Mermaid 渲染图表
				const { svg } = await $mermaid.render(id, props.code)

				// 替换容器内容为渲染后的 SVG
				diagramRef.value.innerHTML = svg

				// 确保SVG有正确的宽高
				const svgElement = diagramRef.value.querySelector('svg')
				if (svgElement) {
					svgElement.style.maxWidth = '100%'
					svgElement.style.height = 'auto'
					svgElement.setAttribute('width', '100%')
					svgElement.removeAttribute('height')
				}

				// 重置缩放和平移为默认的50%
				resetView(false)
			} catch (parseErr: any) {
				// 解析或渲染错误
				error.value = parseErr.message || 'Mermaid drawing syntax error'

				// 显示错误提示，但保留编辑器内容
				if (diagramRef.value) {
					diagramRef.value.innerHTML = `
						<div class="flex items-center justify-center h-full w-full text-gray-400">
							<div class="text-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
								<p class="mt-2">Syntax error in your mermaid drawing, please correct and try again</p>
							</div>
						</div>
					`
				}

				console.error('Mermaid drawing parsing error:', parseErr)
			}
		} catch (err: any) {
			error.value = err.message || 'Mermaid drawing rendering failed'
			console.error('Mermaid drawing rendering error:', err)
		}
	}

	// 处理滚轮事件（同时支持缩放和滚动）
	const handleWheel = (e: WheelEvent) => {
		// 如果按住 Ctrl 键，则进行缩放
		if (e.ctrlKey) {
			const delta = e.deltaY > 0 ? -0.1 : 0.1
			const newScale = Math.max(0.5, Math.min(3, scale.value + delta))
			scale.value = newScale
			emit('zoom-change', newScale)
		} else {
			// 否则进行正常滚动
			if (previewContainer.value) {
				previewContainer.value.scrollTop += e.deltaY
				previewContainer.value.scrollLeft += e.deltaX
			}
		}
	}

	// 放大
	const zoomIn = () => {
		scale.value = Math.min(3, scale.value + 0.1)
		emit('zoom-change', scale.value)
	}

	// 缩小
	const zoomOut = () => {
		scale.value = Math.max(0.5, scale.value - 0.1)
		emit('zoom-change', scale.value)
	}

	// 重置视图
	const resetView = (withTransition = true) => {
		isTransitioning.value = withTransition
		scale.value = 0.5
		translateX.value = 0
		translateY.value = 0
		emit('zoom-change', 0.5)

		// 如果有过渡动画，等待动画结束后重置过渡标志
		if (withTransition) {
			setTimeout(() => {
				isTransitioning.value = false
			}, 300)
		}
	}

	// 开始平移
	const startPan = (e: MouseEvent) => {
		// 只有在鼠标左键点击时才开始平移
		if (e.button !== 0) return

		isPanning.value = true
		lastX.value = e.clientX
		lastY.value = e.clientY

		// 改变鼠标样式
		if (previewContainer.value) {
			previewContainer.value.style.cursor = 'grabbing'
		}
	}

	// 平移
	const pan = (e: MouseEvent) => {
		if (!isPanning.value) return

		const dx = e.clientX - lastX.value
		const dy = e.clientY - lastY.value

		translateX.value += dx / scale.value
		translateY.value += dy / scale.value

		lastX.value = e.clientX
		lastY.value = e.clientY
	}

	// 停止平移
	const stopPan = () => {
		isPanning.value = false

		// 恢复鼠标样式
		if (previewContainer.value) {
			previewContainer.value.style.cursor = 'default'
		}
	}

	// 监听代码变化
	watch(
		() => props.code,
		async () => {
			if (props.code.trim()) {
				await renderDiagram()
			} else {
				if (diagramRef.value) {
					diagramRef.value.innerHTML =
						'<div class="flex items-center justify-center h-full w-full text-gray-400">Enter your mermaid drawing code in the editor to see the preview</div>'
				}
				error.value = null
				showHelp.value = false
			}
		},
		{ immediate: true }
	)

	onMounted(async () => {
		if (props.code.trim()) {
			await renderDiagram()
		} else {
			if (diagramRef.value) {
				diagramRef.value.innerHTML =
					'<div class="flex items-center justify-center h-full w-full text-gray-400">Enter your mermaid drawing code in the editor to see the preview</div>'
			}
		}
	})

	// 暴露方法给父组件
	defineExpose({
		zoomIn,
		zoomOut,
		resetView
	})
</script>

<style scoped>
	.mermaid-diagram {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		position: relative;
	}

	.mermaid-diagram :deep(svg) {
		max-width: 100%;
		max-height: 100%;
	}

	/* 平移时的鼠标样式 */
	.grabbing {
		cursor: grabbing !important;
	}

	/* 自定义滚动条样式 */
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}

	/* 隐藏滚动条但保留功能 */
	.custom-scrollbar.hide-scrollbar::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>
