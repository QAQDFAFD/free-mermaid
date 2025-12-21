// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],

  // 启用 SSR 提升首屏速度和 SEO
  ssr: true,

  // 实验性功能优化
  experimental: {
    payloadExtraction: true, // 提取页面 payload 以减少 JS 体积
    renderJsonPayloads: true, // 优化 JSON payload 渲染
    componentIslands: true, // 组件岛屿架构
    inlineSSRStyles: true, // 内联关键 CSS 到 HTML，减少首屏渲染阻塞
    viewTransition: true // 视图过渡优化
  },

  // Nitro 服务器优化
  nitro: {
    compressPublicAssets: true, // 压缩静态资源
    minify: true, // 压缩服务端代码
    prerender: {
      crawlLinks: false, // 禁用自动爬取，只预渲染指定路由
      routes: ['/', '/docs', '/about', '/privacy', '/terms', '/contact', '/faq'],
      ignore: ['/manifest.json', '/robots.txt', '/sitemap.xml', '/favicon.ico'] // 忽略静态文件
    }
  },

  // Vite 构建优化
  vite: {
    build: {
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 提高 chunk 大小警告阈值（mermaid 库本身很大）
      chunkSizeWarningLimit: 1000
      // 注意：不使用 manualChunks，让 Vite 自动处理，避免 dayjs 等库的导出问题
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['vue', 'vue-router', 'mermaid', 'dayjs']
    }
  },

  // 路由规则配置
  routeRules: {
    // 首页预渲染并缓存
    '/': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    // 文档页预渲染
    '/docs': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    // 关于页面预渲染
    '/about': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    // 隐私政策页面预渲染
    '/privacy': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    // 服务条款页面预渲染
    '/terms': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    '/contact': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    '/faq': {
      prerender: true,
      headers: {
        'X-Robots-Tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    // 静态资源长期缓存
    '/_nuxt/**': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
        'X-Robots-Tag': 'noindex' // 静态资源不需要索引
      }
    },
    // 公共资源缓存
    '/favicon.ico': {
      headers: {
        'cache-control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex'
      }
    },
    '/manifest.json': {
      headers: {
        'cache-control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex'
      }
    },
    '/robots.txt': {
      headers: {
        'cache-control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex'
      }
    },
    '/sitemap.xml': {
      headers: {
        'cache-control': 'public, max-age=3600',
        'X-Robots-Tag': 'noindex'
      }
    },
    '/ads.txt': {
      headers: {
        'cache-control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex'
      }
    },
    '/social-card.svg': {
      headers: {
        'cache-control': 'public, max-age=86400',
        'X-Robots-Tag': 'index, follow' // 社交卡片图片允许索引
      }
    }
  },

  app: {
    // 禁用页面过渡动画以提升首屏性能
    pageTransition: false,
    layoutTransition: false,
    head: {
      htmlAttrs: {
        lang: 'en' // 默认语言
      },
      title: 'Graph TD Online - Free Mermaid Editor with AI | Mermaid Online Free',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'google-adsense-account', content: 'ca-pub-6451531797615157' },
        {
          name: 'description',
          content:
            'Graph TD online free editor - Create mermaid diagrams with AI. Best mermaid online free tool for flowcharts, sequence diagrams. Free mermaid editor with graphtd support, real-time preview and export.'
        },
        {
          name: 'keywords',
          content:
            'graph td, mermaid online, graph td online, mermaid diagram online, mermaid online free, mermaid free, online mermaid editor, graphtd, free mermaid editor, mermaid editor free, mermaid ai, ai diagram generator, mermaid chart online free, mermaid graph online, flowchart online, sequence diagram online'
        },
        // Open Graph 优化
        {
          property: 'og:title',
          content: 'Graph TD Online - Free Mermaid Editor with AI | Mermaid Online Free'
        },
        {
          property: 'og:description',
          content:
            'Graph TD online free editor - Create mermaid diagrams with AI. Best mermaid online free tool for flowcharts, sequence diagrams, class diagrams.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://mermaid-drawing.com' },
        { property: 'og:image', content: 'https://mermaid-drawing.com/social-card.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'Mermaid Drawing' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'zh_CN' },
        { property: 'og:locale:alternate', content: 'ru_RU' },
        { property: 'og:locale:alternate', content: 'fr_FR' },
        { property: 'og:locale:alternate', content: 'th_TH' },
        // Twitter Card 优化
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Graph TD Online - Free Mermaid Editor with AI' },
        {
          name: 'twitter:description',
          content:
            'Graph TD online free - Best mermaid online editor with AI. Create flowcharts, sequence diagrams instantly. Free mermaid editor.'
        },
        { name: 'twitter:image', content: 'https://mermaid-drawing.com/social-card.svg' },
        // SEO 优化
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        // 移动端优化
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Mermaid Drawing' },
        // 安全相关
        { name: 'referrer', content: 'strict-origin-when-cross-origin' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://mermaid-drawing.com' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
        { rel: 'manifest', href: '/manifest.json' },
        // 预连接优化 - 只保留必要的（延迟加载的资源不需要预连接）
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://pagead2.googlesyndication.com' },
        // 多语言支持
        { rel: 'alternate', hreflang: 'en', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'zh', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'ru', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'fr', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'th', href: 'https://mermaid-drawing.com' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://mermaid-drawing.com' },
        { rel: 'author', href: '/humans.txt' }
      ],
      // 结构化数据 - 移除内联脚本，改为延迟加载
      script: [
        // 结构化数据 - WebApplication
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Graph TD Online - Free Mermaid Editor with AI',
            alternateName: ['Mermaid Online Free', 'GraphTD Editor', 'Online Mermaid Editor', 'Free Mermaid Editor'],
            description:
              'Graph TD online free editor - Create mermaid diagrams with AI. Best mermaid online free tool for flowcharts, sequence diagrams, class diagrams.',
            url: 'https://mermaid-drawing.com',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web',
            browserRequirements: 'Requires JavaScript',
            softwareVersion: '2.0',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'Graph TD Online Editor',
              'Mermaid Online Free',
              'AI Diagram Generation',
              'AI Code Optimization',
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
            ],
            screenshot: 'https://mermaid-drawing.com/social-card.svg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1250',
              bestRating: '5',
              worstRating: '1'
            }
          })
        },
        // 结构化数据 - Organization
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Mermaid Drawing',
            url: 'https://mermaid-drawing.com',
            logo: 'https://mermaid-drawing.com/favicon.ico',
            sameAs: []
          })
        }
      ]
    }
  },

  // 客户端插件配置
  plugins: [],

  // 运行时配置
  runtimeConfig: {
    public: {
      appName: 'Mermaid Drawing',
      siteUrl: 'https://mermaid-drawing.com',
      // AI 默认 API Key（通过环境变量配置）
      deepseekApiKey: process.env.NUXT_PUBLIC_DEEPSEEK_API_KEY || ''
    }
  },

  // 兼容性配置
  compatibilityDate: '2025-03-16'
})
