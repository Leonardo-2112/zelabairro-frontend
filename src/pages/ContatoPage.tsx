import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckCircle2 } from 'lucide-react'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoFormulario } from '../components/CampoFormulario'
import { CampoTexto } from '../components/CampoTexto'

// Campos do formulário de contato
interface FormContato {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

const assuntos = ['Dúvida sobre o uso', 'Sugestão', 'Problema no site', 'Quero levar para minha cidade']

// Página Contato: formulário validado com React Hook Form (não chama a API)
export function ContatoPage() {
  const [enviado, setEnviado] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormContato>({ defaultValues: { assunto: '' } })

  // O handleSubmit só chama esta função se todos os campos passarem na validação.
  // O contato é institucional: confirma o recebimento e limpa o formulário.
  function enviar() {
    setEnviado(true)
    reset()
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Contato"
        subtitulo="Tem uma dúvida, sugestão ou quer levar o ZelaBairro para a sua cidade? Escreva para o grupo."
      />
      <div className="container-pagina grid gap-8 py-12 lg:grid-cols-3">
        <form noValidate onSubmit={handleSubmit(enviar)} className="card space-y-5 lg:col-span-2">
          {enviado && (
            <div role="status" className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-green-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>Mensagem enviada! Obrigado pelo contato; responderemos pelo e-mail informado.</p>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <CampoTexto
              id="nome"
              rotulo="Nome"
              autoComplete="name"
              erro={errors.nome?.message}
              registro={register('nome', {
                required: 'Informe seu nome.',
                minLength: { value: 3, message: 'O nome deve ter pelo menos 3 letras.' },
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
          </div>

          <CampoFormulario id="assunto" rotulo="Assunto" erro={errors.assunto?.message}>
            <select
              id="assunto"
              className="campo"
              aria-invalid={errors.assunto ? true : undefined}
              aria-describedby="assunto-ajuda"
              {...register('assunto', { required: 'Escolha um assunto.' })}
            >
              <option value="">Selecione…</option>
              {assuntos.map((assunto) => (
                <option key={assunto} value={assunto}>{assunto}</option>
              ))}
            </select>
          </CampoFormulario>

          <CampoFormulario
            id="mensagem"
            rotulo="Mensagem"
            erro={errors.mensagem?.message}
            dica="Entre 10 e 500 caracteres."
          >
            <textarea
              id="mensagem"
              rows={5}
              className="campo"
              aria-invalid={errors.mensagem ? true : undefined}
              aria-describedby="mensagem-ajuda"
              {...register('mensagem', {
                required: 'Escreva sua mensagem.',
                minLength: { value: 10, message: 'A mensagem deve ter pelo menos 10 caracteres.' },
                maxLength: { value: 500, message: 'A mensagem deve ter no máximo 500 caracteres.' },
              })}
            />
          </CampoFormulario>

          <button type="submit" className="btn-primario w-full sm:w-auto">Enviar mensagem</button>
        </form>

        <aside className="card h-fit bg-marca-50">
          <h2 className="text-xl font-bold">Outros canais</h2>
          <p className="mt-3 text-slate-700">
            Para registrar um problema do bairro, use a página de{' '}
            <Link to="/ocorrencias" className="font-semibold text-marca-700 underline">ocorrências</Link>.
          </p>
          <p className="mt-3 text-slate-700">
            Os perfis do grupo estão em{' '}
            <Link to="/integrantes" className="font-semibold text-marca-700 underline">Integrantes</Link>.
          </p>
          <p className="mt-3 text-sm text-slate-600">FIAP · Global Solution 2026/2 · Turma 1TDSPV</p>
        </aside>
      </div>
    </>
  )
}
