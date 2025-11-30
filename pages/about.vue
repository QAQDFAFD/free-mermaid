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

      <!-- 主标题 -->
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {{ locale === 'zh' ? '关于 Mermaid Drawing' : 'About Mermaid Drawing' }}
      </h1>

      <!-- 介绍部分 -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ locale === 'zh' ? '什么是 Mermaid Drawing？' : 'What is Mermaid Drawing?' }}
        </h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{
            locale === 'zh'
              ? 'Mermaid Drawing 是一款免费的在线图表编辑器，让您能够使用简单的文本语法创建专业的图表和流程图。基于强大的 Mermaid.js 库，我们提供了一个直观、易用的界面，帮助开发者、设计师和团队快速创建各种类型的图表。'
              : 'Mermaid Drawing is a free online diagram editor that allows you to create professional diagrams and flowcharts using simple text syntax. Built on the powerful Mermaid.js library, we provide an intuitive, easy-to-use interface to help developers, designers, and teams quickly create various types of diagrams.'
          }}
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{
            locale === 'zh'
              ? '无需安装任何软件，无需注册账号，打开浏览器即可开始创作。您的所有数据都保存在本地，我们尊重您的隐私。'
              : 'No software installation required, no account registration needed - just open your browser and start creating. All your data is stored locally, and we respect your privacy.'
          }}
        </p>
      </section>

      <!-- 功能特点 -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {{ locale === 'zh' ? '主要功能' : 'Key Features' }}
        </h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">📊</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '多种图表类型' : 'Multiple Diagram Types' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '支持流程图、序列图、类图、状态图、实体关系图、甘特图、饼图等多种类型'
                    : 'Support flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts and more'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">⚡</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '实时预览' : 'Real-time Preview' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '即时查看图表效果，所见即所得的编辑体验'
                    : 'Instantly see your diagram results with WYSIWYG editing experience'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">🎨</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '深色模式' : 'Dark Mode' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '支持明暗主题切换，保护您的眼睛'
                    : 'Support light/dark theme switching to protect your eyes'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">💾</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '多格式导出' : 'Multiple Export Formats' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '支持导出为 PNG 和 SVG 格式，满足不同使用场景'
                    : 'Export to PNG and SVG formats to meet different use cases'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">🌍</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '多语言支持' : 'Multi-language Support' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '支持中文、英语、俄语、法语、泰语等多种语言'
                    : 'Support Chinese, English, Russian, French, Thai and more languages'
                }}
              </p>
            </div>
          </div>
          <div class="flex items-start">
            <div
              class="flex-shrink-0 w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mr-4">
              <span class="text-xl">🔒</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ locale === 'zh' ? '隐私保护' : 'Privacy Protection' }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                {{
                  locale === 'zh'
                    ? '所有数据本地处理，不会上传到服务器'
                    : 'All data processed locally, never uploaded to servers'
                }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {{ locale === 'zh' ? '使用场景' : 'Use Cases' }}
        </h2>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ locale === 'zh' ? '软件开发' : 'Software Development' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{
                locale === 'zh'
                  ? '绘制系统架构图、数据流图、类关系图，帮助团队理解代码结构'
                  : 'Draw system architecture diagrams, data flow diagrams, class relationship diagrams to help teams understand code structure'
              }}
            </p>
          </div>
          <div class="border-l-4 border-green-500 pl-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ locale === 'zh' ? '项目管理' : 'Project Management' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{
                locale === 'zh'
                  ? '创建甘特图规划项目进度，使用流程图展示工作流程'
                  : 'Create Gantt charts to plan project schedules, use flowcharts to show workflows'
              }}
            </p>
          </div>
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ locale === 'zh' ? '技术文档' : 'Technical Documentation' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{
                locale === 'zh'
                  ? '为文档添加清晰的图表说明，提高文档的可读性'
                  : 'Add clear diagram illustrations to documents to improve readability'
              }}
            </p>
          </div>
          <div class="border-l-4 border-orange-500 pl-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              {{ locale === 'zh' ? '教育培训' : 'Education & Training' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{
                locale === 'zh'
                  ? '制作教学演示图，帮助学生理解复杂概念'
                  : 'Create teaching demonstration diagrams to help students understand complex concepts'
              }}
            </p>
          </div>
        </div>
      </section>

      <!-- 技术栈 -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ locale === 'zh' ? '技术栈' : 'Technology Stack' }}
        </h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          {{
            locale === 'zh'
              ? 'Mermaid Drawing 使用现代化的前端技术构建：'
              : 'Mermaid Drawing is built with modern frontend technologies:'
          }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
            >Vue 3</span
          >
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
            >Nuxt 3</span
          >
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >Mermaid.js</span
          >
          <span class="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm"
            >Tailwind CSS</span
          >
          <span
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
            >CodeMirror</span
          >
          <span
            class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
            >TypeScript</span
          >
        </div>
      </section>

      <!-- 联系我们 -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ locale === 'zh' ? '联系我们' : 'Contact Us' }}
        </h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          {{
            locale === 'zh'
              ? '如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们：'
              : 'If you have any questions, suggestions, or feedback, feel free to contact us:'
          }}
        </p>
        <ul class="space-y-2 text-gray-600 dark:text-gray-400">
          <li class="flex items-center">
            <span class="mr-2">📧</span>
            <span>Email: support@mermaid-drawing.com</span>
          </li>
          <li class="flex items-center">
            <span class="mr-2">🌐</span>
            <a
              href="https://github.com/QAQDFAFD/free-mermaid"
              target="_blank"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              >GitHub</a
            >
          </li>
        </ul>
      </section>
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
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()

  useHead({
    title: 'About Mermaid Drawing - Free Online Diagram Editor',
    meta: [
      {
        name: 'description',
        content:
          'Learn about Mermaid Drawing, a free online diagram editor for creating flowcharts, sequence diagrams, class diagrams and more using simple text syntax.'
      }
    ]
  })
</script>
