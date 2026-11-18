import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { ImagePlus, Trash2 } from 'lucide-react'

// RN18: até 3 fotos, só JPG ou PNG, até 2 MB cada
const MAX_FOTOS = 3
const MAX_BYTES = 2 * 1024 * 1024
const TIPOS_ACEITOS = ['image/jpeg', 'image/png']

interface CampoFotosProps {
  fotos: File[]
  onMudar: (fotos: File[]) => void
}

// Escolha das fotos com validação e pré-visualização (as fotos sobem depois do POST da ocorrência)
export function CampoFotos({ fotos, onMudar }: CampoFotosProps) {
  const [erro, setErro] = useState<string | null>(null)
  const [previas, setPrevias] = useState<string[]>([])

  // Cria um endereço temporário para mostrar cada foto e libera a memória depois
  useEffect(() => {
    const urls = fotos.map((foto) => URL.createObjectURL(foto))
    setPrevias(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [fotos])

  function escolher(evento: ChangeEvent<HTMLInputElement>) {
    const escolhidas = Array.from(evento.target.files ?? [])
    evento.target.value = '' // permite escolher o mesmo arquivo de novo
    const validas: File[] = []
    const problemas: string[] = []

    for (const arquivo of escolhidas) {
      if (!TIPOS_ACEITOS.includes(arquivo.type)) {
        problemas.push(`${arquivo.name}: só JPG ou PNG.`)
      } else if (arquivo.size > MAX_BYTES) {
        problemas.push(`${arquivo.name}: maior que 2 MB.`)
      } else {
        validas.push(arquivo)
      }
    }

    const total = [...fotos, ...validas]
    if (total.length > MAX_FOTOS) {
      problemas.push(`No máximo ${MAX_FOTOS} fotos por ocorrência.`)
    }
    setErro(problemas.length > 0 ? problemas.join(' ') : null)
    onMudar(total.slice(0, MAX_FOTOS))
  }

  function remover(indice: number) {
    onMudar(fotos.filter((_, i) => i !== indice))
    setErro(null)
  }

  return (
    <div>
      <p className="rotulo">Fotos (opcional)</p>
      {/* O input fica escondido (sr-only, mas acessível pelo teclado); a caixa abaixo é o <label> dele */}
      <input
        id="fotos"
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="peer sr-only"
        disabled={fotos.length >= MAX_FOTOS}
        aria-describedby="fotos-ajuda"
        onChange={escolher}
      />
      <label
        htmlFor="fotos"
        className={`flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-center text-slate-600 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque-500 hover:border-marca-600 ${
          fotos.length >= MAX_FOTOS ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <ImagePlus className="h-7 w-7 text-marca-700" aria-hidden="true" />
        <span className="font-semibold text-marca-800">Escolher fotos</span>
        <span className="text-sm">JPG ou PNG, até 2 MB cada, no máximo 3 ({fotos.length}/3)</span>
      </label>
      <div id="fotos-ajuda">
        {erro && <p className="erro-campo" role="alert">{erro}</p>}
      </div>

      {fotos.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {fotos.map((foto, indice) => (
            <li key={`${foto.name}-${indice}`} className="relative">
              {previas[indice] && (
                <img
                  src={previas[indice]}
                  alt={`Pré-visualização da foto ${indice + 1}: ${foto.name}`}
                  className="aspect-square w-full rounded-xl border border-slate-200 object-cover"
                />
              )}
              <button
                type="button"
                className="absolute top-1 right-1 rounded-full bg-white/90 p-2 text-red-700 shadow hover:bg-white"
                aria-label={`Remover a foto ${indice + 1}`}
                onClick={() => remover(indice)}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
