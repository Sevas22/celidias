'use client'

import Link from 'next/link'
import { useCart } from './cart-provider'
import { ProductCard, type CardProduct } from './product-card'

export function FavoritesGrid({ products }: { products: CardProduct[] }) {
  const { favorites, ready } = useCart()
  if (!ready) return null
  const list = products.filter((p) => favorites.includes(p.id))

  if (!list.length) {
    return (
      <div className="mt-14 rounded-[28px] border border-dashed border-monstera/20 px-8 py-20 text-center">
        <p className="font-serif text-3xl">Aún no guardas ninguna planta</p>
        <p className="mt-3 text-sm text-monstera/60">Toca el corazón en cualquier producto para guardarlo aquí.</p>
        <Link href="/tienda" className="btn-primary mt-8">Explorar la tienda</Link>
      </div>
    )
  }

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
      {list.map((p, i) => (
        <ProductCard key={p.id} product={p} arch={i % 2 === 1} />
      ))}
    </div>
  )
}
