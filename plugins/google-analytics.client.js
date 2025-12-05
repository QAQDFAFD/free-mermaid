/**
 * Google Analytics 延迟加载插件
 * 优化首屏性能：在用户交互后或页面空闲时才加载 GA 脚本
 */
export default defineNuxtPlugin(nuxtApp => {
	if (!process.client) return

	let gaLoaded = false

	// 初始化 dataLayer
		window.dataLayer = window.dataLayer || []
		function gtag() {
			window.dataLayer.push(arguments)
		}
	// 暴露到全局
	window.gtag = gtag

	// 加载 GA 脚本的函数
	const loadGA = () => {
		if (gaLoaded) return
		gaLoaded = true

		// 创建并加载 GA 脚本
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6SS7V4WQ96'
		document.head.appendChild(script)

		// 初始化 GA
		gtag('js', new Date())
		gtag('config', 'G-6SS7V4WQ96', {
			send_page_view: true,
			cookie_flags: 'SameSite=None;Secure'
		})
	}

	// 延迟加载策略：使用 requestIdleCallback 或 setTimeout 作为降级
	const scheduleLoad = () => {
		if ('requestIdleCallback' in window) {
			// 在浏览器空闲时加载
			requestIdleCallback(() => loadGA(), { timeout: 3000 })
		} else {
			// 降级：3秒后加载
			setTimeout(loadGA, 3000)
		}
	}

	// 用户交互时立即加载
	const interactionEvents = ['scroll', 'click', 'touchstart', 'keydown']
	const loadOnInteraction = () => {
		loadGA()
		// 移除所有事件监听器
		interactionEvents.forEach(event => {
			document.removeEventListener(event, loadOnInteraction, { passive: true })
		})
	}

	// 添加用户交互监听
	interactionEvents.forEach(event => {
		document.addEventListener(event, loadOnInteraction, { passive: true, once: true })
	})

	// 同时设置空闲加载作为备选
	scheduleLoad()

	// 页面路由变化时发送 pageview 事件
		nuxtApp.hook('page:finish', () => {
		if (gaLoaded && window.gtag) {
			gtag('event', 'page_view', {
				page_location: window.location.href,
				page_title: document.title
		})
	}
	})
})
