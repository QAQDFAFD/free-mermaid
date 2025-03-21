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

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:modelValue', 'change'])

	const code = ref(props.modelValue)

	// 检测是否为深色模式
	const isDarkMode = ref(false)

	// 监听深色模式变化
	const updateDarkMode = () => {
		isDarkMode.value = document.documentElement.classList.contains('dark')
	}

	onMounted(() => {
		updateDarkMode()

		// 使用MutationObserver监听documentElement的class变化
		const observer = new MutationObserver(mutations => {
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
		window.addEventListener('storage', e => {
			if (e.key === 'theme') {
				updateDarkMode()
			}
		})

		// 组件卸载时清理事件监听器
		onUnmounted(() => {
			observer.disconnect()
			document.removeEventListener('themeChange', updateDarkMode)
			window.removeEventListener('storage', updateDarkMode)
		})
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
			fontFamily: 'monospace',
			color: '#e5e7eb' // gray-200
		},
		'.cm-gutters': {
			backgroundColor: '#374151', // gray-700
			color: '#9ca3af', // gray-400
			border: 'none'
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
			fontFamily: 'monospace'
		},
		'.cm-gutters': {
			backgroundColor: '#f5f5f5',
			color: '#6e6e6e',
			border: 'none'
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

	// 当编辑器内容变化时触发
	const onChange = (value: string) => {
		emit('update:modelValue', value)
		emit('change', value)
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
