import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="paper flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <img src="/brand/emblem-sm.png" alt="" className="w-24" />
      <p className="mt-8 font-script text-5xl text-empolvado">Esta hoja se perdió</p>
      <h1 className="mt-2 font-serif text-4xl">No encontramos esta página</h1>
      <Link href="/tienda" className="btn-primary mt-10">Volver a la tienda</Link>
    </section>
  )
}
