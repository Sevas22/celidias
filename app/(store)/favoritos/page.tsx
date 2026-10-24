import { FavoritesGrid } from '@/components/store/favorites-grid'
import { toCardProduct } from '@/lib/card'
import { getCategories, getProducts } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Favoritos' }

export default async function FavoritesPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  const catName = new Map(categories.map((c) => [c.id, c.name]))
  return (
    <section className="paper min-h-[70vh]">
      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-16">
        <p className="font-script text-4xl text-empolvado">Guardadas con cariño</p>
        <h1 className="mt-1 font-serif text-[42px] leading-none sm:text-5xl md:text-6xl">Tus favoritas</h1>
        <FavoritesGrid products={products.map((p) => toCardProduct(p, catName.get(p.categoryId)))} />
      </div>
    </section>
  )
}
