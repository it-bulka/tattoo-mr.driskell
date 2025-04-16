export { productsReducer, productsActions } from './model/slice/productsSlice.ts'
export type { ProductsSchema, ProductCategory } from './model/type/productSchema.ts'
export { getProductsByKey, getAllProducts } from './model/selector/getProductsSelector.ts'
export { ProductListWithBtn } from './ProductListWithBtn.tsx'