import { useState } from 'react'

import api from '../services/api'

import {
  useNavigate
} from 'react-router-dom'

import './NovoLivro.css'

export default function NovoLivro() {

  const navigate = useNavigate()

  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState({

      titulo: '',
      autor: '',
      categoria: '',
      descricao: '',
      capa: '',
      quantidadeTotal: 1

    })

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    })
  }

  async function handleSubmit(e) {

    e.preventDefault()

    setLoading(true)

    try {

      await api.post('/livros', {

        ...form,

        quantidadeTotal:
          Number(
            form.quantidadeTotal
          )

      })

      alert(
        'Livro cadastrado com sucesso!'
      )

      navigate('/livros')

    } catch (err) {

      console.log(err)

      alert(
        'Erro ao cadastrar livro'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="novo-livro-page">

      <div className="section-title">

        <h1>
          Novo Livro
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="form"
      >

        <input
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <input
          name="autor"
          placeholder="Autor"
          value={form.autor}
          onChange={handleChange}
          required
        />

        <input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        />

        <input
          name="capa"
          placeholder="URL da capa do livro"
          value={form.capa}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantidadeTotal"
          placeholder="Quantidade de exemplares"
          min="1"
          value={form.quantidadeTotal}
          onChange={handleChange}
          required
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          rows="6"
        />

        {
          form.capa && (

            <img
              src={form.capa}
              alt="Prévia da capa"
              className="preview-capa"
            />

          )
        }

        <button
          type="submit"
          disabled={loading}
        >

          {
            loading
              ? 'Salvando...'
              : 'Salvar Livro'
          }

        </button>

      </form>

    </div>
  )
}