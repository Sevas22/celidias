import Link from 'next/link'
import { ArrowRight, Heart, House, Infinity as InfinityIcon, Sprout, Users } from 'lucide-react'
import { LeafDivider, SectionHeading, SproutIcon } from '@/components/store/brand'

export const metadata = { title: 'Nuestra historia' }

const symbols = [
  {
    image: '/brand/circle-monstera.webp',
    name: 'Hoja Monstera',
    words: 'Fuerza · Protección · Crecimiento',
    text: 'Simboliza la fortaleza, la estabilidad y la capacidad de crecer en cualquier entorno.',
  },
  {
    image: '/brand/circle-pink.webp',
    name: 'Filodendro Pink',
    words: 'Belleza · Sensibilidad · Esencia',
    text: 'Aporta el color, la delicadeza y la esencia única que nos diferencia.',
  },
  {
    image: '/brand/circle-union.webp',
    name: 'La unión',
    words: 'Naturaleza · Familia · Historias',
    text: 'Las hojas se entrelazan para crear un solo elemento: la unión entre la naturaleza, la familia y cada hogar que confía en nosotros.',
  },
]

const people = [
  {
    photo: '/brand/family-cecilia.webp',
    name: 'Cecilia',
    role: 'La madre',
    words: 'Amor · Raíces · Sabiduría',
    why: 'Con ella comienza esta historia. Representa las raíces: el amor que sostiene, el cuidado paciente y la sabiduría de quien ha visto crecer a una familia. Por eso su nombre está en el corazón de Celidia’s.',
  },
  {
    photo: '/brand/family-diana.webp',
    name: 'Diana',
    role: 'La hermana',
    words: 'Inspiración · Conexión · Crecimiento',
    why: 'Es el impulso que hace florecer la idea. Junto a Cecilia da origen a Celidia’s, y aporta la inspiración, la conexión y las ganas de crecer que convierten un vivero en un proyecto de familia.',
  },
  {
    photo: '/brand/family-sara.webp',
    name: 'Sara',
    role: 'El rostro en el centro',
    words: 'Futuro · Continuidad · Amor',
    why: 'Es la silueta femenina que vive en el centro de nuestro logo. Sara, la hija, simboliza todo lo que viene: los nuevos sueños y la continuidad de una historia que pasa de generación en generación.',
  },
]

const pillars = [
  { icon: Sprout, title: 'Plantas que inspiran' },
  { icon: House, title: 'Hogares más verdes' },
  { icon: Users, title: 'Historias que florecen' },
  { icon: InfinityIcon, title: 'Naturaleza que conecta' },
  { icon: Heart, title: 'Vida en cada espacio' },
]

