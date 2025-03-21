<template>
	<div v-if="showWarning" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white rounded-lg p-6 shadow-xl max-w-md mx-4">
			<div class="flex items-center mb-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-yellow-500 mr-3"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd" />
				</svg>
				<h2 class="text-xl font-bold text-gray-900">Desktop Recommended</h2>
			</div>
			<p class="mb-4 text-gray-700">
				For the best mermaid drawing experience, we recommend using a desktop device. The editor may not
				function optimally on mobile devices due to screen size limitations.
			</p>
			<div class="flex justify-end">
				<button
					@click="closeWarning"
					class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
					Continue Anyway
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'

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
