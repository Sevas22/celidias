import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { seedData } from './seed'
import type { Category, Order, Product, StoreData } from './types'

// File-backed store. Swap this module for a real database (Postgres, Supabase…)
// when deploying to serverless hosting, where the filesystem is not persistent.
export const DATA_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), 'data')
export const UPLOAD_DIR = path.join(/*turbopackIgnore: true*/ DATA_DIR, 'uploads')
const FILE = path.join(/*turbopackIgnore: true*/ DATA_DIR, 'store.json')

let queue: Promise<unknown> = Promise.resolve()
let seeding: Promise<void> | null = null
// Set when the filesystem refuses writes (e.g. Vercel). The catalog is then served
// read-only from the seed so the storefront keeps working instead of erroring.
// Vercel sets VERCEL=1 at runtime; its function filesystem can't be written to.
let readOnly = process.env.STORE_READ_ONLY === '1' || process.env.VERCEL === '1'

// Vercel reports ENOENT (not EROFS) when creating folders under /var/task.
const READ_ONLY_CODES = new Set(['EROFS', 'EACCES', 'EPERM', 'ENOENT'])
export const READ_ONLY_MESSAGE =
  'Este hosting no permite guardar archivos. Conecta una base de datos para poder crear productos y recibir pedidos.'

export function isReadOnlyError(err: unknown) {
  return READ_ONLY_CODES.has((err as { code?: string })?.code ?? '')
}

async function load(): Promise<StoreData> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as StoreData
  } catch (err: any) {
    if (err?.code !== 'ENOENT') throw err
    if (readOnly) return seedData()
    // Parallel first reads must share one seed write.
    seeding ??= save(seedData()).finally(() => (seeding = null))
    try {
      await seeding
    } catch (writeErr: any) {
      // Seeding is best-effort: if the file can't be created, serve the catalog from memory.
      readOnly = true
      console.warn(`[db] No se pudo crear ${FILE} (${writeErr?.code ?? writeErr}). ${READ_ONLY_MESSAGE}`)
      return seedData()
    }
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as StoreData
  }
}

async function save(data: StoreData) {
  if (readOnly) throw new Error(READ_ONLY_MESSAGE)
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const tmp = `${FILE}.${randomUUID()}.tmp`
    await fs.writeFile(tmp, JSON.stringify(data, null, 2))
    await fs.rename(tmp, FILE)
  } catch (err: any) {
    if (!isReadOnlyError(err)) throw err
    readOnly = true
    throw Object.assign(new Error(READ_ONLY_MESSAGE), { code: err.code })
  }
}

/** Serialises read-modify-write cycles so concurrent requests don't clobber each other. */
function mutate<T>(fn: (data: StoreData) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const data = await load()
    const result = await fn(data)
    await save(data)
    return result
  })
  queue = run.catch(() => {})
  return run
}

export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ---------- Categories ----------

export async function getCategories() {
  const { categories } = await load()
  return [...categories].sort((a, b) => a.order - b.order)
}

export async function getCategoryBySlug(slug: string) {
  return (await getCategories()).find((c) => c.slug === slug)
}

export function saveCategory(input: Omit<Category, 'id' | 'slug'> & { id?: string }) {
  return mutate((data) => {
    const slug = slugify(input.name)
    if (input.id) {
      const cat = data.categories.find((c) => c.id === input.id)
      if (!cat) throw new Error('Categoría no encontrada')
      Object.assign(cat, input, { slug })
      return cat
    }
    const cat: Category = { ...input, id: `cat-${randomUUID().slice(0, 8)}`, slug }
    data.categories.push(cat)
    return cat
  })
}

export function deleteCategory(id: string) {
  return mutate((data) => {
    if (data.products.some((p) => p.categoryId === id)) throw new Error('La categoría tiene productos asignados')
    data.categories = data.categories.filter((c) => c.id !== id)
  })
}

// ---------- Products ----------

export interface ProductQuery {
  category?: string
  q?: string
  sort?: 'destacados' | 'precio-asc' | 'precio-desc' | 'nuevos' | 'nombre'
  light?: string
  difficulty?: string
  maxPrice?: number
  featured?: boolean
  includeInactive?: boolean
  limit?: number
}

