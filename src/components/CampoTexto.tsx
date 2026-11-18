import type { HTMLInputTypeAttribute } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { CampoFormulario } from './CampoFormulario'

interface CampoTextoProps {
  id: string
  rotulo: string
  registro: UseFormRegisterReturn
  erro?: string
  dica?: string
  tipo?: HTMLInputTypeAttribute
  autoComplete?: string
  placeholder?: string
}

// Campo de texto pronto para o React Hook Form: recebe o retorno de register(...)
export function CampoTexto({
  id,
  rotulo,
  registro,
  erro,
  dica,
  tipo = 'text',
  autoComplete,
  placeholder,
}: CampoTextoProps) {
  return (
    <CampoFormulario id={id} rotulo={rotulo} erro={erro} dica={dica}>
      <input
        id={id}
        type={tipo}
        className="campo"
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={erro ? true : undefined}
        aria-describedby={`${id}-ajuda`}
        {...registro}
      />
    </CampoFormulario>
  )
}