export default function AboutPage() {
  return (
    <>
      <section className="paper relative overflow-hidden">
        <img src="/brand/hero-left-leaves.webp" alt="" aria-hidden="true" className="absolute inset-y-0 left-0 hidden h-full w-[22%] object-cover opacity-90 lg:block" style={{ maskImage: 'linear-gradient(to right, black 40%, transparent)' }} />
        <img src="/brand/hero-left-leaves.webp" alt="" aria-hidden="true" className="absolute inset-y-0 right-0 hidden h-full w-[22%] -scale-x-100 object-cover opacity-90 lg:block" style={{ maskImage: 'linear-gradient(to left, black 40%, transparent)' }} />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center md:py-32">
          <img src="/brand/logo-full.png" alt="Celidia's Plant Nursery · Naturaleza que conecta historias" className="rise mx-auto w-[240px] sm:w-[300px] md:w-[380px]" />
          <LeafDivider className="rise rise-2 mt-12" />
          <p className="rise rise-3 mt-8 font-serif text-xl leading-relaxed text-monstera/85 sm:mt-10 sm:text-2xl md:text-3xl">
            En Celidia&rsquo;s creemos en el poder de la naturaleza para unir personas, llenar hogares de vida y crear historias que duran generaciones.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-16 md:gap-16 md:px-10 md:py-24 lg:grid-cols-2">
        <SectionHeading script="Una historia que florece" eyebrow="El concepto de nuestro nombre" title="Nace desde la familia">
          <p>
            <strong className="font-semibold text-empolvado">CELIDIA&rsquo;S</strong> nace de <strong className="font-semibold text-monstera">Cecilia</strong>, la madre —amor,
            raíces y sabiduría— y de <strong className="font-semibold text-monstera">Diana</strong>, la hermana —inspiración, conexión y crecimiento—. Dos historias que
            florecen juntas.
          </p>
          <p className="mt-4">
            Nuestro símbolo une hojas de Monstera y Filodendro Pink. Se entrelazan para crear un solo elemento: la unión entre la naturaleza, la familia y cada hogar
            que confía en nosotros.
          </p>
        </SectionHeading>
        <div className="relative mx-auto aspect-square w-[88%] max-w-[520px] sm:w-full">
          <img src="/brand/pattern-main.webp" alt="" className="absolute inset-0 size-full rounded-full object-cover" />
          <div className="absolute inset-[14%] flex items-center justify-center rounded-full bg-marfil shadow-2xl">
            <img src="/brand/emblem.png" alt="Emblema Celidia's" className="w-[68%]" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-monstera py-16 text-marfil md:py-24">
        <img src="/brand/pattern-lines.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-24 -top-16 w-[560px] rotate-12 opacity-[0.07] mix-blend-screen" style={{ maskImage: "radial-gradient(closest-side, black 45%, transparent)" }} />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-4xl text-blush md:text-5xl">Dos historias que florecen juntas</p>
            <p className="eyebrow mt-3 text-salvia">Las personas detrás del nombre</p>
            <h2 className="mt-4 font-serif text-[34px] leading-tight sm:text-4xl md:text-[52px]">Tres mujeres, una sola raíz</h2>
            <span className="mx-auto mt-6 block h-px w-14 bg-blush" />
            <p className="mt-6 text-[15px] leading-8 text-marfil/70">
              Celidia&rsquo;s no es solo un nombre: es una familia. Cada una de ellas vive en nuestra marca y en el símbolo que nos representa.
            </p>
          </div>

          <div className="mt-12 grid gap-14 sm:mt-16 md:grid-cols-3 md:gap-8">
            {people.map((p, i) => (
              <article key={p.name} className={`text-center ${i === 1 ? 'md:mt-16' : ''}`}>
                <div className="relative mx-auto size-52 sm:size-60 md:size-48 lg:size-64">
                  <div className="absolute -inset-3 rounded-full border border-blush/40" />
                  <div className="size-full overflow-hidden rounded-full border-[6px] border-marfil/90 shadow-2xl">
                    <img src={p.photo} alt={`${p.name}, ${p.role.toLowerCase()}`} className="size-full scale-[1.14] object-cover" />
                  </div>
                  <span className="absolute -bottom-3 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-marfil text-empolvado shadow-lg">
                    <SproutIcon className="size-5" />
                  </span>
                </div>
                <h3 className="mt-10 font-serif text-4xl tracking-[0.04em]">{p.name}</h3>
                <p className="mt-1 font-serif text-lg italic text-blush">{p.role}</p>
                <p className="eyebrow mt-4 text-salvia">{p.words}</p>
                <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-marfil/75">{p.why}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-[24px] border border-marfil/15 bg-marfil/5 p-6 text-center sm:mt-20 sm:p-8 md:p-12">
            <p className="eyebrow text-blush">Por qué lo hacemos</p>
            <p className="mt-5 font-serif text-xl leading-relaxed sm:text-2xl md:text-3xl">
              Porque creemos que una planta une personas, llena hogares de vida y crea historias que duran generaciones.
            </p>
            <p className="mt-5 text-sm leading-7 text-marfil/70">
              Cecilia y Diana son las raíces; Sara, el futuro. Por eso cada planta que sale de nuestro vivero lleva algo de esta familia: cultivamos confianza, amor y raíces para que tu hogar también florezca.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lino/70 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHeading align="center" eyebrow="Los símbolos" title="Lo que vive en nuestro logo" />
          <div className="mt-12 grid gap-12 sm:mt-16 sm:gap-14 md:grid-cols-3">
            {symbols.map((s) => (
              <div key={s.name} className="text-center">
                <div className="mx-auto size-44 overflow-hidden rounded-full sm:size-56 md:size-44 lg:size-56 border-[8px] border-marfil shadow-xl">
                  <img src={s.image} alt="" className="size-full scale-110 object-cover" />
                </div>
                <h3 className="mt-8 font-serif text-3xl">{s.name}</h3>
                <p className="eyebrow mt-3 text-empolvado">{s.words}</p>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-monstera/65">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-monstera/10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {pillars.map(({ icon: Icon, title }, i) => (
            <div key={title} className={`flex flex-col items-center px-3 py-9 text-center sm:px-4 sm:py-12 ${i ? 'lg:border-l lg:border-monstera/10' : ''}`}>
              <Icon className="size-8 text-empolvado" strokeWidth={1} />
              <p className="eyebrow mt-5 leading-5 text-monstera">{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <p className="font-script text-[40px] leading-tight text-empolvado sm:text-5xl md:text-6xl">Plantas · Personas · Hogares · Más felices</p>
        <p className="mt-8 text-[15px] leading-8 text-monstera/70">Somos una familia que cultiva más que plantas: cultivamos confianza, amor y raíces.</p>
        <Link href="/tienda" className="btn-primary mt-10">
          Visitar la tienda <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  )
}
