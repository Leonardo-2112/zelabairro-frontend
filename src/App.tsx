import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RotaProtegida } from './components/RotaProtegida'
import { MainLayout } from './layouts/MainLayout'

// lazy(): cada página vira um arquivo separado no build e só é baixada quando a rota abre
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const SobrePage = lazy(() => import('./pages/SobrePage').then((m) => ({ default: m.SobrePage })))
const IntegrantesPage = lazy(() => import('./pages/IntegrantesPage').then((m) => ({ default: m.IntegrantesPage })))
const FaqPage = lazy(() => import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })))
const ContatoPage = lazy(() => import('./pages/ContatoPage').then((m) => ({ default: m.ContatoPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const CadastroPage = lazy(() => import('./pages/CadastroPage').then((m) => ({ default: m.CadastroPage })))
const OcorrenciasPage = lazy(() => import('./pages/OcorrenciasPage').then((m) => ({ default: m.OcorrenciasPage })))
const OcorrenciaDetalhePage = lazy(() =>
  import('./pages/OcorrenciaDetalhePage').then((m) => ({ default: m.OcorrenciaDetalhePage })),
)
const NovaOcorrenciaPage = lazy(() => import('./pages/NovaOcorrenciaPage').then((m) => ({ default: m.NovaOcorrenciaPage })))
const PainelPage = lazy(() => import('./pages/PainelPage').then((m) => ({ default: m.PainelPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

// Mapa de rotas: todas as páginas ficam dentro do layout (Header + Footer)
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Institucionais */}
        <Route index element={<HomePage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="integrantes" element={<IntegrantesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContatoPage />} />

        {/* Solução */}
        <Route path="ocorrencias" element={<OcorrenciasPage />} />
        <Route path="ocorrencias/:id" element={<OcorrenciaDetalhePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />

        {/* Só cidadão logado registra ocorrência */}
        <Route element={<RotaProtegida perfil="CIDADAO" />}>
          <Route path="ocorrencias/nova" element={<NovaOcorrenciaPage />} />
        </Route>

        {/* Painel: só gestor (a API confere de novo pelo X-Gestor-Id) */}
        <Route element={<RotaProtegida perfil="GESTOR" />}>
          <Route path="painel" element={<PainelPage />} />
        </Route>

        {/* Qualquer outro endereço */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
