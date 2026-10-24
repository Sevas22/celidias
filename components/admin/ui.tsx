import type { OrderStatus } from '@/lib/types'
import { statusLabel } from '@/lib/config'

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div>
        <h1 className="font-serif text-3xl leading-tight text-monstera sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-monstera/60">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  )
}

export function Card({ children, className = '', flush = false }: { children: React.ReactNode; className?: string; flush?: boolean }) {
  return (
    <div className={`rounded-2xl bg-marfil shadow-[0_1px_0_rgba(46,74,50,0.06)] ring-1 ring-monstera/10 ${flush ? 'overflow-hidden' : 'p-5 sm:p-6'} ${className}`}>
      {children}
    </div>
  )
}

const statusStyle: Record<OrderStatus, string> = {
  pendiente: 'bg-amber-100 text-amber-800',
  confirmado: 'bg-blush/60 text-empolvado-deep',
  enviado: 'bg-sky-100 text-sky-800',
  entregado: 'bg-salvia/40 text-monstera',
  cancelado: 'bg-monstera/10 text-monstera/60',
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyle[status]}`}>{statusLabel[status]}</span>
}
