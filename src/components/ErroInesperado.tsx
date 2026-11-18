import type { FallbackProps } from 'react-error-boundary'

// Tela mostrada pelo ErrorBoundary se algum componente quebrar durante a renderização
export function ErroInesperado({ resetErrorBoundary }: FallbackProps) {
  return (
    <section className="container-pagina py-16 text-center" role="alert">
      <h1 className="text-2xl font-bold">Ops, algo deu errado nesta página.</h1>
      <p className="mt-2 text-slate-600">Tente de novo. Se continuar, volte para o início.</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" className="btn-primario" onClick={resetErrorBoundary}>Tentar novamente</button>
        <a href="/" className="btn-secundario">Ir para o início</a>
      </div>
    </section>
  )
}
