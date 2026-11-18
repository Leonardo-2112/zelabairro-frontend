import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Carregando } from '../components/Carregando'
import { ErroInesperado } from '../components/ErroInesperado'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

// Estrutura comum de todas as páginas: cabeçalho, conteúdo da rota e rodapé
export function MainLayout() {
  const location = useLocation()

  // Ao trocar de página, volta ao topo
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Atalho para quem navega pelo teclado */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        {/* ErrorBoundary: um erro numa página não derruba o site inteiro.
            Suspense: mostra "Carregando" enquanto o código da página (lazy) chega. */}
        <ErrorBoundary FallbackComponent={ErroInesperado} resetKeys={[location.pathname]}>
          <Suspense fallback={<Carregando />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
