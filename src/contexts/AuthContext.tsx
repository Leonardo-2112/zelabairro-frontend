import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Sessao } from '../types/usuario'

const CHAVE_SESSAO = 'zelabairro:sessao'

export interface AuthContextValor {
  usuario: Sessao | null
  entrar: (sessao: Sessao) => void
  sair: () => void
}

export const AuthContext = createContext<AuthContextValor | null>(null)

// Lê a sessão salva. try/catch porque o localStorage pode estar bloqueado ou com lixo.
function lerSessao(): Sessao | null {
  try {
    const texto = localStorage.getItem(CHAVE_SESSAO)
    return texto ? (JSON.parse(texto) as Sessao) : null
  } catch {
    return null
  }
}

// Guarda quem está logado ({id, nome, perfil}) e deixa disponível para todo o app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Sessao | null>(lerSessao)

  function entrar(sessao: Sessao) {
    setUsuario(sessao)
    try {
      localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
    } catch {
      // Sem localStorage a sessão vale só até fechar a aba
    }
  }

  function sair() {
    setUsuario(null)
    try {
      localStorage.removeItem(CHAVE_SESSAO)
    } catch {
      // nada a fazer
    }
  }

  return <AuthContext.Provider value={{ usuario, entrar, sair }}>{children}</AuthContext.Provider>
}
