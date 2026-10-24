import Link from 'next/link'
import { ArrowRight, Droplet, Heart, House, Leaf, ShieldCheck, Sprout, Sun, Truck, Users, Wind } from 'lucide-react'
import { LeafDivider, SectionHeading, SproutIcon } from '@/components/store/brand'
import { ProductCard } from '@/components/store/product-card'
import { toCardProduct } from '@/lib/card'
import { getCategories, getProducts } from '@/lib/db'
import { formatPrice } from '@/lib/config'

export const dynamic = 'force-dynamic'

const values = [
  { icon: Sprout, title: 'Naturaleza', text: 'Belleza viva que inspira.' },
  { icon: Heart, title: 'Personas', text: 'Conexiones que florecen.' },
  { icon: House, title: 'Hogares', text: 'Espacios más verdes y felices.' },
  { icon: Users, title: 'Familia', text: 'Raíces que trascienden.' },
]

const care = [
  { icon: Sun, title: 'Luz indirecta' },
  { icon: Droplet, title: 'Riego moderado' },
  { icon: Wind, title: 'Ambiente húmedo' },
  { icon: Heart, title: 'Mucho amor' },
]

const trust = [
  { icon: Truck, title: 'Envíos seguros', text: 'Empaque protector para que llegue perfecta.' },
  { icon: Leaf, title: 'Plantas sanas', text: 'Seleccionadas una a una en nuestro vivero.' },
  { icon: ShieldCheck, title: 'Compra confiable', text: 'Pagos seguros y seguimiento de tu pedido.' },
  { icon: Sprout, title: 'Asesoría personalizada', text: 'Te acompañamos después de tu compra.' },
]

