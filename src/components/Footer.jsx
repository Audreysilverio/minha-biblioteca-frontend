import {
  FaInstagram,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa'

import {
  Link
} from 'react-router-dom'

import './Footer.css'

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* LOGO */}

        <div className="footer-brand">

          <h2>
            Minha Biblioteca
          </h2>

          <p>
            Transformando leitura em
            conhecimento acessível 📚
          </p>

        </div>

        {/* LINKS */}

        <div className="footer-links">

          <h3>
            Navegação
          </h3>

          <Link to="/">
            Início
          </Link>

          <Link to="/catalogo">
            Catálogo
          </Link>

          <Link to="/sobre">
            Sobre
          </Link>

          <Link to="/entrar">
            Entrar
          </Link>

        </div>

        {/* CONTATO */}

        <div className="footer-contact">

          <h3>
            Contato
          </h3>

          <p>
            contato@biblioteca.com
          </p>

          <p>
            (11) 99999-9999
          </p>

          <p>
            São Paulo - SP
          </p>

        </div>

        {/* REDES */}

        <div className="footer-social">

          <h3>
            Redes Sociais
          </h3>

          <div className="social-icons">

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Minha Biblioteca
          - Todos os direitos reservados
        </p>

      </div>

    </footer>
  )
}