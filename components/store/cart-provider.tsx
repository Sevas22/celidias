'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface CartLine {
  id: string
  slug: string
  name: string
  price: number
  image: string
  stock: number
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  count: number
  subtotal: number
  ready: boolean
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  add: (line: Omit<CartLine, 'quantity'>, quantity?: number) => void
  setQuantity: (id: string, quantity: number) => void
  remove: (id: string) => void
  clear: () => void
  favorites: string[]
  toggleFavorite: (id: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const CART_KEY = 'celidias.cart'
const FAV_KEY = 'celidias.favorites'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setLines(read(CART_KEY, []))
    setFavorites(read(FAV_KEY, []))
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) write(CART_KEY, lines)
  }, [lines, ready])

  useEffect(() => {
    if (ready) write(FAV_KEY, favorites)
  }, [favorites, ready])

  const add = useCallback((line: Omit<CartLine, 'quantity'>, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((l) => l.id === line.id)
      if (existing) {
        return current.map((l) => (l.id === line.id ? { ...l, ...line, quantity: Math.min(line.stock, l.quantity + quantity) } : l))
      }
      return [...current, { ...line, quantity: Math.min(line.stock, quantity) }]
    })
    setDrawerOpen(true)
  }, [])

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) =>
      current.flatMap((l) => (l.id !== id ? [l] : quantity <= 0 ? [] : [{ ...l, quantity: Math.min(l.stock, quantity) }])),
    )
  }, [])

  const remove = useCallback((id: string) => setLines((current) => current.filter((l) => l.id !== id)), [])
  const clear = useCallback(() => setLines([]), [])
  const toggleFavorite = useCallback(
    (id: string) => setFavorites((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id])),
    [],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: lines.reduce((s, l) => s + l.quantity * l.price, 0),
      ready,
      drawerOpen,
      setDrawerOpen,
      add,
      setQuantity,
      remove,
      clear,
      favorites,
      toggleFavorite,
    }),
    [lines, ready, drawerOpen, add, setQuantity, remove, clear, favorites, toggleFavorite],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
