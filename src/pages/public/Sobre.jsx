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

            O projeto <strong>Minha Biblioteca </strong>
             foi desenvolvido pelos alunos do eixo
            de Computação da <strong>UNIVESP</strong>,
            como parte do Projeto Integrador,
            com o objetivo de criar uma plataforma
            moderna, acessível e eficiente para
            gerenciamento de bibliotecas e incentivo
            à leitura na comunidade.

          </p>

          <p>

            A plataforma foi criada especialmente
            para apoiar as atividades da
            <strong> Associação Sempre Zaki Narchi</strong>,
            contribuindo com a organização do acervo,
            controle de empréstimos e democratização
            do acesso aos livros para crianças,
            jovens e famílias atendidas pela instituição.

          </p>

          <p>

            O sistema permite o cadastro de livros,
            gerenciamento de empréstimos e devoluções,
            controle da disponibilidade dos exemplares
            e visualização do catálogo de forma simples,
            intuitiva e responsiva.

          </p>

          <p>

            O desenvolvimento do projeto utilizou
            tecnologias modernas como
            <strong> React</strong>,
            <strong> Node.js</strong>,
            <strong> Express</strong> e
            <strong> MongoDB</strong>,
            proporcionando desempenho, segurança
            e uma experiência agradável tanto para
            administradores quanto para usuários.

          </p>

          <p>

            Mais do que um sistema de biblioteca,
            o projeto representa a união entre
            <strong> educação, tecnologia e impacto social</strong>,
            demonstrando como soluções digitais podem
            fortalecer iniciativas comunitárias e ampliar
            o acesso ao conhecimento.

          </p>

          <p>

            A proposta do Minha Biblioteca é continuar
            evoluindo, oferecendo novos recursos e
            contribuindo para o desenvolvimento educacional
            e cultural da comunidade atendida pela
            Associação Sempre Zaki Narchi.

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