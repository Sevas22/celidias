import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE = 'celidias_admin'
const MAX_AGE = 60 * 60 * 12

const isProd = process.env.NODE_ENV === 'production'

// Dev-only fallbacks. In production both env vars are mandatory: the repo is public,
// so a default password or signing secret would let anyone into the admin.
function env(name: 'ADMIN_SECRET' | 'ADMIN_PASSWORD', devFallback: string) {
  const value = process.env[name]
  if (value) return value
  if (isProd) {
    console.error(`[auth] Falta la variable de entorno ${name}; el panel /admin queda deshabilitado.`)
    return null
  }
  return devFallback
}

function sign(payload: string) {
  const secret = env('ADMIN_SECRET', 'dev-secret-solo-local')
  return secret ? createHmac('sha256', secret).update(payload).digest('base64url') : null
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function checkPassword(password: string) {
  const expected = env('ADMIN_PASSWORD', 'celidias2026')
  return expected !== null && safeEqual(password, expected)
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000)
  const sig = sign(exp)
  if (!sig) throw new Error('ADMIN_SECRET no está configurado')
  const jar = await cookies()
  jar.set(COOKIE, `${exp}.${sig}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
}

export async function endSession() {
  ;(await cookies()).delete(COOKIE)
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value
  if (!value) return false
  const [exp, sig] = value.split('.')
  const expected = exp ? sign(exp) : null
  if (!sig || !expected || !safeEqual(sig, expected)) return false
  return Number(exp) > Date.now()
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login')
}
