import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import './Cadastro.css'

export default function Cadastro() {

  const navigate = useNavigate()

  const [form, setForm] = useState({

    nome: '',
    email: '',
    senha: '',
    telefone: ''

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

      await api.post(
        '/usuarios/register',
        form
      )

      alert(
        'Cadastro realizado com sucesso!'
      )

      navigate('/entrar')

    } catch (error) {

      alert(
        error.response?.data?.erro ||
        'Erro ao cadastrar usuário'
      )
    }
  }

  return (

    <div className="cadastro-page">

      <PublicHeader />

      <div className="cadastro-container">

        <form
          className="cadastro-form"
          onSubmit={handleSubmit}
        >

          <h1>Criar conta</h1>

          <p>
            Cadastre-se para reservar livros.
          </p>

          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <button type="submit">
            Criar conta
          </button>

          <span>

            Já possui conta?

            <Link to="/entrar">
              Entrar
            </Link>

          </span>

        </form>

      </div>

    </div>
  )
}