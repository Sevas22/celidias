import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Droplet, Gift, Leaf, PawPrint, Ruler, Sun, Truck } from 'lucide-react'
import { BuyBox, ProductGallery } from '@/components/store/product-buy'
import { ProductCard } from '@/components/store/product-card'
import { toCardProduct } from '@/lib/card'
import { SectionHeading } from '@/components/store/brand'
import { getCategories, getProductBySlug, getProducts } from '@/lib/db'
import { difficultyLabel, formatPrice, lightLabel, store, waterLabel, whatsappUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug)
  return product ? { title: product.name, description: product.shortDescription } : {}
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const categories = await getCategories()
  const category = categories.find((c) => c.id === product.categoryId)
  const related = (await getProducts({ category: category?.slug })).filter((p) => p.id !== product.id).slice(0, 4)
  const catName = new Map(categories.map((c) => [c.id, c.name]))

  const specs = [
    { icon: Sun, label: lightLabel[product.light] },
    { icon: Droplet, label: waterLabel[product.water] },
    { icon: Leaf, label: difficultyLabel[product.difficulty] },
    ...(product.size ? [{ icon: Ruler, label: product.size }] : []),
    ...(product.petFriendly ? [{ icon: PawPrint, label: 'Apta para mascotas' }] : []),
  ]

  return (
    <>
      <section className="paper">
        <div className="mx-auto max-w-[1400px] px-5 pb-14 pt-6 md:px-10 md:pb-20 md:pt-8">
          <nav className="truncate text-[10px] uppercase tracking-[0.2em] text-monstera/50 sm:tracking-[0.25em]">
            <Link href="/" className="hover:text-empolvado">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/tienda" className="hover:text-empolvado">Tienda</Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/tienda?categoria=${category.slug}`} className="hover:text-empolvado">{category.name}</Link>
              </>
            )}
          </nav>

          <div className="mt-6 grid gap-10 md:mt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <ProductGallery images={product.images} name={product.name} />

            <div className="lg:pt-10">
              {category && <p className="eyebrow text-empolvado">{category.name}</p>}
              <h1 className="mt-3 font-serif text-[40px] leading-[1.02] text-monstera sm:mt-4 sm:text-5xl md:text-6xl">{product.name}</h1>
              {product.scientificName && <p className="mt-3 font-serif text-lg italic text-monstera/55">{product.scientificName}</p>}
              <span className="mt-6 block h-px w-14 bg-empolvado" />
              <p className="mt-6 text-[15px] leading-8 text-monstera/75">{product.shortDescription}</p>

              <div className="mt-8">
                <BuyBox product={toCardProduct(product)} />
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:mt-10 border border-monstera/10 bg-monstera/10 sm:grid-cols-3">
                {specs.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 bg-marfil px-4 py-4">
                    <Icon className="size-5 shrink-0 text-empolvado" strokeWidth={1.2} />
                    <span className="text-xs text-monstera/80">{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 divide-y divide-monstera/10 border-y border-monstera/10">
                <details className="group py-5" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em]">
                    Su historia <span className="text-lg text-empolvado transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-monstera/70">{product.description}</p>
                </details>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em]">
                    Envío y empaque <span className="text-lg text-empolvado transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-monstera/70">
                    <p className="flex gap-3"><Truck className="mt-1 size-4 shrink-0 text-empolvado" strokeWidth={1.4} /> Envío gratis desde {formatPrice(store.freeShippingFrom)}. Empaque protector para que tu planta llegue perfecta.</p>
                    <p className="flex gap-3"><Gift className="mt-1 size-4 shrink-0 text-empolvado" strokeWidth={1.4} /> Cada pedido incluye tarjeta de cuidado y papel seda Celidia&rsquo;s. Puedes agregar un mensaje de regalo al finalizar la compra.</p>
                  </div>
                </details>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em]">
                    Asesoría personalizada <span className="text-lg text-empolvado transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-monstera/70">
                    ¿Dudas sobre si es la planta ideal para tu espacio?{' '}
                    <a href={whatsappUrl(`Hola, tengo una pregunta sobre ${product.name}.`)} target="_blank" rel="noreferrer" className="text-empolvado underline underline-offset-4">
                      Escríbenos por WhatsApp
                    </a>{' '}
                    y te acompañamos.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          <SectionHeading script="También te puede gustar" title="Historias que combinan" />
          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={toCardProduct(p, catName.get(p.categoryId))} arch={i % 2 === 1} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
