'use client'

import { useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

/** Sidebar filters: always visible on desktop, collapsed behind a toggle on smaller screens. */
export function MobileFilters({ active, children }: { active: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <aside className="lg:sticky lg:top-48 lg:self-start">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-monstera/15 bg-white/50 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] lg:hidden"
      >
        <span className="flex items-center gap-2.5">
          <SlidersHorizontal className="size-4 text-empolvado" strokeWidth={1.5} />
          Buscar y filtrar
          {active > 0 && <span className="flex size-5 items-center justify-center rounded-full bg-empolvado text-[9px] text-marfil">{active}</span>}
        </span>
        <ChevronDown className={`size-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${open ? 'mt-6 block animate-in fade-in slide-in-from-top-1' : 'hidden'} space-y-8 lg:mt-0 lg:block lg:space-y-10`}>{children}</div>
    </aside>
  )
}
