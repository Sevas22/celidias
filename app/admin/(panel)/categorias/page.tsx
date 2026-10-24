import { PageHeader } from '@/components/admin/ui'
import { CategoryEditor } from '@/components/admin/category-editor'
import { getCategories, getProducts } from '@/lib/db'

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts({ includeInactive: true })])
  const counts = Object.fromEntries(categories.map((c) => [c.id, products.filter((p) => p.categoryId === c.id).length]))
  return (
    <>
      <PageHeader title="Categorías" subtitle="Organiza las colecciones que se muestran en la tienda." />
      <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        {categories.map((c) => (
          <CategoryEditor key={c.id + c.slug + c.image} category={c} productCount={counts[c.id]} />
        ))}
        <CategoryEditor key={`new-${categories.length}`} />
      </div>
    </>
  )
}
