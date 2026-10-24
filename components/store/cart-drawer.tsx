'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { formatPrice, shippingFor, store } from '@/lib/config'
import { useCart } from './cart-provider'

export function CartDrawer() {
  const { lines, subtotal, drawerOpen, setDrawerOpen, setQuantity, remove } = useCart()
  const remaining = Math.max(0, store.freeShippingFrom - subtotal)
  const progress = Math.min(100, (subtotal / store.freeShippingFrom) * 100)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen, setDrawerOpen])

  if (!drawerOpen) return null

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div className="absolute inset-0 bg-monstera/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setDrawerOpen(false)} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-marfil shadow-2xl animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between border-b border-monstera/10 px-7 py-6">
          <div>
            <p className="eyebrow text-empolvado">Tu selección</p>
            <h2 className="mt-1 font-serif text-2xl">Carrito</h2>
          </div>
          <button onClick={() => setDrawerOpen(false)} aria-label="Cerrar carrito" className="rounded-full p-2 hover:bg-monstera/5">
            <X className="size-5" strokeWidth={1.4} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-blush/40">
              <ShoppingBag className="size-7 text-empolvado" strokeWidth={1.2} />
            </div>
            <p className="mt-6 font-serif text-2xl">Tu carrito espera una historia</p>
            <p className="mt-2 text-sm text-monstera/60">Descubre plantas que llenan hogares de vida.</p>
            <Link href="/tienda" onClick={() => setDrawerOpen(false)} className="btn-primary mt-8">
              Explorar plantas
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-monstera/10 px-7 py-4">
              <p className="text-xs text-monstera/70">
                {remaining > 0 ? (
                  <>Te faltan <strong className="text-empolvado">{formatPrice(remaining)}</strong> para envío gratis</>
                ) : (
                  <>¡Tu pedido tiene <strong className="text-empolvado">envío gratis</strong>!</>
                )}
              </p>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-monstera/10">
                <div className="h-full rounded-full bg-gradient-to-r from-salvia to-empolvado transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-monstera/10 overflow-y-auto px-7">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <Link href={`/producto/${line.slug}`} onClick={() => setDrawerOpen(false)} className="h-24 w-20 shrink-0 overflow-hidden rounded-[40px_40px_8px_8px] bg-lino">
                    <img src={line.image} alt={line.name} className="size-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-[17px] leading-tight">{line.name}</p>
                      <button onClick={() => remove(line.id)} aria-label={`Quitar ${line.name}`} className="self-start text-monstera/40 hover:text-empolvado">
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-empolvado">{formatPrice(line.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-monstera/15">
                        <button onClick={() => setQuantity(line.id, line.quantity - 1)} className="p-2" aria-label="Restar">
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{line.quantity}</span>
                        <button onClick={() => setQuantity(line.id, line.quantity + 1)} disabled={line.quantity >= line.stock} className="p-2 disabled:opacity-30" aria-label="Sumar">
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(line.price * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-monstera/10 bg-lino/60 px-7 py-6">
              <div className="flex justify-between text-sm">
                <span className="text-monstera/70">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-1.5 flex justify-between text-sm">
                <span className="text-monstera/70">Envío</span>
                <span>{shippingFor(subtotal) === 0 ? 'Gratis' : formatPrice(shippingFor(subtotal))}</span>
              </div>
              <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="btn-primary mt-6 w-full">
                Finalizar compra
              </Link>
              <Link href="/carrito" onClick={() => setDrawerOpen(false)} className="mt-3 block text-center text-[11px] uppercase tracking-[0.2em] text-monstera/70 hover:text-monstera">
                Ver carrito completo
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
