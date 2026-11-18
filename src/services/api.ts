import type { CampoErro, ErroApi } from '../types/erroApi'
import type { Cidadao, DadosLogin, NovoCidadao, Sessao } from '../types/usuario'

// Endereço da API Java, lido do arquivo .env (VITE_API_URL). Nunca fixo no código.
export const API_URL: string = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

// Mensagem padrão para cada status HTTP, caso a API não mande uma
const mensagensPorStatus: Record<number, string> = {
  0: 'Não foi possível falar com o servidor. Verifique a internet e tente de novo; no primeiro acesso a API pode levar até 1 minuto para acordar.',
  400: 'Alguns dados estão inválidos. Confira os campos.',
  401: 'E-mail ou senha inválidos.',
  403: 'Você não tem permissão para fazer isso.',
  404: 'Não encontramos o que você procurou.',
  409: 'Essa ação não é permitida agora.',
  500: 'O servidor teve um problema. Tente novamente em instantes.',
}

// Erro que todas as telas recebem: status + mensagem em português + campos inválidos
export class ApiError extends Error {
  status: number
  campos: CampoErro[]

  constructor(status: number, mensagem?: string, campos: CampoErro[] = []) {
    super(mensagem || mensagensPorStatus[status] || 'Algo deu errado. Tente novamente.')
    this.name = 'ApiError'
    this.status = status
    this.campos = campos
  }
}

// Lê o JSON de erro da API ({status, erro, mensagem, caminho, timestamp, campos})
async function lerErro(resposta: Response): Promise<ApiError> {
  try {
    const corpo = (await resposta.json()) as ErroApi
    return new ApiError(resposta.status, corpo.mensagem, corpo.campos ?? [])
  } catch {
    return new ApiError(resposta.status)
  }
}

interface OpcoesRequisicao {
  metodo?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  corpo?: unknown
  cabecalhos?: Record<string, string>
}

// Única função que chama o fetch: toda requisição do app passa por aqui
export async function request<T>(caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
  const { metodo = 'GET', corpo, cabecalhos = {} } = opcoes

  if (!API_URL) {
    throw new ApiError(0, 'A variável VITE_API_URL não foi configurada. Copie o .env.example para .env.')
  }

  const headers: Record<string, string> = { Accept: 'application/json', ...cabecalhos }
  let body: BodyInit | undefined

  if (corpo instanceof FormData) {
    // Envio de arquivo: o navegador monta o Content-Type multipart sozinho
    body = corpo
  } else if (corpo !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(corpo)
  }

  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}${caminho}`, { method: metodo, headers, body })
  } catch {
    // Sem resposta (sem internet, CORS ou servidor fora do ar)
    throw new ApiError(0)
  }

  if (!resposta.ok) {
    throw await lerErro(resposta)
  }
  if (resposta.status === 204) {
    return undefined as T
  }
  return (await resposta.json()) as T
}

// ---------- Login e cadastro (Documento Base 8.5) ----------

// POST /auth/login -> {id, nome, perfil}
export function login(dados: DadosLogin): Promise<Sessao> {
  return request<Sessao>('/auth/login', { metodo: 'POST', corpo: dados })
}

// POST /cidadaos -> cadastro público (sempre cria cidadão, RN17)
export function cadastrarCidadao(dados: NovoCidadao): Promise<Cidadao> {
  return request<Cidadao>('/cidadaos', { metodo: 'POST', corpo: dados })
}
