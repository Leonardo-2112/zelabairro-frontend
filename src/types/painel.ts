// Item de GET /painel/bairros (só gestor): resumo das ocorrências por bairro
export interface ResumoBairro {
  idBairro: number
  bairro: string
  subprefeitura: string
  abertas: number
  emAndamento: number
  atrasadas: number
  resolvidas: number
  canceladas: number
  total: number
}
