'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { Eye, EyeOff, Pencil, Star, Trash } from 'lucide-react'
import { deleteProductAction, toggleProductAction } from '@/app/admin/actions'

export function ProductRowActions({ id, slug, name, active, featured }: { id: string; slug: string; name: string; active: boolean; featured: boolean }) {
  const [pending, start] = useTransition()
  const btn = 'rounded-lg p-2 text-monstera/60 transition hover:bg-monstera/5 hover:text-monstera disabled:opacity-40'
  return (
    <div className="flex items-center justify-end gap-1">
      <button disabled={pending} title={featured ? 'Quitar de destacados' : 'Destacar'} className={btn} onClick={() => start(() => toggleProductAction(id, { featured: !featured }))}>
        <Star className={`size-4 ${featured ? 'fill-empolvado text-empolvado' : ''}`} />
      </button>
      <button disabled={pending} title={active ? 'Ocultar de la tienda' : 'Publicar'} className={btn} onClick={() => start(() => toggleProductAction(id, { active: !active }))}>
        {active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </button>
      <Link href={`/admin/productos/${id}`} title="Editar" className={btn}><Pencil className="size-4" /></Link>
      {active && <Link href={`/producto/${slug}`} target="_blank" title="Ver en tienda" className={`${btn} text-xs`}>↗</Link>}
      <button
        disabled={pending}
        title="Eliminar"
        className={`${btn} hover:text-empolvado-deep`}
        onClick={() => confirm(`¿Eliminar “${name}”? Esta acción no se puede deshacer.`) && start(() => deleteProductAction(id))}
      >
        <Trash className="size-4" />
      </button>
    </div>
  )
}
