import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import Footer from '../../components/Footer'

import './Home.css'

export default function Home() {

  const [livros, setLivros] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    carregarLivros()

  }, [])

  async function carregarLivros() {

    try {

      const res =
        await api.get('/livros')

      setLivros(res.data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  if (loading) {

    return <h2>Carregando...</h2>
  }

  return (

    <div className="home-public">

      <PublicHeader />

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <h1>

            Descubra novos mundos através
            da leitura 📚

          </h1>

          <p>

            Explore nossa biblioteca e
            encontre livros incríveis.

          </p>

          <button
            onClick={() =>
              navigate('/catalogo')
            }
          >

            Explorar catálogo

          </button>

        </div>

      </section>

      {/* DESTAQUES */}

      <section className="destaques">

        <div className="section-header">

          <h2>
            Livros em destaque
          </h2>

          <button
            className="ver-todos-btn"
            onClick={() =>
              navigate('/catalogo')
            }
          >

            Ver todos

          </button>

        </div>

        <div className="livros-grid">

          {
            livros.length === 0 ? (

              <p>
                Nenhum livro disponível.
              </p>

            ) : (

              livros
                .slice(0, 8)
                .map(livro => (

                  <div
                    className="livro-card"
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

                    <div className="livro-info">

                      <h3>
                        {livro.titulo}
                      </h3>

                      <p>
                        {livro.autor}
                      </p>

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

                    </div>

                  </div>

                ))
            )
          }

        </div>

      </section>

      <Footer />

    </div>
  )
}