'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, ExternalLink, LayoutDashboard, LogOut, Package, Tags } from 'lucide-react'
import { logout } from '@/app/admin/actions'

const items = [
  { href: '/admin', label: 'Resumen', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/categorias', label: 'Categorías', icon: Tags },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <aside className="z-30 flex flex-col bg-monstera text-marfil lg:sticky lg:top-0 lg:h-screen">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:py-8">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-marfil lg:size-11">
          <img src="/brand/emblem-sm.png" alt="" className="h-7 lg:h-8" />
        </div>
        <div className="leading-none">
          <p className="font-serif text-lg tracking-[0.06em] lg:text-xl">CELIDIA&rsquo;S</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-salvia">Administración</p>
        </div>
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <Link href="/" target="_blank" aria-label="Ver tienda" className="rounded-full p-2.5 text-marfil/75 hover:bg-marfil/10">
            <ExternalLink className="size-4" strokeWidth={1.6} />
          </Link>
          <form action={logout}>
            <button aria-label="Cerrar sesión" className="rounded-full p-2.5 text-marfil/75 hover:bg-marfil/10">
              <LogOut className="size-4" strokeWidth={1.6} />
            </button>
          </form>
        </div>
      </div>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 gap-1 border-t border-marfil/10 bg-monstera px-2 pt-2 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.4)] lg:static lg:flex lg:flex-col lg:border-0 lg:px-4 lg:pt-0 lg:shadow-none"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] transition sm:text-xs lg:flex-row lg:gap-3 lg:px-4 lg:py-3 lg:text-sm ${
                active ? 'bg-marfil text-monstera' : 'text-marfil/75 hover:bg-marfil/10 hover:text-marfil'
              }`}
            >
              <Icon className="size-4" strokeWidth={1.6} /> {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto hidden space-y-1 px-4 pb-6 lg:block">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-marfil/70 hover:bg-marfil/10">
          <ExternalLink className="size-4" strokeWidth={1.6} /> Ver tienda
        </Link>
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-marfil/70 hover:bg-marfil/10">
            <LogOut className="size-4" strokeWidth={1.6} /> Cerrar sesión
          </button>
        </form>
        <p className="px-4 pt-4 font-script text-2xl text-blush/80">Naturaleza que conecta historias</p>
      </div>
    </aside>
  )
}
