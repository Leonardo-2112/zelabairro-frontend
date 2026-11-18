import { Link, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { Carregando } from '../components/Carregando'
import { EstadoVazio } from '../components/EstadoVazio'
import { FiltrosOcorrencias } from '../components/FiltrosOcorrencias'
import { MensagemErro } from '../components/MensagemErro'
import { OcorrenciaLista } from '../components/OcorrenciaLista'
import { useCatalogo } from '../hooks/useCatalogo'
import { useOcorrencias } from '../hooks/useOcorrencias'
import type { FiltrosOcorrencia, StatusOcorrencia } from '../types/ocorrencia'

// Página /ocorrencias: lista pública (GET /ocorrencias) com filtros e os 4 estados de tela
export function OcorrenciasPage() {
  // Os filtros ficam na URL (?status=ABERTA&idBairro=1): dá para compartilhar o link
  const [parametros, setParametros] = useSearchParams()
  const filtros: FiltrosOcorrencia = {
    status: (parametros.get('status') || undefined) as StatusOcorrencia | undefined,
    idBairro: Number(parametros.get('idBairro')) || undefined,
    idCategoria: Number(parametros.get('idCategoria')) || undefined,
  }

  const { dados: ocorrencias, carregando, erro, recarregar } = useOcorrencias(filtros)
  const { dados: catalogo } = useCatalogo()

  function mudarFiltros(novos: FiltrosOcorrencia) {
    const proximos = new URLSearchParams()
    if (novos.status) proximos.set('status', novos.status)
    if (novos.idBairro) proximos.set('idBairro', String(novos.idBairro))
    if (novos.idCategoria) proximos.set('idCategoria', String(novos.idCategoria))
    setParametros(proximos, { replace: true })
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Ocorrências"
        subtitulo="Problemas registrados pelos moradores, do mais urgente para o menos urgente."
      >
        <Link to="/ocorrencias/nova" className="btn-primario mt-6">
          <Plus className="h-5 w-5" aria-hidden="true" /> Registrar ocorrência
        </Link>
      </CabecalhoPagina>

      <div className="container-pagina space-y-6 py-10">
        <FiltrosOcorrencias
          filtros={filtros}
          categorias={catalogo?.categorias ?? []}
          bairros={catalogo?.bairros ?? []}
          onMudar={mudarFiltros}
        />

        {carregando ? (
          <Carregando texto="Buscando ocorrências…" />
        ) : erro ? (
          <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
        ) : !ocorrencias || ocorrencias.length === 0 ? (
          <EstadoVazio titulo="Nenhuma ocorrência encontrada" texto="Mude os filtros ou registre um novo problema.">
            <Link to="/ocorrencias/nova" className="btn-primario">Registrar ocorrência</Link>
          </EstadoVazio>
        ) : (
          <>
            <p className="mb-4 text-slate-600" aria-live="polite">
              {ocorrencias.length} {ocorrencias.length === 1 ? 'ocorrência encontrada' : 'ocorrências encontradas'}
            </p>
            <OcorrenciaLista ocorrencias={ocorrencias} />
          </>
        )}
      </div>
    </>
  )
}
