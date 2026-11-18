import type { ReactNode } from 'react'

interface CabecalhoPaginaProps {
  titulo: string
  subtitulo?: string
  children?: ReactNode
}

// Faixa de título reaproveitada no topo das páginas internas
export function CabecalhoPagina({ titulo, subtitulo, children }: CabecalhoPaginaProps) {
  return (
    <section className="border-b border-marca-100 bg-marca-50">
      <div className="container-pagina py-10">
        <h1 className="titulo-pagina">{titulo}</h1>
        {subtitulo && <p className="mt-3 max-w-3xl text-lg text-slate-700">{subtitulo}</p>}
        {children}
      </div>
    </section>
  )
}
