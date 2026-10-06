<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- 返回链接 -->
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
          {{ locale === 'zh' ? '服务条款' : 'Terms of Service' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ locale === 'zh' ? '最后更新：2025年11月' : 'Last updated: November 2024' }}
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '1. 接受条款' : '1. Acceptance of Terms' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '欢迎使用 Mermaid Drawing（以下简称"本服务"）。通过访问或使用本网站（mermaid-drawing.com），您同意受本服务条款的约束。如果您不同意这些条款，请不要使用本服务。'
                  : 'Welcome to Mermaid Drawing (the "Service"). By accessing or using our website (mermaid-drawing.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '2. 服务描述' : '2. Description of Service' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? 'Mermaid Drawing 是一款免费的在线图表编辑工具，允许用户使用 Mermaid 语法创建各种类型的图表，包括但不限于流程图、序列图、类图、状态图、实体关系图、甘特图和饼图。'
                  : 'Mermaid Drawing is a free online diagram editing tool that allows users to create various types of diagrams using Mermaid syntax, including but not limited to flowcharts, sequence diagrams, class diagrams, state diagrams, entity relationship diagrams, Gantt charts, and pie charts.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '3. 使用规则' : '3. Rules of Use' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ locale === 'zh' ? '使用本服务时，您同意：' : 'When using the Service, you agree to:' }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                {{ locale === 'zh' ? '遵守所有适用的法律法规' : 'Comply with all applicable laws and regulations' }}
              </li>
              <li>
                {{
                  locale === 'zh' ? '不使用本服务进行任何非法活动' : 'Not use the Service for any illegal activities'
                }}
              </li>
              <li>
                {{
                  locale === 'zh'
                    ? '不尝试干扰或破坏本服务的正常运行'
                    : 'Not attempt to interfere with or disrupt the normal operation of the Service'
                }}
              </li>
              <li>
                {{
                  locale === 'zh'
                    ? '不使用自动化工具大量访问本服务'
                    : 'Not use automated tools to access the Service in bulk'
                }}
              </li>
              <li>{{ locale === 'zh' ? '尊重其他用户的权利' : 'Respect the rights of other users' }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '4. 知识产权' : '4. Intellectual Property' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '本服务及其原始内容、功能和设计均为 Mermaid Drawing 的财产，受国际版权、商标和其他知识产权法律保护。'
                  : 'The Service and its original content, features, and design are the property of Mermaid Drawing and are protected by international copyright, trademark, and other intellectual property laws.'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '您使用本服务创建的图表归您所有。您可以自由使用、修改和分发您创建的图表。'
                  : 'The diagrams you create using the Service belong to you. You are free to use, modify, and distribute the diagrams you create.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '5. 免责声明' : '5. Disclaimer' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '本服务按"现状"和"可用"基础提供。我们不对服务的准确性、可靠性、可用性或适用性做任何明示或暗示的保证。'
                  : 'The Service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, availability, or suitability of the Service.'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '使用本服务的风险由您自行承担。我们不对因使用或无法使用本服务而导致的任何直接、间接、附带、特殊或后果性损害负责。'
                  : 'Your use of the Service is at your own risk. We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '6. 服务变更' : '6. Service Changes' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们保留随时修改或终止本服务（或其任何部分）的权利，恕不另行通知。我们不对您或任何第三方承担因修改、暂停或终止服务而产生的责任。'
                  : 'We reserve the right to modify or terminate the Service (or any part thereof) at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or termination of the Service.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '7. 第三方链接' : '7. Third-Party Links' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '本服务可能包含指向第三方网站或服务的链接。我们不控制这些第三方网站，也不对其内容、隐私政策或做法负责。'
                  : 'The Service may contain links to third-party websites or services. We do not control these third-party websites and are not responsible for their content, privacy policies, or practices.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '8. 广告' : '8. Advertising' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '本服务可能显示第三方广告（通过 Google AdSense）。这些广告可能基于您的浏览历史和兴趣进行个性化展示。您可以通过 Google 的广告设置管理您的广告偏好。'
                  : "The Service may display third-party advertisements (via Google AdSense). These ads may be personalized based on your browsing history and interests. You can manage your ad preferences through Google's ad settings."
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '9. 条款修改' : '9. Modifications to Terms' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们保留随时修改这些条款的权利。修改后的条款将在本页面发布。继续使用本服务即表示您接受修改后的条款。'
                  : 'We reserve the right to modify these terms at any time. Modified terms will be posted on this page. Your continued use of the Service constitutes acceptance of the modified terms.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '10. 适用法律' : '10. Governing Law' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '这些条款受中华人民共和国法律管辖并按其解释，不考虑其法律冲突规定。'
                  : "These terms shall be governed by and construed in accordance with the laws of the People's Republic of China, without regard to its conflict of law provisions."
              }}
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '11. 联系我们' : '11. Contact Us' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '如果您对这些服务条款有任何问题，请通过以下方式联系我们：'
                  : 'If you have any questions about these Terms of Service, please contact us at:'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">📧 Email: qaqdfafd@gmail.com</p>
          </section>
        </div>
      </article>
    </div>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>© {{ new Date().getFullYear() }} Mermaid Drawing. All rights reserved.</p>
        <div class="mt-2 space-x-4">
          <NuxtLink to="/privacy" class="hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '隐私政策' : 'Privacy Policy' }}
          </NuxtLink>
          <NuxtLink to="/terms" class="hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '服务条款' : 'Terms of Service' }}
          </NuxtLink>
          <NuxtLink to="/contact" class="hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '联系我们' : 'Contact' }}
          </NuxtLink>
          <NuxtLink to="/faq" class="hover:text-blue-600 dark:hover:text-blue-400">
            {{ locale === 'zh' ? '常见问题' : 'FAQ' }}
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  useHead(
    createSeoHead({
      path: '/terms',
      title: 'Terms of Service - Mermaid Drawing',
      description:
        'Terms of Service for Mermaid Drawing - Read our terms and conditions for using the free online diagram editor.'
    })
  )
</script>
