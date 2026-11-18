import { useAuth } from '../hooks/useAuth'
import { useRequisicao } from '../hooks/useRequisicao'
import { resumoPorBairro } from '../services/api'
import { Carregando } from './Carregando'
import { EstadoVazio } from './EstadoVazio'
import { MensagemErro } from './MensagemErro'

// Números de cada bairro: mostra onde o atendimento está mais atrasado (ODS 10)
export function ResumoBairros() {
  const { usuario } = useAuth()
  const { dados: bairros, carregando, erro, recarregar } = useRequisicao(
    () => resumoPorBairro(usuario?.id ?? 0),
    [usuario?.id],
  )

  if (carregando) return <Carregando texto="Carregando o resumo por bairro…" />
  if (erro) return <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
  if (!bairros || bairros.length === 0) return <EstadoVazio titulo="Nenhum bairro com ocorrências" />

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bairros.map((bairro) => (
        <li key={bairro.idBairro} className="card">
          <h3 className="text-lg font-semibold">{bairro.bairro}</h3>
          <p className="text-sm text-slate-500">Subprefeitura {bairro.subprefeitura}</p>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-amber-50 p-2">
              <dt className="text-xs text-slate-600">Em aberto</dt>
              <dd className="font-display text-xl font-bold">{bairro.abertas + bairro.emAndamento}</dd>
            </div>
            <div className={`rounded-lg p-2 ${bairro.atrasadas > 0 ? 'bg-red-50 text-red-800' : 'bg-slate-50'}`}>
              <dt className="text-xs text-slate-600">Atrasadas</dt>
              <dd className="font-display text-xl font-bold">{bairro.atrasadas}</dd>
            </div>
            <div className="rounded-lg bg-green-50 p-2">
              <dt className="text-xs text-slate-600">Resolvidas</dt>
              <dd className="font-display text-xl font-bold">{bairro.resolvidas}</dd>
            </div>
          </dl>
          <p className="mt-2 text-sm text-slate-500">Total: {bairro.total} · canceladas: {bairro.canceladas}</p>
        </li>
      ))}
    </ul>
  )
}
