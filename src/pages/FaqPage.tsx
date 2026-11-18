import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { FaqItem } from '../components/FaqItem'
import { perguntas } from '../data/faq'

// Página FAQ: lista de perguntas em acordeão
export function FaqPage() {
  return (
    <>
      <CabecalhoPagina titulo="Perguntas frequentes" subtitulo="Dúvidas comuns de quem usa o ZelaBairro." />
      <div className="container-pagina max-w-3xl space-y-3 py-12">
        {perguntas.map((item) => (
          <FaqItem key={item.pergunta} pergunta={item.pergunta} resposta={item.resposta} />
        ))}
      </div>
    </>
  )
}
