import {
  useEffect,
  useState
} from 'react'

import api from '../services/api'

import './Reservas.css'

export default function Reservas() {

  const [reservas, setReservas] =
    useState([])

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
    }
  }

  async function aprovarReserva(id) {

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

  return (

    <div className="reservas-page">

      <div className="section-title">

        <h2>
          Reservas de Livros
        </h2>

      </div>

      <div className="reservas-grid">

        {
          reservas.map(reserva => (

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

                Usuário:

                {
                  reserva.usuarioId?.nome
                }

              </p>

              <span>
                {reserva.status}
              </span>

              {
                reserva.status ===
                'reservado' && (

                  <button
                    onClick={() =>
                      aprovarReserva(
                        reserva._id
                      )
                    }
                  >

                    Aprovar Reserva

                  </button>

                )
              }

            </div>

          ))
        }

      </div>

    </div>
  )
}
