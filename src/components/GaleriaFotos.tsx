import { useRequisicao } from '../hooks/useRequisicao'
import { listarFotos, urlFoto } from '../services/api'
import { formatarData } from '../utils/formatar'
import { Carregando } from './Carregando'
import { EstadoVazio } from './EstadoVazio'
import { MensagemErro } from './MensagemErro'

interface GaleriaFotosProps {
  idOcorrencia: number
  categoria: string
}

// Fotos da ocorrência (até 3, RN18). A imagem vem direto da API em /fotos/{id}.
export function GaleriaFotos({ idOcorrencia, categoria }: GaleriaFotosProps) {
  const { dados: fotos, carregando, erro, recarregar } = useRequisicao(() => listarFotos(idOcorrencia), [idOcorrencia])

  if (carregando) return <Carregando texto="Carregando fotos…" />
  if (erro) return <MensagemErro mensagem={erro} onTentarNovamente={recarregar} />
  if (!fotos || fotos.length === 0) {
    return <EstadoVazio titulo="Nenhuma foto enviada" />
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {fotos.map((foto, indice) => (
        <li key={foto.id}>
          <a href={urlFoto(foto)} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-slate-200">
            <img
              src={urlFoto(foto)}
              alt={`Foto ${indice + 1} da ocorrência de ${categoria.toLowerCase()}, enviada em ${formatarData(foto.dataEnvio)}`}
              className="aspect-square w-full bg-slate-100 object-cover"
              loading="lazy"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
