import { useParams } from 'react-router'
import { CategoriesPage } from '@/pages/CatalogPages/content/CategoriesPage/CategoriesPage.tsx'
import { BrandsPage } from '@/pages/CatalogPages/content/BrandsPage/BrandsPage.tsx'

const pages = (slug: string) => ({
  brand: <BrandsPage slug={slug}/>,
  category: <CategoriesPage slug={slug}/>,
})
console.log(pages)

const CatalogPages = () => {
  const { slug } = useParams()

  if(!slug) return null
  return <BrandsPage slug={slug}/>
}

export default CatalogPages