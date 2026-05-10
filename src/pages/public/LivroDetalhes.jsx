import {
  useEffect,
  useState
} from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import './LivroDetalhes.css'

import Footer from '../../components/Footer'

export default function LivroDetalhes() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [livro, setLivro] =
    useState(null)

  const usuario =
    JSON.parse(
      localStorage.getItem('usuario')
    )

  useEffect(() => {

    carregarLivro()

  }, [id])

  async function carregarLivro() {

    try {

      const res =
        await api.get(`/livros/${id}`)

      setLivro(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  async function reservarLivro() {

    if (!usuario) {

      alert(
        'Faça login para reservar'
      )

      navigate('/entrar')

      return
    }

    try {

      await api.post(
        '/reservas',
        {

          usuarioId: usuario.id,

          livroId: livro._id

        }
      )

      alert(
        'Livro reservado com sucesso!'
      )

      carregarLivro()

    } catch (error) {

      alert(
        error.response?.data?.erro ||
        'Erro ao reservar livro'
      )
    }
  }

  if (!livro) {

    return <h1>Carregando...</h1>
  }

  return (

    <div className="livro-detalhes-page">

      <PublicHeader />

      <div className="livro-detalhes-container">

        <img
          src={
            livro.capa ||
            'https://via.placeholder.com/300'
          }
          alt={livro.titulo}
        />

        <div className="livro-detalhes-info">

          <h1>{livro.titulo}</h1>

          <h3>{livro.autor}</h3>

          <p>
            {livro.descricao}
          </p>

          <span>

            {
              livro.quantidadeDisponivel > 0
                ? 'Disponível'
                : 'Indisponível'
            }

          </span>

          {
            livro.quantidadeDisponivel > 0 && (

              <button
                onClick={reservarLivro}
              >
                Reservar Livro
              </button>

            )
          }

        </div>

      </div>
          <Footer />
    </div>
  )
}