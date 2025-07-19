// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false }, // 关闭devtools
  modules: ['@nuxtjs/tailwindcss'], // 将tailwindcss添加到modules中

  app: {
    // 添加app配置
    head: {
      // 添加head配置,会自动添加到所有页面，如果需要单独配置，可以在页面中添加
      title: 'Mermaid Online Free - Graph TD Diagram Editor & Chart Maker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Mermaid online free diagram editor and chart maker. Create graph TD flowcharts, sequence diagrams, class diagrams online free. Free mermaid editor with real-time preview and export.'
        },
        {
          name: 'keywords',
          content:
            'mermaid online free, mermaid diagram online free, mermaid chart online free, mermaid free editor, graph td online, mermaid editor free, mermaid free, flowchart online, sequence diagram online, class diagram online, mermaid graph online'
        },
        {
          property: 'og:title',
          content: 'Mermaid Online Free - Graph TD Diagram Editor & Chart Maker'
        },
        {
          property: 'og:description',
          content:
            'Mermaid online free diagram editor and chart maker. Create graph TD flowcharts, sequence diagrams, class diagrams online free. Free mermaid editor with real-time preview and export.'
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
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'alternate', hreflang: 'en', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'zh', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'ru', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'fr', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'th', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://mermaid-drawing.com' },
        { rel: 'author', href: '/humans.txt' }
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
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Mermaid Online Free - Graph TD Diagram Editor & Chart Maker',
            description:
              'Mermaid online free diagram editor and chart maker. Create graph TD flowcharts, sequence diagrams, class diagrams online free. Free mermaid editor with real-time preview and export.',
            url: 'https://mermaid-drawing.com',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'Graph TD Flowcharts',
              'Sequence Diagrams',
              'Class Diagrams',
              'State Diagrams',
              'ER Diagrams',
              'Gantt Charts',
              'Pie Charts',
              'Real-time Preview',
              'PNG/SVG Export',
              'Free Online Tool'
            ]
          })
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
