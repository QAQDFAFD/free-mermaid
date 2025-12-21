<template>
	<div v-if="showWarning" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
		<div class="bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-6 shadow-2xl max-w-sm w-full mx-auto">
			<div class="flex items-start mb-4">
				<div class="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mr-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-amber-600 dark:text-amber-400"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd" />
					</svg>
				</div>
				<div class="flex-1">
					<h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ t('mobile.title') }}</h2>
					<p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						{{ t('mobile.description') }}
					</p>
				</div>
			</div>
			
			<!-- 移动端优化提示 -->
			<div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-4">
				<p class="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
					<span class="text-base">💡</span>
					<span>{{ t('mobile.tip') }}</span>
				</p>
			</div>

			<div class="flex gap-3">
				<button
					@click="closeWarning"
					class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 text-sm font-medium shadow-lg shadow-blue-500/30">
					{{ t('mobile.continue') }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()
	const showWarning = ref(false)

	// 检测是否是移动设备
	const isMobileDevice = () => {
		return (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
			window.innerWidth < 768
		)
	}

	// 关闭警告并记住选择
	const closeWarning = () => {
		showWarning.value = false
		localStorage.setItem('mermaid-drawing-mobile-warning-dismissed', 'true')
	}

	onMounted(() => {
		// 检查用户是否已经关闭过警告
		const warningDismissed = localStorage.getItem('mermaid-drawing-mobile-warning-dismissed')

		// 如果是移动设备且用户没有关闭过警告，则显示警告
		if (isMobileDevice() && !warningDismissed) {
			showWarning.value = true
		}
	})
</script>
