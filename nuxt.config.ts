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
      chunkSizeWarningLimit: 1500,
      // 启用 terser 压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除 console
          drop_debugger: true
        }
      }
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vue-i18n']
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
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        { name: 'google-adsense-account', content: 'ca-pub-6451531797615157' },
        { property: 'og:site_name', content: 'Mermaid Drawing' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Mermaid Drawing' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
        { rel: 'manifest', href: '/manifest.json' },
        // 预连接优化 - 只保留必要的（延迟加载的资源不需要预连接）
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: 'https://pagead2.googlesyndication.com' },
        // 预加载关键字体 - 提升首屏文字渲染速度
        { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'author', href: '/humans.txt' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://mermaid-drawing.com/#organization',
            name: 'Mermaid Drawing',
            url: 'https://mermaid-drawing.com',
            logo: 'https://mermaid-drawing.com/favicon.ico'
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://mermaid-drawing.com/#website',
            name: 'Mermaid Drawing',
            url: 'https://mermaid-drawing.com',
            publisher: { '@id': 'https://mermaid-drawing.com/#organization' }
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
      siteUrl: 'https://mermaid-drawing.com'
    }
  },

  // 兼容性配置
  compatibilityDate: '2025-03-16'
})
