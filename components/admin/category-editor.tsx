'use client'

import { startTransition, useActionState, useState, useTransition } from 'react'
import { Plus, Trash } from 'lucide-react'
import { deleteCategoryAction, saveCategoryAction } from '@/app/admin/actions'
import type { Category } from '@/lib/types'
import { Card } from './ui'
import { ImageManager } from './image-manager'

export function CategoryEditor({ category, productCount = 0 }: { category?: Category; productCount?: number }) {
  const [state, action, pending] = useActionState(saveCategoryAction, undefined)
  const [deleting, startDelete] = useTransition()
  const [deleteError, setDeleteError] = useState('')
  const [open, setOpen] = useState(!!category)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-monstera/20 text-monstera/55 transition hover:border-empolvado hover:text-empolvado">
        <Plus className="size-6" strokeWidth={1.4} />
        <span className="text-sm">Nueva categoría</span>
      </button>
    )
  }

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          startTransition(() => action(data))
        }}
        className="grid gap-4 sm:grid-cols-[140px_1fr]"
      >
        {category && <input type="hidden" name="id" value={category.id} />}
        <ImageManager initial={category?.image ? [category.image] : []} name="image" single />
        <div className="space-y-4">
          <div>
            <label className="field-label">Nombre</label>
            <input name="name" required defaultValue={category?.name} className="field" />
          </div>
          <div>
            <label className="field-label">Descripción</label>
            <textarea name="description" rows={2} defaultValue={category?.description} className="field resize-none" />
          </div>
          <div className="flex items-end gap-3">
            <div className="w-24">
              <label className="field-label">Orden</label>
              <input name="order" type="number" defaultValue={category?.order ?? 99} className="field" />
            </div>
            <p className="pb-3 text-xs text-monstera/50">{category ? `${productCount} productos` : 'Nueva'}</p>
          </div>
          {(state?.error || deleteError) && <p className="text-sm text-empolvado-deep">{state?.error || deleteError}</p>}
          {state?.ok && <p className="text-sm text-monstera">Guardado ✓</p>}
          <div className="flex gap-2">
            <button disabled={pending} className="btn-dark flex-1 px-4">{pending ? 'Guardando…' : 'Guardar'}</button>
            {category && (
              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  if (!confirm(`¿Eliminar la categoría “${category.name}”?`)) return
                  startDelete(async () => {
                    const res = await deleteCategoryAction(category.id)
                    setDeleteError(res?.error ?? '')
                  })
                }}
                className="rounded-full border border-monstera/15 p-3 text-monstera/60 hover:border-empolvado hover:text-empolvado"
                aria-label="Eliminar categoría"
              >
                <Trash className="size-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </Card>
  )
}
