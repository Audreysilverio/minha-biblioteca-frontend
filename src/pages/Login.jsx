import { useState } from 'react'

import api from '../services/api'

import './Login.css'

import logo from '../assets/logo.png'

export default function Login() {

  const [email, setEmail] =
    useState('')

  const [senha, setSenha] =
    useState('')

  async function handleLogin(e) {

    e.preventDefault()

    try {

      const res = await api.post(
        '/auth/login',
        {
          email,
          senha
        }
      )
        localStorage.setItem(
  'token',
  res.data.token
)

window.location.href = '/admin'

    } catch (err) {

      alert(
        err.response?.data?.erro ||
        'Erro ao logar'
      )
    }
  }

  return (

    <div className="login-page">

      <div className="login-container">

        <img
          src={logo}
          alt="Logo"
          className="login-logo"
        />

        <h1>
          Painel Administrativo
        </h1>

        <p>
          Faça login para acessar
          o sistema da biblioteca.
        </p>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e =>
              setSenha(e.target.value)
            }
          />

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  )
}