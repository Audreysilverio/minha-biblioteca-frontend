import { useEffect, useState } from 'react'
import api from '../services/api'
import './Devolucoes.css'

export default function Devolucoes() {

  const [emprestimos, setEmprestimos] =
    useState([])

  useEffect(() => {
    carregarEmprestimos()
  }, [])

  async function carregarEmprestimos() {

    try {

      const res = await api.get('/emprestimos')

      const pendentes = res.data.filter(
        emp => !emp.devolvido
      )

      setEmprestimos(pendentes)

    } catch (error) {

      console.error(error)
    }
  }

  async function devolverLivro(id) {

    const confirmar = confirm(
      'Confirmar devolução do livro?'
    )

    if (!confirmar) return

    try {

      await api.put(
        `/emprestimos/devolver/${id}`
      )

      setEmprestimos(
        emprestimos.filter(
          emp => emp._id !== id
        )
      )

      alert('Livro devolvido com sucesso')

    } catch (error) {

      console.error(error)

      alert('Erro ao devolver livro')
    }
  }

  return (

    <div className="devolucoes-page">

      <div className="devolucoes-header">

        <h1>Devoluções</h1>

        <p>
          Gerencie as devoluções de livros.
        </p>

      </div>

      <div className="devolucoes-grid">

        {emprestimos.length === 0 ? (

          <p>
            Nenhum empréstimo pendente.
          </p>

        ) : (

          emprestimos.map(emp => (

            <div
              key={emp._id}
              className="devolucao-card"
            >

              <h3>
                {emp.livro?.titulo}
              </h3>

              <p>
                <strong>Leitor:</strong>{' '}
                {emp.nomeLeitor}
              </p>

              <p>
                <strong>Autor:</strong>{' '}
                {emp.livro?.autor}
              </p>

              <button
                onClick={() =>
                  devolverLivro(emp._id)
                }
              >
                Confirmar devolução
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  )
}