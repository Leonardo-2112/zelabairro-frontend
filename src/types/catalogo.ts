// Dados de apoio que a API devolve em GET /categorias, /bairros e /orgaos

export interface Categoria {
  id: number
  nome: string
  descricao: string
  prazoDias: number // prazo de referência da categoria
  gravidade: number // 1 a 5 (5 = risco à segurança)
  idOrgao: number
  orgao: string
}

export interface Bairro {
  id: number
  nome: string
  subprefeitura: string
  populacao: number
}

export interface Orgao {
  id: number
  nome: string
  email: string
  telefone: string
}
