import { useEffect, useState } from 'react'

import api from '../services/api'

import './Emprestimos.css'

export default function Emprestimo() {

  const [livros, setLivros] =
    useState([])

  const [emprestimos, setEmprestimos] =
    useState([])

  const [livroId, setLivroId] =
    useState('')

  const [nomeLeitor, setNomeLeitor] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {

    carregarLivros()
    carregarEmprestimos()

  }, [])

  async function carregarLivros() {

    try {

      const res = await api.get('/livros')

      const listaLivros =
        res.data.livros || res.data

      const disponiveis =
        listaLivros.filter(
          livro =>
            Number(
              livro.quantidadeDisponivel
            ) > 0
        )

      setLivros(disponiveis)

    } catch (error) {

      console.error(error)
    }
  }

  async function carregarEmprestimos() {

    try {

      const res =
        await api.get('/emprestimos')

      setEmprestimos(res.data)

    } catch (error) {

      console.error(error)
    }
  }

  async function criarEmprestimo(e) {

    e.preventDefault()

    setLoading(true)

    try {

      await api.post(
        '/emprestimos',
        {
          livroId,
          nomeLeitor
        }
      )

      alert(
        'Empréstimo realizado com sucesso'
      )

      setLivroId('')
      setNomeLeitor('')

      carregarLivros()
      carregarEmprestimos()

    } catch (error) {

      console.log(error.response)

      alert(
        error.response?.data?.erro ||
        error.response?.data?.message ||
        'Erro ao realizar empréstimo'
      )

    } finally {

      setLoading(false)
    }
  }

  async function devolverLivro(id) {

    const confirmar = window.confirm(
      'Deseja devolver este livro?'
    )

    if (!confirmar) return

    try {

      await api.put(
        `/emprestimos/devolver/${id}`
      )

      alert(
        'Livro devolvido com sucesso'
      )

      carregarLivros()
      carregarEmprestimos()

    } catch (error) {

      alert(
        error.response?.data?.erro ||
        'Erro ao devolver livro'
      )
    }
  }

  const emprestimosAtivos =
    emprestimos.filter(
      emp => !emp.devolvido
    )

  const emprestimosFinalizados =
    emprestimos.filter(
      emp => emp.devolvido
    )

  return (

    <div className="emprestimos-page">

      <div className="emprestimos-header">

        <h1>Empréstimos</h1>

        <p>
          Gerencie os empréstimos da biblioteca.
        </p>

      </div>

      <form
        className="emprestimo-form"
        onSubmit={criarEmprestimo}
      >

        {
          livros.length === 0 ? (

            <p>
              Nenhum livro disponível
              para empréstimo.
            </p>

          ) : (

            <select
              value={livroId}
              onChange={e =>
                setLivroId(e.target.value)
              }
              required
            >

              <option value="">
                Selecione um livro
              </option>

              {
                livros.map(livro => (

                  <option
                    key={livro._id}
                    value={livro._id}
                  >

                    {livro.titulo}
                    {' - '}
                    {livro.autor}
                    {' '}
                    (
                    {
                      livro.quantidadeDisponivel
                    }
                    {' disponíveis'}
                    )

                  </option>

                ))
              }

            </select>

          )
        }

        <input
          type="text"
          placeholder="Nome do leitor"
          value={nomeLeitor}
          onChange={e =>
            setNomeLeitor(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >

          {
            loading
              ? 'Registrando...'
              : 'Registrar empréstimo'
          }

        </button>

      </form>

      <div className="emprestimos-lista">

        <h2>
          Empréstimos em andamento
        </h2>

        {
          emprestimosAtivos.length === 0 ? (

            <p>
              Nenhum empréstimo ativo.
            </p>

          ) : (

            emprestimosAtivos.map(emp => (

              <div
                className="emprestimo-card"
                key={emp._id}
              >

                <h3>
                  {emp.livro?.titulo}
                </h3>

                <p>

                  <strong>Leitor:</strong>
                  {' '}
                  {emp.nomeLeitor}

                </p>

                <p>

                  <strong>Data:</strong>
                  {' '}

                  {
                    new Date(
                      emp.createdAt
                    ).toLocaleDateString(
                      'pt-BR'
                    )
                  }

                </p>

                <span className="status-tag">

                  Em andamento

                </span>

                <button
                  className="devolver-btn"
                  onClick={() =>
                    devolverLivro(emp._id)
                  }
                >
                  Devolver livro
                </button>

              </div>

            ))
          )
        }

      </div>

      <div className="emprestimos-lista">

        <h2>
          Empréstimos finalizados
        </h2>

        {
          emprestimosFinalizados.length === 0 ? (

            <p>
              Nenhum empréstimo finalizado.
            </p>

          ) : (

            emprestimosFinalizados.map(emp => (

              <div
                className="emprestimo-card"
                key={emp._id}
              >

                <h3>
                  {emp.livro?.titulo}
                </h3>

                <p>

                  <strong>Leitor:</strong>
                  {' '}
                  {emp.nomeLeitor}

                </p>

                <p>

                  <strong>Data:</strong>
                  {' '}

                  {
                    new Date(
                      emp.createdAt
                    ).toLocaleDateString(
                      'pt-BR'
                    )
                  }

                </p>

                <span className="status-tag finalizado">

                  Finalizado

                </span>

              </div>

            ))
          )
        }

      </div>

    </div>
  )
}