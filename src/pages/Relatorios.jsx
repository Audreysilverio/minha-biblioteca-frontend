import { useEffect, useState } from 'react'
import {
  FaBook,
  FaExchangeAlt,
  FaCheckCircle
} from 'react-icons/fa'

import api from '../services/api'
import './Relatorios.css'

export default function Relatorios() {

  const [livros, setLivros] = useState([])
  const [emprestimos, setEmprestimos] =
    useState([])

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {

    try {

      const livrosRes =
        await api.get('/livros')

      const emprestimosRes =
        await api.get('/emprestimos')

      setLivros(livrosRes.data)

      setEmprestimos(emprestimosRes.data)

    } catch (error) {

      console.error(error)
    }
  }

  const totalLivros = livros.reduce(
    (total, livro) =>
      total + (livro.quantidadeTotal || 0),
    0
  )

  const disponiveis = livros.reduce(
    (total, livro) =>
      total +
      (livro.quantidadeDisponivel || 0),
    0
  )

  const totalEmprestimos =
    emprestimos.length

  const devolvidos =
    emprestimos.filter(
      emp => emp.devolvido
    ).length

  return (

    <div className="relatorios-page">

      <div className="relatorios-header">

        <h1>Relatórios</h1>

        <p>
          Visão geral da biblioteca.
        </p>

      </div>

      <div className="relatorios-grid">

        <div className="relatorio-card">

          <div className="relatorio-icon red">
            <FaBook />
          </div>

          <div>
            <h2>{totalLivros}</h2>
            <p>Total de livros</p>
          </div>

        </div>

        <div className="relatorio-card">

          <div className="relatorio-icon black">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{disponiveis}</h2>
            <p>Disponíveis</p>
          </div>

        </div>

        <div className="relatorio-card">

          <div className="relatorio-icon pink">
            <FaExchangeAlt />
          </div>

          <div>
            <h2>{totalEmprestimos}</h2>
            <p>Empréstimos</p>
          </div>

        </div>

      </div>

      <div className="tabela-container">

        <h2>Últimos empréstimos</h2>

        <table>

          <thead>

            <tr>
              <th>Livro</th>
              <th>Leitor</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {
              emprestimos.length === 0 ? (

                <tr>
                  <td colSpan="3">
                    Nenhum empréstimo encontrado.
                  </td>
                </tr>

              ) : (

                emprestimos.map(emp => (

                  <tr key={emp._id}>

                    <td>
                      {emp.livro?.titulo}
                    </td>

                    <td>
                      {emp.nomeLeitor}
                    </td>

                    <td>

                      <span
                        className={
                          emp.devolvido
                            ? 'status-green'
                            : 'status-red'
                        }
                      >

                        {
                          emp.devolvido
                            ? 'Devolvido'
                            : 'Emprestado'
                        }

                      </span>

                    </td>

                  </tr>

                ))
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}