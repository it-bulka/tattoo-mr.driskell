export interface HelpSection {
  titleKey: string
  textKey: string
}

export interface HelpArticle {
  slug: string
  titleKey: string
  descriptionKey: string
  sections: HelpSection[]
}

const buildSections = (slug: string, count: number): HelpSection[] =>
  Array.from({ length: count }, (_, i) => ({
    titleKey: `help_detail.${slug}.s${i + 1}_title`,
    textKey: `help_detail.${slug}.s${i + 1}_text`,
  }))

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'delivery',
    titleKey: 'help_detail.delivery.title',
    descriptionKey: 'help_detail.delivery.description',
    sections: buildSections('delivery', 4),
  },
  {
    slug: 'payment',
    titleKey: 'help_detail.payment.title',
    descriptionKey: 'help_detail.payment.description',
    sections: buildSections('payment', 4),
  },
  {
    slug: 'returns',
    titleKey: 'help_detail.returns.title',
    descriptionKey: 'help_detail.returns.description',
    sections: buildSections('returns', 4),
  },
  {
    slug: 'warranty',
    titleKey: 'help_detail.warranty.title',
    descriptionKey: 'help_detail.warranty.description',
    sections: buildSections('warranty', 3),
  },
]

export const getHelpArticleBySlug = (slug: string): HelpArticle | undefined =>
  HELP_ARTICLES.find(a => a.slug === slug)

export const VALID_HELP_SLUGS = HELP_ARTICLES.map(a => a.slug)
