import type { Metadata, Viewport } from 'next'
import { Allura, Montserrat, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })
const allura = Allura({ subsets: ['latin'], weight: '400', variable: '--font-allura', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: "Celidia's · Vivero boutique botánica",
    template: "%s · Celidia's",
  },
  description: 'Naturaleza que conecta historias. Plantas de interior, colección pink, regalos y macetas para hogares más verdes y felices.',
  icons: {
    icon: [{ url: '/icon-light-32x32.png' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F8F3EB',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable} ${allura.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
