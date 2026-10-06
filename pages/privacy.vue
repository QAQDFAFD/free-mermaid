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
          {{ locale === 'zh' ? '隐私政策' : 'Privacy Policy' }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ locale === 'zh' ? '最后更新：2026年10月6日' : 'Last updated: October 6, 2026' }}
        </p>

        <div class="prose dark:prose-invert max-w-none">
          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '1. 概述' : '1. Overview' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? 'Mermaid Drawing（以下简称"我们"）非常重视您的隐私。本隐私政策说明了我们如何收集、使用和保护您在使用我们网站（mermaid-drawing.com）时的信息。'
                  : 'Mermaid Drawing ("we", "us", or "our") takes your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website (mermaid-drawing.com).'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '2. 我们收集的信息' : '2. Information We Collect' }}
            </h2>
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {{ locale === 'zh' ? '2.1 自动收集的信息' : '2.1 Automatically Collected Information' }}
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '当您访问我们的网站时，我们可能会自动收集某些信息，包括：'
                  : 'When you visit our website, we may automatically collect certain information, including:'
              }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>{{ locale === 'zh' ? '浏览器类型和版本' : 'Browser type and version' }}</li>
              <li>{{ locale === 'zh' ? '操作系统' : 'Operating system' }}</li>
              <li>{{ locale === 'zh' ? '访问时间和日期' : 'Date and time of visit' }}</li>
              <li>{{ locale === 'zh' ? '页面浏览量' : 'Pages viewed' }}</li>
              <li>{{ locale === 'zh' ? '引荐来源' : 'Referring URL' }}</li>
            </ul>

            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {{ locale === 'zh' ? '2.2 本地存储的数据' : '2.2 Locally Stored Data' }}
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '您在编辑器中创建的图表代码仅存储在您的浏览器本地存储中。我们不会将您的图表数据上传到我们的服务器。'
                  : "The diagram code you create in the editor is stored only in your browser's local storage. We do not upload your diagram data to our servers."
              }}
            </p>
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {{ locale === 'zh' ? '2.3 可选 AI 功能' : '2.3 Optional AI Features' }}
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? 'AI 功能仅使用您自行输入的 API Key。Key 暂存在本站的浏览器会话存储中，可在 AI 设置中清除。使用 AI 时，浏览器会将 Key 和您提交的图表或描述直接发送给您选择的 OpenAI、Anthropic 或 DeepSeek；本站服务器不接收或保存这些内容。'
                  : 'AI features use only the API Key you enter. The key is kept in browser session storage for this site and can be cleared in AI settings. When you use AI, your browser sends the key and the diagram or description you submit directly to your selected provider: OpenAI, Anthropic, or DeepSeek. Our server does not receive or store this content.'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '在您同意 Cookie 后，本页加载的分析和广告脚本与其他页面脚本一样，技术上可以访问浏览器会话存储。建议使用可限制用量的 Key，并在用完后从 AI 设置中清除。'
                  : 'If you consent to cookies, analytics and advertising scripts loaded on this page can technically access browser session storage, like other page scripts. We recommend a key with a usage limit and clearing it in AI settings when finished.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '3. 我们如何使用信息' : '3. How We Use Information' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ locale === 'zh' ? '我们使用收集的信息来：' : 'We use the collected information to:' }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>{{ locale === 'zh' ? '改进我们的网站和服务' : 'Improve our website and services' }}</li>
              <li>{{ locale === 'zh' ? '分析网站使用情况和趋势' : 'Analyze website usage and trends' }}</li>
              <li>{{ locale === 'zh' ? '确保网站安全和正常运行' : 'Ensure website security and proper operation' }}</li>
              <li>{{ locale === 'zh' ? '提供个性化的用户体验' : 'Provide personalized user experience' }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '4. Cookie 和追踪技术' : '4. Cookies and Tracking Technologies' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ locale === 'zh' ? '我们使用 Cookie 和类似技术来：' : 'We use cookies and similar technologies to:' }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                {{
                  locale === 'zh'
                    ? '记住您的偏好设置（如语言和主题）'
                    : 'Remember your preferences (such as language and theme)'
                }}
              </li>
              <li>
                {{
                  locale === 'zh'
                    ? '分析网站流量（通过 Google Analytics）'
                    : 'Analyze website traffic (via Google Analytics)'
                }}
              </li>
              <li>
                {{
                  locale === 'zh'
                    ? '展示相关广告（通过 Google AdSense）'
                    : 'Display relevant advertisements (via Google AdSense)'
                }}
              </li>
            </ul>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '您可以通过浏览器设置来控制或删除 Cookie。但请注意，禁用 Cookie 可能会影响网站的某些功能。'
                  : 'You can control or delete cookies through your browser settings. However, please note that disabling cookies may affect some website functionality.'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? 'Google 及其合作伙伴可能使用 Cookie 根据您之前访问过的网站向您展示广告。您可以在 adssettings.google.com 控制广告个性化，或在 policies.google.com/technologies/ads 了解详情。'
                  : 'Google and its partners may use cookies to serve ads based on your prior visits to this or other websites. You can control ad personalization at adssettings.google.com or learn more at policies.google.com/technologies/ads.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '5. 第三方服务' : '5. Third-Party Services' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们的网站使用以下第三方服务：'
                  : 'Our website uses the following third-party services:'
              }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <strong>Google Analytics</strong> -
                {{ locale === 'zh' ? '用于网站流量分析' : 'for website traffic analysis' }}
              </li>
              <li>
                <strong>Google AdSense</strong> -
                {{ locale === 'zh' ? '用于展示广告' : 'for displaying advertisements' }}
              </li>
            </ul>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '这些第三方服务有各自的隐私政策，我们建议您查阅它们的隐私政策以了解更多信息。'
                  : 'These third-party services have their own privacy policies, and we recommend reviewing their privacy policies for more information.'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们遵守欧盟用户同意政策。除非您同意使用 Cookie，否则我们不会加载广告服务或分析脚本。'
                  : 'We comply with the EU User Consent Policy. We do not load ad services or analytics scripts unless you consent to the use of cookies.'
              }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  class="text-blue-600 dark:text-blue-400 hover:underline">
                  {{ locale === 'zh' ? 'Google 广告与 Cookie 政策' : 'Google Ads & Cookies Policy' }}
                </a>
              </li>
              <li>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  class="text-blue-600 dark:text-blue-400 hover:underline">
                  {{ locale === 'zh' ? 'Google 广告设置（个性化）' : 'Google Ads Settings (Personalization)' }}
                </a>
              </li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '6. 数据安全' : '6. Data Security' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们采取适当的技术和组织措施来保护您的信息安全。我们的网站使用 HTTPS 加密来保护数据传输。'
                  : 'We implement appropriate technical and organizational measures to protect your information. Our website uses HTTPS encryption to protect data transmission.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '7. 您的权利' : '7. Your Rights' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '根据适用的数据保护法律，您可能拥有以下权利：'
                  : 'Depending on applicable data protection laws, you may have the following rights:'
              }}
            </p>
            <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>{{ locale === 'zh' ? '访问您的个人数据' : 'Access your personal data' }}</li>
              <li>{{ locale === 'zh' ? '更正不准确的数据' : 'Correct inaccurate data' }}</li>
              <li>{{ locale === 'zh' ? '删除您的数据' : 'Delete your data' }}</li>
              <li>{{ locale === 'zh' ? '反对数据处理' : 'Object to data processing' }}</li>
              <li>{{ locale === 'zh' ? '数据可携带性' : 'Data portability' }}</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '8. 儿童隐私' : "8. Children's Privacy" }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们的服务不针对 13 岁以下的儿童。我们不会故意收集 13 岁以下儿童的个人信息。'
                  : 'Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.'
              }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '9. 隐私政策更新' : '9. Privacy Policy Updates' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明更新日期。我们建议您定期查看本政策以了解任何变更。'
                  : 'We may update this Privacy Policy from time to time. The updated policy will be posted on this page with the update date. We recommend reviewing this policy periodically for any changes.'
              }}
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {{ locale === 'zh' ? '10. 联系我们' : '10. Contact Us' }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{
                locale === 'zh'
                  ? '如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：'
                  : 'If you have any questions or concerns about this Privacy Policy, please contact us at:'
              }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">📧 Email: privacy@mermaid-drawing.com</p>
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
      path: '/privacy',
      title: 'Privacy Policy - Mermaid Drawing',
      description: 'Privacy Policy for Mermaid Drawing - Learn how we collect, use, and protect your information.'
    })
  )
</script>
