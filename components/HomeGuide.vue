<template>
  <div :lang="locale" class="border-t border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section id="graph-td-guide" aria-labelledby="graph-td-heading" class="grid gap-8 md:grid-cols-2">
        <div>
          <h2 id="graph-td-heading" class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('homeGuide.title') }}</h2>
          <p class="mt-4 leading-relaxed">{{ t('homeGuide.intro') }}</p>
          <ol class="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
            <li>{{ t('homeGuide.step1') }}</li>
            <li>{{ t('homeGuide.step2') }}</li>
            <li>{{ t('homeGuide.step3') }}</li>
          </ol>
          <p class="mt-4 text-sm">
            {{ t('homeGuide.needAnother') }}
            <NuxtLink to="/docs" class="text-blue-700 underline dark:text-blue-400">{{ t('homeGuide.browseExamples') }}</NuxtLink>
          </p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ t('homeGuide.exampleHeading') }}</h3>
          <pre id="graph-td-example" class="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm leading-7 text-gray-900 dark:bg-gray-800 dark:text-gray-100"><code>{{ example }}</code></pre>
          <button type="button" class="mt-4 min-h-[44px] rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" @click="$emit('load-example', example)">
            {{ t('homeGuide.tryExample') }}
          </button>
          <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">{{ t('homeGuide.replacesCode') }}</p>
        </div>
      </section>

      <section aria-labelledby="syntax-heading" class="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
        <h2 id="syntax-heading" class="text-xl font-bold text-gray-900 dark:text-white">{{ t('homeGuide.syntaxHeading') }}</h2>
        <p class="mt-3 leading-relaxed">{{ t('homeGuide.syntaxOverview') }}</p>
        <p class="mt-3 leading-relaxed">
          {{ t('homeGuide.syntaxTips') }}
          <NuxtLink to="/docs#flowchart" class="text-blue-700 underline dark:text-blue-400">{{ t('homeGuide.syntaxLink') }}</NuxtLink>
          {{ t('homeGuide.syntaxTipsEnd') }}
        </p>
      </section>

      <section aria-labelledby="diagram-guides-heading" class="mt-8">
        <h2 id="diagram-guides-heading" class="text-xl font-bold text-gray-900 dark:text-white">{{ t('homeGuide.moreHeading') }}</h2>
        <p class="mt-3 leading-relaxed">{{ t('homeGuide.moreDescription') }}</p>
        <nav :aria-label="t('homeGuide.exampleNav')" class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-700 underline dark:text-blue-400">
          <NuxtLink v-for="guide in guides" :key="guide.id" :to="`/docs#${guide.id}`" class="py-2">{{ guide.label }}</NuxtLink>
        </nav>
      </section>

      <footer class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
        <nav :aria-label="t('homeGuide.footerNav')" class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <button type="button" class="min-h-[44px] text-blue-700 underline dark:text-blue-400" @click="$emit('start-tour')">{{ t('footer.startTour') }}</button>
          <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="py-3 hover:underline">{{ page.label }}</NuxtLink>
        </nav>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineEmits<{
  'load-example': [code: string]
  'start-tour': []
}>()

const { t, locale } = useI18n()
const example = computed(() => t('homeGuide.exampleCode'))

const guides = computed(() => [
  { id: 'flowchart', label: t('tools.flowchart') },
  { id: 'sequence', label: t('tools.sequence') },
  { id: 'class', label: t('tools.class') },
  { id: 'state', label: t('tools.state') },
  { id: 'entity', label: t('tools.entity') },
  { id: 'gantt', label: t('tools.gantt') },
  { id: 'pie', label: t('tools.pie') }
])
const pages = computed(() => [
  { path: '/about', label: t('homeGuide.about') },
  { path: '/faq', label: t('homeGuide.faq') },
  { path: '/contact', label: t('homeGuide.contact') },
  { path: '/privacy', label: t('homeGuide.privacy') },
  { path: '/terms', label: t('homeGuide.terms') }
])
</script>
