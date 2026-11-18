# ZelaBairro · Front-end

> Zeladoria urbana com participação do cidadão e prioridade explicável.
> Global Solution 2026/2 · FIAP · 1TDSPV · Tema **CitizenTech** · Front-End Design Engineering

## Objetivo

O **ZelaBairro** é uma plataforma em que o cidadão registra e apoia problemas de zeladoria do bairro (buraco na rua, poste apagado, lixo na calçada, bueiro entupido...) e a prefeitura recebe esses chamados já agrupados, com **prazo previsto e risco de atraso calculados por IA**, para atender primeiro o que é mais urgente.

Este repositório é a **SPA em React** que consome a **API REST em Java** do projeto (publicada no Render). O front não usa dados simulados: toda lista, detalhe, cadastro e mudança de status vem da API.

## Links

| O quê | Endereço |
| --- | --- |
| Repositório (GitHub) | https://github.com/Leonardo-2112/zelabairro-frontend |
| Aplicação publicada (Vercel) | https://zelabairro-frontend.vercel.app |
| API Java (Render) | https://zelabairro-api-08ut.onrender.com |
| Vídeo no YouTube (até 3 min) | `[colar o link do vídeo]` |

> A API usa o plano gratuito do Render, que “dorme” sem uso: o **primeiro acesso pode levar até 1 minuto**. A tela mostra um aviso enquanto isso.

## Tecnologias

- **React 19** + **Vite** (SPA) + **TypeScript** com `strict`
- **Tailwind CSS 4** (tema com `@theme` e classes próprias em `src/index.css`)
- **React Router 7** (rotas fixas, rota com parâmetro `/ocorrencias/:id`, rotas protegidas e 404)
- **React Hook Form** (validação dos formulários)
- **Fetch API** para todas as requisições (sem Axios nem outra biblioteca HTTP), centralizada em `src/services/api.ts`
- `lucide-react` (ícones) e `react-error-boundary` (tela de erro inesperado)
- Deploy na **Vercel** (`vercel.json` reescreve todas as rotas para o `index.html`)

## Páginas e rotas

| Rota | Página | Tipo | API |
| --- | --- | --- | --- |
| `/` | Início | Institucional | — |
| `/sobre` | Sobre: problema, solução, regra de prioridade e ODS | Institucional | — |
| `/integrantes` | Integrantes do grupo | Institucional | — |
| `/faq` | Perguntas frequentes (acordeão) | Institucional | — |
| `/contato` | Formulário de contato com validação | Institucional | — |
| `/ocorrencias` | Lista com filtros (status, bairro, categoria) e prioridade | Solução | `GET /ocorrencias`, `/categorias`, `/bairros` |
| `/ocorrencias/:id` | Detalhe, previsão da IA, fotos, histórico e botão Apoiar | Solução (parâmetro) | `GET /ocorrencias/{id}`, `/atualizacoes`, `/fotos`; `POST /apoios` |
| `/ocorrencias/nova` | Registro com sugestão de apoio (RN07) e até 3 fotos | Solução · cidadão logado | `POST /ocorrencias`, `POST /ocorrencias/{id}/fotos` |
| `/login` · `/cadastro` | Entrar e criar conta de cidadão | Solução | `POST /auth/login`, `POST /cidadaos` |
| `/painel` | Fila por prioridade, mudar status, resumo por bairro, cadastrar gestor | Solução · só gestor | `GET /painel/bairros`, `POST /atualizacoes`, `GET /orgaos`, `POST /gestores` |
| `*` | Página não encontrada (404) | — | — |

Toda tela que chama a API mostra **carregando**, **erro** (com “Tentar novamente”) e **lista vazia**. Os erros da API chegam no formato `{status, erro, mensagem, caminho, timestamp, campos}`; os `campos[]` aparecem embaixo do campo certo do formulário.

**Previsão da IA:** o front nunca chama a IA. A API Java consulta a IA quando a ocorrência é criada e grava o resultado; o site mostra “Previsão: cerca de N dias · risco de atraso alto/baixo” (sem porcentagem) ou “Previsão indisponível” quando a IA não respondeu.

**Login:** a API devolve `{id, nome, perfil}`, que fica no `localStorage` (`AuthContext`). O menu **Painel** só aparece para gestor, e as rotas de gestor enviam o cabeçalho `X-Gestor-Id` (as fotos enviam `X-Cidadao-Id`). Quem bloqueia de verdade é a API (403).

## Estrutura de pastas

```
zelabairro-frontend/
├── index.html            página base (lang pt-BR, fontes)
├── vercel.json           rewrite da SPA para a Vercel
├── .env.example          modelo da variável VITE_API_URL
├── identificacao.txt     RM, nome e turma dos integrantes
├── public/               favicon e fotos dos integrantes (img/integrantes)
└── src/
    ├── main.tsx          ponto de entrada (BrowserRouter + AuthProvider)
    ├── App.tsx           mapa de rotas (lazy + rotas protegidas + 404)
    ├── index.css         Tailwind: tema (@theme) e classes reutilizáveis
    ├── components/       componentes reutilizáveis (Header, OcorrenciaCard, StatusBadge, Carregando...)
    ├── contexts/         AuthContext (sessão do usuário)
    ├── data/             conteúdo fixo das páginas institucionais
    ├── hooks/            useRequisicao, useOcorrencias, useOcorrencia, useCatalogo, useAuth
    ├── layouts/          MainLayout (Header + página + Footer, ErrorBoundary e Suspense)
    ├── pages/            uma página por rota
    ├── services/api.ts   única porta de saída para a API (fetch)
    ├── types/            interfaces dos JSON da API
    └── utils/            formatação de datas/textos e erros de formulário
```

## Como rodar

Pré-requisito: **Node.js 20.19 ou mais novo** (ou 22.12+), exigência do Vite 8.

```bash
npm install
cp .env.example .env        # no Windows (cmd): copy .env.example .env
npm run dev
```

Abra http://localhost:5173. O `.env` define o endereço da API:

```
VITE_API_URL=https://zelabairro-api-08ut.onrender.com
```

Outros comandos: `npm run build` (gera a pasta `dist`) e `npm run preview` (abre o build).

**Na Vercel:** importar o repositório `zelabairro-frontend` (preset Vite) e cadastrar `VITE_API_URL` em *Settings → Environment Variables*. A URL da Vercel precisa estar na variável `CORS_ORIGINS` da API Java.

## Integrantes

| Nome | RM | Turma | Parte no front |
| --- | --- | --- | --- |
| Leonardo Afonço Sousa (representante) | 573982 | 1TDSPV | Base do projeto, tema, rotas, tipos e camada de serviços |
| Syang Cristina Gomes Souza | 569259 | 1TDSPV | Páginas institucionais e formulário de contato |
| Matheus Jones Sousa de Freitas | 573559 | 1TDSPV | Login, cadastro, sessão, resumo por bairro e cadastro de gestor |
| Vitor Goncalves de Souza | 569023 | 1TDSPV | Lista, filtros, detalhe, histórico, fotos e apoio |
| Joao Machado Nascimento | 572364 | 1TDSPV | Registro de ocorrência, fotos, previsão e fila do painel |

## Contato

Dúvidas sobre o projeto: abra uma *issue* neste repositório ou use a página **Contato** do site. Perfis dos integrantes na página **Integrantes**.

## Limitações conhecidas

- O login não usa token: o id do usuário vai no cabeçalho e pode ser forjado. Para um MVP acadêmico é aceitável; a próxima etapa é JWT.
- A previsão depende do serviço de IA estar no ar; sem ele, as ocorrências são criadas normalmente com “previsão indisponível”.
