import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import './Catalogo.css'

import Footer from '../../components/Footer'

export default function Catalogo() {

  const [livros, setLivros] = useState([])

  const [busca, setBusca] = useState('')

  const navigate = useNavigate()

  const usuario =
    JSON.parse(
      localStorage.getItem('usuario')
    )

  useEffect(() => {
    carregarLivros()
  }, [])

  async function carregarLivros() {

    try {

      const res = await api.get('/livros')

      setLivros(res.data)

    } catch (error) {

      console.error(error)
    }
  }

  async function reservarLivro(id) {

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

          livroId: id

        }
      )

      alert(
        'Livro reservado com sucesso!'
      )

    } catch (error) {

      alert(
        error.response?.data?.erro ||
        'Erro ao reservar livro'
      )
    }
  }

  const livrosFiltrados =
    livros.filter(livro =>

      livro.titulo
        ?.toLowerCase()
        .includes(
          busca.toLowerCase()
        )

    )

  return (

    <div className="catalogo-page">

      <PublicHeader />

      <div className="catalogo-header">

        <h1>Catálogo</h1>

        <p>
          Explore todos os livros disponíveis.
        </p>

      </div>

      <div className="catalogo-search">

        <input
          type="text"
          placeholder="Pesquisar livro..."
          value={busca}
          onChange={e =>
            setBusca(e.target.value)
          }
        />

      </div>

      <div className="catalogo-grid">

        {
          livrosFiltrados.map(livro => (

            <div
              className="catalogo-card"
              key={livro._id}
              onClick={() =>
                navigate(
                  `/livro/${livro._id}`
                )
              }
            >

              <img
                src={
                  livro.capa ||
                  'https://via.placeholder.com/200'
                }
                alt={livro.titulo}
              />

              <div className="catalogo-info">

                <h3>{livro.titulo}</h3>

                <p>{livro.autor}</p>

                <span
                  className={
                    livro.quantidadeDisponivel > 0
                      ? 'disponivel'
                      : 'indisponivel'
                  }
                >

                  {
                    livro.quantidadeDisponivel > 0
                      ? 'Disponível'
                      : 'Indisponível'
                  }

                </span>

                <button
                  className="reservar-btn"
                  onClick={(e) => {

                    e.stopPropagation()

                    reservarLivro(
                      livro._id
                    )

                  }}
                >

                  Reservar Livro

                </button>

              </div>

            </div>

          ))
        }

      </div>
            <Footer />
    </div>
  )
}