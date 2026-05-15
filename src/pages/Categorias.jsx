import {
  useEffect,
  useState
} from 'react'

import api from '../services/api'

import './Categorias.css'

export default function Categorias() {

  const [categorias,
    setCategorias] =
      useState([])

  const [livros,
    setLivros] =
      useState([])

  const [novaCategoria,
    setNovaCategoria] =
      useState('')

  const [loading,
    setLoading] =
      useState(true)

  useEffect(() => {

    carregarCategorias()

    carregarLivros()

  }, [])

  async function carregarCategorias() {

    try {

      const res =
        await api.get('/categorias')

      setCategorias(

        res.data.categorias ||
        res.data

      )

    } catch (error) {

      console.log(error)
    }
  }

  async function carregarLivros() {

    try {

      const res =
        await api.get('/livros')

      setLivros(

        res.data.livros ||
        res.data

      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  async function criarCategoria(e) {

    e.preventDefault()

    if (!novaCategoria.trim()) {

      return alert(
        'Digite uma categoria'
      )
    }

    try {

      await api.post(
        '/categorias',
        {
          nome: novaCategoria
        }
      )

      alert(
        'Categoria criada com sucesso!'
      )

      setNovaCategoria('')

      carregarCategorias()

    } catch (error) {

      console.log(error)

      alert(
        'Erro ao criar categoria'
      )
    }
  }

  async function excluirCategoria(id) {

    const confirmar = window.confirm(
      'Deseja excluir esta categoria?'
    )

    if (!confirmar) return

    try {

      await api.delete(
        `/categorias/${id}`
      )

      setCategorias(

        categorias.filter(
          categoria =>
            categoria._id !== id
        )

      )

      alert(
        'Categoria excluída!'
      )

    } catch (error) {

      console.log(error)

      alert(
        'Erro ao excluir categoria'
      )
    }
  }

  if (loading) {

    return <h2>Carregando...</h2>
  }

  return (

    <div className="categorias-page">

      <div className="section-title">

        <h2>
          Categorias
        </h2>

      </div>

      <form
        className="categoria-form"
        onSubmit={criarCategoria}
      >

        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={e =>
            setNovaCategoria(
              e.target.value
            )
          }
          required
        />

        <button type="submit">

          Criar Categoria

        </button>

      </form>

      <div className="categorias-grid">

        {
          categorias.length === 0 ? (

            <p>
              Nenhuma categoria cadastrada.
            </p>

          ) : (

            categorias.map(categoria => {

              const livrosCategoria =

                livros.filter(livro =>

                  livro.categoria
                    ?.trim()
                    ?.toLowerCase()

                  ===

                  categoria.nome
                    ?.trim()
                    ?.toLowerCase()

                )

              return (

                <div
                  className="categoria-card"
                  key={categoria._id}
                >

                  <div className="categoria-top">

                    <h3>
                      {categoria.nome}
                    </h3>

                    <button
                      className="delete-cat"
                      onClick={() =>
                        excluirCategoria(
                          categoria._id
                        )
                      }
                    >

                      Excluir

                    </button>

                  </div>

                  <span>

                    {
                      livrosCategoria.length
                    }

                    {' livro(s)'}

                  </span>

                  <div className="categoria-livros">

                    {
                      livrosCategoria.length === 0
                        ? (

                          <p>
                            Nenhum livro nesta categoria.
                          </p>

                        ) : (

                          livrosCategoria.map(
                            livro => (

                              <div
                                className="categoria-livro-item"
                                key={livro._id}
                              >

                                <strong>
                                  {livro.titulo}
                                </strong>

                                <p>
                                  {livro.autor}
                                </p>

                              </div>

                            )
                          )
                        )
                    }

                  </div>

                </div>

              )
            })
          )
        }

      </div>

    </div>
  )
}