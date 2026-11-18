import type { Bairro, Categoria } from './catalogo'

// Union types no lugar de enum (o tsconfig usa erasableSyntaxOnly)
export type StatusOcorrencia = 'ABERTA' | 'EM_ANDAMENTO' | 'RESOLVIDA' | 'CANCELADA'
export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA'
export type RiscoAtraso = 'ALTO' | 'BAIXO'

// Saída de GET /ocorrencias e GET /ocorrencias/{id}
export interface Ocorrencia {
  id: number
  descricao: string
  endereco: string
  status: StatusOcorrencia
  dataAbertura: string // AAAA-MM-DD
  dataResolucao: string | null
  categoria: Categoria
  bairro: Bairro
  idAutor: number
  autor: string // só o primeiro nome (RN13)
  prazoPrevistoDias: number | null // previsão da IA (null = indisponível, RN12)
  riscoAtraso: RiscoAtraso | null
  qtdApoios: number
  qtdFotos: number
  diasEmAberto: number
  atrasada: boolean
  pontuacaoPrioridade: number | null // null para RESOLVIDA/CANCELADA
  prioridade: Prioridade | null
}

// Corpo de POST /ocorrencias
export interface NovaOcorrencia {
  descricao: string
  endereco: string
  idCidadao: number
  idCategoria: number
  idBairro: number
}

// Filtros aceitos por GET /ocorrencias
export interface FiltrosOcorrencia {
  status?: StatusOcorrencia
  idBairro?: number
  idCategoria?: number
}

// Item do histórico: GET /ocorrencias/{id}/atualizacoes
export interface Atualizacao {
  id: number
  idOcorrencia: number
  statusAnterior: StatusOcorrencia
  statusNovo: StatusOcorrencia
  comentario: string | null
  data: string
  idGestor: number
  gestor: string
}

// Corpo de POST /ocorrencias/{id}/atualizacoes (só gestor)
export interface NovaAtualizacao {
  status: StatusOcorrencia
  comentario: string
}

// Resposta de POST /ocorrencias/{id}/apoios
export interface Apoio {
  idOcorrencia: number
  idCidadao: number
  cidadao: string
  dataApoio: string
}

// Item de GET /ocorrencias/{id}/fotos (a imagem fica em VITE_API_URL + url)
export interface Foto {
  id: number
  tipo: string
  tamanho: number
  dataEnvio: string
  url: string
}
