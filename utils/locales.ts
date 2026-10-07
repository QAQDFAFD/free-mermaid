export const supportedLocales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ru', name: 'Русский' },
  { code: 'fr', name: 'Français' },
  { code: 'th', name: 'ไทย' }
] as const

export type SupportedLocale = (typeof supportedLocales)[number]['code']

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return supportedLocales.some(item => item.code === value)
}

export function resolveUserLocale(savedLocale: unknown, browserLanguages: readonly string[]): SupportedLocale {
  if (isSupportedLocale(savedLocale)) return savedLocale

  for (const language of browserLanguages) {
    const code = language.toLowerCase().split(/[-_]/)[0]
    if (isSupportedLocale(code)) return code
  }

  return 'en'
}
