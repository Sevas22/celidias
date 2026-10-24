import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { LeafDivider } from '@/components/store/brand'
import { getOrder } from '@/lib/db'
import { formatPrice, paymentLabel, statusLabel, whatsappUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Pedido confirmado', robots: { index: false } }

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const order = await getOrder((await params).id)
  if (!order) notFound()

  return (
    <section className="paper">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:py-20">
        <img src="/brand/emblem-sm.png" alt="" className="mx-auto w-24" />
        <p className="mt-8 font-script text-5xl text-empolvado">Gracias</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl">Porque eres parte de esta historia</h1>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-8 text-monstera/70">
          Recibimos tu pedido <strong className="text-monstera">#{order.number}</strong>. Te contactaremos a {order.customer.email} con los detalles de pago y envío.
        </p>
        <LeafDivider className="mt-10" />

        <div className="mt-10 rounded-[24px] bg-marfil p-5 text-left ring-1 ring-monstera/10 sm:p-8">
          <div className="flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.2em] text-monstera/60">
            <span>Estado: <strong className="text-empolvado">{statusLabel[order.status]}</strong></span>
            <span>{paymentLabel[order.paymentMethod]}</span>
          </div>
          <ul className="mt-6 divide-y divide-monstera/10">
            {order.items.map((it) => (
              <li key={it.productId} className="flex items-center gap-4 py-4">
                <img src={it.image} alt="" className="size-14 rounded-xl object-cover" />
                <span className="flex-1 font-serif text-lg">{it.name} <span className="text-sm text-monstera/50">× {it.quantity}</span></span>
                <span className="text-sm">{formatPrice(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-monstera/10 pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-monstera/60">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-monstera/60">Envío</dt><dd>{order.shipping ? formatPrice(order.shipping) : 'Gratis'}</dd></div>
            <div className="flex justify-between pt-2 font-serif text-2xl"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
          </dl>
          {order.giftMessage && (
            <div className="mt-6 rounded-2xl bg-blush/30 p-5">
              <p className="eyebrow text-empolvado">Mensaje de regalo</p>
              <p className="mt-2 font-serif text-lg italic">“{order.giftMessage}”</p>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={whatsappUrl(`Hola, acabo de hacer el pedido #${order.number}.`)} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle className="size-4" /> Confirmar por WhatsApp
          </a>
          <Link href="/tienda" className="btn-ghost">Seguir explorando</Link>
        </div>
      </div>
    </section>
  )
}
