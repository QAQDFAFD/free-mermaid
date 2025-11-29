<template>
	<div class="h-full w-full">
		<ClientOnly>
			<Codemirror
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
	import { Codemirror } from 'vue-codemirror'
	import { javascript } from '@codemirror/lang-javascript'
	import { EditorView } from '@codemirror/view'
	import { LanguageSupport, StreamLanguage } from '@codemirror/language'
	import { ref, watch, computed, onMounted, onUnmounted } from 'vue'

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

	onMounted(() => {
		updateDarkMode()

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

	// Mermaid drawing 语法高亮
	const mermaidSyntax = StreamLanguage.define({
		token(stream) {
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

	// 深色模式主题
	const darkTheme = EditorView.theme({
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

	// 默认主题
	const lightTheme = EditorView.theme({
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

	// 根据当前模式计算使用的主题
	const currentTheme = computed(() => {
		return isDarkMode.value ? darkTheme : lightTheme
	})

	// 编辑器扩展
	const extensions = computed(() => [
		new LanguageSupport(mermaidSyntax),
		javascript(),
		currentTheme.value,
		EditorView.lineWrapping
	])

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

	// 监听深色模式变化
	watch(
		() => isDarkMode.value,
		() => {
			// 这里无需特殊处理，computed 值会自动更新
		}
	)
</script>

<style scoped>
	:deep(.cm-editor) {
		height: 100%;
		width: 100%;
	}
</style>
