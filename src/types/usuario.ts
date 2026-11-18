export type Perfil = 'CIDADAO' | 'GESTOR'

// Corpo de POST /auth/login
export interface DadosLogin {
  email: string
  senha: string
}

// Resposta do login: é o que guardamos como sessão no navegador
export interface Sessao {
  id: number
  nome: string
  perfil: Perfil
}

// Corpo de POST /cidadaos (cadastro público)
export interface NovoCidadao {
  nome: string
  email: string
  senha: string
  telefone?: string
}

export interface Cidadao {
  id: number
  nome: string
  email: string
  telefone: string | null
  dataCadastro: string
}

// Corpo de POST /gestores (só um gestor cadastra outro, RN17)
export interface NovoGestor {
  nome: string
  email: string
  senha: string
  idOrgao: number
}

export interface Gestor {
  id: number
  nome: string
  email: string
  idOrgao: number
  orgao: string
  idGestorCadastro: number | null
  dataCadastro: string
}
