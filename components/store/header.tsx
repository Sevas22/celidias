'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { formatPrice, store } from '@/lib/config'
import { Logo } from './brand'
import { useCart } from './cart-provider'

const nav = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/tienda?categoria=plantas-de-interior', label: 'Plantas' },
  { href: '/tienda?categoria=coleccion-pink', label: 'Colección Pink' },
  { href: '/tienda?categoria=regalos', label: 'Regalos' },
  { href: '/tienda?categoria=macetas-y-accesorios', label: 'Macetas' },
  { href: '/nosotros', label: 'Nuestra historia' },
]

const messages = [
  `Envío gratis en compras desde ${formatPrice(store.freeShippingFrom)}`,
  'Plantas que cuentan historias',
  'Empaque de regalo botánico en cada pedido',
]

export function Header() {
  const { count, favorites, setDrawerOpen, ready } = useCart()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  return (
    <>
      <div className="overflow-hidden bg-monstera py-2.5 text-marfil">
        <div className="marquee flex w-max gap-16 whitespace-nowrap">
          {[...messages, ...messages, ...messages, ...messages].map((m, i) => (
            <span key={i} className="flex items-center gap-16 text-[10px] font-medium uppercase tracking-[0.3em]">
              {m}
              <span className="text-blush">✦</span>
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-500 ${
          scrolled ? 'border-monstera/10 bg-marfil/90 shadow-[0_8px_30px_-20px_rgba(46,74,50,0.5)] backdrop-blur-xl' : 'border-transparent bg-marfil'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-20 sm:gap-6 sm:px-5 md:h-24 md:px-10">
          <button className="-ml-2 p-2 xl:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu className="size-5" strokeWidth={1.4} />
          </button>

          <Logo />

          <nav className="hidden items-center gap-8 whitespace-nowrap xl:flex">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="link-underline text-[11px] font-medium uppercase tracking-[0.2em] text-monstera/85 hover:text-monstera">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0 sm:gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="rounded-full p-2.5 transition hover:bg-monstera/5" aria-label="Buscar">
              <Search className="size-[19px]" strokeWidth={1.4} />
            </button>
            <Link href="/favoritos" className="relative hidden rounded-full p-2.5 transition hover:bg-monstera/5 sm:block" aria-label="Favoritos">
              <Heart className="size-[19px]" strokeWidth={1.4} />
              {ready && favorites.length > 0 && (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-empolvado" />
              )}
            </Link>
            <button onClick={() => setDrawerOpen(true)} className="relative rounded-full p-2.5 transition hover:bg-monstera/5" aria-label="Abrir carrito">
              <ShoppingBag className="size-[19px]" strokeWidth={1.4} />
              {ready && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-[18px] items-center justify-center rounded-full bg-empolvado text-[9px] font-semibold text-marfil">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="absolute inset-x-0 top-full border-b border-monstera/10 bg-marfil/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            <form action="/tienda" className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-6 sm:gap-4 sm:py-8">
              <Search className="size-5 text-empolvado" strokeWidth={1.4} />
              <input
                autoFocus
                name="q"
                placeholder="Busca una planta o un regalo…"
                className="min-w-0 flex-1 bg-transparent font-serif text-xl text-monstera outline-none placeholder:text-monstera/30 sm:text-2xl md:text-3xl"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda" className="p-2">
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </form>
          </div>
        )}
      </header>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-monstera/40 backdrop-blur-sm animate-in fade-in" onClick={() => setOpen(false)} />
          <aside className="paper absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-marfil p-7 animate-in slide-in-from-left duration-500">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="p-2">
                <X className="size-5" strokeWidth={1.4} />
              </button>
            </div>
            <nav className="mt-12 flex flex-col">
              {nav.map((item) => (
                <Link key={item.label} href={item.href} className="border-b border-monstera/10 py-4 font-serif text-2xl">
                  {item.label}
                </Link>
              ))}
              <Link href="/favoritos" className="border-b border-monstera/10 py-4 font-serif text-2xl">Favoritos</Link>
            </nav>
            <p className="mt-auto font-script text-3xl text-empolvado">Naturaleza que conecta historias</p>
          </aside>
        </div>
      )}
    </>
  )
}
