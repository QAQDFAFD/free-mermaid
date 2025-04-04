// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false }, // 关闭devtools
	modules: ['@nuxtjs/tailwindcss'], // 将tailwindcss添加到modules中

	app: {
		// 添加app配置
		head: {
			// 添加head配置,会自动添加到所有页面，如果需要单独配置，可以在页面中添加
			title: 'Mermaid Drawing - Free Online Mermaid Chart & Diagram Tool',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					name: 'description',
					content:
						'Create beautiful mermaid drawings and diagrams with our free online mermaid chart editor. Real-time preview, easy export, and powerful diagramming tools.'
				},
				{
					name: 'keywords',
					content:
						'mermaid drawing, mermaid diagram, mermaid chart, flowchart, sequence diagram, class diagram, online diagram tool'
				},
				{
					property: 'og:title',
					content: 'Mermaid Drawing - Free Online Mermaid Chart & Diagram Tool'
				},
				{
					property: 'og:description',
					content:
						'Create beautiful mermaid drawings and diagrams with our free online mermaid chart editor. Real-time preview, easy export, and powerful diagramming tools.'
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					property: 'og:url',
					content: 'https://mermaid-drawing.com'
				},
				{
					name: 'robots',
					content: 'index, follow'
				},
				{
					name: 'Content-Security-Policy',
					content:
						"default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com;"
				}
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'canonical', href: 'https://mermaid-drawing.com' },
				{ rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
			],
			script: [
				{
					src: 'https://www.googletagmanager.com/gtag/js?id=G-6SS7V4WQ96',
					async: true
				},
				{
					innerHTML: `
																					window.dataLayer = window.dataLayer || [];
																					function gtag(){dataLayer.push(arguments);}
																					gtag('js', new Date());
																					gtag('config', 'G-6SS7V4WQ96');
																				`
				}
			]
		}
	},

	// 客户端插件配置， src 是插件文件路径，mode 是插件模式，client 是客户端模式，server 是服务端模式
	plugins: [{ src: '~/plugins/mermaid.client.ts', mode: 'client' }],

	// 运行时配置，public 是公共配置，server 是服务端配置
	runtimeConfig: {
		public: {
			appName: 'Mermaid Drawing'
		}
	},

	// 兼容性配置，指定兼容性日期
	compatibilityDate: '2025-03-16'
})
