<template>
	<div class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="flex items-center">
				<svg
					class="h-6 w-6 text-blue-600 mr-2"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
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
					<path
						d="M7 14H14"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
					<path
						d="M14 11L17 14L14 17"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
				<h1 class="text-xl font-bold text-gray-900">Free Mermaid</h1>
			</div>

			<div class="hidden md:flex space-x-2">
				<button
					v-for="example in examples"
					:key="example.name"
					@click="loadExample(example.code)"
					:class="[
						'px-2 py-1 text-sm rounded transition-colors duration-200',
						isCurrentType(example.code)
							? 'bg-blue-100 text-blue-700 font-medium'
							: 'text-gray-700 hover:bg-gray-100'
					]">
					{{ example.name }}
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
				清空
			</button>

			<div class="relative">
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
					导出
				</button>

				<div
					v-if="isExportMenuOpen"
					class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden">
					<div class="py-1 border border-gray-200 rounded-md">
						<button
							@click="exportDiagram('png')"
							class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
							<svg
								class="h-4 w-4 mr-2 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							导出为 PNG 图片
						</button>
						<button
							@click="exportDiagram('svg')"
							class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
							<svg
								class="h-4 w-4 mr-2 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
							</svg>
							导出为 SVG 矢量图
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
	import { exportAsPng, exportAsSvg } from '~/utils/exportUtils'

	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		}
	})

	const emit = defineEmits(['update:code'])

	const isExportMenuOpen = ref(false)
	const currentCode = ref(props.modelValue || '')

	// 示例图表
	const examples = [
		{
			name: '流程图',
			code: `graph TD
    A[开始] --> B{是否已登录?}
    B -->|是| C[显示主页]
    B -->|否| D[显示登录页]
    C --> E[结束]
    D --> E`
		},
		{
			name: '时序图',
			code: `sequenceDiagram
    participant 用户
    participant 系统
    participant 数据库
    
    用户->>系统: 登录请求
    系统->>数据库: 验证凭据
    数据库-->>系统: 验证结果
    系统-->>用户: 登录响应`
		},
		{
			name: '类图',
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
			name: '状态图',
			code: `stateDiagram-v2
    [*] --> 待处理
    待处理 --> 处理中: 开始处理
    处理中 --> 已完成: 完成处理
    处理中 --> 已取消: 取消
    已完成 --> [*]
    已取消 --> [*]`
		},
		{
			name: '实体关系图',
			code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
		},
		{
			name: '甘特图',
			code: `gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析     :done, des1, 2023-01-01, 2023-01-05
    原型设计     :active, des2, 2023-01-06, 3d
    section 开发阶段
    编码        :dev1, after des2, 20d
    测试        :dev2, after dev1, 10d`
		},
		{
			name: '饼图',
			code: `pie title 访问来源
    "搜索引擎" : 42.7
    "直接访问" : 25.5
    "社交媒体" : 18.3
    "其他渠道" : 13.5`
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
		isExportMenuOpen.value = false
	}

	// 清空编辑器
	const clearEditor = () => {
		currentCode.value = ''
		emit('update:code', '')
		isExportMenuOpen.value = false
	}

	// 导出图表
	const exportDiagram = async (format: 'png' | 'svg') => {
		if (format === 'png') {
			await exportAsPng('mermaid-diagram')
		} else {
			await exportAsSvg('mermaid-diagram')
		}
		isExportMenuOpen.value = false
	}

	// 点击外部关闭导出菜单
	const closeExportMenu = (e: Event) => {
		const target = e.target as HTMLElement
		if (!target.closest('.relative') && isExportMenuOpen.value) {
			isExportMenuOpen.value = false
		}
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

	onMounted(() => {
		document.addEventListener('click', closeExportMenu)
	})

	onUnmounted(() => {
		document.removeEventListener('click', closeExportMenu)
	})
</script>
