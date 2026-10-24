export const store = {
  name: "Celidia's",
  tagline: 'Naturaleza que conecta historias',
  currency: process.env.NEXT_PUBLIC_CURRENCY || 'COP',
  locale: 'es-CO',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '570000000000',
  email: 'hola@celidias.com',
  instagram: 'https://instagram.com/',
  freeShippingFrom: 300000,
  shippingFlat: 18000,
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat(store.locale, {
    style: 'currency',
    currency: store.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + ` ${store.currency}`
}

export function shippingFor(subtotal: number) {
  return subtotal === 0 || subtotal >= store.freeShippingFrom ? 0 : store.shippingFlat
}

export const lightLabel = { baja: 'Luz baja', indirecta: 'Luz indirecta', brillante: 'Luz brillante' } as const
export const waterLabel = { bajo: 'Riego bajo', moderado: 'Riego moderado', frecuente: 'Riego frecuente' } as const
export const difficultyLabel = { facil: 'Cuidado fácil', media: 'Cuidado medio', experto: 'Para expertos' } as const
export const statusLabel = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
} as const
export const paymentLabel = {
  transferencia: 'Transferencia bancaria',
  contraentrega: 'Pago contra entrega',
  tarjeta: 'Tarjeta (link de pago)',
} as const

export function whatsappUrl(text: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`
}
