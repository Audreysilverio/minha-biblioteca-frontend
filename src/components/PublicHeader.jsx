import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import './PublicHeader.css'

export default function PublicHeader() {

  const navigate = useNavigate()

  function logoutUsuario() {

  localStorage.removeItem(
    'usuarioToken'
  )

  localStorage.removeItem(
    'usuario'
  )

  navigate('/')
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

        <Link to="/minhas-reservas">
        Minhas Reservas
        </Link>

      </nav>

      <div className="header-actions">

        <div className="search-public">

          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar livros..."
          />

        </div>

       {
  localStorage.getItem(
    'usuarioToken'
  ) ? (

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

  )
}

      </div>

    </header>
  )
}