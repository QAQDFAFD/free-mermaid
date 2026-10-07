import { createI18n } from 'vue-i18n'
import en from '~/locales/en.json'
import zh from '~/locales/zh.json'
import ru from '~/locales/ru.json'
import fr from '~/locales/fr.json'
import th from '~/locales/th.json'
import es from '~/locales/es.json'
import pt from '~/locales/pt.json'
import id from '~/locales/id.json'

export default defineNuxtPlugin({
  name: 'i18n',
  setup({ vueApp }) {
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
        th,
        es,
        pt,
        id
      }
    })

    vueApp.use(i18n)

    return { provide: { getLocaleMessages: language => i18n.global.getLocaleMessage(language) } }
  }
})
