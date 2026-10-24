import Link from 'next/link'
import { AlertTriangle, ArrowRight, ClipboardList, Package, Plus, Wallet } from 'lucide-react'
import { Card, PageHeader, StatusBadge } from '@/components/admin/ui'
import { getOrders, getProducts } from '@/lib/db'
import { formatPrice } from '@/lib/config'

export default async function DashboardPage() {
  const [products, orders] = await Promise.all([getProducts({ includeInactive: true }), getOrders()])
  const valid = orders.filter((o) => o.status !== 'cancelado')
  const revenue = valid.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter((o) => o.status === 'pendiente').length
  const lowStock = products.filter((p) => p.active && p.stock <= 5).sort((a, b) => a.stock - b.stock)

  const stats = [
    { label: 'Ventas', value: formatPrice(revenue), icon: Wallet, note: `${valid.length} pedidos válidos` },
    { label: 'Pedidos pendientes', value: String(pending), icon: ClipboardList, note: 'Por confirmar' },
    { label: 'Productos activos', value: String(products.filter((p) => p.active).length), icon: Package, note: `${products.length} en total` },
    { label: 'Stock bajo', value: String(lowStock.length), icon: AlertTriangle, note: '5 unidades o menos' },
  ]

  return (
    <>
      <PageHeader title="Resumen" subtitle="Así florece la tienda hoy.">
        <Link href="/admin/productos/nuevo" className="btn-primary"><Plus className="size-4" /> Nuevo producto</Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, note }) => (
          <Card key={label}>
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-monstera/55">{label}</p>
              <Icon className="size-4 text-empolvado" strokeWidth={1.6} />
            </div>
            <p className="mt-3 font-serif text-3xl">{value}</p>
            <p className="mt-1 text-xs text-monstera/50">{note}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">Últimos pedidos</h2>
            <Link href="/admin/pedidos" className="flex items-center gap-1 text-xs text-empolvado hover:underline">Ver todos <ArrowRight className="size-3" /></Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-6 text-sm text-monstera/55">Aún no hay pedidos. Cuando un cliente compre, aparecerá aquí.</p>
          ) : (
            <table className="mt-4 w-full text-sm">
              <tbody className="divide-y divide-monstera/10">
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="py-3"><Link href={`/admin/pedidos/${o.id}`} className="font-medium hover:text-empolvado">#{o.number}</Link></td>
                    <td className="hidden py-3 text-monstera/70 sm:table-cell">{o.customer.name}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 text-right">{formatPrice(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <h2 className="font-serif text-2xl">Stock bajo</h2>
          {lowStock.length === 0 ? (
            <p className="mt-6 text-sm text-monstera/55">Todo el inventario está en buen nivel.</p>
          ) : (
            <ul className="mt-4 divide-y divide-monstera/10">
              {lowStock.slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <img src={p.images[0] || '/brand/swatch-salvia.webp'} alt="" className="size-10 rounded-lg object-cover" />
                  <Link href={`/admin/productos/${p.id}`} className="flex-1 text-sm hover:text-empolvado">{p.name}</Link>
                  <span className={`text-xs font-semibold ${p.stock === 0 ? 'text-empolvado-deep' : 'text-amber-700'}`}>{p.stock} u.</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
