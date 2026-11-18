// Formato padrão de erro da API Java (Documento Base, seção 8.3)
export interface CampoErro {
  campo: string
  mensagem: string
}

export interface ErroApi {
  status: number
  erro: string
  mensagem: string
  caminho: string
  timestamp: string
  campos: CampoErro[]
}
