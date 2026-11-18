import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CampoTexto } from '../components/CampoTexto'
import { MensagemErro } from '../components/MensagemErro'
import { cadastrarCidadao } from '../services/api'
import type { NovoCidadao } from '../types/usuario'
import { aplicarErrosDaApi } from '../utils/errosFormulario'

// O formulário tem um campo a mais que a API: a confirmação da senha
interface FormCadastro extends Required<NovoCidadao> {
  confirmarSenha: string
}

// Página de cadastro do cidadão (POST /cidadaos). Gestor só é criado por outro gestor.
export function CadastroPage() {
  const navigate = useNavigate()
  const [erroApi, setErroApi] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormCadastro>()

  async function enviar(dados: FormCadastro) {
    setErroApi(null)
    try {
      await cadastrarCidadao({
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        senha: dados.senha,
        telefone: dados.telefone.trim() || undefined,
      })
      navigate('/login', { state: { mensagem: 'Conta criada! Agora entre com seu e-mail e senha.' } })
    } catch (erro) {
      // 409 = e-mail já cadastrado (RN02); 400 = campos inválidos
      setErroApi(aplicarErrosDaApi(erro, setError))
    }
  }

  return (
    <section className="container-pagina flex justify-center py-12">
      <div className="card w-full max-w-lg">
        <h1 className="text-3xl font-bold">Criar conta</h1>
        <p className="mt-2 text-slate-600">
          Com a conta você registra e apoia ocorrências. Não pedimos CPF nem endereço.
        </p>

        <form noValidate onSubmit={handleSubmit(enviar)} className="mt-6 space-y-5">
          {erroApi && <MensagemErro mensagem={erroApi} />}
          <CampoTexto
            id="nome"
            rotulo="Nome completo"
            autoComplete="name"
            erro={errors.nome?.message}
            registro={register('nome', {
              required: 'Informe seu nome.',
              minLength: { value: 3, message: 'O nome deve ter de 3 a 100 caracteres.' },
              maxLength: { value: 100, message: 'O nome deve ter de 3 a 100 caracteres.' },
            })}
          />
          <CampoTexto
            id="email"
            rotulo="E-mail"
            tipo="email"
            autoComplete="email"
            erro={errors.email?.message}
            registro={register('email', {
              required: 'Informe seu e-mail.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Digite um e-mail válido.' },
            })}
          />
          <CampoTexto
            id="telefone"
            rotulo="Telefone (opcional)"
            tipo="tel"
            autoComplete="tel"
            placeholder="(11) 98888-7777"
            erro={errors.telefone?.message}
            registro={register('telefone', {
              pattern: { value: /^[0-9()+\- ]{8,20}$/, message: 'Use só números, espaço, parênteses e hífen.' },
            })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <CampoTexto
              id="senha"
              rotulo="Senha"
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
            <CampoTexto
              id="confirmarSenha"
              rotulo="Confirme a senha"
              tipo="password"
              autoComplete="new-password"
              erro={errors.confirmarSenha?.message}
              registro={register('confirmarSenha', {
                required: 'Repita a senha.',
                validate: (valor) => valor === getValues('senha') || 'As senhas não são iguais.',
              })}
            />
          </div>
          <button type="submit" className="btn-primario w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta…' : 'Criar conta'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-marca-700 underline">Entrar</Link>
        </p>
      </div>
    </section>
  )
}
