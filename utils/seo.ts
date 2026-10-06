const SITE_URL = 'https://mermaid-drawing.com'
const SITE_NAME = 'Mermaid Drawing'
const SOCIAL_IMAGE = `${SITE_URL}/social-card.svg`

export interface SeoHeadOptions {
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
}

export const createSeoHead = ({ path, title, description, type = 'website' }: SeoHeadOptions) => {
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: SOCIAL_IMAGE },
      { property: 'og:image:alt', content: `${SITE_NAME} diagram editor preview` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: SOCIAL_IMAGE },
      { name: 'twitter:image:alt', content: `${SITE_NAME} diagram editor preview` }
    ],
    link: [{ rel: 'canonical', href: canonical }]
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` }
}
