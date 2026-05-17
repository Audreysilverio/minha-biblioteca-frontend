import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  FaSearch
} from 'react-icons/fa'

import {
  useState
} from 'react'

import './PublicHeader.css'

export default function PublicHeader() {

  const navigate = useNavigate()

  const [busca, setBusca] =
    useState('')

  const usuarioLogado =
    localStorage.getItem(
      'usuarioToken'
    )

  function logoutUsuario() {

    localStorage.removeItem(
      'usuarioToken'
    )

    localStorage.removeItem(
      'usuario'
    )

    navigate('/')

  }

  function buscarLivros(e) {

    if (e.key === 'Enter') {

      navigate(

        `/catalogo?busca=${busca}`

      )

    }

  }

  return (

    <header className="public-header">

      <div
        className="logo"
        onClick={() => navigate('/')}
      >

        📚 Minha Biblioteca

      </div>

      <nav>

        <Link to="/">
          Início
        </Link>

        <Link to="/catalogo">
          Catálogo
        </Link>

        <Link to="/sobre">
          Sobre
        </Link>

      </nav>

      <div className="header-actions">

        <div className="search-public">

          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar livros..."
            value={busca}
            onChange={(e) =>
              setBusca(
                e.target.value
              )
            }
            onKeyDown={buscarLivros}
          />

        </div>

        {usuarioLogado ? (

          <button
            onClick={logoutUsuario}
          >

            Sair

          </button>

        ) : (

          <button
            onClick={() =>
              navigate('/entrar')
            }
          >

            Entrar

          </button>

        )}

      </div>

    </header>
  )
}