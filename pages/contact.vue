<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="mb-8">
        <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('docs.backToEditor') }}
        </NuxtLink>
      </div>

      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ locale === 'zh' ? '联系我们' : 'Contact Us' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{
            locale === 'zh'
              ? '欢迎通过以下方式联系 Mermaid Drawing 团队'
              : 'Reach Mermaid Drawing team via the following methods'
          }}
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '联系方式' : 'Contact Details' }}
            </h2>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li>📧 Email: qaqdfafd@gmail.com</li>
              <li>📧 Legal: qaqdfafd@gmail.com</li>
              <li>
                🌐 GitHub:
                <a
                  href="https://github.com/QAQDFAFD/free-mermaid"
                  target="_blank"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                  >QAQDFAFD/free-mermaid</a
                >
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '反馈与建议' : 'Feedback & Suggestions' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
              {{
                locale === 'zh'
                  ? '我们非常重视您的意见。欢迎提出改进建议或问题反馈，以帮助我们提升网站质量与用户体验。'
                  : 'We value your feedback. Please send improvement suggestions or issues to help us enhance site quality and user experience.'
              }}
            </p>
          </section>
        </div>
      </article>
    </div>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {{ new Date().getFullYear() }} Mermaid Drawing. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  useHead({
    ...createSeoHead({
      path: '/contact',
      title: 'Contact Us - Mermaid Drawing',
      description: 'Contact the Mermaid Drawing team for support, legal and feedback.'
    }),
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Mermaid Drawing',
          url: 'https://mermaid-drawing.com/contact',
          publisher: {
            '@type': 'Organization',
            name: 'Mermaid Drawing',
            url: 'https://mermaid-drawing.com'
          },
          contactPoint: [
            { '@type': 'ContactPoint', contactType: 'customer support', email: 'qaqdfafd@gmail.com' },
            { '@type': 'ContactPoint', contactType: 'legal', email: 'qaqdfafd@gmail.com' }
          ]
        })
      }
    ]
  })
</script>
