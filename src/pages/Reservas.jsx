import {
  useEffect,
  useState
} from 'react'

import api from '../services/api'

import './Reservas.css'

export default function Reservas() {

  const [reservas, setReservas] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    carregarReservas()

  }, [])

  async function carregarReservas() {

    try {

      const res =
        await api.get('/reservas')

      setReservas(res.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  async function aprovarReserva(id) {

    const confirmar = window.confirm(
      'Deseja aprovar esta reserva?'
    )

    if (!confirmar) return

    try {

      await api.put(
        `/reservas/aprovar/${id}`
      )

      alert(
        'Reserva aprovada!'
      )

      carregarReservas()

    } catch (error) {

      alert(
        'Erro ao aprovar reserva'
      )
    }
  }

  const pendentes =
    reservas.filter(
      reserva =>
        reserva.status === 'reservado'
    )

  const aprovadas =
    reservas.filter(
      reserva =>
        reserva.status === 'aprovado'
    )

  if (loading) {

    return <h2>Carregando...</h2>
  }

  return (

    <div className="reservas-page">

      <div className="section-title">

        <h2>
          Reservas de Livros
        </h2>

      </div>

      <h3 className="reserva-subtitle">

        Reservas pendentes

      </h3>

      <div className="reservas-grid">

        {
          pendentes.length === 0 ? (

            <p>
              Nenhuma reserva pendente.
            </p>

          ) : (

            pendentes.map(reserva => (

              <div
                className="reserva-admin-card"
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

                <h3>
                  {
                    reserva.livroId?.titulo
                  }
                </h3>

                <p>

                  <strong>
                    Usuário:
                  </strong>

                  {' '}

                  {
                    reserva.usuarioId?.nome
                  }

                </p>

                <span>
                  {reserva.status}
                </span>

                <button
                  onClick={() =>
                    aprovarReserva(
                      reserva._id
                    )
                  }
                >

                  Aprovar Reserva

                </button>

              </div>

            ))
          )
        }

      </div>

      <h3 className="reserva-subtitle">

        Reservas aprovadas

      </h3>

      <div className="reservas-grid">

        {
          aprovadas.length === 0 ? (

            <p>
              Nenhuma reserva aprovada.
            </p>

          ) : (

            aprovadas.map(reserva => (

              <div
                className="reserva-admin-card"
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

                <h3>
                  {
                    reserva.livroId?.titulo
                  }
                </h3>

                <p>

                  <strong>
                    Usuário:
                  </strong>

                  {' '}

                  {
                    reserva.usuarioId?.nome
                  }

                </p>

                <span className="aprovado">

                  Aprovado

                </span>

              </div>

            ))
          )
        }

      </div>

    </div>
  )
}