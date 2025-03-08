<template>
	<div class="h-full w-full">
		<ClientOnly>
			<Codemirror
				v-model="code"
				placeholder="在此输入 Mermaid 代码..."
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

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:modelValue', 'change'])

	const code = ref(props.modelValue)

	// 简单的 Mermaid 语法高亮
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

	// 自定义主题
	const myTheme = EditorView.theme({
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

	// 编辑器扩展
	const extensions = [new LanguageSupport(mermaidSyntax), javascript(), myTheme, EditorView.lineWrapping]

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
</script>

<style scoped>
	:deep(.cm-editor) {
		height: 100%;
		width: 100%;
	}
</style>
