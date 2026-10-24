'use client'

import Link from 'next/link'
import { startTransition, useActionState } from 'react'
import { saveProductAction } from '@/app/admin/actions'
import { difficultyLabel, lightLabel, store, waterLabel } from '@/lib/config'
import type { Category, Product } from '@/lib/types'
import { Card } from './ui'
import { ImageManager } from './image-manager'

function Toggle({ name, label, hint, defaultChecked }: { name: string; label: string; hint: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-3">
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-monstera/55">{hint}</span>
      </span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="relative mt-1 h-6 w-11 shrink-0 rounded-full bg-monstera/15 transition peer-checked:bg-empolvado after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5 peer-focus-visible:ring-4 peer-focus-visible:ring-blush/50" />
    </label>
  )
}

export function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const [state, action, pending] = useActionState(saveProductAction, undefined)
  const p = product

  return (
    <form
      // Submit manually so React does not reset the fields when validation fails.
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        startTransition(() => action(data))
      }}
      className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      {p && <input type="hidden" name="id" value={p.id} />}

      <div className="space-y-6">
        <Card>
          <h2 className="font-serif text-xl">Información</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="name">Nombre del producto *</label>
              <input id="name" name="name" required defaultValue={p?.name} placeholder="Monstera Deliciosa" className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="scientificName">Nombre científico</label>
              <input id="scientificName" name="scientificName" defaultValue={p?.scientificName} placeholder="Monstera deliciosa" className="field italic" />
            </div>
            <div>
              <label className="field-label" htmlFor="slug">URL (opcional)</label>
              <input id="slug" name="slug" defaultValue={p?.slug} placeholder="se genera del nombre" className="field" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="shortDescription">Descripción corta</label>
              <input id="shortDescription" name="shortDescription" defaultValue={p?.shortDescription} maxLength={180} placeholder="Una frase que enamore." className="field" />
            </div>
            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="description">Su historia (descripción completa)</label>
              <textarea id="description" name="description" rows={5} defaultValue={p?.description} className="field resize-y" />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-xl">Imágenes</h2>
          <p className="mt-1 text-xs text-monstera/55">La primera imagen es la principal; la segunda aparece al pasar el cursor en la tienda.</p>
          <div className="mt-5">
            <ImageManager initial={p?.images ?? []} />
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-xl">Cuidados</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="light">Luz</label>
              <select id="light" name="light" defaultValue={p?.light ?? 'indirecta'} className="field">
                {Object.entries(lightLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="water">Riego</label>
              <select id="water" name="water" defaultValue={p?.water ?? 'moderado'} className="field">
                {Object.entries(waterLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="difficulty">Nivel de cuidado</label>
              <select id="difficulty" name="difficulty" defaultValue={p?.difficulty ?? 'facil'} className="field">
                {Object.entries(difficultyLabel).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="size">Tamaño</label>
              <input id="size" name="size" defaultValue={p?.size} placeholder="40 – 50 cm" className="field" />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="font-serif text-xl">Precio e inventario</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="price">Precio ({store.currency}) *</label>
              <input id="price" name="price" required inputMode="numeric" defaultValue={p?.price} placeholder="189000" className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="compareAtPrice">Precio anterior</label>
              <input id="compareAtPrice" name="compareAtPrice" inputMode="numeric" defaultValue={p?.compareAtPrice} placeholder="Opcional" className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="stock">Unidades en stock</label>
              <input id="stock" name="stock" type="number" min={0} defaultValue={p?.stock ?? 0} className="field" />
            </div>
            <div>
              <label className="field-label" htmlFor="categoryId">Categoría *</label>
              <select id="categoryId" name="categoryId" required defaultValue={p?.categoryId ?? categories[0]?.id} className="field">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-xl">Visibilidad</h2>
          <div className="mt-3 divide-y divide-monstera/10">
            <Toggle name="active" label="Publicado" hint="Visible en la tienda" defaultChecked={p?.active ?? true} />
            <Toggle name="featured" label="Destacado" hint="Aparece en la página de inicio" defaultChecked={p?.featured ?? false} />
            <Toggle name="petFriendly" label="Apta para mascotas" hint="Se muestra como característica" defaultChecked={p?.petFriendly ?? false} />
          </div>
          <div className="mt-4">
            <label className="field-label" htmlFor="tags">Etiquetas de búsqueda</label>
            <input id="tags" name="tags" defaultValue={p?.tags.join(', ')} placeholder="regalo, oficina, tropical" className="field" />
          </div>
        </Card>

        <div className="sticky bottom-24 z-30 rounded-2xl bg-marfil/95 p-3 shadow-xl ring-1 ring-monstera/10 backdrop-blur sm:p-4 lg:bottom-4">
          {state?.error && <p role="alert" className="mb-3 text-sm text-empolvado-deep">{state.error}</p>}
          <div className="flex gap-3">
            <Link href="/admin/productos" className="btn-ghost flex-1 whitespace-nowrap px-4">Cancelar</Link>
            <button disabled={pending} className="btn-primary flex-1 whitespace-nowrap px-4">{pending ? 'Guardando…' : p ? 'Guardar cambios' : 'Crear producto'}</button>
          </div>
        </div>
      </div>
    </form>
  )
}
