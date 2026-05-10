import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function NovoLivro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
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
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await api.post('/livros', {
        ...form,
        quantidadeTotal: Number(form.quantidadeTotal)
      })

      alert('Livro cadastrado com sucesso!')
      navigate('/livros')

    } catch (err) {
      console.log(err)
      alert('Erro ao cadastrar')
    }
  }

  return (
    <div>
      <h1>Novo Livro</h1>

      <form onSubmit={handleSubmit} className="form">
        <input name="titulo" placeholder="Título" onChange={handleChange} />
        <input name="autor" placeholder="Autor" onChange={handleChange} />
        <input name="categoria" placeholder="Categoria" onChange={handleChange} />

        <input
          name="capa"
          placeholder="URL da capa do livro"
          onChange={handleChange}
        />

        
        <input
          type="number"
          name="quantidadeTotal"
          placeholder="Quantidade de exemplares"
          min="1"
          value={form.quantidadeTotal}
          onChange={handleChange}
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}