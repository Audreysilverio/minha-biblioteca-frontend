import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

/* ADMIN */

import Login from './pages/Login'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './components/Dashboard'

import NovoLivro from './pages/NovoLivro'
import Livros from './pages/Livros'
import EditarLivro from './pages/EditarLivro'

import Categorias from './pages/Categorias'
import Emprestimos from './pages/Emprestimos'
import Devolucoes from './pages/Devolucoes'
import Relatorios from './pages/Relatorios'
import Configuracoes from './pages/Configuracoes'
import Reservas from './pages/Reservas'

/* PUBLICO */

import Home from './pages/public/Home'
import Catalogo from './pages/public/Catalogo'
import Sobre from './pages/public/Sobre'
import Cadastro from './pages/public/Cadastro'
import LoginUsuario from './pages/public/LoginUsuario'
import MinhasReservas from './pages/public/MinhasReservas'
import LivroDetalhes from './pages/public/LivroDetalhes'

function AdminLayout() {

  return (

    <div className="container">

      <Sidebar />

      <div className="main-content">

        <Header />

        <Routes>

          <Route
            path="/admin"
            element={<Dashboard />}
          />

          <Route
            path="/livros"
            element={<Livros />}
          />

          <Route
            path="/livros/novo"
            element={<NovoLivro />}
          />

          <Route
            path="/livros/editar/:id"
            element={<EditarLivro />}
          />

          <Route
            path="/categorias"
            element={<Categorias />}
          />

          <Route
            path="/emprestimos"
            element={<Emprestimos />}
          />

          <Route
            path="/devolucoes"
            element={<Devolucoes />}
          />

          <Route
            path="/relatorios"
            element={<Relatorios />}
          />

          <Route
            path="/configuracoes"
            element={<Configuracoes />}
          />

          <Route
            path="/reservas"
            element={<Reservas />}
          />

        </Routes>

      </div>

    </div>
  )
}

function App() {

  const token =
    localStorage.getItem('token')

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLICO */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/sobre"
          element={<Sobre />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/entrar"
          element={<LoginUsuario />}
        />

        <Route
          path="/minhas-reservas"
          element={<MinhasReservas />}
        />

        <Route
          path="/livro/:id"
          element={<LivroDetalhes />}
        />

        {/* LOGIN ADMIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADMIN */}

        <Route
          path="/*"
          element={
            token
              ? <AdminLayout />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App