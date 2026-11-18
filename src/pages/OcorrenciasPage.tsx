import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { Carregando } from '../components/Carregando'
import { EstadoVazio } from '../components/EstadoVazio'
import { MensagemErro } from '../components/MensagemErro'
import { OcorrenciaLista } from '../components/OcorrenciaLista'
import { useOcorrencias } from '../hooks/useOcorrencias'

// Página /ocorrencias: lista pública (GET /ocorrencias) com os 4 estados de tela
export function OcorrenciasPage() {
  const { dados: ocorrencias, carregando, erro, recarregar } = useOcorrencias()

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

      <div className="container-pagina py-10">
        {carregando ? (
          <Carregando texto="Buscando ocorrências…" />
        ) : erro ? (
          <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
        ) : !ocorrencias || ocorrencias.length === 0 ? (
          <EstadoVazio titulo="Nenhuma ocorrência encontrada" texto="Seja o primeiro a registrar um problema.">
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
