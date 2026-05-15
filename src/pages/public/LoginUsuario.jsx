import { useState } from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import api from '../../services/api'

import PublicHeader from '../../components/PublicHeader'

import './LoginUsuario.css'

export default function LoginUsuario() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [senha, setSenha] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleLogin(e) {

    e.preventDefault()

    setLoading(true)

    try {

      const res = await api.post(
        '/usuarios/login',
        {
          email,
          senha
        }
      )

      localStorage.setItem(
        'usuarioToken',
        res.data.token
      )

      localStorage.setItem(
        'usuario',
        JSON.stringify(
          res.data.usuario
        )
      )

      alert(
        'Login realizado!'
      )

      navigate('/catalogo')

    } catch (error) {

      alert(

        error.response?.data?.erro ||

        'Erro ao realizar login'

      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="login-usuario-page">

      <PublicHeader />

      <div className="login-usuario-container">

        <form
          className="login-usuario-form"
          onSubmit={handleLogin}
        >

          <h1>
            Entrar
          </h1>

          <p>
            Faça login para reservar livros.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e =>
              setSenha(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? 'Entrando...'
                : 'Entrar'
            }

          </button>

          <span>

            Não possui conta?

            {' '}

            <Link to="/cadastro">

              Criar conta

            </Link>

          </span>

        </form>

      </div>

    </div>
  )
}