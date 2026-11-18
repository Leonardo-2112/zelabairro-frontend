import { buscarOcorrencia } from '../services/api'
import type { Ocorrencia } from '../types/ocorrencia'
import { useRequisicao } from './useRequisicao'

// Uma ocorrência pelo id da rota; muda o id, busca de novo
export function useOcorrencia(id: number) {
  return useRequisicao<Ocorrencia>(() => buscarOcorrencia(id), [id])
}
