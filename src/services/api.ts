import type { Bairro, Categoria } from '../types/catalogo'
import type { CampoErro, ErroApi } from '../types/erroApi'
import type { ResumoBairro } from '../types/painel'
import type {
  Apoio,
  Atualizacao,
  FiltrosOcorrencia,
  Foto,
  NovaAtualizacao,
  NovaOcorrencia,
  Ocorrencia,
} from '../types/ocorrencia'
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

// ---------- Ocorrências ----------

// GET /ocorrencias?status=&idBairro=&idCategoria= -> já vem ordenada por prioridade
export function listarOcorrencias(filtros: FiltrosOcorrencia = {}): Promise<Ocorrencia[]> {
  const parametros = new URLSearchParams()
  if (filtros.status) parametros.set('status', filtros.status)
  if (filtros.idBairro) parametros.set('idBairro', String(filtros.idBairro))
  if (filtros.idCategoria) parametros.set('idCategoria', String(filtros.idCategoria))
  const consulta = parametros.toString()
  return request<Ocorrencia[]>(`/ocorrencias${consulta ? `?${consulta}` : ''}`)
}

// GET /ocorrencias/{id}
export function buscarOcorrencia(id: number): Promise<Ocorrencia> {
  return request<Ocorrencia>(`/ocorrencias/${id}`)
}

// POST /ocorrencias -> a Java valida (RN03), consulta a IA e devolve a ocorrência criada
export function criarOcorrencia(dados: NovaOcorrencia): Promise<Ocorrencia> {
  return request<Ocorrencia>('/ocorrencias', { metodo: 'POST', corpo: dados })
}

// GET /ocorrencias/{id}/atualizacoes -> histórico de status
export function listarAtualizacoes(idOcorrencia: number): Promise<Atualizacao[]> {
  return request<Atualizacao[]>(`/ocorrencias/${idOcorrencia}/atualizacoes`)
}

// POST /ocorrencias/{id}/atualizacoes -> muda o status (só gestor: X-Gestor-Id, RN05/RN06/RN16)
export function registrarAtualizacao(idOcorrencia: number, dados: NovaAtualizacao, idGestor: number): Promise<Atualizacao> {
  return request<Atualizacao>(`/ocorrencias/${idOcorrencia}/atualizacoes`, {
    metodo: 'POST',
    corpo: dados,
    cabecalhos: { 'X-Gestor-Id': String(idGestor) },
  })
}

// GET /ocorrencias/{id}/fotos -> lista sem os bytes (cada item tem a url da imagem)
export function listarFotos(idOcorrencia: number): Promise<Foto[]> {
  return request<Foto[]>(`/ocorrencias/${idOcorrencia}/fotos`)
}

// POST /ocorrencias/{id}/fotos (multipart, campo "arquivo"). Só o autor envia: X-Cidadao-Id (RN18)
export function enviarFoto(idOcorrencia: number, arquivo: File, idCidadao: number): Promise<Foto> {
  const formulario = new FormData()
  formulario.append('arquivo', arquivo)
  return request<Foto>(`/ocorrencias/${idOcorrencia}/fotos`, {
    metodo: 'POST',
    corpo: formulario,
    cabecalhos: { 'X-Cidadao-Id': String(idCidadao) },
  })
}

// Endereço completo da imagem para usar no <img src>: VITE_API_URL + "/fotos/3"
export function urlFoto(foto: Foto): string {
  return `${API_URL}${foto.url}`
}

// POST /ocorrencias/{id}/apoios -> "eu também tenho esse problema" (RN08)
export function apoiarOcorrencia(idOcorrencia: number, idCidadao: number): Promise<Apoio> {
  return request<Apoio>(`/ocorrencias/${idOcorrencia}/apoios`, { metodo: 'POST', corpo: { idCidadao } })
}

// ---------- Categorias e bairros (para filtros e formulários) ----------

// GET /categorias
export function listarCategorias(): Promise<Categoria[]> {
  return request<Categoria[]>('/categorias')
}

// GET /bairros
export function listarBairros(): Promise<Bairro[]> {
  return request<Bairro[]>('/bairros')
}

// ---------- Painel do gestor ----------

// GET /painel/bairros -> abertas, atrasadas e resolvidas por bairro (só gestor)
export function resumoPorBairro(idGestor: number): Promise<ResumoBairro[]> {
  return request<ResumoBairro[]>('/painel/bairros', { cabecalhos: { 'X-Gestor-Id': String(idGestor) } })
}
