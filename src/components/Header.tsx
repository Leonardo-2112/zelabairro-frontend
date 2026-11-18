import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

interface ItemMenu {
  rota: string
  texto: string
}

// Links do menu principal (os mesmos no desktop e no mobile)
const itensMenu: ItemMenu[] = [
  { rota: '/', texto: 'Início' },
  { rota: '/ocorrencias', texto: 'Ocorrências' },
  { rota: '/sobre', texto: 'Sobre' },
  { rota: '/integrantes', texto: 'Integrantes' },
  { rota: '/faq', texto: 'FAQ' },
  { rota: '/contato', texto: 'Contato' },
]

// Destaca o link da página atual
function classeLink({ isActive }: { isActive: boolean }) {
  return `block rounded-lg px-3 py-2 font-medium transition-colors ${
    isActive ? 'bg-marca-100 text-marca-800' : 'text-slate-700 hover:bg-slate-100'
  }`
}

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const location = useLocation()

  // Fecha o menu mobile sempre que a rota muda
  useEffect(() => {
    setMenuAberto(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container-pagina flex min-h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="ZelaBairro, página inicial">
          <Logo />
        </Link>

        {/* Menu do desktop */}
        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {itensMenu.map((item) => (
              <li key={item.rota}>
                <NavLink to={item.rota} end={item.rota === '/'} className={classeLink}>
                  {item.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/login" className="btn-secundario">Entrar</Link>
        </div>

        {/* Botão do menu mobile (aria-expanded avisa o leitor de tela) */}
        <button
          type="button"
          className="btn px-3 text-slate-800 hover:bg-slate-100 lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Menu mobile: só aparece quando aberto */}
      {menuAberto && (
        <nav id="menu-mobile" aria-label="Menu principal" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="container-pagina flex flex-col gap-1 py-3">
            {itensMenu.map((item) => (
              <li key={item.rota}>
                <NavLink to={item.rota} end={item.rota === '/'} className={classeLink}>
                  {item.texto}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <Link to="/login" className="btn-secundario w-full">Entrar</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
