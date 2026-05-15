import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import api from '../services/api'

import './Livros.css'

export default function Livros() {

  const [livros, setLivros] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const navigate = useNavigate()

  const busca =
    localStorage.getItem('busca') || ''

  useEffect(() => {

    carregarLivros()

  }, [])

  async function carregarLivros() {

    try {

      const res =
        await api.get('/livros')

      setLivros(res.data || [])

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  async function excluirLivro(id) {

    const confirmar = window.confirm(
      'Deseja excluir este livro?'
    )

    if (!confirmar) return

    try {

      await api.delete(
        `/livros/${id}`
      )

      setLivros(

        livros.filter(
          l => l._id !== id
        )

      )

      alert(
        'Livro excluído com sucesso'
      )

    } catch (err) {

      console.log(err)

      alert(
        'Erro ao excluir livro'
      )
    }
  }

  const livrosFiltrados =
    livros.filter(livro =>

      livro.titulo
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )

    )

  if (loading) {

    return <h2>Carregando...</h2>
  }

  return (

    <div>

      <div className="section-title">

        <h2>
          Gerenciar Livros
        </h2>

      </div>

      <div className="top-actions">

        <button
          onClick={() =>
            navigate('/livros/novo')
          }
        >

          + Novo Livro

        </button>

      </div>

      <div className="books-grid">

        {
          livrosFiltrados.length === 0 ? (

            <p>
              Nenhum livro encontrado.
            </p>

          ) : (

            livrosFiltrados.map(livro => (

              <div
                key={livro._id}
                className="book-card"
              >

                <img
                  src={
                    livro.capa ||
                    'https://via.placeholder.com/150'
                  }
                  alt={livro.titulo}
                />

                <h3>
                  {livro.titulo}
                </h3>

                <p>
                  {livro.autor}
                </p>

                <p>

                  Disponíveis:{' '}

                  {
                    livro.quantidadeDisponivel
                  }

                </p>

                <span
                  className={
                    livro.quantidadeDisponivel > 0
                      ? 'green'
                      : 'red-tag'
                  }
                >

                  {
                    livro.quantidadeDisponivel > 0
                      ? 'Disponível'
                      : 'Indisponível'
                  }

                </span>

                <div className="book-actions">

                  <button
                    onClick={() =>

                      navigate(
                        `/livros/editar/${livro._id}`
                      )

                    }
                  >

                    Editar

                  </button>

                  <button
                    className="delete"
                    onClick={() =>
                      excluirLivro(livro._id)
                    }
                  >

                    Excluir

                  </button>

                </div>

              </div>

            ))
          )
        }

      </div>

    </div>
  )
}