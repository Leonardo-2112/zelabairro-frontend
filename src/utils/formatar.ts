import type { Prioridade, StatusOcorrencia } from '../types/ocorrencia'

// "2026-10-28" -> "28/10/2026" (sem usar Date, para não sofrer com fuso horário)
export function formatarData(data: string | null): string {
  if (!data) return '—'
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

// Textos em português para os valores que a API manda em maiúsculas
export const textoStatus: Record<StatusOcorrencia, string> = {
  ABERTA: 'Aberta',
  EM_ANDAMENTO: 'Em andamento',
  RESOLVIDA: 'Resolvida',
  CANCELADA: 'Cancelada',
}

export const textoPrioridade: Record<Prioridade, string> = {
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
}

// Singular ou plural: plural(1, 'dia', 'dias') -> "1 dia"; plural(3, 'dia', 'dias') -> "3 dias"
export function plural(quantidade: number, singular: string, varios: string): string {
  return `${quantidade} ${quantidade === 1 ? singular : varios}`
}
