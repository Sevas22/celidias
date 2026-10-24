'use client'

import { useActionState } from 'react'
import { Lock } from 'lucide-react'
import { login } from '../actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-monstera lg:block">
        <img src="/brand/pattern-main.webp" alt="" className="absolute inset-0 size-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-monstera via-monstera/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-14 text-marfil">
          <p className="font-script text-5xl text-blush">Naturaleza que conecta historias</p>
          <p className="eyebrow mt-4 text-marfil/70">Panel administrativo</p>
        </div>
      </div>
      <div className="paper flex items-center justify-center px-6 py-16">
        <form action={action} className="w-full max-w-sm">
          <img src="/brand/logo-full-sm.png" alt="Celidia's Plant Nursery" className="mx-auto w-56" />
          <h1 className="mt-10 text-center font-serif text-3xl">Panel de administración</h1>
          <p className="mt-2 text-center text-sm text-monstera/60">Ingresa para administrar la tienda.</p>
          <label htmlFor="password" className="field-label mt-10">Contraseña</label>
          <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="field" />
          {state?.error && <p role="alert" className="mt-3 text-sm text-empolvado-deep">{state.error}</p>}
          <button disabled={pending} className="btn-dark mt-6 w-full py-4">
            <Lock className="size-3.5" /> {pending ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}
