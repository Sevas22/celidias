'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const options = [
  ['destacados', 'Destacados'],
  ['nuevos', 'Novedades'],
  ['precio-asc', 'Precio: menor a mayor'],
  ['precio-desc', 'Precio: mayor a menor'],
  ['nombre', 'Nombre A–Z'],
]

export function SortSelect({ value }: { value: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  return (
    <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-monstera/60">
      Ordenar
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString())
          if (e.target.value === 'destacados') next.delete('orden')
          else next.set('orden', e.target.value)
          router.push(`${pathname}?${next.toString()}`, { scroll: false })
        }}
        className="cursor-pointer rounded-full border border-monstera/15 bg-transparent px-3 py-2 text-[11px] normal-case tracking-normal text-monstera outline-none focus:border-empolvado"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  )
}
