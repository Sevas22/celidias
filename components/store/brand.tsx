import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`} aria-label="Celidia's, ir al inicio">
      <img src="/brand/emblem-sm.png" alt="" className="h-10 w-auto transition-transform duration-700 group-hover:rotate-[-4deg] sm:h-11 md:h-12" />
      <span className="leading-none">
        <span className="block font-serif text-[20px] tracking-[0.06em] text-monstera sm:text-[22px] md:text-[25px]">CELIDIA&rsquo;S</span>
        <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[7.5px] font-medium uppercase tracking-[0.42em] text-monstera/80">
          <span className="h-px w-3 bg-empolvado/60" />
          Plant Nursery
          <span className="h-px w-3 bg-empolvado/60" />
        </span>
      </span>
    </Link>
  )
}

/** Separador con hoja, usado en la presentación de marca entre bloques. */
export function LeafDivider({ className = '', tone = 'text-empolvado' }: { className?: string; tone?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${tone} ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-current opacity-50" />
      <SproutIcon className="size-5" />
      <span className="h-px w-16 bg-current opacity-50" />
    </div>
  )
}

export function SproutIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 29V15" />
      <path d="M16 17c0-6 4-10 11-11-0.5 7-4.5 11-11 11Z" />
      <path d="M16 20C16 14.5 12.5 11 6 10.5 6.5 16.5 10 20 16 20Z" />
      <path d="M16 17l6-6M16 20l-5-5" opacity=".6" />
    </svg>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  script,
  align = 'left',
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  script?: string
  align?: 'left' | 'center'
  children?: React.ReactNode
}) {
  const center = align === 'center'
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {script && <p className="font-script text-[28px] text-empolvado sm:text-3xl md:text-4xl">{script}</p>}
      {eyebrow && <p className="eyebrow text-empolvado">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-[34px] leading-[1.05] tracking-[-0.01em] text-monstera sm:text-4xl md:text-[52px]">{title}</h2>
      <span className={`mt-6 block h-px w-14 bg-empolvado ${center ? 'mx-auto' : ''}`} />
      {children && <div className="mt-5 text-[15px] leading-7 text-monstera/70 sm:mt-6 sm:leading-8">{children}</div>}
    </div>
  )
}
