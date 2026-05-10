import { useNavigate } from 'react-router-dom'

import PublicHeader from '../../components/PublicHeader'

import './Sobre.css'

import Footer from '../../components/Footer'

export default function Sobre() {

  const navigate = useNavigate()

  return (

    <div className="sobre-page">

      <PublicHeader />

      <section className="sobre-container">

        <div className="sobre-content">

          <h1>Sobre a Biblioteca</h1>

          <p>
            Nossa biblioteca foi criada com
            o objetivo de incentivar a leitura
            e facilitar o acesso ao conhecimento.
          </p>

          <p>
            Aqui você encontra diversos livros
            de diferentes categorias, autores
            e estilos para explorar novos mundos
            através da leitura.
          </p>

          <p>
            Este sistema foi desenvolvido para
            oferecer uma experiência moderna,
            simples e acessível para todos os
            leitores.
          </p>

          <button
            onClick={() => navigate('/')}
          >
            Voltar para o início
          </button>

        </div>

      </section>
        <Footer />
    </div>
  )
}