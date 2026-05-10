import { useState } from 'react'
import './Configuracoes.css'

export default function Configuracoes() {

  const [nomeBiblioteca, setNomeBiblioteca] =
    useState('Minha Biblioteca')

  const [email, setEmail] =
    useState('admin@admin.com')

  const [temaEscuro, setTemaEscuro] =
    useState(false)

  function salvarConfiguracoes(e) {

    e.preventDefault()

    alert(
      'Configurações salvas com sucesso!'
    )
  }

  return (

    <div className="config-page">

      <div className="config-header">

        <h1>Configurações</h1>

        <p>
          Personalize o sistema da biblioteca.
        </p>

      </div>

      <form
        className="config-form"
        onSubmit={salvarConfiguracoes}
      >

        <div className="config-card">

          <h2>Informações Gerais</h2>

          <div className="form-group">

            <label>
              Nome da Biblioteca
            </label>

            <input
              type="text"
              value={nomeBiblioteca}
              onChange={e =>
                setNomeBiblioteca(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>

        <div className="config-card">

          <h2>Aparência</h2>

          <div className="switch-area">

            <div>

              <strong>Tema escuro</strong>

              <p>
                Ativar modo escuro do sistema
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={temaEscuro}
                onChange={() =>
                  setTemaEscuro(!temaEscuro)
                }
              />

              <span className="slider"></span>

            </label>

          </div>

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Salvar alterações
        </button>

      </form>

    </div>
  )
}