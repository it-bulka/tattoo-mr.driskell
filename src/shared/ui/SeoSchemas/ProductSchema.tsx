interface ProductSchemaProps {
  name: string
  description?: string
  image?: string
  price?: number
  currency?: string
  brand?: string
  sku?: string
}

export const ProductSchema = ({
  name,
  description,
  image,
  price,
  currency = 'UAH',
  brand,
  sku,
}: ProductSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    offers: price !== undefined
      ? {
          '@type': 'Offer',
          price,
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
