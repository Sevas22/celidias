import type { Category, Product, StoreData } from './types'

const now = new Date().toISOString()

const categories: Category[] = [
  { id: 'cat-interior', slug: 'plantas-de-interior', name: 'Plantas de interior', description: 'Verdes que transforman cada rincón del hogar.', image: '/brand/swatch-monstera.webp', order: 1 },
  { id: 'cat-pink', slug: 'coleccion-pink', name: 'Colección Pink', description: 'Hojas rosadas, delicadas y únicas. Nuestra esencia.', image: '/brand/swatch-blush.webp', order: 2 },
  { id: 'cat-regalos', slug: 'regalos', name: 'Regalos', description: 'Detalles vivos para decir: pensé en ti.', image: '/brand/swatch-empolvado.webp', order: 3 },
  { id: 'cat-macetas', slug: 'macetas-y-accesorios', name: 'Macetas y accesorios', description: 'Piezas que visten a tus plantas.', image: '/brand/swatch-marfil.webp', order: 4 },
]

type SeedProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'active' | 'tags'> & { tags?: string[] }

const products: SeedProduct[] = [
  {
    slug: 'monstera-deliciosa', name: 'Monstera Deliciosa', scientificName: 'Monstera deliciosa', categoryId: 'cat-interior',
    price: 189000, stock: 14, featured: true, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil', size: '60 – 80 cm',
    shortDescription: 'La planta icónica que llena de vida tus espacios con su belleza tropical.',
    description: 'Símbolo de fuerza, protección y crecimiento. Sus hojas perforadas aportan carácter escultórico a cualquier espacio. Se entrega en maceta de cerámica artesanal, lista para lucir en tu hogar.',
    images: ['/brand/photo-monstera.webp', '/brand/prod-monstera-mobile.webp', '/brand/circle-monstera.webp'],
  },
  {
    slug: 'philodendron-pink-princess', name: 'Philodendron Pink Princess', scientificName: 'Philodendron erubescens', categoryId: 'cat-pink',
    price: 289000, compareAtPrice: 329000, stock: 6, featured: true, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'media', size: '40 – 50 cm',
    shortDescription: 'Una pieza viva, única y delicada, con variegados rosados irrepetibles.',
    description: 'Belleza, sensibilidad y esencia distintiva. Cada ejemplar tiene un patrón de color único: ninguna Pink Princess es igual a otra. Ideal para coleccionistas y amantes de lo extraordinario.',
    images: ['/brand/photo-philodendron.webp', '/brand/prod-philo-card.webp', '/brand/circle-pink.webp'],
  },
  {
    slug: 'aglaonema-pink-star', name: 'Aglaonema Pink Star', scientificName: 'Aglaonema commutatum', categoryId: 'cat-pink',
    price: 159000, stock: 18, featured: true, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil', size: '35 – 45 cm',
    shortDescription: 'Hojas rosa y verde salpicadas, la protagonista de nuestro universo botánico.',
    description: 'La planta que inspiró nuestra paleta. Sus hojas pintadas a mano por la naturaleza combinan rosa blush y verde monstera. Tolera bien interiores y es perfecta para quien comienza.',
    images: ['/brand/hero-pink-aglaonema.webp', '/brand/hero-left-leaves.webp', '/brand/circle-union.webp'],
  },
  {
    slug: 'aglaonema-celidias-maceta-firma', name: "Aglaonema en maceta firma Celidia's", scientificName: 'Aglaonema sp.', categoryId: 'cat-regalos',
    price: 249000, stock: 9, featured: true, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil', size: '40 cm',
    shortDescription: 'Aglaonema pink en nuestra maceta de cerámica moteada con el sello de la casa.',
    description: 'Un regalo que permanece. Incluye maceta personalizada Celidia\'s, tarjeta de cuidado y empaque botánico con papel seda.',
    images: ['/brand/prod-maceta.webp', '/brand/packaging-box.webp'],
  },
  {
    slug: 'pothos-marble-queen', name: 'Pothos Marble Queen', scientificName: 'Epipremnum aureum', categoryId: 'cat-interior',
    price: 89000, stock: 25, featured: true, petFriendly: false, light: 'baja', water: 'moderado', difficulty: 'facil', size: '25 – 35 cm',
    shortDescription: 'Verde, luminosa y muy fácil de cuidar. Cae con elegancia.',
    description: 'Variegados crema y verde que iluminan estanterías y repisas. Crece rápido y perdona olvidos: la compañera ideal para hogares ocupados.',
    images: ['/brand/prod-pothos-card.webp'],
  },
  {
    slug: 'sansevieria-laurentii', name: 'Sansevieria Laurentii', scientificName: 'Dracaena trifasciata', categoryId: 'cat-interior',
    price: 129000, stock: 20, featured: false, petFriendly: false, light: 'baja', water: 'bajo', difficulty: 'facil', size: '50 – 60 cm',
    shortDescription: 'Diseño natural y arquitectónico. Purifica el aire de tu hogar.',
    description: 'Hojas verticales con bordes dorados. Resiste poca luz y riegos esporádicos. Una elección segura y sofisticada para dormitorios y oficinas.',
    images: ['/brand/prod-sanse-card.webp'],
  },
  {
    slug: 'monstera-en-maceta-ceramica', name: 'Monstera Deliciosa Mini', scientificName: 'Monstera deliciosa', categoryId: 'cat-interior',
    price: 139000, stock: 12, featured: false, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil', size: '30 – 40 cm',
    shortDescription: 'La versión compacta de nuestra planta insignia, para mesas y escritorios.',
    description: 'Todo el carácter de la Monstera en formato de escritorio. Se entrega en maceta de cerámica blanca.',
    images: ['/brand/prod-monstera-card.webp'],
  },
  {
    slug: 'duo-monstera-pink-princess', name: 'Dúo Monstera & Pink Princess', categoryId: 'cat-pink',
    price: 449000, compareAtPrice: 489000, stock: 4, featured: false, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'media', size: '80 cm / 45 cm',
    shortDescription: 'La unión de fuerza y delicadeza: las dos hojas de nuestro logo.',
    description: 'Una Monstera de piso con maceta de barro y una Philodendron Pink Princess en maceta cerámica. Naturaleza, familia e historias que florecen juntas.',
    images: ['/brand/photo-hero.webp', '/brand/circle-union.webp'],
  },
  {
    slug: 'caja-regalo-celidias', name: "Caja regalo Celidia's", categoryId: 'cat-regalos',
    price: 319000, stock: 10, featured: true, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil',
    shortDescription: 'Planta pink, caja ilustrada, papel seda, tarjeta y cinta personalizada.',
    description: 'Nuestra experiencia completa de regalo: una Aglaonema pink en maceta firma, caja botánica ilustrada, papel seda personalizado, tarjeta de agradecimiento con tu mensaje y cinta verde monstera. Porque eres parte de esta historia.',
    images: ['/brand/packaging.webp', '/brand/packaging-box.webp', '/brand/prod-tarjetas.webp'],
  },
  {
    slug: 'kit-regalo-verde', name: 'Kit Regalo Verde', categoryId: 'cat-regalos',
    price: 199000, stock: 15, featured: false, petFriendly: false, light: 'indirecta', water: 'moderado', difficulty: 'facil',
    shortDescription: 'Sorprende con vida: planta de interior envuelta con moño y tarjeta.',
    description: 'Una planta de interior seleccionada por nuestro equipo, envuelta en papel seda con moño y tarjeta escrita a mano.',
    images: ['/brand/coll-regalos.webp', '/brand/prod-tag-sticker.webp'],
  },
  {
    slug: 'set-papeleria-botanica', name: 'Set de papelería botánica', categoryId: 'cat-macetas',
    price: 49000, stock: 40, featured: false, petFriendly: true, light: 'indirecta', water: 'bajo', difficulty: 'facil',
    shortDescription: 'Tarjetas de cuidado, etiquetas colgantes y stickers con nuestro sello.',
    description: 'Incluye 4 tarjetas de cuidado, 4 etiquetas colgantes con cordón natural y 8 stickers del emblema Celidia\'s. Perfecto para acompañar tus regalos verdes.',
    images: ['/brand/prod-tag-sticker.webp', '/brand/prod-tarjetas.webp'],
  },
  {
    slug: 'cinta-verde-monstera', name: 'Cinta satinada Verde Monstera', categoryId: 'cat-macetas',
    price: 35000, stock: 30, featured: false, petFriendly: true, light: 'indirecta', water: 'bajo', difficulty: 'facil', size: '10 m',
    shortDescription: 'Un cierre con alma natural: cinta satinada con logotipo dorado.',
    description: 'Cinta satinada color verde monstera con el logotipo Celidia\'s impreso en dorado. 10 metros por rollo.',
    images: ['/brand/prod-cinta.webp'],
  },
]

export function seedData(): StoreData {
  return {
    categories,
    products: products.map((p, i) => ({
      ...p,
      id: `prd-${String(i + 1).padStart(3, '0')}`,
      tags: p.tags ?? [],
      active: true,
      createdAt: now,
      updatedAt: now,
    })),
    orders: [],
    orderSeq: 1000,
  }
}
