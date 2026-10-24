import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Gift, MessageCircle } from 'lucide-react'
import { Card, PageHeader, StatusBadge } from '@/components/admin/ui'
import { OrderStatusSelect } from '@/components/admin/order-status-select'
import { getOrder } from '@/lib/db'
import { formatPrice, paymentLabel, store } from '@/lib/config'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const order = await getOrder((await params).id)
  if (!order) notFound()
  const c = order.customer
  const phone = c.phone.replace(/\D/g, '')

  return (
    <>
      <Link href="/admin/pedidos" className="mb-4 inline-flex items-center gap-2 text-xs text-monstera/60 hover:text-monstera"><ArrowLeft className="size-3.5" /> Pedidos</Link>
      <PageHeader title={`Pedido #${order.number}`} subtitle={new Date(order.createdAt).toLocaleString(store.locale, { dateStyle: 'full', timeStyle: 'short' })}>
        <StatusBadge status={order.status} />
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <h2 className="font-serif text-xl">Productos</h2>
          <ul className="mt-4 divide-y divide-monstera/10">
            {order.items.map((it) => (
              <li key={it.productId} className="flex items-center gap-4 py-3">
                <img src={it.image || '/brand/swatch-salvia.webp'} alt="" className="size-14 rounded-xl object-cover" />
                <span className="flex-1">{it.name}<span className="block text-xs text-monstera/50">{formatPrice(it.price)} × {it.quantity}</span></span>
                <span className="font-medium">{formatPrice(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-monstera/10 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-monstera/60">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-monstera/60">Envío</dt><dd>{order.shipping ? formatPrice(order.shipping) : 'Gratis'}</dd></div>
            <div className="flex justify-between font-serif text-2xl"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
          </dl>
          {order.giftMessage && (
            <div className="mt-6 rounded-xl bg-blush/30 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-empolvado-deep"><Gift className="size-3.5" /> Mensaje de regalo</p>
              <p className="mt-2 font-serif text-lg italic">“{order.giftMessage}”</p>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-serif text-xl">Estado del pedido</h2>
            <div className="mt-4"><OrderStatusSelect id={order.id} status={order.status} /></div>
            <p className="mt-3 text-xs text-monstera/50">Al cancelar, el stock vuelve al inventario automáticamente.</p>
          </Card>
          <Card>
            <h2 className="font-serif text-xl">Cliente</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-xs text-monstera/50">Nombre</dt><dd>{c.name}</dd></div>
              <div><dt className="text-xs text-monstera/50">Correo</dt><dd><a href={`mailto:${c.email}`} className="text-empolvado hover:underline">{c.email}</a></dd></div>
              <div><dt className="text-xs text-monstera/50">Teléfono</dt><dd>{c.phone}</dd></div>
              <div><dt className="text-xs text-monstera/50">Dirección</dt><dd>{c.address}<br />{[c.city, c.state, c.zip].filter(Boolean).join(', ')}</dd></div>
              {c.notes && <div><dt className="text-xs text-monstera/50">Indicaciones</dt><dd>{c.notes}</dd></div>}
              <div><dt className="text-xs text-monstera/50">Pago</dt><dd>{paymentLabel[order.paymentMethod]}</dd></div>
            </dl>
            {phone && (
              <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hola ${c.name}, te escribimos de Celidia's sobre tu pedido #${order.number}.`)}`} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                <MessageCircle className="size-4" /> Escribir por WhatsApp
              </a>
            )}
          </Card>
        </div>
      </div>
    </>
  )
}
