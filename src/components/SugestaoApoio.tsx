import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import { useRequisicao } from '../hooks/useRequisicao'
import { listarOcorrencias } from '../services/api'
import { plural } from '../utils/formatar'
import { StatusBadge } from './StatusBadge'

interface SugestaoApoioProps {
  idCategoria: number
  idBairro: number
}

// RN07: antes de criar, mostra as ocorrências ABERTA/EM_ANDAMENTO da mesma categoria e bairro.
// É só sugestão: o cidadão pode registrar mesmo assim.
export function SugestaoApoio({ idCategoria, idBairro }: SugestaoApoioProps) {
  const { dados: parecidas, carregando, erro } = useRequisicao(async () => {
    if (!idCategoria || !idBairro) return []
    const lista = await listarOcorrencias({ idCategoria, idBairro })
    return lista.filter((o) => o.status === 'ABERTA' || o.status === 'EM_ANDAMENTO')
  }, [idCategoria, idBairro])

  if (!idCategoria || !idBairro) return null

  return (
    <div aria-live="polite">
      {carregando ? (
        <p className="text-sm text-slate-600">Procurando ocorrências parecidas…</p>
      ) : erro ? (
        <p className="text-sm text-slate-600">Não foi possível buscar ocorrências parecidas agora.</p>
      ) : parecidas && parecidas.length > 0 ? (
        <div className="rounded-xl border border-destaque-400 bg-destaque-100 p-4">
          <p className="flex items-start gap-2 font-semibold text-slate-900">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Já existe {plural(parecidas.length, 'ocorrência aberta', 'ocorrências abertas')} dessa categoria neste bairro.
            Se for o mesmo problema, apoie em vez de criar outra.
          </p>
          <ul className="mt-3 space-y-2">
            {parecidas.map((ocorrencia) => (
              <li key={ocorrencia.id} className="rounded-lg bg-white p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={ocorrencia.status} />
                  <span className="text-sm text-slate-600">{plural(ocorrencia.qtdApoios, 'apoio', 'apoios')}</span>
                </div>
                <p className="mt-1 line-clamp-2 break-words text-slate-800">{ocorrencia.descricao}</p>
                <p className="text-sm break-words text-slate-600">{ocorrencia.endereco}</p>
                <Link to={`/ocorrencias/${ocorrencia.id}`} className="mt-1 inline-block font-semibold text-marca-700 underline">
                  Ver e apoiar a ocorrência #{ocorrencia.id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-green-800">Nenhuma ocorrência aberta parecida. Pode registrar!</p>
      )}
    </div>
  )
}
