import { Link } from 'react-router-dom'
import { Logo } from './Logo'

// Rodapé com atalhos e identificação do projeto acadêmico
export function Footer() {
  return (
    <footer className="mt-16 bg-marca-900 text-marca-50">
      <div className="container-pagina grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Logo claro />
          <p className="mt-3 text-sm text-marca-100">
            Zeladoria urbana com participação do cidadão e prioridade explicável.
          </p>
        </div>
        <nav aria-label="Links do rodapé">
          <h2 className="font-display text-base font-semibold text-white">Navegação</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <li><Link className="hover:underline" to="/ocorrencias">Ocorrências</Link></li>
            <li><Link className="hover:underline" to="/sobre">Sobre</Link></li>
            <li><Link className="hover:underline" to="/integrantes">Integrantes</Link></li>
            <li><Link className="hover:underline" to="/faq">FAQ</Link></li>
            <li><Link className="hover:underline" to="/contato">Contato</Link></li>
          </ul>
        </nav>
        <div className="text-sm text-marca-100">
          <h2 className="font-display text-base font-semibold text-white">Global Solution 2026/2</h2>
          <p className="mt-3">FIAP · 1TDSPV · Tema CitizenTech</p>
          <p className="mt-1">Projeto acadêmico, sem vínculo com a prefeitura.</p>
        </div>
      </div>
    </footer>
  )
}
