import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import type { Ocorrencia } from '../types/ocorrencia'
import { MensagemErro } from './MensagemErro'
import { PrevisaoIa } from './PrevisaoIa'
import { PrioridadeBadge } from './PrioridadeBadge'
import { StatusBadge } from './StatusBadge'

interface ConfirmacaoOcorrenciaProps {
  ocorrencia: Ocorrencia
  avisoFotos: string | null
  onRegistrarOutra: () => void
}

// Tela de sucesso do registro: a previsão vem na própria resposta do POST (Documento Base 7.4)
export function ConfirmacaoOcorrencia({ ocorrencia, avisoFotos, onRegistrarOutra }: ConfirmacaoOcorrenciaProps) {
  return (
    <div className="card mx-auto max-w-xl space-y-5 text-center" role="status">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-700" aria-hidden="true" />
      <h1 className="text-3xl font-bold">Ocorrência #{ocorrencia.id} registrada!</h1>
      <p className="text-slate-700">
        {ocorrencia.categoria.nome} em {ocorrencia.bairro.nome}. A prefeitura já pode ver o seu chamado.
        {ocorrencia.qtdFotos > 0 &&
          ` ${ocorrencia.qtdFotos === 1 ? '1 foto enviada.' : `${ocorrencia.qtdFotos} fotos enviadas.`}`}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        <StatusBadge status={ocorrencia.status} />
        <PrioridadeBadge prioridade={ocorrencia.prioridade} pontos={ocorrencia.pontuacaoPrioridade} />
      </div>

      <div className="text-left">
        <PrevisaoIa prazoPrevistoDias={ocorrencia.prazoPrevistoDias} riscoAtraso={ocorrencia.riscoAtraso} />
      </div>

      {avisoFotos && <MensagemErro mensagem={avisoFotos} />}

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link to={`/ocorrencias/${ocorrencia.id}`} className="btn-primario">Ver a ocorrência</Link>
        <button type="button" className="btn-secundario" onClick={onRegistrarOutra}>
          Registrar outra
        </button>
      </div>
    </div>
  )
}
