import logo from '../assets/logo.png'

import { NavLink } from 'react-router-dom'

import {
  FaHome,
  FaBook,
  FaTags,
  FaExchangeAlt,
  FaChartBar,
  FaCog
} from 'react-icons/fa'

import './Sidebar.css'

export default function Sidebar() {

  const menu = [
    {
      nome: 'Início',
      rota: '/admin',
      icon: <FaHome />
    },

    {
      nome: 'Livros',
      rota: '/livros',
      icon: <FaBook />
    },

    {
      nome: 'Categorias',
      rota: '/categorias',
      icon: <FaTags />
    },

    {
      nome: 'Empréstimos',
      rota: '/emprestimos',
      icon: <FaExchangeAlt />
    },

    {
      nome: 'Relatórios',
      rota: '/relatorios',
      icon: <FaChartBar />
    },

    {
      nome: 'Configurações',
      rota: '/configuracoes',
      icon: <FaCog />
    }
  ]

  return (

    <aside className="sidebar">

      <div className="logo-area">

        <img
          src={logo}
          alt="Logo Biblioteca"
        />

      </div>

      <nav>

        {menu.map((item) => (

          <NavLink
            key={item.nome}
            to={item.rota}
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >

            {item.icon}

            <span>
              {item.nome}
            </span>

          </NavLink>

        ))}

      </nav>

    </aside>
  )
}