/// <reference types="vite/client" />

// Tipagem das variáveis de ambiente do Vite (arquivo .env)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
