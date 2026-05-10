import { useEffect, useState } from 'react'
import api from '../services/api'
import './Emprestimos.css'

export default function Emprestimo() {

  const [livros, setLivros] = useState([])
  const [emprestimos, setEmprestimos] =
    useState([])

  const [livroId, setLivroId] =
    useState('')

  const [nomeLeitor, setNomeLeitor] =
    useState('')

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

      const res = await api.get(
        '/emprestimos'
      )

      setEmprestimos(res.data)

    } catch (error) {

      console.error(error)
    }
  }

  async function criarEmprestimo(e) {

    e.preventDefault()

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
    }
  }

  async function devolverLivro(id) {

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

                {livro.titulo} - {livro.autor}

              </option>

            ))
          }

        </select>

        <input
          type="text"
          placeholder="Nome do leitor"
          value={nomeLeitor}
          onChange={e =>
            setNomeLeitor(e.target.value)
          }
          required
        />

        <button type="submit">
          Registrar empréstimo
        </button>

      </form>

      <div className="emprestimos-lista">

        {
          emprestimos.length === 0 ? (

            <p>
              Nenhum empréstimo encontrado.
            </p>

          ) : (

            emprestimos.map(emp => (

              <div
                className="emprestimo-card"
                key={emp._id}
              >

                <h3>
                  {emp.livro?.titulo}
                </h3>

                <p>

                  <strong>Leitor:</strong>{' '}

                  {emp.nomeLeitor}

                </p>

                <p>

                  <strong>Status:</strong>{' '}

                  {
                    emp.devolvido
                      ? 'Devolvido'
                      : 'Emprestado'
                  }

                </p>

                <span className="status-tag">

                  {
                    emp.devolvido
                      ? 'Finalizado'
                      : 'Em andamento'
                  }

                </span>

                {
                  !emp.devolvido && (

                    <button
                      className="devolver-btn"
                      onClick={() =>
                        devolverLivro(emp._id)
                      }
                    >
                      Devolver livro
                    </button>

                  )
                }

              </div>

            ))
          )
        }

      </div>

    </div>
  )
}