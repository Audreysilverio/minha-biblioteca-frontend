import { useEffect, useState } from 'react'
import { FaBook, FaCheckCircle, FaBookmark } from 'react-icons/fa'
import api from '../services/api'

export default function Dashboard() {
  const [livros, setLivros] = useState([])

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

  const totalLivros = livros.reduce((total, livro) => total + (livro.quantidadeTotal || 0), 0)
  const disponiveis = livros.reduce((total, livro) => total + (livro.quantidadeDisponivel || 0), 0)
  const emprestados = totalLivros - disponiveis

  return (
    <div className="dashboard-page">
      <div className="dashboard-top-area">
        <div>
          <h1 className="dashboard-title">
            Bem-vindo(a), <span>Administrador 👋</span>
          </h1>
          <p className="dashboard-subtitle">
            Gerenciando o nosso acervo com facilidade.
          </p>
        </div>
        <button className="dashboard-button">+ Novo Livro</button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <div className="dashboard-circle red-bg">
            <FaBook />
          </div>
          <div>
            <h2>{totalLivros}</h2>
            <p>Total de livros</p>
          </div>
        </div>

        <div className="dashboard-box">
          <div className="dashboard-circle black-bg">
            <FaCheckCircle />
          </div>
          <div>
            <h2>{disponiveis}</h2>
            <p>Disponíveis</p>
          </div>
        </div>

        <div className="dashboard-box">
          <div className="dashboard-circle pink-bg">
            <FaBookmark />
          </div>
          <div>
            <h2>{emprestados}</h2>
            <p>Emprestados</p>
          </div>
        </div>
      </div>

      <div className="dashboard-last-books">
        <h2>Últimos livros</h2>
        {livros.length === 0 ? (
          <p>Nenhum livro cadastrado.</p>
        ) : (
          livros.slice(0, 5).map(livro => (
            <div key={livro._id} className="dashboard-book-row">
              <strong>{livro.titulo}</strong>
              <p>{livro.autor}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}