import Link from 'next/link'
import { Camera, Mail, MessageCircle } from 'lucide-react'
import { store, whatsappUrl } from '@/lib/config'
import { SproutIcon } from './brand'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-monstera text-marfil">
      <img src="/brand/pattern-lines.webp" alt="" aria-hidden="true" className="pointer-events-none absolute -right-20 -top-10 w-[520px] rotate-12 opacity-[0.07] mix-blend-screen" style={{ maskImage: "radial-gradient(closest-side, black 45%, transparent)" }} />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-8 pt-14 md:px-10 md:pb-10 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-14">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-marfil">
                <img src="/brand/emblem-sm.png" alt="" className="h-14 w-auto" />
              </div>
              <div>
                <p className="font-serif text-3xl tracking-[0.06em]">CELIDIA&rsquo;S</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.42em] text-salvia">Plant Nursery</p>
              </div>
            </div>
            <p className="mt-6 font-script text-[34px] leading-tight text-blush sm:mt-8 sm:text-4xl">{store.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-marfil/60">
              Somos una familia que cultiva más que plantas: cultivamos confianza, amor y raíces.
            </p>
          </div>

          <div>
            <p className="eyebrow text-salvia">Tienda</p>
            <ul className="mt-6 space-y-3 text-sm text-marfil/75">
              <li><Link href="/tienda?categoria=plantas-de-interior" className="hover:text-blush">Plantas de interior</Link></li>
              <li><Link href="/tienda?categoria=coleccion-pink" className="hover:text-blush">Colección Pink</Link></li>
              <li><Link href="/tienda?categoria=regalos" className="hover:text-blush">Regalos</Link></li>
              <li><Link href="/tienda?categoria=macetas-y-accesorios" className="hover:text-blush">Macetas y accesorios</Link></li>
              <li><Link href="/tienda" className="hover:text-blush">Ver todo</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-salvia">Celidia&rsquo;s</p>
            <ul className="mt-6 space-y-3 text-sm text-marfil/75">
              <li><Link href="/nosotros" className="hover:text-blush">Nuestra historia</Link></li>
              <li><Link href="/favoritos" className="hover:text-blush">Favoritos</Link></li>
              <li><Link href="/carrito" className="hover:text-blush">Carrito</Link></li>
              <li><a href={whatsappUrl('Hola, necesito asesoría para elegir una planta.')} target="_blank" rel="noreferrer" className="hover:text-blush">Asesoría personalizada</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <p className="eyebrow text-salvia">Atención personalizada</p>
            <p className="mt-6 text-sm leading-7 text-marfil/70">¿No sabes qué planta elegir para tu espacio? Te asesoramos con gusto, uno a uno.</p>
            <a href={whatsappUrl('Hola, quiero asesoría para elegir una planta.')} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 border-b border-blush pb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-blush">Escríbenos por WhatsApp</a>
            <div className="mt-8 flex gap-3">
              <a href={store.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-full border border-marfil/20 transition hover:border-blush hover:text-blush"><Camera className="size-4" strokeWidth={1.4} /></a>
              <a href={whatsappUrl("Hola Celidia's")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex size-10 items-center justify-center rounded-full border border-marfil/20 transition hover:border-blush hover:text-blush"><MessageCircle className="size-4" strokeWidth={1.4} /></a>
              <a href={`mailto:${store.email}`} aria-label="Correo" className="flex size-10 items-center justify-center rounded-full border border-marfil/20 transition hover:border-blush hover:text-blush"><Mail className="size-4" strokeWidth={1.4} /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-marfil/15 pt-8 text-center text-[9px] uppercase tracking-[0.2em] text-marfil/45 sm:text-[10px] sm:tracking-[0.25em] md:mt-20 md:flex-row">
          <span>© {new Date().getFullYear()} Celidia&rsquo;s · Vivero boutique botánica</span>
          <span className="flex items-center gap-3"><SproutIcon className="size-4 text-blush" /> Plantas que cuentan historias</span>
        </div>
      </div>
    </footer>
  )
}
