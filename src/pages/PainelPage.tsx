import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { Carregando } from '../components/Carregando'
import { EstadoVazio } from '../components/EstadoVazio'
import { MensagemErro } from '../components/MensagemErro'
import { MudarStatus } from '../components/MudarStatus'
import { PrevisaoIa } from '../components/PrevisaoIa'
import { PrioridadeBadge } from '../components/PrioridadeBadge'
import { StatusBadge } from '../components/StatusBadge'
import { useAuth } from '../hooks/useAuth'
import { useOcorrencias } from '../hooks/useOcorrencias'
import { plural } from '../utils/formatar'

// Página /painel (só gestor): fila de atendimento por prioridade (RN10)
export function PainelPage() {
  const { usuario } = useAuth()
  const { dados: ocorrencias, carregando, erro, recarregar } = useOcorrencias()
  const [aviso, setAviso] = useState<string | null>(null)

  // Depois de mudar um status: mostra o aviso e recarrega a fila (a prioridade muda)
  function aoAtualizar(mensagem: string) {
    setAviso(mensagem)
    recarregar()
  }

  // A API já devolve ordenado por prioridade; a fila só mostra o que ainda está em aberto
  const fila = (ocorrencias ?? []).filter((o) => o.status === 'ABERTA' || o.status === 'EM_ANDAMENTO')

  return (
    <>
      <CabecalhoPagina
        titulo="Painel do gestor"
        subtitulo={`Olá, ${usuario?.nome ?? 'gestor'}. Atenda primeiro o que tem mais pontos de prioridade.`}
      />
      <div className="container-pagina space-y-10 py-10">
        <section aria-labelledby="titulo-fila">
          <h2 id="titulo-fila" className="text-2xl font-bold">Fila por prioridade</h2>
          <div aria-live="polite">
            {aviso && <p className="mt-3 rounded-xl bg-green-50 p-3 font-medium text-green-800">{aviso}</p>}
          </div>
          <div className="mt-4">
            {carregando ? (
              <Carregando texto="Carregando a fila…" />
            ) : erro ? (
              <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
            ) : fila.length === 0 ? (
              <EstadoVazio titulo="Fila vazia" texto="Nenhuma ocorrência aberta ou em andamento no momento." />
            ) : (
              <ol className="space-y-4">
                {fila.map((ocorrencia, posicao) => (
                  <li key={ocorrencia.id} className="card grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                    <p className="font-display text-3xl font-bold text-marca-700" aria-label={`Posição ${posicao + 1} na fila`}>
                      {posicao + 1}º
                    </p>
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge status={ocorrencia.status} />
                        <PrioridadeBadge prioridade={ocorrencia.prioridade} pontos={ocorrencia.pontuacaoPrioridade} />
                        {ocorrencia.atrasada && <span className="badge bg-red-700 text-white">Atrasada</span>}
                      </div>
                      <h3 className="text-lg font-semibold">
                        <Link to={`/ocorrencias/${ocorrencia.id}`} className="hover:underline">
                          #{ocorrencia.id} · {ocorrencia.categoria.nome}
                        </Link>
                      </h3>
                      <p className="break-words text-slate-700">{ocorrencia.descricao}</p>
                      <p className="text-sm break-words text-slate-600">
                        {ocorrencia.bairro.nome} · {ocorrencia.endereco} · {plural(ocorrencia.qtdApoios, 'apoio', 'apoios')} ·{' '}
                        {plural(ocorrencia.diasEmAberto, 'dia', 'dias')} em aberto (referência: {ocorrencia.categoria.prazoDias})
                      </p>
                      <PrevisaoIa prazoPrevistoDias={ocorrencia.prazoPrevistoDias} riscoAtraso={ocorrencia.riscoAtraso} compacta />
                    </div>
                    <MudarStatus ocorrencia={ocorrencia} onAtualizada={aoAtualizar} />
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
