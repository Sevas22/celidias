import type { Metadata } from 'next'
import Link from 'next/link'
import { X } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'
import { toCardProduct } from '@/lib/card'
import { SortSelect } from '@/components/store/sort-select'
import { MobileFilters } from '@/components/store/mobile-filters'
import { getCategories, getProducts, type ProductQuery } from '@/lib/db'
import { difficultyLabel, lightLabel } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Tienda' }

type Search = Record<string, string | undefined>

function href(current: Search, patch: Search) {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries({ ...current, ...patch })) if (v) params.set(k, v)
  const qs = params.toString()
  return qs ? `/tienda?${qs}` : '/tienda'
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams
  const current: Search = { categoria: sp.categoria, q: sp.q, orden: sp.orden, luz: sp.luz, cuidado: sp.cuidado }
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      category: sp.categoria,
      q: sp.q,
      sort: sp.orden as ProductQuery['sort'],
      light: sp.luz,
      difficulty: sp.cuidado,
    }),
  ])
  const category = categories.find((c) => c.slug === sp.categoria)
  const catName = new Map(categories.map((c) => [c.id, c.name]))
  const activeFilters = [
    sp.q && { key: 'q', label: `“${sp.q}”` },
    sp.luz && { key: 'luz', label: lightLabel[sp.luz as keyof typeof lightLabel] },
    sp.cuidado && { key: 'cuidado', label: difficultyLabel[sp.cuidado as keyof typeof difficultyLabel] },
  ].filter(Boolean) as { key: string; label: string }[]

  return (
    <>
      <section className="paper relative overflow-hidden border-b border-monstera/10">
        <img src="/brand/botanical-branch.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 top-1/2 hidden w-[520px] -translate-y-1/2 opacity-60 mix-blend-multiply md:block" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-24">
          <nav className="text-[10px] uppercase tracking-[0.25em] text-monstera/50">
            <Link href="/" className="hover:text-empolvado">Inicio</Link> <span className="mx-2">/</span> Tienda
            {category && <><span className="mx-2">/</span>{category.name}</>}
          </nav>
          <p className="mt-6 font-script text-3xl text-empolvado sm:mt-8 sm:text-4xl">{category ? 'Colección' : 'Plantas que cuentan historias'}</p>
          <h1 className="mt-2 font-serif text-[42px] leading-none text-monstera sm:text-5xl md:text-7xl">{category?.name ?? 'La tienda'}</h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-monstera/65 sm:mt-5 sm:text-[15px] sm:leading-8">
            {category?.description ?? 'Plantas, regalos y accesorios seleccionados uno a uno para llenar tu hogar de vida.'}
          </p>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-monstera/10 bg-marfil/90 backdrop-blur-xl md:top-24">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto px-5 py-3 sm:gap-3 sm:py-4 md:px-10 [&::-webkit-scrollbar]:hidden">
          <Link
            href={href(current, { categoria: undefined })}
            className={`shrink-0 rounded-full border px-4 py-2 text-[10px] sm:px-5 font-semibold uppercase tracking-[0.2em] transition ${!category ? 'border-monstera bg-monstera text-marfil' : 'border-monstera/15 hover:border-monstera'}`}
          >
            Todo
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={href(current, { categoria: c.slug })}
              className={`shrink-0 rounded-full border px-4 py-2 text-[10px] sm:px-5 font-semibold uppercase tracking-[0.2em] transition ${category?.id === c.id ? 'border-monstera bg-monstera text-marfil' : 'border-monstera/15 hover:border-monstera'}`}
            >
              {c.name}
            </Link>
          ))}
          <div className="ml-auto hidden shrink-0 pl-4 lg:block">
            <SortSelect value={sp.orden ?? 'destacados'} />
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-5 py-6 md:px-10 md:py-14 lg:grid-cols-[230px_1fr] lg:gap-12">
        <MobileFilters active={activeFilters.length}>
          <form action="/tienda">
            {Object.entries(current).map(([k, v]) => k !== 'q' && v && <input key={k} type="hidden" name={k} value={v} />)}
            <label className="field-label" htmlFor="q">Buscar</label>
            <input id="q" name="q" defaultValue={sp.q} placeholder="Monstera, regalo…" className="field" />
          </form>
          <div>
            <p className="field-label">Luz</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-start">
              {Object.entries(lightLabel).map(([k, l]) => (
                <Link key={k} href={href(current, { luz: sp.luz === k ? undefined : k })} className={`text-sm transition ${sp.luz === k ? 'font-medium text-empolvado' : 'text-monstera/65 hover:text-monstera'}`}>
                  {sp.luz === k ? '● ' : '○ '}{l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="field-label">Cuidado</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-start">
              {Object.entries(difficultyLabel).map(([k, l]) => (
                <Link key={k} href={href(current, { cuidado: sp.cuidado === k ? undefined : k })} className={`text-sm transition ${sp.cuidado === k ? 'font-medium text-empolvado' : 'text-monstera/65 hover:text-monstera'}`}>
                  {sp.cuidado === k ? '● ' : '○ '}{l}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden overflow-hidden rounded-[999px_999px_18px_18px] bg-blush/50 p-6 pt-10 text-center lg:block">
            <img src="/brand/emblem-sm.png" alt="" className="mx-auto w-16" />
            <p className="mt-4 font-serif text-lg leading-snug">¿Necesitas ayuda para elegir?</p>
            <p className="mt-2 text-xs leading-5 text-monstera/65">Te asesoramos según la luz y el espacio de tu hogar.</p>
          </div>
        </MobileFilters>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-monstera/55">{products.length} {products.length === 1 ? 'pieza' : 'piezas'}</p>
            {activeFilters.map((f) => (
              <Link key={f.key} href={href(current, { [f.key]: undefined })} className="inline-flex items-center gap-1.5 rounded-full bg-blush/50 px-3 py-1 text-xs text-monstera hover:bg-blush">
                {f.label} <X className="size-3" />
              </Link>
            ))}
            <div className="ml-auto lg:hidden">
              <SortSelect value={sp.orden ?? 'destacados'} />
            </div>
          </div>

          {products.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-14 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={toCardProduct(p, catName.get(p.categoryId))} arch={i % 3 === 1} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-monstera/20 px-6 py-14 text-center sm:px-8 sm:py-20">
              <p className="font-script text-4xl text-empolvado">Aún no florece</p>
              <p className="mt-2 font-serif text-2xl">No encontramos piezas con esos filtros</p>
              <Link href="/tienda" className="btn-ghost mt-8">Ver toda la tienda</Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
