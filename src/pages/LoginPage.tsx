import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CampoTexto } from '../components/CampoTexto'
import { MensagemErro } from '../components/MensagemErro'
import { useAuth } from '../hooks/useAuth'
import { login } from '../services/api'
import type { DadosLogin } from '../types/usuario'
import { aplicarErrosDaApi } from '../utils/errosFormulario'

// Dados que a RotaProtegida manda quando redireciona para cá
interface EstadoRedirecionamento {
  de?: string
  mensagem?: string
}

// Página de login: o mesmo formulário serve para cidadão e gestor (a API diz o perfil)
export function LoginPage() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const estado = (location.state ?? {}) as EstadoRedirecionamento
  const [erroApi, setErroApi] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DadosLogin>()

  async function enviar(dados: DadosLogin) {
    setErroApi(null)
    try {
      const sessao = await login(dados)
      entrar(sessao)
      // Volta para onde a pessoa queria ir; senão, gestor vai ao painel e cidadão às ocorrências
      const destino = estado.de ?? (sessao.perfil === 'GESTOR' ? '/painel' : '/ocorrencias')
      navigate(destino, { replace: true })
    } catch (erro) {
      setErroApi(aplicarErrosDaApi(erro, setError))
    }
  }

  return (
    <section className="container-pagina flex justify-center py-12">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <p className="mt-2 text-slate-600">Use o e-mail e a senha da sua conta.</p>

        {estado.mensagem && (
          <p role="status" className="mt-4 rounded-xl bg-destaque-100 p-3 text-slate-900">
            {estado.mensagem}
          </p>
        )}

        <form noValidate onSubmit={handleSubmit(enviar)} className="mt-6 space-y-5">
          {erroApi && <MensagemErro mensagem={erroApi} />}
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
            id="senha"
            rotulo="Senha"
            tipo="password"
            autoComplete="current-password"
            erro={errors.senha?.message}
            registro={register('senha', {
              required: 'Informe sua senha.',
              minLength: { value: 6, message: 'A senha tem pelo menos 6 caracteres.' },
            })}
          />
          <button type="submit" className="btn-primario w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-marca-700 underline">Cadastre-se</Link>
        </p>
      </div>
    </section>
  )
}
