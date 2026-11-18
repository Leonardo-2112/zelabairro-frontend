import { listarBairros, listarCategorias } from '../services/api'
import type { Bairro, Categoria } from '../types/catalogo'
import { useRequisicao } from './useRequisicao'

interface Catalogo {
  categorias: Categoria[]
  bairros: Bairro[]
}

// Busca categorias e bairros ao mesmo tempo (Promise.all) para montar os <select>
export function useCatalogo() {
  return useRequisicao<Catalogo>(async () => {
    const [categorias, bairros] = await Promise.all([listarCategorias(), listarBairros()])
    return { categorias, bairros }
  }, [])
}
