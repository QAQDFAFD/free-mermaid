<template>
	<div>
		<MobileWarning />
		<NuxtPage />
	</div>
</template>

<script setup>
	import MobileWarning from '~/components/MobileWarning.vue'
	import { onMounted, onUnmounted } from 'vue'

	// 初始化深色模式
	onMounted(() => {
		// 检查用户偏好
		const savedTheme = localStorage.getItem('theme')

		if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark')
		}

		// 创建一个全局的自定义事件处理函数，强制所有组件重新评估深色模式
		const forceThemeUpdate = () => {
			// 创建并触发自定义事件
			const event = new CustomEvent('forceThemeUpdate')
			document.dispatchEvent(event)
		}

		// 使用MutationObserver监听documentElement的class变化
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.attributeName === 'class') {
					// 当class变化时触发全局事件
					forceThemeUpdate()
				}
			})
		})

		observer.observe(document.documentElement, { attributes: true })

		// 组件卸载时清理
		onUnmounted(() => {
			observer.disconnect()
		})
	})
</script>

<style>
	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
	}
</style>
