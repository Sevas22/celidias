import { PageHeader } from '@/components/admin/ui'
import { ProductForm } from '@/components/admin/product-form'
import { getCategories } from '@/lib/db'

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <>
      <PageHeader title="Nuevo producto" subtitle="Sube fotos, define el precio y publícalo en la tienda." />
      <ProductForm categories={categories} />
    </>
  )
}
