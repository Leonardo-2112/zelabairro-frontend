import { useRequisicao } from '../hooks/useRequisicao'
import { listarAtualizacoes } from '../services/api'
import { formatarData } from '../utils/formatar'
import { Carregando } from './Carregando'
import { EstadoVazio } from './EstadoVazio'
import { MensagemErro } from './MensagemErro'
import { StatusBadge } from './StatusBadge'

interface HistoricoAtualizacoesProps {
  idOcorrencia: number
}

// Linha do tempo das mudanças de status feitas pelos gestores (RN06)
export function HistoricoAtualizacoes({ idOcorrencia }: HistoricoAtualizacoesProps) {
  const { dados: atualizacoes, carregando, erro, recarregar } = useRequisicao(
    () => listarAtualizacoes(idOcorrencia),
    [idOcorrencia],
  )

  if (carregando) return <Carregando texto="Carregando o histórico…" />
  if (erro) return <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
  if (!atualizacoes || atualizacoes.length === 0) {
    return <EstadoVazio titulo="Sem atualizações ainda" texto="Quando a prefeitura mudar o status, o histórico aparece aqui." />
  }

  return (
    <ol className="space-y-4 border-l-2 border-marca-200 pl-5">
      {atualizacoes.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute top-1.5 -left-[27px] h-3 w-3 rounded-full bg-marca-600" aria-hidden="true" />
          <p className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {formatarData(item.data)} · <StatusBadge status={item.statusAnterior} /> → <StatusBadge status={item.statusNovo} />
          </p>
          {item.comentario && <p className="mt-1 break-words text-slate-800">{item.comentario}</p>}
          <p className="text-sm text-slate-500">por {item.gestor}</p>
        </li>
      ))}
    </ol>
  )
}