export default async function HomePage() {
  const [categories, featured, all] = await Promise.all([getCategories(), getProducts({ featured: true, limit: 8 }), getProducts()])
  const catName = new Map(categories.map((c) => [c.id, c.name]))
  const hero = all.find((p) => p.slug === 'aglaonema-pink-star') ?? featured[0]
  const counts = new Map(categories.map((c) => [c.id, all.filter((p) => p.categoryId === c.id).length]))

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="paper relative overflow-hidden">
        <img src="/brand/pattern-lines.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 hidden w-[420px] -rotate-12 opacity-30 mix-blend-multiply lg:block" style={{ maskImage: "radial-gradient(closest-side, black 40%, transparent)" }} />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 pt-8 sm:gap-12 md:px-10 md:pb-20 md:pt-10 lg:grid-cols-[1fr_1.05fr] lg:pb-28 lg:pt-16">
          <div className="relative z-10 max-w-xl">
            <p className="rise eyebrow text-empolvado">Plantas que cuentan historias</p>
            <h1 className="rise rise-2 mt-5 font-serif text-[44px] leading-[0.98] tracking-[-0.02em] text-monstera min-[400px]:text-[52px] sm:mt-6 sm:text-7xl xl:text-[88px]">
              Lleva la naturaleza <em className="font-normal text-empolvado">a tu hogar</em>
            </h1>
            <p className="rise rise-3 mt-6 max-w-md text-[15px] leading-7 text-monstera/70 sm:mt-8 sm:leading-8">
              Plantas que inspiran, espacios que florecen y momentos que permanecen. Una selección botánica curada por nuestra familia, para la tuya.
            </p>
            <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <Link href="/tienda" className="btn-primary">
                Explorar plantas <ArrowRight className="size-4" />
              </Link>
              <Link href="/tienda?categoria=regalos" className="btn-ghost">Regalos con raíz</Link>
            </div>
            <div className="rise rise-4 mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-monstera/15 pt-5 sm:mt-14 sm:gap-6 sm:pt-6">
              {[
                [String(all.length), 'Piezas'],
                [String(categories.length), 'Colecciones'],
                ['1:1', 'Asesoría'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl text-monstera">{n}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-monstera/55 sm:text-[10px] sm:tracking-[0.2em]">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[4/5] w-[88%] max-w-[560px] overflow-hidden rounded-[999px_999px_24px_24px] sm:w-full lg:ml-auto lg:mr-0 shadow-[0_40px_80px_-40px_rgba(46,74,50,0.55)]">
              <img src="/brand/hero-pink-aglaonema.webp" alt="Aglaonema pink en maceta de cerámica" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-monstera/30 via-transparent to-transparent" />
            </div>
            <div className="sway absolute -left-2 top-10 hidden size-32 items-center justify-center rounded-full bg-marfil/90 p-4 shadow-xl backdrop-blur md:flex lg:-left-10">
              <img src="/brand/emblem-sm.png" alt="" className="w-full" />
            </div>
            {hero && (
              <Link
                href={`/producto/${hero.slug}`}
                className="absolute -bottom-6 left-1/2 flex w-[min(300px,92%)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-marfil/95 p-2.5 pr-4 sm:-bottom-8 sm:left-6 sm:translate-x-0 sm:gap-4 sm:p-3 sm:pr-5 shadow-[0_30px_60px_-25px_rgba(46,74,50,0.5)] backdrop-blur transition hover:-translate-y-1 lg:-left-6"
              >
                <img src={hero.images[0]} alt="" className="size-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="eyebrow text-[8px] text-empolvado">Favorita de la casa</p>
                  <p className="mt-1 font-serif text-lg leading-tight">{hero.name}</p>
                  <p className="text-xs text-monstera/60">{formatPrice(hero.price)}</p>
                </div>
                <ArrowRight className="size-4 text-empolvado" />
              </Link>
            )}
            <p className="absolute -right-2 bottom-24 hidden rotate-90 text-[10px] uppercase tracking-[0.5em] text-monstera/40 xl:block">Vivero boutique botánica</p>
          </div>
        </div>
      </section>

      {/* ───────── Categorías ───────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <SectionHeading align="center" eyebrow="Colecciones que inspiran" title="Encuentra tu historia verde" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 md:gap-8">
          {categories.map((c) => (
            <Link key={c.id} href={`/tienda?categoria=${c.slug}`} className="group text-center">
              <div className="relative mx-auto aspect-[3/4] overflow-hidden rounded-[999px_999px_20px_20px] bg-lino">
                <img src={c.image} alt="" className="size-full object-cover transition duration-[1.4s] ease-(--ease-luxe) group-hover:scale-110" />
                <div className="absolute inset-0 bg-monstera/0 transition duration-700 group-hover:bg-monstera/15" />
              </div>
              <h3 className="mt-4 font-serif text-lg leading-tight text-monstera sm:mt-6 sm:text-2xl">{c.name}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-monstera/50">{counts.get(c.id) ?? 0} piezas</p>
              <p className="mx-auto mt-3 hidden max-w-[220px] text-sm leading-6 text-monstera/60 md:block">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────── Destacados ───────── */}
      <section className="bg-lino/70 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-8">
            <SectionHeading eyebrow="Selección botánica" title="Plantas destacadas" />
            <Link href="/tienda" className="link-underline inline-flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[0.22em] text-empolvado md:self-end">
              Ver toda la tienda <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={toCardProduct(p, catName.get(p.categoryId))} arch={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Valores ───────── */}
      <section className="border-y border-monstera/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={`flex flex-col items-center px-4 py-9 text-center sm:px-6 sm:py-12 ${i ? 'md:border-l md:border-monstera/10' : ''} ${i % 2 ? 'border-l border-monstera/10' : ''} ${i > 1 ? 'max-md:border-t max-md:border-monstera/10' : ''}`}>
              <Icon className="size-9 text-empolvado" strokeWidth={1} />
              <p className="eyebrow mt-5 text-monstera">{title}</p>
              <p className="mt-2 font-serif text-[15px] italic text-monstera/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Colecciones editoriales ───────── */}
      <section className="mx-auto grid max-w-[1400px] gap-4 px-5 py-16 sm:gap-6 md:px-10 md:py-24 lg:grid-cols-[1.15fr_1fr]">
        <Link href="/tienda?categoria=plantas-de-interior" className="group relative min-h-[440px] overflow-hidden rounded-[22px] bg-monstera sm:min-h-[560px] sm:rounded-[28px]">
          <img src="/brand/photo-hero.webp" alt="" className="absolute inset-0 size-full object-cover opacity-90 transition duration-[1.6s] ease-(--ease-luxe) group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-monstera via-monstera/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-marfil sm:p-9 md:p-14">
            <p className="font-script text-4xl text-blush">Colección</p>
            <h3 className="mt-1 font-serif text-4xl leading-none sm:text-5xl md:text-6xl">Plantas de interior</h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-marfil/75">Fuerza, protección y crecimiento. Hojas esculturales para dar vida a salas, estudios y rincones de luz.</p>
            <span className="mt-8 inline-flex items-center gap-3 border-b border-blush pb-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              Explorar <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        <div className="grid gap-6">
          <Link href="/tienda?categoria=regalos" className="group relative grid min-h-[268px] grid-cols-[1.1fr_1fr] overflow-hidden rounded-[22px] bg-blush sm:grid-cols-[1fr_1.1fr] sm:rounded-[28px]">
            <div className="relative z-10 flex flex-col justify-center p-5 sm:p-9">
              <p className="font-script text-2xl leading-none text-empolvado-deep sm:text-3xl">Regalos verdes</p>
              <h3 className="mt-2 font-serif text-[22px] leading-tight sm:text-4xl">Sorprende con vida</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mt-6 sm:text-[11px] sm:tracking-[0.22em] text-empolvado-deep">
                Ver regalos <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
            <img src="/brand/packaging-box.webp" alt="" className="h-full min-h-[220px] w-full object-cover transition duration-[1.6s] ease-(--ease-luxe) group-hover:scale-105" />
          </Link>
          <Link href="/tienda?categoria=coleccion-pink" className="group relative grid min-h-[268px] grid-cols-[1fr_1.1fr] overflow-hidden rounded-[22px] bg-salvia/60 sm:grid-cols-[1.1fr_1fr] sm:rounded-[28px]">
            <img src="/brand/photo-philodendron.webp" alt="" className="h-full min-h-[220px] w-full object-cover object-[center_35%] transition duration-[1.6s] ease-(--ease-luxe) group-hover:scale-105" />
            <div className="relative z-10 flex flex-col justify-center p-5 sm:p-9">
              <p className="font-script text-2xl leading-none text-empolvado-deep sm:text-3xl">Edición</p>
              <h3 className="mt-2 font-serif text-[22px] leading-tight sm:text-4xl">Colección Pink</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mt-6 sm:text-[11px] sm:tracking-[0.22em] text-monstera">
                Descubrir <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ───────── Historia ───────── */}
      <section className="relative overflow-hidden bg-marfil py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:gap-16 md:px-10 lg:grid-cols-2">
          <div className="relative mx-auto w-[88%] max-w-[520px] sm:w-full">
            <img src="/brand/pattern-main.webp" alt="" aria-hidden="true" className="absolute -left-8 -top-8 h-[85%] w-[80%] rounded-[24px] object-cover opacity-80" />
            <div className="relative ml-auto mt-14 aspect-square w-[80%] overflow-hidden rounded-full border-[10px] border-marfil shadow-2xl">
              <img src="/brand/circle-union.webp" alt="Hojas entrelazadas de monstera y filodendro pink" className="size-full scale-[1.12] object-cover" />
            </div>
          </div>
          <div>
            <SectionHeading script="Una historia que florece" eyebrow="Desde la familia" title={<>Naturaleza que <em className="text-empolvado">conecta</em> historias</>}>
              <p>
                Celidia&rsquo;s nace de Cecilia y Diana, madre y hermana. Nuestro símbolo une la hoja de Monstera —fuerza y crecimiento— con el
                Filodendro Pink —belleza y sensibilidad—. En el centro, la silueta de Sara: continuidad, amor y vida.
              </p>
              <p className="mt-4">Somos una familia que cultiva más que plantas: cultivamos confianza, amor y raíces.</p>
            </SectionHeading>
            <ul className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8">
              {[
                ['Cecilia', 'La madre', '/brand/family-cecilia.webp'],
                ['Diana', 'La hermana', '/brand/family-diana.webp'],
                ['Sara', 'El futuro', '/brand/family-sara.webp'],
              ].map(([name, role, photo]) => (
                <li key={name} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
                  <span className="block size-16 overflow-hidden rounded-full ring-2 ring-blush ring-offset-2 ring-offset-marfil">
                    <img src={photo} alt={name} className="size-full scale-[1.14] object-cover" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg leading-none sm:text-xl">{name}</span>
                    <span className="mt-1 block font-serif text-sm italic text-empolvado">{role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/nosotros" className="btn-dark mt-10">
              Conoce nuestra historia <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Experiencia de regalo ───────── */}
      <section className="relative bg-monstera py-16 text-marfil md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow text-blush">Una experiencia que florece</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">Cada pedido llega como un regalo</h2>
              <span className="mt-6 block h-px w-14 bg-blush" />
              <p className="mt-6 max-w-md text-[15px] leading-8 text-marfil/70">
                Caja botánica ilustrada, papel seda personalizado, tarjeta de cuidado, etiqueta y cinta verde monstera. Porque eres parte de esta historia.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-4 gap-2 sm:mt-10 sm:gap-4">
                {care.map(({ icon: Icon, title }) => (
                  <div key={title} className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-marfil/20 sm:size-14">
                      <Icon className="size-5 text-blush" strokeWidth={1.2} />
                    </div>
                    <p className="mt-3 text-[9px] uppercase leading-4 tracking-[0.18em] text-marfil/70">{title}</p>
                  </div>
                ))}
              </div>
              <Link href="/producto/caja-regalo-celidias" className="btn-primary mt-12">
                Regalar una caja Celidia&rsquo;s <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-[22px] sm:rounded-[28px]">
              <img src="/brand/packaging.webp" alt="Empaque de regalo Celidia's con caja ilustrada, tarjetas y planta" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Confianza ───────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 md:py-20">
        <LeafDivider />
        <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5">
              <Icon className="size-8 shrink-0 text-empolvado" strokeWidth={1.1} />
              <div>
                <p className="eyebrow text-monstera">{title}</p>
                <p className="mt-2 font-serif text-[15px] italic leading-6 text-monstera/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src="/brand/pattern-main.webp" alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-marfil/70" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
          <SproutIcon className="mx-auto size-8 text-empolvado" />
          <p className="mt-6 font-script text-[42px] leading-tight text-empolvado-deep sm:text-5xl md:text-7xl">Plantas que llenan hogares más felices</p>
          <Link href="/tienda" className="btn-dark mt-10">
            Comenzar mi historia <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
