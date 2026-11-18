import { Link } from 'react-router-dom'
import { Camera, Clock, MapPin, ThumbsUp } from 'lucide-react'
import type { Ocorrencia } from '../types/ocorrencia'
import { plural } from '../utils/formatar'
import { PrevisaoIa } from './PrevisaoIa'
import { PrioridadeBadge } from './PrioridadeBadge'
import { StatusBadge } from './StatusBadge'

interface OcorrenciaCardProps {
  ocorrencia: Ocorrencia
}

// Resumo de uma ocorrência; o card inteiro leva para /ocorrencias/:id
export function OcorrenciaCard({ ocorrencia }: OcorrenciaCardProps) {
  return (
    <article className="card relative flex h-full flex-col gap-3 transition-shadow hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={ocorrencia.status} />
        <PrioridadeBadge prioridade={ocorrencia.prioridade} />
        {ocorrencia.atrasada && <span className="badge bg-red-700 text-white">Atrasada</span>}
      </div>

      <h3 className="text-lg font-semibold">
        {/* O ::after do link cobre o card todo, mas o texto continua sendo o nome do link */}
        <Link to={`/ocorrencias/${ocorrencia.id}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {ocorrencia.categoria.nome}
        </Link>
      </h3>

      <p className="line-clamp-2 text-slate-700">{ocorrencia.descricao}</p>

      <p className="flex items-start gap-1 text-sm text-slate-600">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 break-words">
          {ocorrencia.bairro.nome} · {ocorrencia.endereco}
        </span>
      </p>

      <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
        <li className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" aria-hidden="true" /> {plural(ocorrencia.qtdApoios, 'apoio', 'apoios')}
        </li>
        <li className="flex items-center gap-1">
          <Clock className="h-4 w-4" aria-hidden="true" /> {plural(ocorrencia.diasEmAberto, 'dia', 'dias')} em aberto
        </li>
        {ocorrencia.qtdFotos > 0 && (
          <li className="flex items-center gap-1">
            <Camera className="h-4 w-4" aria-hidden="true" /> {plural(ocorrencia.qtdFotos, 'foto', 'fotos')}
          </li>
        )}
      </ul>

      <PrevisaoIa prazoPrevistoDias={ocorrencia.prazoPrevistoDias} riscoAtraso={ocorrencia.riscoAtraso} compacta />
    </article>
  )
}
