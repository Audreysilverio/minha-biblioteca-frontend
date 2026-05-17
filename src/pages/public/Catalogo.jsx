import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'
import Footer from '../../components/Footer'

import './Catalogo.css'

export default function Catalogo() {
  const [livros, setLivros] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo
      ?.toLowerCase()
      .includes(busca.toLowerCase())
  )

  if (loading) {
    return <h2>Carregando...</h2>
  }

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
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />
      </div>

      <div className="catalogo-grid">
        {livrosFiltrados.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          livrosFiltrados.map((livro) => (
            <div
              className="catalogo-card"
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
                  {livro.quantidadeDisponivel > 0
                    ? 'Disponível'
                    : 'Indisponível'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  )
}