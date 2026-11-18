import type { Bairro, Categoria } from '../types/catalogo'
import type { FiltrosOcorrencia, StatusOcorrencia } from '../types/ocorrencia'
import { textoStatus } from '../utils/formatar'

interface FiltrosOcorrenciasProps {
  filtros: FiltrosOcorrencia
  categorias: Categoria[]
  bairros: Bairro[]
  onMudar: (filtros: FiltrosOcorrencia) => void
}

const listaStatus = Object.keys(textoStatus) as StatusOcorrencia[]

// Três <select> com <label>. Valor vazio = "todos".
export function FiltrosOcorrencias({ filtros, categorias, bairros, onMudar }: FiltrosOcorrenciasProps) {
  const temFiltro = Boolean(filtros.status || filtros.idBairro || filtros.idCategoria)

  return (
    <form className="card grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="filtro-status" className="rotulo">Status</label>
        <select
          id="filtro-status"
          className="campo"
          value={filtros.status ?? ''}
          onChange={(e) => onMudar({ ...filtros, status: (e.target.value || undefined) as StatusOcorrencia | undefined })}
        >
          <option value="">Todos</option>
          {listaStatus.map((status) => (
            <option key={status} value={status}>{textoStatus[status]}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-bairro" className="rotulo">Bairro</label>
        <select
          id="filtro-bairro"
          className="campo"
          value={filtros.idBairro ?? ''}
          onChange={(e) => onMudar({ ...filtros, idBairro: Number(e.target.value) || undefined })}
        >
          <option value="">Todos</option>
          {bairros.map((bairro) => (
            <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-categoria" className="rotulo">Categoria</label>
        <select
          id="filtro-categoria"
          className="campo"
          value={filtros.idCategoria ?? ''}
          onChange={(e) => onMudar({ ...filtros, idCategoria: Number(e.target.value) || undefined })}
        >
          <option value="">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
          ))}
        </select>
      </div>

      <button type="button" className="btn-secundario" disabled={!temFiltro} onClick={() => onMudar({})}>
        Limpar filtros
      </button>
    </form>
  )
}
