import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ApiError } from '../services/api'

// Leva os erros de campo da API (campos[] do 400) para o React Hook Form
// e devolve a mensagem geral para mostrar acima do formulário.
export function aplicarErrosDaApi<T extends FieldValues>(erro: unknown, setError: UseFormSetError<T>): string {
  if (erro instanceof ApiError) {
    erro.campos.forEach((campo) => {
      setError(campo.campo as Path<T>, { type: 'server', message: campo.mensagem })
    })
    return erro.message
  }
  return 'Erro inesperado. Tente novamente.'
}
