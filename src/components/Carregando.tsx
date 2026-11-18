import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'

interface CarregandoProps {
  texto?: string
}

// Estado "carregando". Se demorar, avisa que a API gratuita pode estar acordando.
export function Carregando({ texto = 'Carregando…' }: CarregandoProps) {
  const [demorando, setDemorando] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDemorando(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-12 text-center">
      <LoaderCircle className="h-10 w-10 animate-spin text-marca-700" aria-hidden="true" />
      <p className="font-medium text-slate-700">{texto}</p>
      {demorando && (
        <p className="max-w-md text-sm text-slate-600">
          A API usa um servidor gratuito que “dorme” sem uso. No primeiro acesso ela pode levar
          até 1 minuto para responder. Aguarde só mais um pouco.
        </p>
      )}
    </div>
  )
}
