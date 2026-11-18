import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Carregando } from '../components/Carregando'
import { GaleriaFotos } from '../components/GaleriaFotos'
import { HistoricoAtualizacoes } from '../components/HistoricoAtualizacoes'
import { MensagemErro } from '../components/MensagemErro'
import { PrevisaoIa } from '../components/PrevisaoIa'
import { PrioridadeBadge } from '../components/PrioridadeBadge'
import { StatusBadge } from '../components/StatusBadge'
import { useOcorrencia } from '../hooks/useOcorrencia'
import { formatarData, plural } from '../utils/formatar'

// Linha "rótulo: valor" da ficha da ocorrência
function Info({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-slate-500">{rotulo}</dt>
      <dd className="text-slate-800">{children}</dd>
    </div>
  )
}

// Página /ocorrencias/:id — rota com parâmetro, dados vindos de GET /ocorrencias/{id}
export function OcorrenciaDetalhePage() {
  const { id } = useParams()
  const idOcorrencia = Number(id)
  const { dados: ocorrencia, carregando, erro, recarregar } = useOcorrencia(idOcorrencia)

  return (
    <div className="container-pagina py-8">
      <Link to="/ocorrencias" className="inline-flex items-center gap-1 font-semibold text-marca-700 hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para as ocorrências
      </Link>

      <div className="mt-6">
        {carregando ? (
          <Carregando texto="Carregando a ocorrência…" />
        ) : erro || !ocorrencia ? (
          <MensagemErro mensagem={erro ?? 'Ocorrência não encontrada.'} onTentarNovamente={recarregar} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="card space-y-5 lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={ocorrencia.status} />
                <PrioridadeBadge prioridade={ocorrencia.prioridade} pontos={ocorrencia.pontuacaoPrioridade} />
                {ocorrencia.atrasada && <span className="badge bg-red-700 text-white">Atrasada</span>}
              </div>
              <div>
                <p className="text-sm font-semibold text-marca-700">Ocorrência #{ocorrencia.id}</p>
                <h1 className="text-3xl font-bold">{ocorrencia.categoria.nome}</h1>
              </div>
              <p className="text-lg break-words text-slate-700">{ocorrencia.descricao}</p>

              <dl className="grid gap-4 sm:grid-cols-2">
                <Info rotulo="Endereço de referência">{ocorrencia.endereco}</Info>
                <Info rotulo="Bairro">
                  {ocorrencia.bairro.nome} (subprefeitura {ocorrencia.bairro.subprefeitura})
                </Info>
                <Info rotulo="Registrada por">{ocorrencia.autor}</Info>
                <Info rotulo="Aberta em">
                  {formatarData(ocorrencia.dataAbertura)} · {plural(ocorrencia.diasEmAberto, 'dia', 'dias')} em aberto
                </Info>
                {ocorrencia.dataResolucao && <Info rotulo="Resolvida em">{formatarData(ocorrencia.dataResolucao)}</Info>}
                <Info rotulo="Órgão responsável">{ocorrencia.categoria.orgao}</Info>
                <Info rotulo="Prazo de referência">{plural(ocorrencia.categoria.prazoDias, 'dia', 'dias')}</Info>
              </dl>

              <section aria-labelledby="titulo-fotos">
                <h2 id="titulo-fotos" className="mb-3 text-xl font-semibold">Fotos</h2>
                <GaleriaFotos idOcorrencia={ocorrencia.id} categoria={ocorrencia.categoria.nome} />
              </section>

              <section aria-labelledby="titulo-historico">
                <h2 id="titulo-historico" className="mb-3 text-xl font-semibold">Histórico</h2>
                <HistoricoAtualizacoes idOcorrencia={ocorrencia.id} />
              </section>
            </article>

            <aside className="space-y-6">
              <section className="card space-y-3" aria-labelledby="titulo-previsao">
                <h2 id="titulo-previsao" className="text-lg font-semibold">Previsão da IA</h2>
                <PrevisaoIa prazoPrevistoDias={ocorrencia.prazoPrevistoDias} riscoAtraso={ocorrencia.riscoAtraso} />
              </section>
              <section className="card" aria-labelledby="titulo-apoios">
                <h2 id="titulo-apoios" className="text-lg font-semibold">Apoios</h2>
                <p className="mt-2 font-display text-4xl font-bold text-marca-700">{ocorrencia.qtdApoios}</p>
                <p className="text-slate-600">moradores relatam o mesmo problema.</p>
              </section>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
