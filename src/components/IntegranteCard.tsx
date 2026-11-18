import type { Integrante } from '../data/integrantes'

interface IntegranteCardProps {
  integrante: Integrante
}

// Cartão de um integrante: foto, nome, RM, turma e links
export function IntegranteCard({ integrante }: IntegranteCardProps) {
  return (
    <article className="card flex flex-col items-center text-center">
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        className="h-28 w-28 rounded-full border-4 border-marca-100 object-cover"
        width={112}
        height={112}
        loading="lazy"
      />
      <h2 className="mt-4 text-lg font-semibold">{integrante.nome}</h2>
      <p className="text-sm text-slate-600">
        RM {integrante.rm} · {integrante.turma}
      </p>
      {(integrante.github || integrante.linkedin) && (
        <div className="mt-4 flex gap-4 text-sm font-semibold">
          {integrante.github && (
            <a className="text-marca-700 underline" href={integrante.github} target="_blank" rel="noreferrer">
              GitHub<span className="sr-only"> de {integrante.nome}</span>
            </a>
          )}
          {integrante.linkedin && (
            <a className="text-marca-700 underline" href={integrante.linkedin} target="_blank" rel="noreferrer">
              LinkedIn<span className="sr-only"> de {integrante.nome}</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}
