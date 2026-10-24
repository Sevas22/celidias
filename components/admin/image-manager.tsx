'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, X } from 'lucide-react'

export function ImageManager({ initial, name = 'images', single = false }: { initial: string[]; name?: string; single?: boolean }) {
  const [images, setImages] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  async function upload(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!list.length) return
    setBusy(true)
    setError('')
    try {
      const body = new FormData()
      for (const f of single ? list.slice(0, 1) : list) body.append('files', f)
      const res = await fetch('/api/admin/upload', { method: 'POST', body })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al subir')
      setImages((cur) => (single ? data.urls : [...cur, ...data.urls]))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  const move = (i: number, dir: -1 | 1) =>
    setImages((cur) => {
      const next = [...cur]
      const j = i + dir
      if (j < 0 || j >= next.length) return cur
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  return (
    <div>
      <input type="hidden" name={name} value={single ? images[0] ?? '' : JSON.stringify(images)} />
      <div className={`grid gap-3 ${single ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {images.map((src, i) => (
          <div key={src + i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-lino ring-1 ring-monstera/10">
            <img src={src} alt="" className="size-full object-cover" />
            {!single && i === 0 && <span className="absolute left-2 top-2 rounded-full bg-monstera px-2 py-0.5 text-[10px] text-marfil">Principal</span>}
            <div className="absolute inset-x-2 bottom-2 flex justify-between opacity-0 transition group-hover:opacity-100 max-md:opacity-100">
              {!single && (
                <span className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} className="rounded-full bg-marfil/90 p-1.5" aria-label="Mover a la izquierda"><ArrowLeft className="size-3.5" /></button>
                  <button type="button" onClick={() => move(i, 1)} className="rounded-full bg-marfil/90 p-1.5" aria-label="Mover a la derecha"><ArrowRight className="size-3.5" /></button>
                </span>
              )}
              <button type="button" onClick={() => setImages((cur) => cur.filter((_, k) => k !== i))} className="ml-auto rounded-full bg-marfil/90 p-1.5 text-empolvado-deep" aria-label="Quitar imagen">
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        {(!single || images.length === 0) && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files) }}
            className={`flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center text-xs transition ${dragging ? 'border-empolvado bg-blush/30' : 'border-monstera/20 text-monstera/55 hover:border-empolvado hover:text-empolvado'}`}
          >
            {busy ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" strokeWidth={1.4} />}
            <span className="px-3">{busy ? 'Subiendo…' : 'Arrastra o haz clic para subir'}</span>
            <span className="text-[10px] text-monstera/40">JPG, PNG, WEBP · máx. 8 MB</span>
          </button>
        )}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={!single} hidden onChange={(e) => e.target.files && upload(e.target.files)} />
      {error && <p className="mt-2 text-sm text-empolvado-deep">{error}</p>}
    </div>
  )
}
