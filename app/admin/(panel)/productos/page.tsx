import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { Card, PageHeader } from '@/components/admin/ui'
import { ProductRowActions } from '@/components/admin/product-row-actions'
import { getCategories, getProducts } from '@/lib/db'
import { formatPrice } from '@/lib/config'

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ q?: string; categoria?: string; guardado?: string }> }) {
  const sp = await searchParams
  const [products, categories] = await Promise.all([
    getProducts({ includeInactive: true, q: sp.q, category: sp.categoria, sort: 'nombre' }),
    getCategories(),
  ])
  const catName = new Map(categories.map((c) => [c.id, c.name]))

  return (
    <>
      <PageHeader title="Productos" subtitle={`${products.length} productos`}>
        <Link href="/admin/productos/nuevo" className="btn-primary"><Plus className="size-4" /> Nuevo producto</Link>
      </PageHeader>

      {sp.guardado && <p className="mb-6 rounded-xl bg-salvia/30 px-4 py-3 text-sm text-monstera">Producto guardado correctamente.</p>}

      <Card flush>
        <form className="grid grid-cols-[1fr_auto] gap-3 border-b border-monstera/10 p-4 sm:flex sm:flex-wrap">
          <div className="relative col-span-2 sm:min-w-[220px] sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-monstera/40" />
            <input name="q" defaultValue={sp.q} placeholder="Buscar por nombre…" className="field pl-10" />
          </div>
          <select name="categoria" defaultValue={sp.categoria ?? ''} className="field min-w-0 sm:w-auto">
            <option value="">Todas las categorías</option>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
          <button className="btn-dark px-5">Filtrar</button>
        </form>

        <ul className="divide-y divide-monstera/10 md:grid md:grid-cols-2 md:gap-px md:divide-y-0 md:bg-monstera/10 xl:hidden">
          {products.map((p) => (
            <li key={p.id} className="flex gap-3 bg-marfil p-4">
              <Link href={`/admin/productos/${p.id}`} className="shrink-0">
                <img src={p.images[0] || '/brand/swatch-salvia.webp'} alt="" className="size-16 rounded-xl object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/productos/${p.id}`} className="block truncate font-medium">{p.name}</Link>
                <p className="mt-0.5 truncate text-xs text-monstera/55">{catName.get(p.categoryId) ?? '—'}</p>
                <p className="mt-1 text-sm">
                  {formatPrice(p.price)}
                  <span className={`ml-2 text-xs ${p.stock === 0 ? 'font-semibold text-empolvado-deep' : p.stock <= 5 ? 'text-amber-700' : 'text-monstera/55'}`}>· {p.stock} u.</span>
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${p.active ? 'bg-salvia/40 text-monstera' : 'bg-monstera/10 text-monstera/50'}`}>{p.active ? 'Publicado' : 'Oculto'}</span>
                  {p.featured && <span className="rounded-full bg-blush/60 px-2 py-0.5 text-[10px] font-medium text-empolvado-deep">Destacado</span>}
                </div>
                <div className="-ml-2 mt-1 [&>div]:justify-start">
                  <ProductRowActions id={p.id} slug={p.slug} active={p.active} featured={p.featured} name={p.name} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="text-left text-[10px] uppercase tracking-[0.18em] text-monstera/50">
              <tr>
                <th className="px-5 py-3 font-semibold">Producto</th>
                <th className="px-5 py-3 font-semibold">Categoría</th>
                <th className="px-5 py-3 font-semibold">Precio</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-monstera/10">
              {products.map((p) => (
                <tr key={p.id} className="transition hover:bg-lino/50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/productos/${p.id}`} className="flex items-center gap-3">
                      <img src={p.images[0] || '/brand/swatch-salvia.webp'} alt="" className="size-12 rounded-xl object-cover" />
                      <span>
                        <span className="block font-medium hover:text-empolvado">{p.name}</span>
                        <span className="text-xs text-monstera/50">/{p.slug}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-monstera/70">{catName.get(p.categoryId) ?? '—'}</td>
                  <td className="px-5 py-3">{formatPrice(p.price)}</td>
                  <td className={`px-5 py-3 ${p.stock === 0 ? 'font-semibold text-empolvado-deep' : p.stock <= 5 ? 'text-amber-700' : ''}`}>{p.stock}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${p.active ? 'bg-salvia/40 text-monstera' : 'bg-monstera/10 text-monstera/50'}`}>{p.active ? 'Publicado' : 'Oculto'}</span>
                    {p.featured && <span className="ml-1.5 rounded-full bg-blush/60 px-2.5 py-1 text-[11px] font-medium text-empolvado-deep">Destacado</span>}
                  </td>
                  <td className="px-5 py-3"><ProductRowActions id={p.id} slug={p.slug} active={p.active} featured={p.featured} name={p.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && <p className="p-10 text-center text-sm text-monstera/55">No hay productos que coincidan.</p>}
      </Card>
    </>
  )
}
