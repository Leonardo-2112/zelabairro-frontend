import { listarOcorrencias } from '../services/api'
import type { FiltrosOcorrencia, Ocorrencia } from '../types/ocorrencia'
import { useRequisicao } from './useRequisicao'

// Lista de ocorrências da API; busca de novo sempre que um filtro muda
export function useOcorrencias(filtros: FiltrosOcorrencia = {}) {
  return useRequisicao<Ocorrencia[]>(
    () => listarOcorrencias(filtros),
    [filtros.status, filtros.idBairro, filtros.idCategoria],
  )
}
