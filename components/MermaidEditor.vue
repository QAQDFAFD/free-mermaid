<template>
	<div class="h-full w-full">
		<ClientOnly>
			<!-- 编辑器加载前的骨架屏 -->
			<template #fallback>
				<div class="h-full w-full bg-white dark:bg-gray-900 p-4 animate-pulse">
					<div class="space-y-2">
						<div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
						<div class="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
					</div>
				</div>
			</template>
			<component
				:is="CodemirrorComponent"
				v-if="isEditorReady"
				v-model="code"
				placeholder="Enter your Mermaid drawing code here..."
				:style="{ height: '100%', width: '100%' }"
				:autofocus="true"
				:indent-with-tab="true"
				:tab-size="2"
				:extensions="extensions"
				@change="onChange" />
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, computed, onMounted, onUnmounted, shallowRef, markRaw } from 'vue'

	// 动态导入 CodeMirror 相关模块，减少首屏加载
	let CodemirrorModule: any = null
	let javascriptModule: any = null
	let EditorViewModule: any = null
	let LanguageSupportModule: any = null
	let StreamLanguageModule: any = null

	const CodemirrorComponent = shallowRef<any>(null)
	const isEditorReady = ref(false)

	// 标准代码字体栈，确保跨平台一致性
	const CODE_FONT_FAMILY = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'

	// 防抖延迟时间（毫秒）
	const DEBOUNCE_DELAY = 500

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:modelValue', 'change'])

	const code = ref(props.modelValue)
	
	// 防抖定时器
	let debounceTimer: ReturnType<typeof setTimeout> | null = null

	// 检测是否为深色模式
	const isDarkMode = ref(false)

	// 监听深色模式变化
	const updateDarkMode = () => {
		isDarkMode.value = document.documentElement.classList.contains('dark')
	}

	// 存储 observer 引用以便清理
	let observer: MutationObserver | null = null
	
	// storage 事件处理函数
	const handleStorageChange = (e: StorageEvent) => {
		if (e.key === 'theme') {
			updateDarkMode()
		}
	}

	// 异步加载 CodeMirror 模块
	const loadCodeMirror = async () => {
		try {
			// 并行加载所有模块
			const [codemirror, javascript, view, language] = await Promise.all([
				import('vue-codemirror'),
				import('@codemirror/lang-javascript'),
				import('@codemirror/view'),
				import('@codemirror/language')
			])

			CodemirrorModule = codemirror
			javascriptModule = javascript
			EditorViewModule = view
			LanguageSupportModule = language.LanguageSupport
			StreamLanguageModule = language.StreamLanguage

			// 设置组件
			CodemirrorComponent.value = markRaw(codemirror.Codemirror)
			isEditorReady.value = true
		} catch (error) {
			console.error('Failed to load CodeMirror:', error)
		}
	}

	onMounted(() => {
		updateDarkMode()

		// 延迟加载 CodeMirror，优先渲染骨架屏
		if (process.client) {
			// 使用 requestIdleCallback 在空闲时加载，或者立即加载
			if ('requestIdleCallback' in window) {
				(window as any).requestIdleCallback(() => loadCodeMirror(), { timeout: 100 })
			} else {
				// 立即加载，但不阻塞渲染
				setTimeout(loadCodeMirror, 0)
			}
		}

		// 使用MutationObserver监听documentElement的class变化
		observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.attributeName === 'class') {
					updateDarkMode()
				}
			})
		})

		observer.observe(document.documentElement, { attributes: true })

		// 监听自定义主题变化事件
		document.addEventListener('themeChange', updateDarkMode)

		// 监听localStorage变化
		window.addEventListener('storage', handleStorageChange)
	})

	// 组件卸载时清理
	onUnmounted(() => {
		// 清理防抖定时器
		if (debounceTimer) {
			clearTimeout(debounceTimer)
		}
		// 清理 MutationObserver
		if (observer) {
			observer.disconnect()
		}
		// 清理事件监听器
		document.removeEventListener('themeChange', updateDarkMode)
		window.removeEventListener('storage', handleStorageChange)
	})

	// Mermaid drawing 语法高亮定义
	const getMermaidSyntax = () => {
		if (!StreamLanguageModule) return null
		return StreamLanguageModule.define({
			token(stream: any) {
				// 处理关键字
				if (
					stream.match(/graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitGraph/)
				) {
					return 'keyword'
				}

				// 处理方向
				if (stream.match(/TB|TD|BT|RL|LR/)) {
					return 'atom'
				}

				// 处理节点和连接
				if (stream.match(/-->|---|==>|-.->|===/)) {
					return 'operator'
				}

				// 处理节点定义
				if (stream.match(/\[.*?\]|\(.*?\)|{.*?}|>.*?]|\/.*?\//)) {
					return 'string'
				}

				// 处理注释
				if (stream.match(/%%/)) {
					stream.skipToEnd()
					return 'comment'
				}

				// 处理其他字符
				stream.next()
				return null
			}
		})
	}

	// 获取深色模式主题
	const getDarkTheme = () => {
		if (!EditorViewModule) return null
		return EditorViewModule.EditorView.theme({
			'&': {
				fontSize: '14px',
				height: '100%',
				backgroundColor: '#1f2937' // gray-800
			},
			'.cm-content': {
				fontFamily: CODE_FONT_FAMILY,
				color: '#e5e7eb' // gray-200
			},
			'.cm-gutters': {
				backgroundColor: '#374151', // gray-700
				color: '#9ca3af', // gray-400
				border: 'none',
				fontFamily: CODE_FONT_FAMILY
			},
			'.cm-line': {
				color: '#e5e7eb' // gray-200
			},
			'.cm-activeLine': {
				backgroundColor: '#374151' // gray-700
			},
			'.cm-activeLineGutter': {
				backgroundColor: '#4b5563' // gray-600
			},
			'.cm-selectionMatch': {
				backgroundColor: '#4b5563' // gray-600
			},
			'.cm-cursor': {
				borderLeftColor: '#e5e7eb' // gray-200
			},
			'.cm-keyword': {
				color: '#93c5fd' // blue-300
			},
			'.cm-atom': {
				color: '#c4b5fd' // purple-300
			},
			'.cm-operator': {
				color: '#fdba74' // orange-300
			},
			'.cm-string': {
				color: '#86efac' // green-300
			},
			'.cm-comment': {
				color: '#9ca3af' // gray-400
			}
		})
	}

	// 获取默认主题
	const getLightTheme = () => {
		if (!EditorViewModule) return null
		return EditorViewModule.EditorView.theme({
			'&': {
				fontSize: '14px',
				height: '100%'
			},
			'.cm-content': {
				fontFamily: CODE_FONT_FAMILY
			},
			'.cm-gutters': {
				backgroundColor: '#f5f5f5',
				color: '#6e6e6e',
				border: 'none',
				fontFamily: CODE_FONT_FAMILY
			}
		})
	}

	// 编辑器扩展 - 动态计算
	const extensions = computed(() => {
		if (!isEditorReady.value || !EditorViewModule || !LanguageSupportModule || !javascriptModule) {
			return []
		}

		const mermaidSyntax = getMermaidSyntax()
		const currentTheme = isDarkMode.value ? getDarkTheme() : getLightTheme()
		
		const exts = []
		if (mermaidSyntax) {
			exts.push(new LanguageSupportModule(mermaidSyntax))
		}
		if (javascriptModule.javascript) {
			exts.push(javascriptModule.javascript())
		}
		if (currentTheme) {
			exts.push(currentTheme)
		}
		if (EditorViewModule.EditorView) {
			exts.push(EditorViewModule.EditorView.lineWrapping)
		}
		
		return exts
	})

	// 监听代码变化
	watch(
		() => props.modelValue,
		newValue => {
			if (newValue !== code.value) {
				code.value = newValue
			}
		}
	)

	// 当编辑器内容变化时触发（带防抖）
	const onChange = (value: string) => {
		// 立即更新 v-model（保持编辑器状态同步）
		emit('update:modelValue', value)
		
		// 清除之前的定时器
		if (debounceTimer) {
			clearTimeout(debounceTimer)
		}
		
		// 防抖：延迟触发 change 事件（用于渲染预览）
		debounceTimer = setTimeout(() => {
			emit('change', value)
		}, DEBOUNCE_DELAY)
	}

</script>

<style scoped>
	:deep(.cm-editor) {
		height: 100%;
		width: 100%;
	}
</style>
