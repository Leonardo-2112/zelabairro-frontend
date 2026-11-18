import { AlertTriangle } from 'lucide-react'

interface MensagemErroProps {
  mensagem: string
  onTentarNovamente?: () => void
}

// Estado "erro": mostra a mensagem da API e, se houver, o botão para repetir
export function MensagemErro({ mensagem, onTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800 sm:flex-row sm:items-center">
      <AlertTriangle className="h-6 w-6 shrink-0" aria-hidden="true" />
      <p className="flex-1">{mensagem}</p>
      {onTentarNovamente && (
        <button type="button" className="btn border border-red-700 bg-white text-red-800 hover:bg-red-100" onClick={onTentarNovamente}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
