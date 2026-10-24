export type Light = 'baja' | 'indirecta' | 'brillante'
export type Water = 'bajo' | 'moderado' | 'frecuente'
export type Difficulty = 'facil' | 'media' | 'experto'

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  order: number
}

export interface Product {
  id: string
  slug: string
  name: string
  scientificName?: string
  categoryId: string
  price: number
  compareAtPrice?: number
  stock: number
  shortDescription: string
  description: string
  images: string[]
  light: Light
  water: Water
  difficulty: Difficulty
  size?: string
  petFriendly: boolean
  featured: boolean
  active: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado'
export type PaymentMethod = 'transferencia' | 'contraentrega' | 'tarjeta'

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  number: number
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    notes?: string
  }
  giftMessage?: string
  paymentMethod: PaymentMethod
  status: OrderStatus
  createdAt: string
}

export interface StoreData {
  categories: Category[]
  products: Product[]
  orders: Order[]
  orderSeq: number
}
