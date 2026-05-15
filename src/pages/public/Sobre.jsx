import { useNavigate } from 'react-router-dom'

import PublicHeader from '../../components/PublicHeader'

import Footer from '../../components/Footer'

import './Sobre.css'

export default function Sobre() {

  const navigate = useNavigate()

  return (

    <div className="sobre-page">

      <PublicHeader />

      <section className="sobre-container">

        <div className="sobre-content">

          <h1>
            Sobre o Projeto Minha Biblioteca
          </h1>

          <p>

            O projeto <strong>Minha Biblioteca</strong>
            foi desenvolvido pelos alunos do
            eixo de Computação da
            <strong> UNIVESP </strong>
            como parte do Projeto Integrador,
            com o objetivo de criar uma
            plataforma moderna para gerenciamento
            de bibliotecas digitais.

          </p>

          <p>

            O sistema foi pensado para facilitar
            o acesso aos livros, permitir reservas,
            organizar empréstimos e aproximar
            a comunidade do universo da leitura
            através da tecnologia.

          </p>

          <p>

            Além do desenvolvimento técnico,
            o projeto também possui um importante
            papel social, buscando contribuir
            com iniciativas voltadas à educação
            e ao incentivo à leitura na comunidade
            do <strong>Zaki Narchi</strong>.

          </p>

          <p>

            A plataforma utiliza tecnologias
            modernas como React, Node.js,
            Express e MongoDB, oferecendo uma
            experiência acessível, intuitiva
            e responsiva para administradores
            e leitores.

          </p>

          <p>

            Este projeto representa a união
            entre educação, tecnologia e impacto
            social, mostrando como soluções
            digitais podem transformar o acesso
            ao conhecimento.

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