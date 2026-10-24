import { requireAdmin } from '@/lib/auth'
import { AdminNav } from '@/components/admin/admin-nav'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Administración', robots: { index: false } }

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="min-h-screen bg-[#F4EEE4] lg:grid lg:grid-cols-[260px_1fr]">
      <AdminNav />
      {/* Bottom padding on small screens clears the fixed tab bar. */}
      <div className="min-w-0 px-4 pb-28 pt-6 sm:px-6 md:px-10 md:pt-10 lg:pb-10">{children}</div>
    </div>
  )
}
