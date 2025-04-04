<template>
	<div
		class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="flex items-center">
				<svg class="h-6 w-6 text-blue-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14 3V7C14 7.55228 14.4477 8 15 8H19"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
					<path
						d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
					<path d="M7 14H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path
						d="M14 11L17 14L14 17"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
				<h1 class="text-xl font-bold text-gray-900">Mermaid Drawing</h1>
			</div>

			<div class="hidden md:flex space-x-2">
				<button
					v-for="example in examples"
					:key="example.name"
					@click="loadExample(example.code)"
					:class="[
						'px-2 py-1 text-sm rounded transition-colors duration-200',
						isCurrentType(example.code) ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
					]">
					{{ t(`tools.${example.key}`) }}
				</button>
			</div>
		</div>

		<div class="flex items-center space-x-2">
			<button
				@click="clearEditor"
				class="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center">
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
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
				{{ t('editor.clear') }}
			</button>

			<ThemeToggle />

			<!-- 语言切换按钮 -->
			<LanguageSwitch />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
	import { exportAsPng, exportAsSvg } from '~/utils/exportUtils'
	import ThemeToggle from '~/components/ThemeToggle.vue'
	import LanguageSwitch from '~/components/LanguageSwitch.vue'
	import { useI18n } from 'vue-i18n'

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:code'])
	const { t } = useI18n()

	const currentCode = ref(props.modelValue || '')
	const error = ref(null)

	// 示例图表
	const examples = [
		{
			name: 'Flowchart',
			key: 'flowchart',
			code: `graph TD
    A[Start] --> B{Logged in?}
    B -->|Yes| C[Show Homepage]
    B -->|No| D[Show Login Page]
    C --> E[End]
    D --> E`
		},
		{
			name: 'Sequence Diagram',
			key: 'sequence',
			code: `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login Request
    System->>Database: Verify Credentials
    Database-->>System: Verification Result
    System-->>User: Login Response`
		},
		{
			name: 'Class Diagram',
			key: 'class',
			code: `classDiagram
    class Animal {
      +String name
      +makeSound()
    }
    class Dog {
      +fetch()
    }
    class Cat {
      +scratch()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
		},
		{
			name: 'State Diagram',
			key: 'state',
			code: `stateDiagram-v2
    [*] --> Pending
    Pending --> Processing: Start Processing
    Processing --> Completed: Complete Processing
    Processing --> Cancelled: Cancel
    Completed --> [*]
    Cancelled --> [*]`
		},
		{
			name: 'Entity Relationship',
			key: 'entity',
			code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
		},
		{
			name: 'Gantt Chart',
			key: 'gantt',
			code: `gantt
    title Project Development Plan
    dateFormat  YYYY-MM-DD
    section Design Phase
    Requirements Analysis     :done, des1, 2023-01-01, 2023-01-05
    Prototype Design     :active, des2, 2023-01-06, 3d
    section Development Phase
    Coding        :dev1, after des2, 20d
    Testing        :dev2, after dev1, 10d`
		},
		{
			name: 'Pie Chart',
			key: 'pie',
			code: `pie title Traffic Sources
    "Search Engines" : 42.7
    "Direct Access" : 25.5
    "Social Media" : 18.3
    "Other Channels" : 13.5`
		}
	]

	// 检查当前代码是否匹配某个示例类型
	const isCurrentType = (exampleCode: string) => {
		// 获取当前代码和示例代码的第一行（图表类型声明）
		const currentFirstLine = currentCode.value.trim().split('\n')[0]?.trim() || ''
		const exampleFirstLine = exampleCode.trim().split('\n')[0]?.trim() || ''

		// 比较第一行来确定图表类型
		return currentFirstLine === exampleFirstLine
	}

	// 加载示例
	const loadExample = (code: string) => {
		currentCode.value = code
		emit('update:code', code)
	}

	// 清空编辑器
	const clearEditor = () => {
		// 先将错误状态重置为null
		error.value = null

		// 先将代码更新为空
		emit('update:code', '')

		// 使用setTimeout确保代码清空被处理后再发送重置事件
		setTimeout(() => {
			// 发送重置事件以便预览组件重置视图
			const resetEvent = new CustomEvent('resetMermaidView')
			document.dispatchEvent(resetEvent)
		}, 50)
	}

	// 监听代码变化
	watch(
		() => props.modelValue,
		newValue => {
			if (newValue !== undefined) {
				currentCode.value = newValue
			}
		}
	)
</script>
