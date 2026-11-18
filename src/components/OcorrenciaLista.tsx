import type { Ocorrencia } from '../types/ocorrencia'
import { OcorrenciaCard } from './OcorrenciaCard'

interface OcorrenciaListaProps {
  ocorrencias: Ocorrencia[]
}

// Grade responsiva de cards: 1 coluna no celular, 2 no tablet, 3 no desktop
export function OcorrenciaLista({ ocorrencias }: OcorrenciaListaProps) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {ocorrencias.map((ocorrencia) => (
        <li key={ocorrencia.id}>
          <OcorrenciaCard ocorrencia={ocorrencia} />
        </li>
      ))}
    </ul>
  )
}
