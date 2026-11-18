import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { useRequisicao } from '../hooks/useRequisicao'
import { cadastrarGestor, listarOrgaos } from '../services/api'
import { aplicarErrosDaApi } from '../utils/errosFormulario'
import { CampoFormulario } from './CampoFormulario'
import { CampoTexto } from './CampoTexto'
import { Carregando } from './Carregando'
import { MensagemErro } from './MensagemErro'

interface FormGestor {
  nome: string
  email: string
  senha: string
  idOrgao: string // vem do <select> como texto
}

// Formulário do painel: um gestor cadastra outro gestor (POST /gestores com X-Gestor-Id)
export function CadastroGestor() {
  const { usuario } = useAuth()
  const { dados: orgaos, carregando, erro, recarregar } = useRequisicao(listarOrgaos, [])
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormGestor>({ defaultValues: { nome: '', email: '', senha: '', idOrgao: '' } })

  async function enviar(dados: FormGestor) {
    if (!usuario) return
    setErroApi(null)
    setSucesso(null)
    try {
      const gestor = await cadastrarGestor(
        { nome: dados.nome.trim(), email: dados.email.trim(), senha: dados.senha, idOrgao: Number(dados.idOrgao) },
        usuario.id,
      )
      setSucesso(`Gestor ${gestor.nome} cadastrado no órgão ${gestor.orgao}. Ele já pode entrar com o e-mail informado.`)
      reset()
    } catch (e) {
      // 409 = e-mail já usado por cidadão ou gestor (RN02)
      setErroApi(aplicarErrosDaApi(e, setError))
    }
  }

  if (carregando) return <Carregando texto="Carregando órgãos…" />
  if (erro || !orgaos) return <MensagemErro mensagem={erro ?? 'Erro ao carregar os órgãos.'} onTentarNovamente={recarregar} />

  return (
    <form noValidate onSubmit={handleSubmit(enviar)} className="card max-w-3xl space-y-5">
      <div aria-live="polite">
        {sucesso && <p className="rounded-xl bg-green-50 p-3 font-medium text-green-800">{sucesso}</p>}
      </div>
      {erroApi && <MensagemErro mensagem={erroApi} />}

      <div className="grid gap-5 md:grid-cols-2">
        <CampoTexto
          id="gestor-nome"
          rotulo="Nome completo"
          erro={errors.nome?.message}
          registro={register('nome', {
            required: 'Informe o nome.',
            minLength: { value: 3, message: 'O nome deve ter de 3 a 100 caracteres.' },
            maxLength: { value: 100, message: 'O nome deve ter de 3 a 100 caracteres.' },
          })}
        />
        <CampoTexto
          id="gestor-email"
          rotulo="E-mail institucional"
          tipo="email"
          autoComplete="off"
          erro={errors.email?.message}
          registro={register('email', {
            required: 'Informe o e-mail.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Digite um e-mail válido.' },
          })}
        />
        <CampoTexto
          id="gestor-senha"
          rotulo="Senha inicial"
          tipo="password"
          autoComplete="new-password"
          dica="Mínimo de 6 caracteres."
          erro={errors.senha?.message}
          registro={register('senha', {
            required: 'Crie uma senha.',
            minLength: { value: 6, message: 'A senha deve ter de 6 a 60 caracteres.' },
            maxLength: { value: 60, message: 'A senha deve ter de 6 a 60 caracteres.' },
          })}
        />
        <CampoFormulario id="gestor-orgao" rotulo="Órgão" erro={errors.idOrgao?.message}>
          <select
            id="gestor-orgao"
            className="campo"
            aria-invalid={errors.idOrgao ? true : undefined}
            aria-describedby="gestor-orgao-ajuda"
            {...register('idOrgao', { required: 'Escolha o órgão.' })}
          >
            <option value="">Selecione…</option>
            {orgaos.map((orgao) => (
              <option key={orgao.id} value={orgao.id}>{orgao.nome}</option>
            ))}
          </select>
        </CampoFormulario>
      </div>

      <button type="submit" className="btn-primario" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando…' : 'Cadastrar gestor'}
      </button>
    </form>
  )
}
