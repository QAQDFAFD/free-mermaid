<template>
	<button
		@click="toggleDarkMode"
		class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
		:title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
		<!-- Sun icon for dark mode -->
		<svg
			v-if="isDarkMode"
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-yellow-300"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>

		<!-- Moon icon for light mode -->
		<svg
			v-else
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 text-gray-700"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
		</svg>
	</button>
</template>

<script setup>
	import { ref, onMounted } from 'vue'

	const isDarkMode = ref(false)

	// 创建自定义事件，在主题切换时触发
	const emitThemeChange = theme => {
		// 创建并触发自定义事件
		const event = new CustomEvent('themeChange', { detail: { theme } })
		document.dispatchEvent(event)
	}

	// 切换深色模式
	const toggleDarkMode = () => {
		isDarkMode.value = !isDarkMode.value

		if (isDarkMode.value) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
			// 添加短暂延迟以确保DOM变化已完成
			setTimeout(() => {
				emitThemeChange('dark')
			}, 0)
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
			// 添加短暂延迟以确保DOM变化已完成
			setTimeout(() => {
				emitThemeChange('light')
			}, 0)
		}
	}

	// 在组件挂载时检查用户的主题偏好
	onMounted(() => {
		// 检查本地存储中的主题设置
		const savedTheme = localStorage.getItem('theme')

		// 如果有保存的主题设置则使用它，否则使用系统偏好
		if (savedTheme) {
			isDarkMode.value = savedTheme === 'dark'
		} else {
			// 检查系统偏好
			isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
		}

		// 应用主题
		if (isDarkMode.value) {
			document.documentElement.classList.add('dark')
		}
	})
</script>
