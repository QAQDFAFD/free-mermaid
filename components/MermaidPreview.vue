<template>
	<div class="h-full w-full flex flex-col">
		<div v-if="error" class="bg-red-50 dark:bg-red-900/30 p-3 rounded-md mb-2 overflow-auto max-h-[30%]">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg
						class="h-5 w-5 text-red-400 dark:text-red-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div class="ml-3 flex-1">
					<h3 class="text-sm font-medium text-red-800 dark:text-red-400">Mermaid Drawing Syntax Error</h3>
					<div class="mt-1 text-sm text-red-700 dark:text-red-300">
						<p>{{ formatErrorMessage(error) }}</p>
					</div>
					<div class="mt-2">
						<button
							@click="showHelp = !showHelp"
							class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
							{{ showHelp ? 'Hide Help' : 'View Help' }}
						</button>
					</div>
					<div
						v-if="showHelp"
						class="mt-2 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded">
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
								class="text-blue-600 dark:text-blue-400 hover:underline">
								View Mermaid Drawing Syntax Documentation →
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div
			class="flex-grow overflow-hidden bg-white dark:bg-gray-800 rounded-md custom-scrollbar"
			:class="{ 'flex-1': !error }">
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
					class="mermaid-diagram dark:text-gray-100"
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
	import { ref, watch, onMounted, onUnmounted } from 'vue'

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
	const hasContent = ref(false)

	// 监听深色模式变化
	const isDarkMode = ref(false)

	// 更新深色模式状态并重新渲染图表
	const updateDarkMode = () => {
		const newDarkMode = document.documentElement.classList.contains('dark')
		if (isDarkMode.value !== newDarkMode) {
			isDarkMode.value = newDarkMode
			renderDiagram() // 重新渲染图表以应用新主题
		}
	}

	// 监听主题变化事件
	onMounted(() => {
		// 初始化深色模式状态
		isDarkMode.value = document.documentElement.classList.contains('dark')

		// 使用MutationObserver监听body的class变化
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.attributeName === 'class') {
					updateDarkMode()
				}
			})
		})

		observer.observe(document.documentElement, { attributes: true })

		// 监听localStorage变化
		window.addEventListener('storage', e => {
			if (e.key === 'theme') {
				updateDarkMode()
			}
		})

		// 组件卸载时清理
		onUnmounted(() => {
			observer.disconnect()
			window.removeEventListener('storage', updateDarkMode)
		})
	})

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

		// 首先检查内容是否为空，为空则显示占位符
		if (!props.code || !props.code.trim()) {
			hasContent.value = false
			error.value = null
			showHelp.value = false

			// 显示占位符，但使用更大的字体，补偿50%缩放带来的缩小效果
			if (diagramRef.value) {
				diagramRef.value.innerHTML = `
					<div class="placeholder-wrapper" style="transform: scale(2); transform-origin: center center;">
						<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500 text-xl">
							Enter your mermaid drawing code in the editor to see the preview
						</div>
					</div>
				`
			}
			return
		}

		try {
			error.value = null
			showHelp.value = false

			// 保存当前的变换状态，以便渲染后恢复
			const currentScaleValue = scale.value
			const currentTranslateXValue = translateX.value
			const currentTranslateYValue = translateY.value

			// 检查是否有内容并更新状态
			hasContent.value = props.code.trim().length > 0

			// 清空之前的内容
			diagramRef.value.innerHTML = ''

			if (!hasContent.value) {
				// 添加占位文字容器，不受缩放影响
				diagramRef.value.innerHTML = `
					<div class="placeholder-wrapper" style="transform: scale(${1 / currentScaleValue}); transform-origin: center center;">
						<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500">
							Enter your mermaid drawing code in the editor to see the preview
						</div>
					</div>
				`
				return
			}

			// 创建一个新的容器用于渲染
			const id = `mermaid-${Date.now()}`
			const container = document.createElement('div')
			container.id = id
			container.textContent = props.code
			diagramRef.value.appendChild(container)

			try {
				// 只有在有内容时才尝试解析和渲染
				if (props.code && props.code.trim()) {
					// 先尝试解析代码，检查语法
					await $mermaid.parse(props.code)

					// 实时检测当前是否为深色模式
					const currentDarkMode = document.documentElement.classList.contains('dark')
					isDarkMode.value = currentDarkMode

					// 配置mermaid以确保可导出完整图表和深色模式支持
					$mermaid.initialize({
						securityLevel: 'loose',
						startOnLoad: false,
						theme: currentDarkMode ? 'dark' : 'default'
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

						// 如果是深色模式，调整SVG背景色和文本颜色
						if (currentDarkMode) {
							svgElement.style.backgroundColor = 'transparent'

							// 查找SVG中的所有文本元素，确保它们在深色模式下可见
							const textElements = svgElement.querySelectorAll('text')
							textElements.forEach(textElement => {
								// 如果文本颜色太暗，改为亮色
								const currentFill = textElement.getAttribute('fill')
								if (
									currentFill &&
									['#000', '#000000', 'black', 'rgb(0,0,0)'].includes(currentFill.toLowerCase())
								) {
									textElement.setAttribute('fill', '#e5e7eb') // 使用灰色-200作为默认亮色
								}
							})

							// 对所有路径和形状元素应用适当的深色模式样式
							const pathElements = svgElement.querySelectorAll(
								'path, rect, circle, ellipse, line, polygon, polyline'
							)
							pathElements.forEach(element => {
								// 如果是描边且为黑色，改为亮色
								const stroke = element.getAttribute('stroke')
								if (
									stroke &&
									['#000', '#000000', 'black', 'rgb(0,0,0)'].includes(stroke.toLowerCase())
								) {
									element.setAttribute('stroke', '#e5e7eb')
								}
							})
						}
					}
				}

				// 恢复之前的缩放和平移状态，而不是重置
				scale.value = currentScaleValue
				translateX.value = currentTranslateXValue
				translateY.value = currentTranslateYValue
			} catch (parseErr: any) {
				// 解析或渲染错误
				error.value = parseErr.message || 'Mermaid drawing syntax error'

				// 显示错误提示，但保留编辑器内容
				if (diagramRef.value) {
					diagramRef.value.innerHTML = `
						<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500">
							<div class="text-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

		// 无论是否有内容，都重置为50%
		scale.value = 0.5
		emit('zoom-change', 0.5)
		translateX.value = 0
		translateY.value = 0

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
		async newCode => {
			// 立即重置任何存在的错误
			error.value = null
			showHelp.value = false

			// 检查代码是否为空
			if (newCode === undefined || newCode === null || newCode === '') {
				// 当代码为空时，清空内容、更新状态并显示占位符
				hasContent.value = false

				if (diagramRef.value) {
					// 清空内容并显示占位符，使用更大字体补偿50%缩放
					diagramRef.value.innerHTML = `
						<div class="placeholder-wrapper" style="transform: scale(2); transform-origin: center center;">
							<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500 text-xl">
								Enter your mermaid drawing code in the editor to see the preview
							</div>
						</div>
					`
				}

				// 保持50%缩放
				if (scale.value !== 0.5) {
					scale.value = 0.5
					translateX.value = 0
					translateY.value = 0
					emit('zoom-change', 0.5)
				}

				return
			}

			// 当有内容时
			if (newCode.trim()) {
				hasContent.value = true
				await renderDiagram()
				// 注释掉自动调整为50%的代码，让用户保持当前缩放状态
				// if (Math.abs(scale.value - 0.5) > 0.1) {
				//    resetView(true)
				// }
			}
		},
		{ immediate: true }
	)

	// 监听自定义主题变化事件
	onMounted(async () => {
		// 更新currentZoom，确保与初始scale值一致
		emit('zoom-change', scale.value)

		if (props.code.trim()) {
			hasContent.value = true
			await renderDiagram()
		} else {
			hasContent.value = false
			if (diagramRef.value) {
				// 使用更大字体的占位符，补偿50%缩放带来的缩小效果
				diagramRef.value.innerHTML = `
					<div class="placeholder-wrapper" style="transform: scale(2); transform-origin: center center;">
						<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500 text-xl">
							Enter your mermaid drawing code in the editor to see the preview
						</div>
					</div>
				`
			}
		}

		// 防抖函数，避免频繁重绘
		const debounce = (fn: Function, delay: number) => {
			let timer: ReturnType<typeof setTimeout> | null = null
			return function (this: any) {
				const context = this
				const args = arguments
				if (timer) clearTimeout(timer)
				timer = setTimeout(() => {
					fn.apply(context, args)
				}, delay)
			}
		}

		// 创建防抖版本的渲染函数
		const debouncedRender = debounce(() => {
			// 保存当前的缩放和平移状态
			const currentScale = scale.value
			const currentTranslateX = translateX.value
			const currentTranslateY = translateY.value

			// 执行渲染
			renderDiagram().then(() => {
				// 渲染后恢复之前的缩放和平移状态，而不是重置
				scale.value = currentScale
				translateX.value = currentTranslateX
				translateY.value = currentTranslateY

				// 通知父组件缩放比例
				emit('zoom-change', currentScale)
			})
		}, 100)

		// 处理清除事件的函数
		const handleReset = (event: Event) => {
			// 立即重置错误状态和帮助显示
			error.value = null
			showHelp.value = false

			// 清空旧内容
			if (diagramRef.value) {
				diagramRef.value.innerHTML = ''
			}

			// 标记内容为空
			hasContent.value = false

			// 保持50%缩放
			scale.value = 0.5
			translateX.value = 0
			translateY.value = 0
			emit('zoom-change', 0.5)

			// 更新占位符文本，使用放大的字体补偿缩放
			if (diagramRef.value) {
				diagramRef.value.innerHTML = `
					<div class="placeholder-wrapper" style="transform: scale(2); transform-origin: center center;">
						<div class="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-500 text-xl">
							Enter your mermaid drawing code in the editor to see the preview
						</div>
					</div>
				`
			}
		}

		// 监听清除事件，根据内容状态智能处理缩放
		document.addEventListener('resetMermaidView', handleReset)

		// 监听自定义主题变化事件
		document.addEventListener('themeChange', debouncedRender as EventListener)

		// 监听强制更新主题事件
		document.addEventListener('forceThemeUpdate', debouncedRender as EventListener)

		// 组件卸载时清理事件监听器
		onUnmounted(() => {
			document.removeEventListener('themeChange', debouncedRender as EventListener)
			document.removeEventListener('forceThemeUpdate', debouncedRender as EventListener)
			document.removeEventListener('resetMermaidView', handleReset)
		})
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
