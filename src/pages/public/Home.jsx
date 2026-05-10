import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import './Home.css'

import Footer from '../../components/Footer'

export default function Home() {

  const [livros, setLivros] = useState([])

  const navigate = useNavigate()

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

  return (

    <div className="home-public">

      {/* HEADER */}

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

      {/* LIVROS */}

      <section className="destaques">

        <div className="section-header">

          <h2>Livros em destaque</h2>

        </div>

        <div className="livros-grid">

          {
            livros.slice(0, 8).map(livro => (

              <div
                className="livro-card"
                key={livro._id}
                onClick={() =>
                  navigate(`/livro/${livro._id}`)
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

                  <h3>{livro.titulo}</h3>

                  <p>{livro.autor}</p>

                </div>

              </div>

            ))
          }

        </div>

      </section>
          <Footer />
          
    </div>
  )
}