import { CabecalhoPagina } from '../components/CabecalhoPagina'

interface Bloco {
  titulo: string
  texto: string
}

// Dores que o ZelaBairro resolve (Documento Base, seção 3.2)
const dores: Bloco[] = [
  {
    titulo: 'Do cidadão',
    texto: 'Não sabe se o pedido foi recebido, quanto vai demorar nem se alguém já reclamou do mesmo problema. Sem retorno, desiste.',
  },
  {
    titulo: 'Da prefeitura',
    texto: 'Recebe chamados misturados, muitos duplicados e sem critério claro de urgência.',
  },
  {
    titulo: 'Da cidade',
    texto: 'Buraco vira acidente, bueiro vira alagamento e a diferença entre bairros cresce.',
  },
]

// Diferenciais da solução (seção 4.3)
const diferenciais: Bloco[] = [
  {
    titulo: 'Prioridade explicável',
    texto: 'A fila não é por ordem de chegada: soma gravidade, apoios, dias em aberto e risco de atraso.',
  },
  {
    titulo: 'Previsão com dados reais',
    texto: 'Prazo e risco de atraso estimados por modelos treinados com quase 1 milhão de chamados do SP156.',
  },
  {
    titulo: 'Menos duplicados',
    texto: 'Dez reclamações iguais viram uma ocorrência com dez apoios, o que mostra a urgência.',
  },
  {
    titulo: 'Transparência por bairro',
    texto: 'O painel mostra onde o atendimento demora mais e ajuda a reduzir desigualdades.',
  },
]

// Página Sobre: problema, solução, regra de prioridade e ODS
export function SobrePage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Sobre o ZelaBairro"
        subtitulo="Uma plataforma em que o cidadão registra e apoia problemas de zeladoria do bairro, e a prefeitura recebe tudo agrupado, com prazo previsto e risco de atraso calculados por IA."
      />

      <div className="container-pagina space-y-14 py-12">
        <section aria-labelledby="titulo-problema">
          <h2 id="titulo-problema" className="text-2xl font-bold">O problema</h2>
          <p className="mt-3 max-w-3xl text-slate-700">
            Só em São Paulo, o canal SP156 recebe cerca de 157 mil solicitações por mês. Moradores
            de bairros periféricos e pessoas com mobilidade reduzida são os mais afetados pela demora.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {dores.map((dor) => (
              <article key={dor.titulo} className="card">
                <h3 className="text-lg font-semibold">{dor.titulo}</h3>
                <p className="mt-2 text-slate-600">{dor.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="titulo-solucao">
          <h2 id="titulo-solucao" className="text-2xl font-bold">A solução</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {diferenciais.map((item) => (
              <article key={item.titulo} className="card border-l-4 border-l-marca-600">
                <h3 className="text-lg font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-slate-600">{item.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="titulo-prioridade" className="card bg-white">
          <h2 id="titulo-prioridade" className="text-2xl font-bold">Como a prioridade é calculada</h2>
          <p className="mt-3 text-slate-700">A fórmula é pública e simples (regra RN10):</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
            <li>gravidade da categoria × 10;</li>
            <li>+ 2 pontos por apoio (até 20 apoios);</li>
            <li>+ 1 ponto por dia em aberto (até 30 dias);</li>
            <li>+ 15 pontos se houver risco de atraso ou se já estiver atrasada.</li>
          </ul>
          <p className="mt-3 text-slate-700">
            70 pontos ou mais: <strong>alta</strong> · 40 a 69: <strong>média</strong> · abaixo de 40:{' '}
            <strong>baixa</strong>.
          </p>
        </section>

        <section aria-labelledby="titulo-ods">
          <h2 id="titulo-ods" className="text-2xl font-bold">Objetivos de Desenvolvimento Sustentável</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="card">
              <p className="badge bg-destaque-100 text-slate-900">ODS 11</p>
              <h3 className="mt-2 text-lg font-semibold">Cidades e comunidades sustentáveis</h3>
              <p className="mt-2 text-slate-600">
                Gestão participativa (meta 11.3) e redução de impactos de desastres, como alagamentos
                causados por bueiros entupidos (meta 11.5).
              </p>
            </article>
            <article className="card">
              <p className="badge bg-destaque-100 text-slate-900">ODS 10</p>
              <h3 className="mt-2 text-lg font-semibold">Redução das desigualdades</h3>
              <p className="mt-2 text-slate-600">
                O resumo por bairro deixa visível onde o atendimento demora mais.
              </p>
            </article>
          </div>
        </section>
      </div>
    </>
  )
}
