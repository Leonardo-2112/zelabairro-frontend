import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { IntegranteCard } from '../components/IntegranteCard'
import { integrantes } from '../data/integrantes'

// Página Integrantes: um cartão para cada pessoa do grupo
export function IntegrantesPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Integrantes"
        subtitulo="Grupo da turma 1TDSPV que desenvolveu o ZelaBairro na Global Solution 2026/2 da FIAP."
      />
      <div className="container-pagina py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante) => (
            <li key={integrante.rm}>
              <IntegranteCard integrante={integrante} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
