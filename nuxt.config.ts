// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
	app: {
		head: {
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
				}
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'canonical', href: 'https://mermaid-drawing.com' },
				{ rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
			]
		}
	},
	// 客户端插件配置
	plugins: [{ src: '~/plugins/mermaid.client.ts', mode: 'client' }],
	// 运行时配置
	runtimeConfig: {
		public: {
			appName: 'Mermaid Drawing'
		}
	}
})
