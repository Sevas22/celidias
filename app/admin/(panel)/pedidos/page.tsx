import Link from 'next/link'
import { Card, PageHeader, StatusBadge } from '@/components/admin/ui'
import { getOrders } from '@/lib/db'
import { formatPrice, paymentLabel, statusLabel, store } from '@/lib/config'
import type { OrderStatus } from '@/lib/types'

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  const { estado } = await searchParams
  const all = await getOrders()
  const orders = estado ? all.filter((o) => o.status === estado) : all
  const tabs: (OrderStatus | undefined)[] = [undefined, 'pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado']

  return (
    <>
      <PageHeader title="Pedidos" subtitle={`${all.length} pedidos recibidos`} />
      <div className="mb-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => {
          const count = t ? all.filter((o) => o.status === t).length : all.length
          const active = (estado ?? undefined) === t
          return (
            <Link key={t ?? 'todos'} href={t ? `/admin/pedidos?estado=${t}` : '/admin/pedidos'} className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${active ? 'bg-monstera text-marfil' : 'bg-marfil text-monstera/70 ring-1 ring-monstera/10 hover:text-monstera'}`}>
              {t ? statusLabel[t] : 'Todos'} <span className="opacity-60">({count})</span>
            </Link>
          )
        })}
      </div>
      <Card flush>
        <ul className="divide-y divide-monstera/10 md:grid md:grid-cols-2 md:gap-px md:divide-y-0 md:bg-monstera/10 xl:hidden">
          {orders.map((o) => (
            <li key={o.id} className="bg-marfil">
              <Link href={`/admin/pedidos/${o.id}`} className="flex items-center gap-3 p-4 active:bg-lino/60">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-empolvado">#{o.number}</span>
                    <StatusBadge status={o.status} />
                  </p>
                  <p className="mt-1 truncate text-sm">{o.customer.name} · <span className="text-monstera/55">{o.customer.city}</span></p>
                  <p className="mt-0.5 text-xs text-monstera/50">{new Date(o.createdAt).toLocaleString(store.locale, { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
                <span className="shrink-0 text-sm font-medium">{formatPrice(o.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-[10px] uppercase tracking-[0.18em] text-monstera/50">
              <tr>
                <th className="px-5 py-3 font-semibold">Pedido</th>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Cliente</th>
                <th className="px-5 py-3 font-semibold">Pago</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-monstera/10">
              {orders.map((o) => (
                <tr key={o.id} className="transition hover:bg-lino/50">
                  <td className="px-5 py-4"><Link href={`/admin/pedidos/${o.id}`} className="font-medium text-empolvado hover:underline">#{o.number}</Link></td>
                  <td className="px-5 py-4 text-monstera/70">{new Date(o.createdAt).toLocaleString(store.locale, { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td className="px-5 py-4">{o.customer.name}<span className="block text-xs text-monstera/50">{o.customer.city}</span></td>
                  <td className="px-5 py-4 text-monstera/70">{paymentLabel[o.paymentMethod]}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-right font-medium">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && <p className="p-10 text-center text-sm text-monstera/55">No hay pedidos en este estado.</p>}
      </Card>
    </>
  )
}
