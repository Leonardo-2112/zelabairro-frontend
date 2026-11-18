import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface EstadoVazioProps {
  titulo: string
  texto?: string
  children?: ReactNode // ex.: um link de ação
}

// Estado "vazio": a requisição deu certo, mas não há dados para mostrar
export function EstadoVazio({ titulo, texto, children }: EstadoVazioProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <Inbox className="h-10 w-10 text-slate-400" aria-hidden="true" />
      <p className="font-display text-lg font-semibold text-slate-800">{titulo}</p>
      {texto && <p className="max-w-md text-slate-600">{texto}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
