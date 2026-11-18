// Perguntas e respostas da página /faq
export interface Pergunta {
  pergunta: string
  resposta: string
}

export const perguntas: Pergunta[] = [
  {
    pergunta: 'Preciso de conta para usar o ZelaBairro?',
    resposta: 'Para ver as ocorrências, não. Para registrar ou apoiar uma ocorrência, sim: basta criar a conta com nome, e-mail e senha.',
  },
  {
    pergunta: 'Que tipo de problema posso registrar?',
    resposta: 'Problemas de zeladoria: buraco na via, iluminação apagada, lixo descartado na calçada, poda ou árvore com risco de queda, calçada danificada, bueiro entupido e sinalização danificada.',
  },
  {
    pergunta: 'O que é apoiar uma ocorrência?',
    resposta: 'É dizer "eu também tenho esse problema". Antes de criar uma ocorrência, mostramos as que já existem na mesma categoria e bairro. Cada apoio aumenta a prioridade e evita chamados duplicados.',
  },
  {
    pergunta: 'Como a prefeitura decide o que atender primeiro?',
    resposta: 'Pela pontuação de prioridade, que soma a gravidade da categoria, os apoios, os dias em aberto e o risco de atraso. A fórmula é pública e está na página Sobre.',
  },
  {
    pergunta: 'O que significa a previsão da IA?',
    resposta: 'É uma estimativa do prazo de atendimento e do risco de atraso, calculada com o histórico real de chamados do SP156. Quando o serviço de IA não responde, a ocorrência é criada mesmo assim e mostramos "previsão indisponível".',
  },
  {
    pergunta: 'Posso enviar fotos?',
    resposta: 'Sim, até 3 fotos JPG ou PNG de até 2 MB cada, enquanto a ocorrência estiver aberta.',
  },
  {
    pergunta: 'Meus dados ficam visíveis?',
    resposta: 'Não. As listas públicas mostram só o seu primeiro nome. E-mail e telefone nunca aparecem, e a senha é guardada de forma criptografada.',
  },
  {
    pergunta: 'Por que a primeira página demora para carregar?',
    resposta: 'A API usa um servidor gratuito que "dorme" quando fica sem uso. O primeiro acesso pode levar até um minuto; depois fica rápido.',
  },
]
