export default defineNuxtPlugin(nuxtApp => {
	// 仅在客户端和生产环境中加载
	if (process.client) {
		// 添加Google Analytics脚本
		const script1 = document.createElement('script')
		script1.async = true
		script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-6SS7V4WQ96'
		document.head.appendChild(script1)

		// 初始化Google Analytics配置
		window.dataLayer = window.dataLayer || []
		function gtag() {
			window.dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', 'G-6SS7V4WQ96')

		// 在页面路由变化时发送pageview事件
		nuxtApp.hook('page:finish', () => {
			gtag('event', 'page_view')
		})
	}
})
