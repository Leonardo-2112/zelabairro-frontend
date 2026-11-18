import type { StatusOcorrencia } from '../types/ocorrencia'
import { textoStatus } from '../utils/formatar'

interface StatusBadgeProps {
  status: StatusOcorrencia
}

// Uma cor para cada status (texto + cor, nunca só cor)
const cores: Record<StatusOcorrencia, string> = {
  ABERTA: 'bg-amber-100 text-amber-900',
  EM_ANDAMENTO: 'bg-sky-100 text-sky-900',
  RESOLVIDA: 'bg-green-100 text-green-900',
  CANCELADA: 'bg-slate-200 text-slate-700',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge ${cores[status]}`}>{textoStatus[status]}</span>
}
