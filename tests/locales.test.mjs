import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createI18n } from 'vue-i18n'
import { resolveUserLocale, supportedLocales } from '../utils/locales.ts'

test('a saved language takes precedence over browser preferences', () => {
  assert.equal(resolveUserLocale('pt', ['es-MX', 'en-US']), 'pt')
  assert.equal(resolveUserLocale('en', ['id-ID']), 'en')
})

test('regional language tags follow the ordered browser preferences', () => {
  for (const [preferences, expected] of [
    [['es-MX', 'en-US'], 'es'],
    [['pt-BR'], 'pt'],
    [['pt-PT'], 'pt'],
    [['ID-id'], 'id'],
    [['en-SG', 'zh-CN'], 'en'],
    [['en-CA', 'fr-CA'], 'en'],
    [['ja-JP', 'fr-CA', 'en'], 'fr'],
    [['zh-TW'], 'zh'],
    [['ja-JP'], 'en'],
    [[], 'en']
  ]) {
    assert.equal(resolveUserLocale(null, preferences), expected)
  }
})

test('unknown saved languages do not prevent automatic language selection', () => {
  assert.equal(resolveUserLocale('obsolete', ['es-ES']), 'es')
  assert.equal(resolveUserLocale(undefined, ['id-ID']), 'id')
})

const readLocale = code => JSON.parse(readFileSync(new URL(`../locales/${code}.json`, import.meta.url), 'utf8'))
const english = readLocale('en')
const activeGroups = ['homeGuide', 'editor', 'preview', 'diagramTheme', 'tools', 'tour', 'docs', 'mobile', 'ai', 'cookies', 'theme']
const flatten = (value, prefix = '') => Object.entries(value).flatMap(([key, child]) => {
  const path = prefix ? `${prefix}.${key}` : key
  return typeof child === 'string' ? [[path, child]] : flatten(child, path)
})
const requiredMessages = flatten(Object.fromEntries(activeGroups.map(key => [key, english[key]])))
requiredMessages.push(['footer.startTour', english.footer.startTour])
const readPath = (object, path) => path.split('.').reduce((value, key) => value?.[key], object)

for (const { code } of supportedLocales) {
  test(`${code}: all visible messages exist and render with vue-i18n`, () => {
    const messages = readLocale(code)
    const { global: translator } = createI18n({ legacy: false, locale: code, fallbackLocale: false, messages: { [code]: messages } })

    for (const [path] of requiredMessages) {
      const message = readPath(messages, path)
      assert.equal(typeof message, 'string', `Missing ${path}`)
      assert.ok(message.trim(), `Empty ${path}`)
      // driver.js interpolates this raw template itself.
      if (path === 'tour.buttons.progress') {
        assert.equal(message, '{{current}} / {{total}}')
        continue
      }
      assert.notEqual(translator.t(path, { provider: 'OpenAI' }), path, path)
    }

    const example = translator.t('homeGuide.exampleCode')
    assert.equal(example.split('\n').length, 6)
    assert.match(example, /^graph TD\n/)
    assert.match(example, /B\{[^{}]+\}/)
    assert.match(example, /-->\|[^|]+\|/)
    assert.ok(!example.includes("{'"), 'Literal interpolation must not leak into Mermaid source')
    assert.ok(translator.t('ai.yourApiKey', { provider: 'OpenAI' }).includes('OpenAI'))
  })
}
