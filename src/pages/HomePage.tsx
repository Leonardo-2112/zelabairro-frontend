import { Link } from 'react-router-dom'
import { BarChart3, Clock, Megaphone, ThumbsUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Passo {
  titulo: string
  texto: string
  icone: LucideIcon
}

// Os quatro passos do fluxo principal (Documento Base, seção 4.2)
const passos: Passo[] = [
  {
    titulo: 'Registre',
    texto: 'Escolha a categoria e o bairro, descreva o problema e anexe até 3 fotos.',
    icone: Megaphone,
  },
  {
    titulo: 'Apoie',
    texto: 'Se alguém já registrou o mesmo problema, apoie em vez de criar outro chamado.',
    icone: ThumbsUp,
  },
  {
    titulo: 'Veja a previsão',
    texto: 'A inteligência artificial estima o prazo e o risco de atraso de cada ocorrência.',
    icone: Clock,
  },
  {
    titulo: 'Acompanhe',
    texto: 'A prefeitura atende pela prioridade e registra cada mudança de status.',
    icone: BarChart3,
  },
]

// Página inicial: proposta do ZelaBairro e chamada para registrar
export function HomePage() {
  return (
    <>
      {/* Destaque principal */}
      <section className="bg-linear-to-br from-marca-800 to-marca-600 text-white">
        <div className="container-pagina grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="badge bg-white/15 text-marca-50">CitizenTech · Zeladoria urbana</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              O problema do seu bairro, visto e resolvido por ordem de urgência.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-marca-50">
              Buraco na rua, poste apagado, lixo na calçada? Registre ou apoie a ocorrência e
              acompanhe o atendimento da prefeitura, com prazo previsto por IA.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/ocorrencias/nova" className="btn-destaque">Registrar um problema</Link>
              <Link to="/ocorrencias" className="btn border border-white/70 text-white hover:bg-white/10">
                Ver ocorrências
              </Link>
            </div>
          </div>

          {/* Exemplo visual de uma ocorrência (decorativo) */}
          <div className="card text-slate-800 lg:ml-auto lg:max-w-md" aria-hidden="true">
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-red-100 text-red-800">Prioridade alta</span>
              <span className="badge bg-sky-100 text-sky-800">Em andamento</span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold">Bueiro entupido</p>
            <p className="text-sm text-slate-600">Capão Redondo · 12 apoios</p>
            <p className="mt-4 rounded-xl bg-marca-50 p-3 text-sm text-marca-900">
              Previsão: cerca de 9 dias · risco de atraso alto
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container-pagina py-14">
        <h2 className="text-2xl font-bold sm:text-3xl">Como funciona</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((passo, indice) => (
            <li key={passo.titulo} className="card">
              <passo.icone className="h-8 w-8 text-marca-700" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">
                {indice + 1}. {passo.titulo}
              </h3>
              <p className="mt-2 text-slate-600">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Chamada final */}
      <section className="container-pagina">
        <div className="card flex flex-col items-start gap-4 bg-marca-50 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">É gestor da prefeitura?</h2>
            <p className="mt-1 text-slate-700">
              Entre com seu e-mail institucional para ver a fila por prioridade e atualizar o status.
            </p>
          </div>
          <Link to="/login" className="btn-primario">Entrar no painel</Link>
        </div>
      </section>
    </>
  )
}
