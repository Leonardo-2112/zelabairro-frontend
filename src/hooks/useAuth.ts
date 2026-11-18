import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import type { AuthContextValor } from '../contexts/AuthContext'

// Atalho para ler a sessão em qualquer componente: const { usuario, sair } = useAuth()
export function useAuth(): AuthContextValor {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro do <AuthProvider>.')
  }
  return contexto
}
