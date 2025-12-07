<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('docs.backToEditor') }}
        </NuxtLink>
      </div>

      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ locale === 'zh' ? '常见问题' : 'Frequently Asked Questions' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ locale === 'zh' ? '快速了解 Mermaid Drawing 的使用与政策' : 'Quick answers about using Mermaid Drawing and policies' }}
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '是否免费使用？' : 'Is it free to use?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '完全免费，无需注册即可使用全部核心功能。' : 'Completely free. No registration is required to use core features.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '支持哪些图表类型？' : 'What diagram types are supported?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '支持 Graph TD 流程图、时序图、类图、状态图、实体关系图、甘特图、饼图等。' : 'Supports Graph TD flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, and pie charts.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '如何导出 PNG 或 SVG？' : 'How do I export PNG or SVG?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '在预览区域点击“导出”选择 PNG 或 SVG 即可下载。' : 'Click "Export" in the preview area and choose PNG or SVG to download.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '我的图表会上传到服务器吗？' : 'Is my diagram uploaded to servers?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '不会。图表代码仅保存在您的浏览器本地存储。' : 'No. Diagram code is stored only in your browser local storage.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '是否有深色模式？' : 'Is dark mode supported?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '支持。可在界面右上角进行主题切换。' : 'Yes. You can toggle the theme in the UI.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '是否支持多语言？' : 'Is multi-language supported?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '支持中文、英语、俄语、法语、泰语等。' : 'Supports Chinese, English, Russian, French, Thai and more.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '是否展示广告？' : 'Do you show ads?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '我们通过 Google AdSense 展示广告，仅在您同意 Cookie 后加载。' : 'We show ads via Google AdSense and only load them after you consent to cookies.' }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '是否追踪用户行为？' : 'Do you track user behavior?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '我们使用 Google Analytics 分析站点使用情况，仅在您同意 Cookie 后加载。详见隐私政策。' : 'We use Google Analytics to analyze site usage, only after your cookie consent. See the Privacy Policy.' }}
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '如何联系我们？' : 'How can I contact you?' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{ locale === 'zh' ? '请访问联系我们页面或发送邮件至 support@mermaid-drawing.com。' : 'Visit the Contact page or email support@mermaid-drawing.com.' }}
            </p>
          </section>
        </div>
      </article>
    </div>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {{ new Date().getFullYear() }} Mermaid Drawing. All rights reserved.</p>
        <div class="mt-2 space-x-4">
          <NuxtLink to="/privacy" class="hover:text-blue-600 dark:hover:text-blue-400">{{ locale === 'zh' ? '隐私政策' : 'Privacy' }}</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-blue-600 dark:hover:text-blue-400">{{ locale === 'zh' ? '服务条款' : 'Terms' }}</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-blue-600 dark:hover:text-blue-400">{{ locale === 'zh' ? '联系我们' : 'Contact' }}</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

useHead({
  title: 'FAQ - Mermaid Drawing',
  meta: [
    { name: 'description', content: 'FAQ about Mermaid Drawing: free use, diagram types, export, privacy, ads and contact.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://mermaid-drawing.com/faq' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is it free to use?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes, Mermaid Drawing is completely free and requires no registration.' }
          },
          {
            '@type': 'Question',
            name: 'What diagram types are supported?',
            acceptedAnswer: { '@type': 'Answer', text: 'Graph TD flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, and pie charts.' }
          },
          {
            '@type': 'Question',
            name: 'How do I export PNG or SVG?',
            acceptedAnswer: { '@type': 'Answer', text: 'Use the Export button in the preview area to download PNG or SVG.' }
          },
          {
            '@type': 'Question',
            name: 'Is my diagram uploaded to servers?',
            acceptedAnswer: { '@type': 'Answer', text: 'No. Diagram code stays in browser local storage only.' }
          },
          {
            '@type': 'Question',
            name: 'Is dark mode supported?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can toggle theme in the interface.' }
          },
          {
            '@type': 'Question',
            name: 'Do you show ads and track behavior?',
            acceptedAnswer: { '@type': 'Answer', text: 'We show ads via Google AdSense and use Google Analytics only after cookie consent. See the Privacy Policy.' }
          },
          {
            '@type': 'Question',
            name: 'How can I contact you?',
            acceptedAnswer: { '@type': 'Answer', text: 'Visit the Contact page or email support@mermaid-drawing.com.' }
          }
        ]
      })
    }
  ]
})
</script>

