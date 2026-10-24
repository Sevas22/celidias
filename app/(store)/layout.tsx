import { CartDrawer } from '@/components/store/cart-drawer'
import { CartProvider } from '@/components/store/cart-provider'
import { Footer } from '@/components/store/footer'
import { Header } from '@/components/store/header'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
