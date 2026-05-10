import { useEffect, useState } from 'react'
import {
  useParams,
  useNavigate
} from 'react-router-dom'

import api from '../services/api'
import './EditarLivro.css'

export default function EditarLivro() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    descricao: '',
    capa: ''
  })

  useEffect(() => {

    async function carregarLivro() {

      try {

        const res = await api.get(
          `/livros/${id}`
        )

        setForm(
          res.data.livro || res.data
        )

      } catch (err) {

        console.log(
          'Erro ao carregar livro:',
          err
        )
      }
    }

    carregarLivro()

  }, [id])

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      await api.put(
        `/livros/${id}`,
        form
      )

      alert(
        'Livro atualizado com sucesso!'
      )

      navigate('/livros')

    } catch (err) {

      console.log(
        'ERRO AO ATUALIZAR:',
        err.response?.data || err
      )

      alert('Erro ao atualizar livro')
    }
  }

  return (

    <div className="editar-page">

      <div className="editar-header">

        <h1>Editar Livro</h1>

        <p>
          Atualize as informações do livro.
        </p>

      </div>

      <form
        className="editar-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">

            <label>Título</label>

            <input
              name="titulo"
              placeholder="Título"
              value={form.titulo}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Autor</label>

            <input
              name="autor"
              placeholder="Autor"
              value={form.autor}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        <div className="form-group">

          <label>Categoria</label>

          <input
            name="categoria"
            placeholder="Categoria"
            value={form.categoria}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Descrição</label>

          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>URL da capa</label>

          <input
            name="capa"
            placeholder="URL da capa"
            value={form.capa}
            onChange={handleChange}
          />

        </div>

        {
          form.capa && (

            <div className="preview-capa">

              <img
                src={form.capa}
                alt={form.titulo}
              />

            </div>

          )
        }

        <div className="form-actions">

          <button
            type="submit"
            className="salvar-btn"
          >
            Salvar alterações
          </button>

          <button
            type="button"
            className="cancelar-btn"
            onClick={() =>
              navigate('/livros')
            }
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>
  )
}