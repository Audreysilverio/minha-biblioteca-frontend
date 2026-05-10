import { FaBell, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Header.css'
export default function Header() {

  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="header">

      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Pesquisar livros..." />
      </div>

      <div className="user-area">
        <FaBell />

        <span>Administrador</span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Sair
        </button>

      </div>

    </header>
  )
}