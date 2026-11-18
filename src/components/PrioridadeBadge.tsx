import type { Prioridade } from '../types/ocorrencia'
import { textoPrioridade } from '../utils/formatar'

interface PrioridadeBadgeProps {
  prioridade: Prioridade | null
  pontos?: number | null
}

const cores: Record<Prioridade, string> = {
  ALTA: 'bg-red-100 text-red-800',
  MEDIA: 'bg-orange-100 text-orange-900',
  BAIXA: 'bg-emerald-100 text-emerald-900',
}

// Prioridade calculada pela API (RN10). Resolvida/cancelada não tem prioridade (null).
export function PrioridadeBadge({ prioridade, pontos }: PrioridadeBadgeProps) {
  if (!prioridade) return null
  return (
    <span className={`badge ${cores[prioridade]}`}>
      Prioridade {textoPrioridade[prioridade].toLowerCase()}
      {pontos != null && <span className="ml-1 font-normal">({pontos} pts)</span>}
    </span>
  )
}
