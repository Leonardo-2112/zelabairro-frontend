import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItemProps {
  pergunta: string
  resposta: string
}

// Item do acordeão: o botão abre e fecha a resposta (aria-expanded para leitores de tela)
export function FaqItem({ pergunta, resposta }: FaqItemProps) {
  const [aberto, setAberto] = useState(false)
  const idResposta = useId()

  return (
    <div className="card p-0">
      <h2 className="text-base">
        <button
          type="button"
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-3 text-left font-semibold text-slate-900"
          aria-expanded={aberto}
          aria-controls={idResposta}
          onClick={() => setAberto((valor) => !valor)}
        >
          {pergunta}
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-marca-700 transition-transform ${aberto ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div id={idResposta} hidden={!aberto} className="px-5 pb-5 text-slate-700">
        {resposta}
      </div>
    </div>
  )
}
