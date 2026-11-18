import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { registrarAtualizacao } from '../services/api'
import type { NovaAtualizacao, Ocorrencia, StatusOcorrencia } from '../types/ocorrencia'
import { aplicarErrosDaApi } from '../utils/errosFormulario'
import { textoStatus } from '../utils/formatar'
import { CampoFormulario } from './CampoFormulario'

// RN05: para onde cada status pode ir (RESOLVIDA e CANCELADA são finais)
const transicoes: Record<StatusOcorrencia, StatusOcorrencia[]> = {
  ABERTA: ['EM_ANDAMENTO', 'CANCELADA'],
  EM_ANDAMENTO: ['RESOLVIDA', 'CANCELADA'],
  RESOLVIDA: [],
  CANCELADA: [],
}

interface MudarStatusProps {
  ocorrencia: Ocorrencia
  onAtualizada: (mensagem: string) => void
}

// Formulário do gestor para registrar uma atualização de status com comentário
export function MudarStatus({ ocorrencia, onAtualizada }: MudarStatusProps) {
  const { usuario } = useAuth()
  const [erroApi, setErroApi] = useState<string | null>(null)
  const opcoes = transicoes[ocorrencia.status]
  const prefixo = `oc${ocorrencia.id}` // ids únicos: há um formulário por ocorrência na tela

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NovaAtualizacao>({ defaultValues: { status: opcoes[0], comentario: '' } })

  async function enviar(dados: NovaAtualizacao) {
    if (!usuario) return
    setErroApi(null)
    try {
      await registrarAtualizacao(ocorrencia.id, { status: dados.status, comentario: dados.comentario.trim() }, usuario.id)
      onAtualizada(`Ocorrência #${ocorrencia.id} agora está "${textoStatus[dados.status]}".`)
    } catch (erro) {
      // 409 = transição não permitida (RN05); 403 = não é gestor (RN16)
      setErroApi(aplicarErrosDaApi(erro, setError))
    }
  }

  if (opcoes.length === 0) return null

  return (
    <form noValidate onSubmit={handleSubmit(enviar)} className="space-y-3 rounded-xl bg-slate-50 p-4 lg:w-80">
      <CampoFormulario id={`${prefixo}-status`} rotulo="Novo status" erro={errors.status?.message}>
        <select
          id={`${prefixo}-status`}
          className="campo"
          aria-describedby={`${prefixo}-status-ajuda`}
          {...register('status', { required: 'Escolha o novo status.' })}
        >
          {opcoes.map((status) => (
            <option key={status} value={status}>{textoStatus[status]}</option>
          ))}
        </select>
      </CampoFormulario>
      <CampoFormulario id={`${prefixo}-comentario`} rotulo="Comentário para o cidadão" erro={errors.comentario?.message}>
        <textarea
          id={`${prefixo}-comentario`}
          rows={2}
          className="campo"
          placeholder="Ex.: equipe agendada para amanhã"
          aria-invalid={errors.comentario ? true : undefined}
          aria-describedby={`${prefixo}-comentario-ajuda`}
          {...register('comentario', {
            validate: (valor) => valor.trim().length > 0 || 'Escreva um comentário.',
            maxLength: { value: 300, message: 'No máximo 300 caracteres.' },
          })}
        />
      </CampoFormulario>
      {erroApi && <p className="erro-campo" role="alert">{erroApi}</p>}
      <button type="submit" className="btn-primario w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando…' : 'Atualizar status'}
      </button>
    </form>
  )
}
