import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { isAdmin } from '@/lib/auth'
import { isReadOnlyError, READ_ONLY_MESSAGE, UPLOAD_DIR } from '@/lib/db'

const MAX_BYTES = 8 * 1024 * 1024
const EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/gif': '.gif',
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: 'No autorizado' }, { status: 401 })

  const form = await req.formData()
  const files = form.getAll('files').filter((f): f is File => f instanceof File)
  if (!files.length) return Response.json({ error: 'No se recibieron imágenes' }, { status: 400 })

  for (const file of files) {
    if (!EXT[file.type]) return Response.json({ error: `Formato no permitido: ${file.name}` }, { status: 400 })
    if (file.size > MAX_BYTES) return Response.json({ error: `${file.name} supera 8 MB` }, { status: 400 })
  }

  const urls: string[] = []
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    for (const file of files) {
      const name = `${randomUUID()}${EXT[file.type]}`
      // The ignore comment keeps Turbopack from tracing the whole project for this runtime path.
      await fs.writeFile(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()))
      urls.push(`/uploads/${name}`)
    }
  } catch (err) {
    if (isReadOnlyError(err)) return Response.json({ error: READ_ONLY_MESSAGE }, { status: 503 })
    throw err
  }
  return Response.json({ urls })
}
