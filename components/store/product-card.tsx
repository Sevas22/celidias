'use client'

import Link from 'next/link'
import { Heart, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/config'
import type { CardProduct } from '@/lib/card'
export type { CardProduct }
import { useCart } from './cart-provider'

const badge = 'rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] sm:px-3 sm:py-1 sm:text-[9px] sm:tracking-[0.2em]'

export function ProductCard({ product, arch = false }: { product: CardProduct; arch?: boolean }) {
  const { add, favorites, toggleFavorite } = useCart()
  const fav = favorites.includes(product.id)
  const soldOut = product.stock <= 0
  const [first, second] = product.images

  return (
    <article className="group relative">
      <div
        className={`relative aspect-[4/5] overflow-hidden bg-lino ${
          arch ? 'rounded-[999px_999px_14px_14px] sm:rounded-[999px_999px_18px_18px]' : 'rounded-[14px] sm:rounded-[18px]'
        }`}
      >
        <Link href={`/producto/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <img
            src={first || '/brand/swatch-salvia.webp'}
            alt={product.name}
            loading="lazy"
            className={`size-full object-cover transition-all duration-[1.2s] ease-(--ease-luxe) group-hover:scale-[1.06] ${second ? 'md:group-hover:opacity-0' : ''}`}
          />
          {second && (
            <img src={second} alt="" loading="lazy" className="absolute inset-0 hidden size-full scale-[1.06] object-cover opacity-0 transition-all duration-[1.2s] ease-(--ease-luxe) group-hover:scale-100 group-hover:opacity-100 md:block" />
          )}
        </Link>

        <div className={`pointer-events-none absolute left-2.5 flex flex-col items-start gap-1.5 sm:left-4 sm:gap-2 ${arch ? 'top-[20%]' : 'top-2.5 sm:top-4'}`}>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className={`${badge} bg-empolvado text-marfil`}>Edición especial</span>
          )}
          {soldOut ? (
            <span className={`${badge} bg-monstera text-marfil`}>Agotado</span>
          ) : product.stock <= 5 ? (
            <span className={`${badge} bg-marfil/90 text-empolvado`}>Últimas {product.stock}</span>
          ) : null}
        </div>

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
          aria-pressed={fav}
          className={`absolute right-2.5 flex size-9 items-center justify-center rounded-full bg-marfil/85 backdrop-blur transition hover:scale-110 sm:right-4 sm:size-10 ${arch ? 'top-[20%]' : 'top-2.5 sm:top-4'}`}
        >
          <Heart className={`size-4 transition ${fav ? 'fill-empolvado text-empolvado' : 'text-monstera'}`} strokeWidth={1.5} />
        </button>

        {!soldOut && (
          <button
            onClick={() => add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: first ?? '', stock: product.stock })}
            aria-label={`Agregar ${product.name} al carrito`}
            className="absolute bottom-2.5 right-2.5 flex size-10 items-center justify-center gap-2 rounded-full bg-marfil/95 text-[10px] font-semibold uppercase tracking-[0.22em] text-monstera shadow-lg backdrop-blur transition-all duration-500 ease-(--ease-luxe) hover:bg-empolvado hover:text-marfil active:scale-95 md:inset-x-4 md:bottom-4 md:size-auto md:translate-y-3 md:py-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            <Plus className="size-4 md:size-3.5" />
            <span className="hidden md:inline">Agregar al carrito</span>
          </button>
        )}
      </div>

      <Link href={`/producto/${product.slug}`} className="block pt-3.5 sm:pt-5">
        {product.categoryName && (
          <p className="eyebrow truncate text-[8.5px] tracking-[0.22em] text-empolvado/90 sm:text-[10px] sm:tracking-[0.32em]">{product.categoryName}</p>
        )}
        <h3 className="mt-1.5 font-serif text-base leading-snug text-monstera transition-colors group-hover:text-empolvado-deep sm:mt-2 sm:text-[21px] sm:leading-tight">
          {product.name}
        </h3>
        {product.scientificName && <p className="mt-1 hidden text-xs italic text-monstera/50 sm:block">{product.scientificName}</p>}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:mt-3">
          <span className="text-[13px] font-medium text-monstera sm:text-[15px]">{formatPrice(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[11px] text-monstera/40 line-through sm:text-xs">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </Link>
    </article>
  )
}