export async function getProducts(query: ProductQuery = {}) {
  const { products, categories } = await load()
  const cat = query.category ? categories.find((c) => c.slug === query.category) : undefined
  const q = query.q ? slugify(query.q).replace(/-/g, ' ') : ''
  let list = products.filter((p) => {
    if (!query.includeInactive && !p.active) return false
    if (query.category && p.categoryId !== cat?.id) return false
    if (query.featured && !p.featured) return false
    if (query.light && p.light !== query.light) return false
    if (query.difficulty && p.difficulty !== query.difficulty) return false
    if (query.maxPrice && p.price > query.maxPrice) return false
    if (q) {
      const hay = slugify(`${p.name} ${p.scientificName ?? ''} ${p.shortDescription} ${p.tags.join(' ')}`).replace(/-/g, ' ')
      if (!q.split(' ').every((w) => hay.includes(w))) return false
    }
    return true
  })
  switch (query.sort) {
    case 'precio-asc': list.sort((a, b) => a.price - b.price); break
    case 'precio-desc': list.sort((a, b) => b.price - a.price); break
    case 'nuevos': list.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
    case 'nombre': list.sort((a, b) => a.name.localeCompare(b.name, 'es')); break
    default: list.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
  if (query.limit) list = list.slice(0, query.limit)
  return list
}

export async function getProductBySlug(slug: string) {
  const { products } = await load()
  return products.find((p) => p.slug === slug && p.active)
}

export async function getProductById(id: string) {
  const { products } = await load()
  return products.find((p) => p.id === id)
}

export type ProductInput = Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { id?: string; slug?: string }

export function saveProduct(input: ProductInput) {
  return mutate((data) => {
    let slug = slugify(input.slug || input.name)
    const taken = (s: string) => data.products.some((p) => p.slug === s && p.id !== input.id)
    for (let n = 2; taken(slug); n++) slug = `${slugify(input.slug || input.name)}-${n}`
    const stamp = new Date().toISOString()
    if (input.id) {
      const product = data.products.find((p) => p.id === input.id)
      if (!product) throw new Error('Producto no encontrado')
      Object.assign(product, input, { slug, updatedAt: stamp })
      return product
    }
    const product: Product = { ...input, id: `prd-${randomUUID().slice(0, 8)}`, slug, createdAt: stamp, updatedAt: stamp }
    data.products.unshift(product)
    return product
  })
}

export function deleteProduct(id: string) {
  return mutate((data) => {
    data.products = data.products.filter((p) => p.id !== id)
  })
}

export function setProductFlags(id: string, flags: Partial<Pick<Product, 'active' | 'featured'>>) {
  return mutate((data) => {
    const p = data.products.find((x) => x.id === id)
    if (p) Object.assign(p, flags, { updatedAt: new Date().toISOString() })
  })
}

// ---------- Orders ----------

export async function getOrders() {
  const { orders } = await load()
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getOrder(id: string) {
  const { orders } = await load()
  return orders.find((o) => o.id === id)
}

export function createOrder(
  lines: { productId: string; quantity: number }[],
  rest: Pick<Order, 'customer' | 'giftMessage' | 'paymentMethod'>,
  shippingFor: (subtotal: number) => number,
) {
  return mutate((data) => {
    const items = lines.map(({ productId, quantity }) => {
      const p = data.products.find((x) => x.id === productId && x.active)
      if (!p) throw new Error('Uno de los productos ya no está disponible')
      const qty = Math.max(1, Math.floor(quantity))
      if (p.stock < qty) throw new Error(`Solo quedan ${p.stock} unidades de ${p.name}`)
      return { p, qty }
    })
    if (!items.length) throw new Error('Tu carrito está vacío')
    for (const { p, qty } of items) p.stock -= qty
    const subtotal = items.reduce((s, { p, qty }) => s + p.price * qty, 0)
    const shipping = shippingFor(subtotal)
    const order: Order = {
      id: randomUUID(),
      number: ++data.orderSeq,
      items: items.map(({ p, qty }) => ({ productId: p.id, name: p.name, image: p.images[0] ?? '', price: p.price, quantity: qty })),
      subtotal,
      shipping,
      total: subtotal + shipping,
      ...rest,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    }
    data.orders.push(order)
    return order
  })
}

export function updateOrderStatus(id: string, status: Order['status']) {
  return mutate((data) => {
    const order = data.orders.find((o) => o.id === id)
    if (!order) throw new Error('Pedido no encontrado')
    // Return stock when an order is cancelled (and take it again if reopened).
    if (status === 'cancelado' && order.status !== 'cancelado') {
      for (const it of order.items) {
        const p = data.products.find((x) => x.id === it.productId)
        if (p) p.stock += it.quantity
      }
    } else if (order.status === 'cancelado' && status !== 'cancelado') {
      for (const it of order.items) {
        const p = data.products.find((x) => x.id === it.productId)
        if (p) p.stock = Math.max(0, p.stock - it.quantity)
      }
    }
    order.status = status
  })
}
