import { Route, Routes } from 'react-router-dom'
import { RotaProtegida } from './components/RotaProtegida'
import { MainLayout } from './layouts/MainLayout'
import { CadastroPage } from './pages/CadastroPage'
import { ContatoPage } from './pages/ContatoPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { IntegrantesPage } from './pages/IntegrantesPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NovaOcorrenciaPage } from './pages/NovaOcorrenciaPage'
import { OcorrenciaDetalhePage } from './pages/OcorrenciaDetalhePage'
import { OcorrenciasPage } from './pages/OcorrenciasPage'
import { SobrePage } from './pages/SobrePage'

// Mapa de rotas: todas as páginas ficam dentro do layout (Header + Footer)
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ocorrencias" element={<OcorrenciasPage />} />
        <Route path="ocorrencias/:id" element={<OcorrenciaDetalhePage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="integrantes" element={<IntegrantesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContatoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />

        {/* Só cidadão logado registra ocorrência */}
        <Route element={<RotaProtegida perfil="CIDADAO" />}>
          <Route path="ocorrencias/nova" element={<NovaOcorrenciaPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
