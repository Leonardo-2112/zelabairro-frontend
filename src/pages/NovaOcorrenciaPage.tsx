import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CabecalhoPagina } from '../components/CabecalhoPagina'
import { CampoFormulario } from '../components/CampoFormulario'
import { CampoFotos } from '../components/CampoFotos'
import { CampoTexto } from '../components/CampoTexto'
import { Carregando } from '../components/Carregando'
import { ConfirmacaoOcorrencia } from '../components/ConfirmacaoOcorrencia'
import { MensagemErro } from '../components/MensagemErro'
import { SugestaoApoio } from '../components/SugestaoApoio'
import { useAuth } from '../hooks/useAuth'
import { useCatalogo } from '../hooks/useCatalogo'
import { criarOcorrencia, enviarFoto } from '../services/api'
import type { Ocorrencia } from '../types/ocorrencia'
import { aplicarErrosDaApi } from '../utils/errosFormulario'

// Campos do formulário (os <select> devolvem texto; convertemos para número no envio)
interface FormOcorrencia {
  idCategoria: string
  idBairro: string
  descricao: string
  endereco: string
}

// Página /ocorrencias/nova (só cidadão logado): POST /ocorrencias com validação da RN03
export function NovaOcorrenciaPage() {
  const { usuario } = useAuth()
  const { dados: catalogo, carregando, erro: erroCatalogo, recarregar } = useCatalogo()
  const [erroApi, setErroApi] = useState<string | null>(null)
  const [criada, setCriada] = useState<Ocorrencia | null>(null)
  const [fotos, setFotos] = useState<File[]>([])
  const [avisoFotos, setAvisoFotos] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormOcorrencia>({ defaultValues: { idCategoria: '', idBairro: '', descricao: '', endereco: '' } })

  const tamanhoDescricao = watch('descricao').length
  // watch "assiste" os selects para a sugestão de apoio (RN07) reagir na hora
  const idCategoria = Number(watch('idCategoria'))
  const idBairro = Number(watch('idBairro'))

  async function enviar(dados: FormOcorrencia) {
    if (!usuario) return
    setErroApi(null)
    try {
      const ocorrencia = await criarOcorrencia({
        descricao: dados.descricao.trim(),
        endereco: dados.endereco.trim(),
        idCidadao: usuario.id, // o autor é quem está logado (RN01)
        idCategoria: Number(dados.idCategoria),
        idBairro: Number(dados.idBairro),
      })

      // Com o id da ocorrência, envia cada foto (uma requisição por foto)
      const falhas: string[] = []
      for (const foto of fotos) {
        try {
          await enviarFoto(ocorrencia.id, foto, usuario.id)
        } catch (erroFoto) {
          falhas.push(`${foto.name}: ${erroFoto instanceof Error ? erroFoto.message : 'erro ao enviar'}`)
        }
      }
      setAvisoFotos(falhas.length > 0 ? `Algumas fotos não foram enviadas. ${falhas.join(' ')}` : null)

      setCriada({ ...ocorrencia, qtdFotos: fotos.length - falhas.length })
      setFotos([])
      reset()
    } catch (erro) {
      setErroApi(aplicarErrosDaApi(erro, setError))
    }
  }

  // Depois do POST: confirmação com o número da ocorrência e a previsão da IA
  if (criada) {
    return (
      <section className="container-pagina py-12">
        <ConfirmacaoOcorrencia ocorrencia={criada} avisoFotos={avisoFotos} onRegistrarOutra={() => setCriada(null)} />
      </section>
    )
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Registrar ocorrência"
        subtitulo="Conte qual é o problema e onde ele está. Quanto mais claro, mais rápido a equipe encontra."
      />
      <div className="container-pagina py-10">
        {carregando ? (
          <Carregando texto="Carregando categorias e bairros…" />
        ) : erroCatalogo || !catalogo ? (
          <MensagemErro mensagem={erroCatalogo ?? 'Não foi possível carregar o formulário.'} onTentarNovamente={recarregar} />
        ) : (
          <form noValidate onSubmit={handleSubmit(enviar)} className="card mx-auto max-w-3xl space-y-5">
            {erroApi && <MensagemErro mensagem={erroApi} />}

            <div className="grid gap-5 md:grid-cols-2">
              <CampoFormulario id="idCategoria" rotulo="Categoria do problema" erro={errors.idCategoria?.message}>
                <select
                  id="idCategoria"
                  className="campo"
                  aria-invalid={errors.idCategoria ? true : undefined}
                  aria-describedby="idCategoria-ajuda"
                  {...register('idCategoria', { required: 'Escolha a categoria.' })}
                >
                  <option value="">Selecione…</option>
                  {catalogo.categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
              </CampoFormulario>

              <CampoFormulario id="idBairro" rotulo="Bairro" erro={errors.idBairro?.message}>
                <select
                  id="idBairro"
                  className="campo"
                  aria-invalid={errors.idBairro ? true : undefined}
                  aria-describedby="idBairro-ajuda"
                  {...register('idBairro', { required: 'Escolha o bairro.' })}
                >
                  <option value="">Selecione…</option>
                  {catalogo.bairros.map((bairro) => (
                    <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
                  ))}
                </select>
              </CampoFormulario>
            </div>

            <SugestaoApoio idCategoria={idCategoria} idBairro={idBairro} />

            <CampoFormulario
              id="descricao"
              rotulo="Descrição"
              erro={errors.descricao?.message}
              dica={`${tamanhoDescricao}/500 caracteres (mínimo 10).`}
            >
              <textarea
                id="descricao"
                rows={5}
                className="campo"
                placeholder="Ex.: buraco grande na faixa da direita, perto do ponto de ônibus"
                aria-invalid={errors.descricao ? true : undefined}
                aria-describedby="descricao-ajuda"
                {...register('descricao', {
                  required: 'Descreva o problema.',
                  validate: (valor) => {
                    const tamanho = valor.trim().length
                    return (tamanho >= 10 && tamanho <= 500) || 'RN03: a descrição deve ter de 10 a 500 caracteres.'
                  },
                })}
              />
            </CampoFormulario>

            <CampoTexto
              id="endereco"
              rotulo="Endereço de referência"
              placeholder="Ex.: Rua Guaicurus, 1200 - em frente à padaria"
              erro={errors.endereco?.message}
              registro={register('endereco', {
                required: 'Informe o endereço de referência.',
                validate: (valor) => valor.trim().length > 0 || 'Informe o endereço de referência.',
                maxLength: { value: 200, message: 'RN03: o endereço deve ter no máximo 200 caracteres.' },
              })}
            />

            <CampoFotos fotos={fotos} onMudar={setFotos} />

            <button type="submit" className="btn-primario w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? 'Registrando…' : 'Registrar ocorrência'}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
