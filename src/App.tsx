// Vitrine do tema: confere as cores, fontes e classes reutilizáveis do index.css
function App() {
  return (
    <main className="container-pagina py-12">
      <h1 className="titulo-pagina">ZelaBairro</h1>
      <p className="mt-2 text-slate-600">Tema visual carregado.</p>
      <div className="card mt-6 flex flex-wrap gap-3">
        <button type="button" className="btn-primario">Primário</button>
        <button type="button" className="btn-secundario">Secundário</button>
        <button type="button" className="btn-destaque">Destaque</button>
        <span className="badge bg-marca-100 text-marca-800">Badge</span>
      </div>
    </main>
  )
}

export default App
