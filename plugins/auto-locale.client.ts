export default defineNuxtPlugin(async () => {
  // 支持的语言映射：国家/地区代码 -> 语言代码
  const countryToLanguage = {
    CN: 'zh', // 中国 -> 中文
    TW: 'zh', // 台湾 -> 中文
    HK: 'zh', // 香港 -> 中文
    MO: 'zh', // 澳门 -> 中文
    SG: 'zh', // 新加坡 -> 中文（华人较多）
    RU: 'ru', // 俄罗斯 -> 俄语
    BY: 'ru', // 白俄罗斯 -> 俄语
    KZ: 'ru', // 哈萨克斯坦 -> 俄语
    KG: 'ru', // 吉尔吉斯斯坦 -> 俄语
    UZ: 'ru', // 乌兹别克斯坦 -> 俄语
    TJ: 'ru', // 塔吉克斯坦 -> 俄语
    FR: 'fr', // 法国 -> 法语
    BE: 'fr', // 比利时 -> 法语
    CH: 'fr', // 瑞士 -> 法语
    CA: 'fr', // 加拿大 -> 法语（魁北克等）
    MC: 'fr', // 摩纳哥 -> 法语
    LU: 'fr', // 卢森堡 -> 法语
    TH: 'th' // 泰国 -> 泰语
    // 其他国家默认使用英语
  }

  const availableLanguages = ['en', 'zh', 'ru', 'fr', 'th']
  const defaultLanguage = 'en'

  // 获取或检测用户语言
  const detectUserLanguage = async (): Promise<string> => {
    // 1. 优先检查缓存的用户选择
    const cachedLanguage = localStorage.getItem('userLocale')
    if (cachedLanguage && availableLanguages.includes(cachedLanguage)) {
      console.log('Using cached language:', cachedLanguage)
      return cachedLanguage
    }

    // 2. 检测浏览器语言偏好
    const browserLanguage = navigator.language.toLowerCase()
    console.log('Browser language:', browserLanguage)

    // 从浏览器语言中提取语言代码
    let detectedLang = defaultLanguage
    if (browserLanguage.startsWith('zh')) {
      detectedLang = 'zh'
    } else if (browserLanguage.startsWith('ru')) {
      detectedLang = 'ru'
    } else if (browserLanguage.startsWith('fr')) {
      detectedLang = 'fr'
    } else if (browserLanguage.startsWith('th')) {
      detectedLang = 'th'
    }

    // 3. 尝试通过IP检测地理位置
    try {
      let countryCode: string | null = null

      // 尝试第一个API
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)

        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const data = await response.json()
          countryCode = data.country_code
        }
      } catch (error) {
        console.warn('Primary IP API failed, trying backup...', error)

        // 备用API：ipinfo.io
        try {
          const controller2 = new AbortController()
          const timeoutId2 = setTimeout(() => controller2.abort(), 3000)

          const response2 = await fetch('https://ipinfo.io/json', {
            signal: controller2.signal
          })

          clearTimeout(timeoutId2)

          if (response2.ok) {
            const data2 = await response2.json()
            countryCode = data2.country
          }
        } catch (error2) {
          console.warn('Backup IP API also failed:', error2)
        }
      }

      if (countryCode) {
        console.log('Detected country:', countryCode)

        if (countryToLanguage[countryCode as keyof typeof countryToLanguage]) {
          detectedLang = countryToLanguage[countryCode as keyof typeof countryToLanguage]
          console.log('Language based on country:', detectedLang)
        }
      }
    } catch (error) {
      console.warn('Failed to detect location, using browser language fallback:', error)
    }

    // 4. 确保检测到的语言在支持列表中
    if (!availableLanguages.includes(detectedLang)) {
      detectedLang = defaultLanguage
    }

    console.log('Final detected language:', detectedLang)
    return detectedLang
  }

  // 只在客户端执行
  if (process.client) {
    try {
      const detectedLanguage = await detectUserLanguage()

      // 直接从Nuxt应用实例获取i18n
      const nuxtApp = useNuxtApp()
      const i18n = (nuxtApp.vueApp.config.globalProperties as any).$i18n

      if (i18n && i18n.locale) {
        // 设置语言
        if (typeof i18n.locale === 'string') {
          i18n.locale = detectedLanguage
        } else {
          ;(i18n.locale as any).value = detectedLanguage
        }
      }

      // 缓存用户语言选择
      localStorage.setItem('userLocale', detectedLanguage)

      console.log('Auto-detected and set language to:', detectedLanguage)
    } catch (error) {
      console.warn('Failed to auto-detect language, using default:', error)

      // 设置默认语言
      const nuxtApp = useNuxtApp()
      const i18n = (nuxtApp.vueApp.config.globalProperties as any).$i18n

      if (i18n && i18n.locale) {
        if (typeof i18n.locale === 'string') {
          i18n.locale = defaultLanguage
        } else {
          ;(i18n.locale as any).value = defaultLanguage
        }
      }

      localStorage.setItem('userLocale', defaultLanguage)
    }
  }
})
