import { Link } from 'react-router-dom'

// Página 404: qualquer rota que não existe cai aqui
export function NotFoundPage() {
  return (
    <section className="container-pagina py-16 text-center">
      <p className="font-display text-6xl font-bold text-marca-700">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-slate-600">O endereço digitado não existe ou mudou de lugar.</p>
      <Link to="/" className="btn-primario mt-6">Voltar para o início</Link>
    </section>
  )
}
