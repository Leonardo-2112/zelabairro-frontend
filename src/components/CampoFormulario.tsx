import type { ReactNode } from 'react'

interface CampoFormularioProps {
  id: string
  rotulo: string
  erro?: string
  dica?: string
  children: ReactNode
}

// Moldura de qualquer campo: <label> ligado ao campo, dica e mensagem de erro.
// O campo (input, select, textarea) vem como children e usa aria-describedby={`${id}-ajuda`}.
export function CampoFormulario({ id, rotulo, erro, dica, children }: CampoFormularioProps) {
  return (
    <div>
      <label htmlFor={id} className="rotulo">
        {rotulo}
      </label>
      {children}
      <div id={`${id}-ajuda`}>
        {dica && !erro && <p className="mt-1 text-sm text-slate-500">{dica}</p>}
        {erro && (
          <p className="erro-campo" role="alert">
            {erro}
          </p>
        )}
      </div>
    </div>
  )
}
