import { useEffect, useState } from 'react'

import {
  FaBook,
  FaExchangeAlt
} from 'react-icons/fa'

import api from '../services/api'

import './Dashboard.css'

export default function Dashboard() {
  const [dados, setDados] = useState({
    livros: 0,
    emprestimos: 0,
    disponiveis: 0
  })

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      const livrosRes =
        await api.get('/livros')

      const emprestimosRes =
        await api.get('/emprestimos')

      const livros =
        livrosRes.data.livros ||
        livrosRes.data

      const emprestimos =
        emprestimosRes.data

      const disponiveis = livros.filter(
        (livro) =>
          livro.quantidadeDisponivel > 0
      )

      setDados({
        livros: livros.length,

        emprestimos:
          emprestimos.filter(
            (emp) => !emp.devolvido
          ).length,

        disponiveis:
          disponiveis.length
      })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-top-area">

        <h1 className="dashboard-title">
          Minha <span>Biblioteca</span>
        </h1>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-box">

          <div className="dashboard-circle red-bg">
            <FaBook />
          </div>

          <div>
            <h2>{dados.livros}</h2>

            <p>Total de livros</p>
          </div>

        </div>

        <div className="dashboard-box">

          <div className="dashboard-circle black-bg">
            <FaExchangeAlt />
          </div>

          <div>
            <h2>{dados.emprestimos}</h2>

            <p>Empréstimos ativos</p>
          </div>

        </div>

      </div>

      <div className="dashboard-last-books">

        <h2>Livros disponíveis</h2>

        <h1>{dados.disponiveis}</h1>

      </div>

    </div>
  )
}