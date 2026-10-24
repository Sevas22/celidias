'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, Minus, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/config'
import { useCart } from './cart-provider'
import type { CardProduct } from './product-card'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ['/brand/swatch-salvia.webp']
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      {list.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto md:flex-col md:gap-3 [&::-webkit-scrollbar]:hidden">
          {list.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-24 md:w-20 ${i === active ? 'border-empolvado' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <img src={src} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 overflow-hidden rounded-[999px_999px_20px_20px] bg-lino sm:rounded-[999px_999px_24px_24px]">
        <img key={list[active]} src={list[active]} alt={name} className="aspect-[4/5] w-full object-cover animate-in fade-in duration-700" />
      </div>
    </div>
  )
}

export function BuyBox({ product }: { product: CardProduct }) {
  const { add, favorites, toggleFavorite } = useCart()
  const [qty, setQty] = useState(1)
  const [showBar, setShowBar] = useState(false)
  const row = useRef<HTMLDivElement>(null)
  const fav = favorites.includes(product.id)
  const soldOut = product.stock <= 0
  const addToCart = () =>
    add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0] ?? '', stock: product.stock }, qty)

  // On small screens, keep a purchase bar pinned once the main buttons scroll out of view.
  useEffect(() => {
    const onScroll = () => {
      const el = row.current
      if (el) setShowBar(el.getBoundingClientRect().bottom < 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {!soldOut && (
        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-monstera/10 bg-marfil/95 px-4 py-3 shadow-[0_-12px_30px_-20px_rgba(46,74,50,0.5)] backdrop-blur-xl transition-transform duration-500 ease-(--ease-luxe) lg:hidden ${
            showBar ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          aria-hidden={!showBar}
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <img src={product.images[0]} alt="" className="size-12 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-[15px] leading-tight">{product.name}</p>
              <p className="text-xs text-empolvado">{formatPrice(product.price)}</p>
            </div>
            <button onClick={addToCart} tabIndex={showBar ? 0 : -1} className="btn-primary shrink-0 px-5 py-3 text-[10px]">
              Agregar
            </button>
          </div>
        </div>
      )}
      <div className="flex items-baseline gap-4">
        <span className="font-serif text-[32px] text-monstera sm:text-4xl">{formatPrice(product.price)}</span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="text-lg text-monstera/40 line-through">{formatPrice(product.compareAtPrice)}</span>
        )}
      </div>
      <p className={`mt-3 flex items-center gap-2 text-xs ${soldOut ? 'text-empolvado' : 'text-monstera/65'}`}>
        <span className={`size-2 rounded-full ${soldOut ? 'bg-empolvado' : product.stock <= 5 ? 'bg-amber-500' : 'bg-salvia'}`} />
        {soldOut ? 'Agotado por ahora' : product.stock <= 5 ? `Solo quedan ${product.stock} disponibles` : 'Disponible para envío inmediato'}
      </p>

      <div ref={row} className="mt-6 flex items-center gap-2 sm:mt-8 sm:gap-3">
        <div className="flex items-center rounded-full border border-monstera/20">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3.5 sm:p-4" aria-label="Restar cantidad" disabled={soldOut}>
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium" aria-live="polite">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-3.5 disabled:opacity-30 sm:p-4" aria-label="Sumar cantidad" disabled={soldOut || qty >= product.stock}>
            <Plus className="size-3.5" />
          </button>
        </div>
        <button
          disabled={soldOut}
          onClick={addToCart}
          className="btn-primary min-w-0 flex-1 px-4 py-4 sm:px-7"
        >
          {soldOut ? 'Agotado' : 'Agregar al carrito'}
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={fav}
          aria-label="Guardar en favoritos"
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full border border-monstera/20 transition hover:border-empolvado"
        >
          <Heart className={`size-5 ${fav ? 'fill-empolvado text-empolvado' : ''}`} strokeWidth={1.4} />
        </button>
      </div>
    </div>
  )
}
