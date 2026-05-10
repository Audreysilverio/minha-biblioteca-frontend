import { useState } from 'react'
import api from '../services/api'

export default function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

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

      window.location.reload()

    } catch (err) {

      alert(
        err.response?.data?.erro ||
        'Erro ao logar'
      )
    }
  }

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

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