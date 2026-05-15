import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import PublicHeader from '../../components/PublicHeader'

import Footer from '../../components/Footer'

import api from '../../services/api'

import './MinhasReservas.css'

export default function MinhasReservas() {

  const [reservas, setReservas] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const navigate = useNavigate()

  const usuario =
    JSON.parse(
      localStorage.getItem('usuario')
    )

  useEffect(() => {

    if (!usuario) {

      navigate('/entrar')

      return
    }

    carregarReservas()

  }, [])

  async function carregarReservas() {

    try {

      const res =
        await api.get('/reservas')

      const minhasReservas =

        res.data.filter(

          reserva =>

            reserva.usuarioId?._id ===
            usuario?.id

        )

      setReservas(minhasReservas)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  async function cancelarReserva(id) {

    const confirmar = window.confirm(
      'Deseja cancelar esta reserva?'
    )

    if (!confirmar) return

    try {

      await api.delete(
        `/reservas/${id}`
      )

      setReservas(

        reservas.filter(
          reserva =>
            reserva._id !== id
        )

      )

      alert(
        'Reserva cancelada!'
      )

    } catch (error) {

      alert(
        'Erro ao cancelar reserva'
      )
    }
  }

  if (loading) {

    return <h2>Carregando...</h2>
  }

  return (

    <div className="minhas-reservas-page">

      <PublicHeader />

      <div className="reservas-container">

        <h1>
          Minhas Reservas
        </h1>

        <p>
          Acompanhe seus livros reservados.
        </p>

        <div className="reservas-grid">

          {
            reservas.length === 0 ? (

              <p>
                Nenhuma reserva encontrada.
              </p>

            ) : (

              reservas.map(reserva => (

                <div
                  className="reserva-card"
                  key={reserva._id}
                >

                  <img
                    src={
                      reserva.livroId?.capa
                    }
                    alt={
                      reserva.livroId?.titulo
                    }
                  />

                  <div className="reserva-info">

                    <h3>

                      {
                        reserva.livroId?.titulo
                      }

                    </h3>

                    <p>

                      {
                        reserva.livroId?.autor
                      }

                    </p>

                    <span
                      className={
                        reserva.status ===
                        'aprovado'

                          ? 'status-aprovado'

                          : 'status-pendente'
                      }
                    >

                      {reserva.status}

                    </span>

                    <button
                      className="cancelar-btn"
                      onClick={() =>
                        cancelarReserva(
                          reserva._id
                        )
                      }
                    >

                      Cancelar reserva

                    </button>

                  </div>

                </div>

              ))
            )
          }

        </div>

      </div>

      <Footer />

    </div>
  )
}