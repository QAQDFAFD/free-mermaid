import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import zh from '~/locales/zh.json'
import ru from '~/locales/ru.json'
import fr from '~/locales/fr.json'
import th from '~/locales/th.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en', // 初始默认语言，会被auto-locale插件覆盖
    fallbackLocale: 'en',
    messages: {
      en,
      zh,
      ru,
      fr,
      th
    }
  })

  vueApp.use(i18n)
})
