import { Helmet } from 'react-helmet-async'
import { memo } from 'react';

interface SeoMetaProps {
  title: string
  description?: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

const SITE_NAME = 'Tattoo Shop'
const DEFAULT_OG_IMAGE = '/default.png'

export const SeoMeta = memo(({
  title,
  description,
  ogImage,
  canonical,
  noIndex,
}: SeoMetaProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />
    </Helmet>
  )
})

SeoMeta.displayName = 'SeoMeta'
