import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { apoiarOcorrencia, buscarOcorrencia } from '../services/api'
import type { Ocorrencia } from '../types/ocorrencia'

interface BotaoApoiarProps {
  ocorrencia: Ocorrencia
  onApoiado: (atualizada: Ocorrencia) => void
}

// Botão "Apoiar" com as regras da RN08 já checadas no front (a API confere de novo)
export function BotaoApoiar({ ocorrencia, onApoiado }: BotaoApoiarProps) {
  const { usuario } = useAuth()
  const location = useLocation()
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const aceitaApoio = ocorrencia.status === 'ABERTA' || ocorrencia.status === 'EM_ANDAMENTO'

  async function apoiar() {
    if (!usuario) return
    setEnviando(true)
    setErro(null)
    try {
      await apoiarOcorrencia(ocorrencia.id, usuario.id)
      // Busca de novo para atualizar apoios e prioridade calculados pela API
      onApoiado(await buscarOcorrencia(ocorrencia.id))
      setSucesso(true)
    } catch (e) {
      // 409: já apoia, é o autor ou a ocorrência foi encerrada
      setErro(e instanceof Error ? e.message : 'Não foi possível registrar o apoio.')
    } finally {
      setEnviando(false)
    }
  }

  if (!aceitaApoio) {
    return <p className="text-sm text-slate-600">Ocorrência encerrada: não recebe mais apoios.</p>
  }
  if (!usuario) {
    return (
      <Link to="/login" state={{ de: location.pathname, mensagem: 'Entre para apoiar esta ocorrência.' }} className="btn-primario w-full">
        Entrar para apoiar
      </Link>
    )
  }
  if (usuario.perfil === 'GESTOR') {
    return <p className="text-sm text-slate-600">Gestores acompanham pelo painel; apoiar é para cidadãos.</p>
  }
  if (usuario.id === ocorrencia.idAutor) {
    return <p className="text-sm text-slate-600">Você registrou esta ocorrência.</p>
  }

  return (
    <div className="space-y-3">
      <button type="button" className="btn-primario w-full" onClick={apoiar} disabled={enviando || sucesso}>
        <ThumbsUp className="h-5 w-5" aria-hidden="true" />
        {enviando ? 'Registrando apoio…' : sucesso ? 'Você apoia esta ocorrência' : 'Apoiar: também tenho esse problema'}
      </button>
      <div aria-live="polite">
        {sucesso && <p className="text-sm font-medium text-green-800">Apoio registrado! A prioridade foi recalculada.</p>}
        {erro && <p className="text-sm font-medium text-red-700" role="alert">{erro}</p>}
      </div>
    </div>
  )
}
