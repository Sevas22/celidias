import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/admin/ui'
import { ProductForm } from '@/components/admin/product-form'
import { getCategories, getProductById } from '@/lib/db'
import { store } from '@/lib/config'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([getProductById(id), getCategories()])
  if (!product) notFound()
  return (
    <>
      <PageHeader title={product.name} subtitle={`Editando · actualizado ${new Date(product.updatedAt).toLocaleDateString(store.locale, { dateStyle: 'long' })}`} />
      <ProductForm product={product} categories={categories} />
    </>
  )
}
