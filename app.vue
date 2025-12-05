<template>
	<div>
		<MobileWarning />
		<NuxtPage />
	</div>
</template>

<script setup>
	import MobileWarning from '~/components/MobileWarning.vue'
	import { onMounted, onUnmounted } from 'vue'
	import { useRouter } from 'vue-router'

	// 初始化深色模式 - 使用 useHead 在 SSR 时注入脚本，避免闪烁
	useHead({
		script: [
			{
				innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
				tagPosition: 'head'
			}
		]
	})

	// 客户端初始化
	onMounted(() => {
		// 创建一个全局的自定义事件处理函数，强制所有组件重新评估深色模式
		const forceThemeUpdate = () => {
			const event = new CustomEvent('forceThemeUpdate')
			document.dispatchEvent(event)
		}

		// 使用MutationObserver监听documentElement的class变化
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.attributeName === 'class') {
					forceThemeUpdate()
				}
			})
		})

		observer.observe(document.documentElement, { attributes: true })

		// 组件卸载时清理
		onUnmounted(() => {
			observer.disconnect()
		})

		// 为路由变化添加Google Analytics事件监听（备用方式，插件中已实现主要功能）
		const router = useRouter()
		router.afterEach(to => {
			if (window.gtag) {
				window.gtag('config', 'G-6SS7V4WQ96', {
					page_path: to.fullPath
				})
			}
		})
	})
</script>

<style>
	/* 关键 CSS - 内联到首屏，避免渲染阻塞 */
	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
		/* 使用系统字体栈，避免字体加载阻塞渲染 */
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		/* 优化文本渲染 */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}
	
	/* 关键 CSS - 避免首屏闪烁 */
	html.dark {
		color-scheme: dark;
		background-color: #111827;
		color: #f3f4f6;
	}
	
	/* 优化首屏加载体验 */
	html {
		scroll-behavior: smooth;
	}
	
	/* 减少布局偏移 */
	img, svg {
		max-width: 100%;
		height: auto;
	}
</style>
