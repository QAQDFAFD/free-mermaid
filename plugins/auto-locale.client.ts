import { resolveUserLocale } from '~/utils/locales'

export default defineNuxtPlugin({
  name: 'auto-locale',
  dependsOn: ['i18n'],
  setup(nuxtApp) {
    // Apply preferences after hydration so the prerendered English page stays consistent.
    nuxtApp.hook('app:mounted', () => {
      let savedLocale: string | null = null
      try { savedLocale = localStorage.getItem('userLocale') } catch (_) {}

      const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
      const detectedLocale = resolveUserLocale(savedLocale, languages)
      const i18n = nuxtApp.vueApp.config.globalProperties.$i18n
      i18n.locale = detectedLocale
    })
  }
})
