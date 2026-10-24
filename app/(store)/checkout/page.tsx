'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Banknote, CreditCard, Gift, Landmark, Lock } from 'lucide-react'
import { useCart } from '@/components/store/cart-provider'
import { formatPrice, shippingFor } from '@/lib/config'
import type { PaymentMethod } from '@/lib/types'
import { placeOrder } from './actions'

const methods: { id: PaymentMethod; title: string; text: string; icon: typeof Landmark }[] = [
  { id: 'transferencia', title: 'Transferencia bancaria', text: 'Te enviamos los datos por correo y WhatsApp.', icon: Landmark },
  { id: 'tarjeta', title: 'Tarjeta de crédito o débito', text: 'Recibirás un link de pago seguro.', icon: CreditCard },
  { id: 'contraentrega', title: 'Pago contra entrega', text: 'Disponible en zonas seleccionadas.', icon: Banknote },
]

export default function CheckoutPage() {
  const { lines, subtotal, clear, ready } = useCart()
  const router = useRouter()
  const [method, setMethod] = useState<PaymentMethod>('transferencia')
  const [gift, setGift] = useState(false)
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()
  const shipping = shippingFor(subtotal)

  function submit(form: FormData) {
    setError('')
    const get = (k: string) => String(form.get(k) ?? '')
    startTransition(async () => {
      const res = await placeOrder({
        lines: lines.map((l) => ({ productId: l.id, quantity: l.quantity })),
        customer: {
          name: get('name'), email: get('email'), phone: get('phone'), address: get('address'),
          city: get('city'), state: get('state'), zip: get('zip'), notes: get('notes'),
        },
        giftMessage: gift ? get('giftMessage') : undefined,
        paymentMethod: method,
      })
      if (res.ok) {
        clear()
        router.push(`/pedido/${res.id}`)
      } else setError(res.error)
    })
  }

  if (ready && lines.length === 0) {
    return (
      <section className="paper flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-serif text-3xl">No hay productos para finalizar</p>
        <Link href="/tienda" className="btn-primary mt-8">Ir a la tienda</Link>
      </section>
    )
  }

  return (
    <section className="paper">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-16">
        <p className="font-script text-4xl text-empolvado">Último paso</p>
        <h1 className="mt-1 font-serif text-[40px] leading-none sm:text-5xl md:text-6xl">Finalizar compra</h1>

        <form action={submit} className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="space-y-10 sm:space-y-12">
            <fieldset>
              <legend className="eyebrow text-empolvado">01 · Contacto</legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2"><label className="field-label" htmlFor="name">Nombre completo</label><input required id="name" name="name" autoComplete="name" className="field" /></div>
                <div><label className="field-label" htmlFor="email">Correo</label><input required type="email" id="email" name="email" autoComplete="email" className="field" /></div>
                <div><label className="field-label" htmlFor="phone">Teléfono / WhatsApp</label><input required type="tel" id="phone" name="phone" autoComplete="tel" className="field" /></div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow text-empolvado">02 · Envío</legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-6">
                <div className="sm:col-span-6"><label className="field-label" htmlFor="address">Dirección</label><input required id="address" name="address" autoComplete="street-address" placeholder="Calle, número, barrio, apto." className="field" /></div>
                <div className="sm:col-span-2"><label className="field-label" htmlFor="city">Ciudad</label><input required id="city" name="city" autoComplete="address-level2" className="field" /></div>
                <div className="sm:col-span-2"><label className="field-label" htmlFor="state">Departamento</label><input id="state" name="state" autoComplete="address-level1" className="field" /></div>
                <div className="sm:col-span-2 max-sm:col-span-1"><label className="field-label" htmlFor="zip">Código postal</label><input id="zip" name="zip" autoComplete="postal-code" className="field" /></div>
                <div className="sm:col-span-6"><label className="field-label" htmlFor="notes">Indicaciones (opcional)</label><textarea id="notes" name="notes" rows={2} className="field resize-none" /></div>
              </div>
              <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-2xl border border-monstera/15 bg-blush/25 p-5 transition hover:border-empolvado">
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-1 size-4 accent-empolvado" />
                <span>
                  <span className="flex items-center gap-2 font-serif text-lg"><Gift className="size-4 text-empolvado" /> Es un regalo</span>
                  <span className="mt-1 block text-xs text-monstera/65">Escribimos tu mensaje a mano en nuestra tarjeta de agradecimiento y no incluimos precios.</span>
                </span>
              </label>
              {gift && (
                <textarea name="giftMessage" rows={3} maxLength={300} placeholder="Tu mensaje para quien recibe…" className="field mt-4 resize-none font-serif text-base italic animate-in fade-in" />
              )}
            </fieldset>

            <fieldset>
              <legend className="eyebrow text-empolvado">03 · Pago</legend>
              <div className="mt-6 grid gap-3">
                {methods.map(({ id, title, text, icon: Icon }) => (
                  <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition sm:gap-4 sm:p-5 ${method === id ? 'border-empolvado bg-white/70 ring-4 ring-blush/40' : 'border-monstera/15 hover:border-monstera/40'}`}>
                    <input type="radio" name="method" value={id} checked={method === id} onChange={() => setMethod(id)} className="size-4 accent-empolvado" />
                    <Icon className="size-5 text-empolvado" strokeWidth={1.3} />
                    <span>
                      <span className="block text-sm font-medium">{title}</span>
                      <span className="block text-xs text-monstera/60">{text}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="h-fit rounded-[24px] bg-marfil p-6 shadow sm:p-8-[0_30px_60px_-40px_rgba(46,74,50,0.6)] ring-1 ring-monstera/10 lg:sticky lg:top-32">
            <p className="eyebrow text-empolvado">Tu pedido</p>
            <ul className="mt-6 space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-4">
                  <div className="relative">
                    <img src={l.image} alt="" className="size-16 rounded-xl object-cover" />
                    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-monstera text-[10px] text-marfil">{l.quantity}</span>
                  </div>
                  <p className="flex-1 font-serif text-[15px] leading-tight">{l.name}</p>
                  <p className="text-sm">{formatPrice(l.price * l.quantity)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-3 border-t border-monstera/10 pt-6 text-sm">
              <div className="flex justify-between"><dt className="text-monstera/65">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-monstera/65">Envío</dt><dd>{shipping ? formatPrice(shipping) : 'Gratis'}</dd></div>
              <div className="flex justify-between border-t border-monstera/10 pt-4 font-serif text-2xl"><dt>Total</dt><dd>{formatPrice(subtotal + shipping)}</dd></div>
            </dl>
            {error && <p role="alert" className="mt-6 rounded-xl bg-empolvado/10 px-4 py-3 text-sm text-empolvado-deep">{error}</p>}
            <button type="submit" disabled={pending || !ready} className="btn-primary mt-8 w-full py-4">
              {pending ? 'Procesando…' : 'Confirmar pedido'}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-monstera/55"><Lock className="size-3" /> Tus datos están protegidos</p>
          </aside>
        </form>
      </div>
    </section>
  )
}
