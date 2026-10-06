import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const outputDir = resolve(root, '.output/public')
const siteUrl = 'https://mermaid-drawing.com'
const routes = ['/', '/docs', '/about', '/contact', '/faq', '/privacy', '/terms']
const errors = []
const pages = new Map()
const titles = new Set()
const descriptions = new Set()

const occurrences = (html, pattern) => [...html.matchAll(pattern)].length
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(([, name, , value]) => [name.toLowerCase(), value])
)

for (const route of routes) {
  const file = route === '/' ? resolve(outputDir, 'index.html') : resolve(outputDir, route.slice(1), 'index.html')
  let html

  try {
    html = await readFile(file, 'utf8')
  } catch {
    errors.push(`${route}: generated HTML is missing (${file})`)
    continue
  }

  pages.set(route, html)
  const canonical = `${siteUrl}${route}`
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag))
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag))
  const canonicals = links.filter((tag) => tag.rel === 'canonical')
  const ogUrls = metas.filter((tag) => tag.property === 'og:url')
  const title = html.match(/<title(?:\s[^>]*)?>([^<]+)<\/title>/i)?.[1]
  const description = metas.filter((tag) => tag.name === 'description')

  if (occurrences(html, /<title(?:\s[^>]*)?>[^<]+<\/title>/gi) !== 1) errors.push(`${route}: expected exactly one non-empty title`)
  if (description.length !== 1 || !description[0].content?.trim()) errors.push(`${route}: expected exactly one meta description`)
  if (canonicals.length !== 1 || canonicals[0].href !== canonical) errors.push(`${route}: canonical must uniquely match ${canonical}`)
  if (ogUrls.length !== 1 || ogUrls[0].content !== canonical) errors.push(`${route}: og:url must uniquely match canonical`)
  if (titles.has(title)) errors.push(`${route}: title duplicates another page`)
  if (descriptions.has(description[0]?.content)) errors.push(`${route}: description duplicates another page`)
  titles.add(title)
  descriptions.add(description[0]?.content)
  const headings = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi)]
  if (headings.length !== 1 || !headings[0][2].replace(/<[^>]*>/g, '').trim()) errors.push(`${route}: expected one non-empty SSR h1`)
  if (headings.some(([, attrs]) => /sr-only|(?:^|\s)hidden(?:\s|["'=]|$)|display\s*:\s*none/.test(attrs))) errors.push(`${route}: h1 must be visible`)
  if (metas.some((tag) => /^(robots|googlebot|bingbot)$/i.test(tag.name || '') && /\b(noindex|none)\b/i.test(tag.content || ''))) errors.push(`${route}: unexpected noindex`)
  if (links.some((tag) => tag.hreflang)) errors.push(`${route}: hreflang needs separate translated URLs`)

  for (const field of ['og:title', 'og:description', 'og:image', 'og:image:alt']) {
    if (!new RegExp(`<meta[^>]+property=["']${field}["'][^>]+content=["'][^"']+["']`, 'i').test(html)) errors.push(`${route}: missing ${field}`)
  }
  for (const field of ['twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
    if (!new RegExp(`<meta[^>]+name=["']${field}["'][^>]+content=["'][^"']+["']`, 'i').test(html)) errors.push(`${route}: missing ${field}`)
  }

  if (route !== '/' && html.includes('"@type":"WebApplication"')) errors.push(`${route}: WebApplication schema must only appear on the homepage`)
  if (html.includes('aggregateRating')) errors.push(`${route}: aggregateRating must not be emitted without a real rating source`)

  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1])
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error.message})`)
    }
  }
}

// Validate the deployed output, including every local navigation target and anchor.
for (const [route, html] of pages) {
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attributes(tag).href
    if (!href || !/^(\/|#|https:\/\/mermaid-drawing\.com(?:\/|$))/.test(href)) continue
    const target = new URL(href.replaceAll('&amp;', '&'), `${siteUrl}${route}`)
    if (target.origin !== siteUrl || /\.[a-z]+$/i.test(target.pathname)) continue
    const targetHtml = pages.get(target.pathname)
    if (!targetHtml) errors.push(`${route}: link has no generated page: ${href}`)
    else if (target.hash) {
      const ids = [...targetHtml.matchAll(/\bid\s*=\s*(["'])(.*?)\1/g)].map(([, , id]) => id)
      if (!ids.includes(decodeURIComponent(target.hash.slice(1)))) errors.push(`${route}: broken anchor ${href}`)
    }
  }
}
const homepage = pages.get('/') || ''
if (!homepage.includes('id="graph-td-guide"') || !homepage.includes('flowchart TD')) errors.push('/: missing SSR Graph TD usage guide')
if (!homepage.includes('id="graph-td-example"')) errors.push('/: missing crawlable code example')

const sitemap = await readFile(resolve(outputDir, 'sitemap.xml'), 'utf8')
const robots = await readFile(resolve(outputDir, 'robots.txt'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const expectedUrls = routes.map((route) => `${siteUrl}${route}`)

if (sitemapUrls.some((url) => url.includes('#'))) errors.push('sitemap.xml: fragment URLs are not allowed')
if (sitemap.includes('<lastmod>')) errors.push('sitemap.xml: unverifiable lastmod values must be omitted')
if (/<(?:priority|changefreq)>|hreflang/.test(sitemap)) errors.push('sitemap.xml: remove unsupported priorities and false language alternates')
if (new Set(sitemapUrls).size !== sitemapUrls.length || JSON.stringify([...sitemapUrls].sort()) !== JSON.stringify([...expectedUrls].sort())) errors.push(`sitemap.xml: expected only ${expectedUrls.join(', ')}`)
if (robots.includes('/#')) errors.push('robots.txt: fragment rules are invalid')
if (/^Disallow:\s*\/(?:$|_nuxt(?:\/|$))/mi.test(robots)) errors.push('robots.txt: must allow pages and /_nuxt/ rendering resources')
if (/^Crawl-delay:/mi.test(robots)) errors.push('robots.txt: remove unsupported Google crawl-delay directives')
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) errors.push('robots.txt: missing absolute sitemap URL')
for (const name of ['robots.txt', 'sitemap.xml']) {
  if (await readFile(resolve(root, 'public', name), 'utf8') !== await readFile(resolve(outputDir, name), 'utf8')) errors.push(`${name}: generated output is stale; run npm run generate`)
}

if (errors.length) {
  console.error(`SEO validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`SEO validation passed for ${routes.length} generated routes.`)
