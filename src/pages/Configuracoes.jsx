import { useState } from 'react'

import './Configuracoes.css'

export default function Configuracoes() {

  const [nomeBiblioteca,
    setNomeBiblioteca] =
      useState('Minha Biblioteca')

  const [email,
    setEmail] =
      useState('admin@admin.com')

  const [telefone,
    setTelefone] =
      useState('(11) 99999-9999')

  const [endereco,
    setEndereco] =
      useState('São Paulo - SP')

  function salvarConfiguracoes(e) {

    e.preventDefault()

    alert(
      'Configurações salvas com sucesso!'
    )
  }

  return (

    <div className="config-page">

      <div className="config-header">

        <h1>
          Configurações
        </h1>

        <p>
          Personalize o sistema da biblioteca.
        </p>

      </div>

      <form
        className="config-form"
        onSubmit={salvarConfiguracoes}
      >

        <div className="config-card">

          <h2>
            Informações Gerais
          </h2>

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

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={e =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Telefone
            </label>

            <input
              type="text"
              value={telefone}
              onChange={e =>
                setTelefone(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Endereço
            </label>

            <input
              type="text"
              value={endereco}
              onChange={e =>
                setEndereco(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        <div className="config-card">

          <h2>
            Sobre o sistema
          </h2>

          <p>

            Sistema desenvolvido
            para gerenciamento
            de bibliotecas digitais.

          </p>

          <p>

            Projeto Integrador
            utilizando React,
            Node.js, Express,
            MongoDB e API REST.

          </p>

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