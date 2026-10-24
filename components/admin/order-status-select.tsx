'use client'

import { useTransition } from 'react'
import { updateOrderStatusAction } from '@/app/admin/actions'
import { statusLabel } from '@/lib/config'
import type { OrderStatus } from '@/lib/types'

export function OrderStatusSelect({ id, status }: { id: string; status: OrderStatus }) {
  const [pending, start] = useTransition()
  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as OrderStatus
        if (next === 'cancelado' && !confirm('¿Cancelar este pedido? El stock se devolverá al inventario.')) return
        start(() => updateOrderStatusAction(id, next))
      }}
      className="field"
    >
      {Object.entries(statusLabel).map(([k, l]) => (
        <option key={k} value={k}>{l}</option>
      ))}
    </select>
  )
}
