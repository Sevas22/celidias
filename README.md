# Celidia's · Ecommerce

Tienda en línea de **Celidia's Plant Nursery** — *Naturaleza que conecta historias*.
Construida con Next.js 16, React 19 y Tailwind CSS 4 sobre la identidad oficial de la marca (paleta, tipografías Playfair Display / Montserrat / Allura, logotipo, patrón botánico y fotografías del brand board).

## Arrancar

```bash
npm install
cp .env.example .env.local   # y edita los valores
npm run dev
```

- Tienda: http://localhost:3000
- Panel administrativo: http://localhost:3000/admin (contraseña en `ADMIN_PASSWORD`). En `npm run dev` funciona sin configurar nada; en producción `ADMIN_PASSWORD` y `ADMIN_SECRET` son obligatorios o el panel queda deshabilitado.

## Qué incluye

**Tienda**
- Inicio con hero, colecciones, destacados, historia de marca y experiencia de regalo
- Catálogo `/tienda` con categorías, búsqueda, filtros (luz, cuidado) y orden
- Ficha de producto con galería, cuidados, stock en vivo y productos relacionados
- Carrito lateral + página de carrito, favoritos, barra de envío gratis
- Checkout con mensaje de regalo y método de pago; página de confirmación del pedido
- Página "Nuestra historia" con el concepto del logo

**Panel `/admin`**
- Resumen: ventas, pedidos pendientes, productos activos, stock bajo
- Productos: crear, editar, ocultar/publicar, destacar, eliminar; subida de varias imágenes (arrastrar y soltar) y orden de galería
- Categorías: crear, editar imagen/descripción/orden, eliminar
- Pedidos: listado por estado, detalle con datos del cliente, cambio de estado (al cancelar se devuelve el stock), contacto por WhatsApp

## Datos

Los productos, pedidos e imágenes subidas se guardan en `data/` (`store.json` y `data/uploads/`).
La primera vez se crea con el catálogo inicial de `lib/seed.ts`. Para reiniciar la tienda, borra la carpeta `data/`.

> Este almacenamiento en archivo funciona en un servidor propio o VPS. En hosting serverless (p. ej. Vercel) el disco es de solo lectura: la tienda se muestra con el catálogo inicial, pero no se pueden crear productos, subir imágenes ni recibir pedidos (se muestra un aviso en lugar de un error). Para habilitarlo allí hay que reemplazar `lib/db.ts` por una base de datos (Postgres/Supabase) y las imágenes por un almacenamiento de objetos (Vercel Blob, Supabase Storage…).
>
> Para probar ese modo en local: `STORE_READ_ONLY=1 npm run start`.

## Pendiente antes de producción

- Pasarela de pago real (Mercado Pago, Stripe, Wompi…). Hoy el pedido queda "pendiente" y el pago se coordina por transferencia, link o contra entrega.
- Envío de correos de confirmación.
- Cambiar `ADMIN_PASSWORD` y `ADMIN_SECRET` y el número de WhatsApp en `.env.local`. La moneda es pesos colombianos (COP); se puede cambiar con `NEXT_PUBLIC_CURRENCY`.
- Sustituir las imágenes de producto de baja resolución (recortadas del brand board) por fotografía real desde el panel.
