import type { Product } from './types'

export type CardProduct = Pick<
  Product,
  'id' | 'slug' | 'name' | 'price' | 'compareAtPrice' | 'images' | 'stock' | 'shortDescription' | 'scientificName'
> & { categoryName?: string }

/** Trims a product to what client components need, so descriptions and admin fields stay on the server. */
export function toCardProduct(p: Product, categoryName?: string): CardProduct {
  const { id, slug, name, price, compareAtPrice, images, stock, shortDescription, scientificName } = p
  return { id, slug, name, price, compareAtPrice, images, stock, shortDescription, scientificName, categoryName }
}
