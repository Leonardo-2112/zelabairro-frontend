// Logo do ZelaBairro: ícone de casa + nome (usado no Header e no Footer)
interface LogoProps {
  claro?: boolean
}

export function Logo({ claro = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0f766e" />
        <path d="M8 16 16 9l8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H9a1 1 0 0 1-1-1z" fill="#fff" />
      </svg>
      <span className={`font-display text-xl font-bold ${claro ? 'text-white' : 'text-slate-900'}`}>
        Zela<span className={claro ? 'text-marca-200' : 'text-marca-700'}>Bairro</span>
      </span>
    </span>
  )
}
