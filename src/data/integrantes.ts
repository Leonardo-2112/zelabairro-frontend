// Dados fixos dos integrantes do grupo (página /integrantes).
// As fotos ficam em public/img/integrantes (o "/" do caminho aponta para a pasta public).
export interface Integrante {
  nome: string
  rm: string
  turma: string
  foto: string
  github: string
  linkedin: string
}

export const integrantes: Integrante[] = [
  {
    nome: 'Leonardo Afonço Sousa',
    rm: '573982',
    turma: '1TDSPV',
    foto: '/img/integrantes/leonardo.jpg',
    github: 'https://github.com/Leonardo-2112',
    linkedin: 'https://www.linkedin.com/in/leonardoafoncosousa/',
  },
  {
    nome: 'Syang Cristina Gomes Souza',
    rm: '569259',
    turma: '1TDSPV',
    foto: '/img/integrantes/syang.jpg',
    github: 'https://github.com/SyangSouzaa',
    linkedin: 'https://www.linkedin.com/in/syang-souza/',
  },
  {
    nome: 'Matheus Jones Sousa de Freitas',
    rm: '573559',
    turma: '1TDSPV',
    foto: '/img/integrantes/matheus.jpg',
    github: 'https://github.com/Matheus-Jones',
    linkedin: 'https://www.linkedin.com/in/matheus-jones10/',
  },
  {
    nome: 'Vitor Goncalves de Souza',
    rm: '569023',
    turma: '1TDSPV',
    foto: '/img/integrantes/vitor.jpg',
    github: 'https://github.com/v1torceleste',
    linkedin: 'https://www.linkedin.com/in/vitor-souza-39aa422b4/',
  },
  {
    nome: 'Joao Machado Nascimento',
    rm: '572364',
    turma: '1TDSPV',
    foto: '/img/integrantes/joao.jpg',
    github: 'https://github.com/MachadoJN',
    linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-machado-493178300',
  },
]
