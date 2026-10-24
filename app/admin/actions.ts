'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { checkPassword, endSession, requireAdmin, startSession } from '@/lib/auth'
import {
  deleteCategory,
  deleteProduct,
  saveCategory,
  saveProduct,
  setProductFlags,
  updateOrderStatus,
} from '@/lib/db'
import type { Difficulty, Light, OrderStatus, Water } from '@/lib/types'

export async function login(_prev: { error?: string } | undefined, form: FormData) {
  if (!checkPassword(String(form.get('password') ?? ''))) return { error: 'Contraseña incorrecta' }
  await startSession()
  redirect('/admin')
}

export async function logout() {
  await endSession()
  redirect('/admin/login')
}

function refresh() {
  revalidatePath('/', 'layout')
}

const LIGHTS: Light[] = ['baja', 'indirecta', 'brillante']
const WATERS: Water[] = ['bajo', 'moderado', 'frecuente']
const DIFFS: Difficulty[] = ['facil', 'media', 'experto']
const pick = <T extends string>(value: unknown, allowed: T[], fallback: T) => (allowed.includes(value as T) ? (value as T) : fallback)

export async function saveProductAction(_prev: { error?: string } | undefined, form: FormData) {
  await requireAdmin()
  const s = (k: string) => String(form.get(k) ?? '').trim()
  const n = (k: string) => Number(s(k).replace(/[^0-9]/g, ''))

  let images: string[] = []
  try {
    images = (JSON.parse(s('images') || '[]') as unknown[]).map(String).filter((u) => u.startsWith('/') || u.startsWith('https://'))
  } catch {}

  if (!s('name')) return { error: 'El nombre es obligatorio' }
  if (!s('categoryId')) return { error: 'Selecciona una categoría' }
  if (!(n('price') > 0)) return { error: 'Ingresa un precio válido' }

  const compareAt = n('compareAtPrice')
  try {
    await saveProduct({
      id: s('id') || undefined,
      slug: s('slug') || undefined,
      name: s('name'),
      scientificName: s('scientificName') || undefined,
      categoryId: s('categoryId'),
      price: n('price'),
      compareAtPrice: compareAt > 0 ? compareAt : undefined,
      stock: Math.max(0, Math.floor(n('stock') || 0)),
      shortDescription: s('shortDescription'),
      description: s('description'),
      images,
      light: pick(s('light'), LIGHTS, 'indirecta'),
      water: pick(s('water'), WATERS, 'moderado'),
      difficulty: pick(s('difficulty'), DIFFS, 'facil'),
      size: s('size') || undefined,
      petFriendly: form.get('petFriendly') === 'on',
      featured: form.get('featured') === 'on',
      active: form.get('active') === 'on',
      tags: s('tags').split(',').map((t) => t.trim()).filter(Boolean),
    })
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'No se pudo guardar' }
  }
  refresh()
  redirect('/admin/productos?guardado=1')
}

export async function deleteProductAction(id: string) {
  await requireAdmin()
  await deleteProduct(id)
  refresh()
}

export async function toggleProductAction(id: string, flags: { active?: boolean; featured?: boolean }) {
  await requireAdmin()
  await setProductFlags(id, flags)
  refresh()
}

export async function saveCategoryAction(_prev: { error?: string; ok?: boolean } | undefined, form: FormData) {
  await requireAdmin()
  const s = (k: string) => String(form.get(k) ?? '').trim()
  if (!s('name')) return { error: 'El nombre es obligatorio' }
  try {
    await saveCategory({
      id: s('id') || undefined,
      name: s('name'),
      description: s('description'),
      image: s('image') || '/brand/swatch-salvia.webp',
      order: Number(s('order')) || 99,
    })
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'No se pudo guardar' }
  }
  refresh()
  return { ok: true }
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin()
  try {
    await deleteCategory(id)
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'No se pudo eliminar' }
  }
  refresh()
  return {}
}

export async function updateOrderStatusAction(id: string, status: OrderStatus) {
  await requireAdmin()
  await updateOrderStatus(id, status)
  refresh()
}
