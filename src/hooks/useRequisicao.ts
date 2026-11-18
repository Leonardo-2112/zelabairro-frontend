import { useEffect, useState } from 'react'

// Resultado padrão de qualquer busca na API
export interface ResultadoRequisicao<T> {
  dados: T | null
  carregando: boolean
  erro: string | null
  recarregar: () => void
  setDados: (dados: T) => void
}

// Hook genérico: executa a função de busca e controla carregando / erro / dados.
// "dependencias" funciona como no useEffect: mudou, busca de novo.
export function useRequisicao<T>(buscar: () => Promise<T>, dependencias: unknown[]): ResultadoRequisicao<T> {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true // evita atualizar a tela depois que o componente saiu
    setCarregando(true)
    setErro(null)

    buscar()
      .then((resposta) => {
        if (ativo) setDados(resposta)
      })
      .catch((e: unknown) => {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro inesperado.')
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [...dependencias, tentativa])

  return { dados, carregando, erro, recarregar: () => setTentativa((n) => n + 1), setDados }
}
