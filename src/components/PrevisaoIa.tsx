import { Sparkles } from 'lucide-react'
import type { RiscoAtraso } from '../types/ocorrencia'
import { plural } from '../utils/formatar'

interface PrevisaoIaProps {
  prazoPrevistoDias: number | null
  riscoAtraso: RiscoAtraso | null
  compacta?: boolean
}

// Previsão da IA como a API Java grava (Documento Base 7.4): sempre estimativa, sem porcentagem.
// O front nunca chama a IA; se a previsão veio nula (RN12), mostra "previsão indisponível".
export function PrevisaoIa({ prazoPrevistoDias, riscoAtraso, compacta = false }: PrevisaoIaProps) {
  const disponivel = prazoPrevistoDias != null
  const texto = disponivel
    ? `Previsão: cerca de ${plural(prazoPrevistoDias, 'dia', 'dias')}` +
      (riscoAtraso ? ` · risco de atraso ${riscoAtraso === 'ALTO' ? 'alto' : 'baixo'}` : '')
    : 'Previsão indisponível'

  if (compacta) {
    return <p className={`text-sm ${disponivel ? 'text-marca-800' : 'text-slate-500'}`}>{texto}</p>
  }

  return (
    <div className={`flex items-start gap-3 rounded-xl p-4 ${disponivel ? 'bg-marca-50 text-marca-900' : 'bg-slate-100 text-slate-700'}`}>
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{texto}</p>
        <p className="mt-1 text-sm">
          {disponivel
            ? 'Estimativa calculada por IA com o histórico real de chamados do SP156.'
            : 'O serviço de IA não respondeu quando a ocorrência foi registrada. Ela segue normalmente na fila.'}
        </p>
      </div>
    </div>
  )
}
