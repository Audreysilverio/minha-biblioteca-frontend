import {
  useEffect,
  useState
} from 'react'

import api from '../services/api'

import './Categorias.css'

export default function Categorias() {

  const [categorias, setCategorias] =
    useState([])

  const [livros, setLivros] =
    useState([])

  const [novaCategoria,
    setNovaCategoria] = useState('')

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
    }
  }

  async function criarCategoria(e) {

    e.preventDefault()

    try {

      await api.post(
        '/categorias',
        {
          nome: novaCategoria
        }
      )

      setNovaCategoria('')

      carregarCategorias()

    } catch (error) {

      console.log(error)
    }
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

                <h3>
                  {categoria.nome}
                </h3>

                <span>
                  {
                    livrosCategoria.length
                  } livro(s)
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
        }

      </div>

    </div>
  )
}