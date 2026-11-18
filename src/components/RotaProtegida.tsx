import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import type { Perfil } from '../types/usuario'

interface RotaProtegidaProps {
  perfil: Perfil // perfil que pode ver as rotas filhas
}

// Protege rotas: sem login manda para /login; com perfil errado mostra aviso.
// É só conforto visual: quem barra de verdade é a API (403, RN16).
export function RotaProtegida({ perfil }: RotaProtegidaProps) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    const mensagem =
      perfil === 'GESTOR' ? 'Entre com uma conta de gestor para acessar o painel.' : 'Entre na sua conta para continuar.'
    return <Navigate to="/login" replace state={{ de: location.pathname, mensagem }} />
  }

  if (usuario.perfil !== perfil) {
    return (
      <section className="container-pagina py-12">
        <div className="card mx-auto max-w-lg text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-destaque-500" aria-hidden="true" />
          <h1 className="mt-3 text-2xl font-bold">Área restrita</h1>
          <p className="mt-2 text-slate-600">
            {perfil === 'GESTOR'
              ? 'Esta página é só para gestores da prefeitura.'
              : 'Esta ação é feita por cidadãos. Entre com uma conta de cidadão.'}
          </p>
          <Link to="/" className="btn-primario mt-5">Voltar ao início</Link>
        </div>
      </section>
    )
  }

  return <Outlet />
}
