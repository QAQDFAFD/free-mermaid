// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss'],
	app: {
		head: {
			title: 'Free Mermaid - 在线 Mermaid 图表工具',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					name: 'description',
					content: '免费的在线 Mermaid 图表编辑器，支持实时预览和导出'
				}
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
		}
	},
	// 客户端插件配置
	plugins: [{ src: '~/plugins/mermaid.client.ts', mode: 'client' }],
	// 运行时配置
	runtimeConfig: {
		public: {
			appName: 'Free Mermaid'
		}
	}
})
