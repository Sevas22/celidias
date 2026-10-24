import { promises as fs } from 'fs'
import path from 'path'
import { UPLOAD_DIR } from '@/lib/db'

const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
}

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const ext = path.extname(name).toLowerCase()
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/i.test(name) || !TYPES[ext]) return new Response('Not found', { status: 404 })
  try {
    const file = await fs.readFile(path.join(UPLOAD_DIR, name))
    return new Response(file, {
      headers: { 'Content-Type': TYPES[ext], 'Cache-Control': 'public, max-age=31536000, immutable' },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
