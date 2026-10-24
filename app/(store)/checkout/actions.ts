'use server'

import { createOrder } from '@/lib/db'
import { shippingFor } from '@/lib/config'
import type { PaymentMethod } from '@/lib/types'

export interface CheckoutInput {
  lines: { productId: string; quantity: number }[]
  customer: { name: string; email: string; phone: string; address: string; city: string; state: string; zip: string; notes?: string }
  giftMessage?: string
  paymentMethod: PaymentMethod
}

const METHODS: PaymentMethod[] = ['transferencia', 'contraentrega', 'tarjeta']

export async function placeOrder(input: CheckoutInput): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const c = input.customer
  const clean = (s: unknown, max = 200) => String(s ?? '').trim().slice(0, max)
  const customer = {
    name: clean(c?.name),
    email: clean(c?.email),
    phone: clean(c?.phone, 40),
    address: clean(c?.address, 300),
    city: clean(c?.city),
    state: clean(c?.state),
    zip: clean(c?.zip, 20),
    notes: clean(c?.notes, 500) || undefined,
  }
  if (!customer.name || !customer.phone || !customer.address || !customer.city) {
    return { ok: false, error: 'Completa nombre, teléfono y dirección de envío.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return { ok: false, error: 'Ingresa un correo válido.' }
  if (!METHODS.includes(input.paymentMethod)) return { ok: false, error: 'Selecciona un método de pago.' }
  if (!Array.isArray(input.lines) || input.lines.length === 0 || input.lines.length > 50) {
    return { ok: false, error: 'Tu carrito está vacío.' }
  }

  try {
    const order = await createOrder(
      input.lines.map((l) => ({ productId: String(l.productId), quantity: Number(l.quantity) || 1 })),
      { customer, giftMessage: clean(input.giftMessage, 300) || undefined, paymentMethod: input.paymentMethod },
      shippingFor,
    )
    return { ok: true, id: order.id }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'No pudimos crear tu pedido.' }
  }
}
