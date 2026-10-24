'use client'

import Link from 'next/link'
import { ArrowRight, Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/store/cart-provider'
import { formatPrice, shippingFor } from '@/lib/config'

export default function CartPage() {
  const { lines, subtotal, setQuantity, remove, ready } = useCart()
  const shipping = shippingFor(subtotal)

  return (
    <section className="paper min-h-[70vh]">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-16">
        <p className="font-script text-4xl text-empolvado">Tu selección</p>
        <h1 className="mt-1 font-serif text-[42px] leading-none sm:text-5xl md:text-6xl">Carrito</h1>

        {!ready ? null : lines.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-dashed border-monstera/20 px-6 py-14 text-center sm:mt-14 sm:px-8 sm:py-20">
            <p className="font-serif text-3xl">Tu carrito espera una historia</p>
            <p className="mt-3 text-sm text-monstera/60">Explora nuestras plantas y encuentra la que hará florecer tu espacio.</p>
            <Link href="/tienda" className="btn-primary mt-8">Ir a la tienda</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_380px] lg:gap-12">
            <ul className="divide-y divide-monstera/10 border-y border-monstera/10">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5 sm:gap-5 sm:py-6 md:gap-8">
                  <Link href={`/producto/${line.slug}`} className="h-28 w-[88px] shrink-0 overflow-hidden rounded-[999px_999px_12px_12px] bg-lino sm:h-36 sm:w-28 md:h-40 md:w-32">
                    <img src={line.image} alt={line.name} className="size-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link href={`/producto/${line.slug}`} className="font-serif text-lg leading-tight hover:text-empolvado sm:text-2xl">{line.name}</Link>
                        <p className="mt-1 text-sm text-monstera/60">{formatPrice(line.price)} c/u</p>
                      </div>
                      <button onClick={() => remove(line.id)} className="self-start text-monstera/40 hover:text-empolvado" aria-label={`Quitar ${line.name}`}>
                        <X className="size-5" strokeWidth={1.4} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-monstera/15">
                        <button onClick={() => setQuantity(line.id, line.quantity - 1)} className="p-3" aria-label="Restar"><Minus className="size-3" /></button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button onClick={() => setQuantity(line.id, line.quantity + 1)} disabled={line.quantity >= line.stock} className="p-3 disabled:opacity-30" aria-label="Sumar"><Plus className="size-3" /></button>
                      </div>
                      <p className="font-medium">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-[24px] bg-marfil p-6 shadow sm:p-8-[0_30px_60px_-40px_rgba(46,74,50,0.6)] ring-1 ring-monstera/10 lg:sticky lg:top-32">
              <p className="eyebrow text-empolvado">Resumen</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-monstera/65">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-monstera/65">Envío</dt><dd>{shipping ? formatPrice(shipping) : 'Gratis'}</dd></div>
                <div className="flex justify-between border-t border-monstera/10 pt-4 font-serif text-2xl"><dt>Total</dt><dd>{formatPrice(subtotal + shipping)}</dd></div>
              </dl>
              <Link href="/checkout" className="btn-primary mt-8 w-full">Finalizar compra <ArrowRight className="size-4" /></Link>
              <Link href="/tienda" className="mt-4 block text-center text-[11px] uppercase tracking-[0.2em] text-monstera/60 hover:text-monstera">Seguir comprando</Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
