import { useEffect, useState } from 'react'

import PublicHeader from '../../components/PublicHeader'

import api from '../../services/api'

import './MinhasReservas.css'

import Footer from '../../components/Footer'

export default function MinhasReservas() {

  const [reservas, setReservas] =
    useState([])

  const usuario =
    JSON.parse(
      localStorage.getItem('usuario')
    )

  useEffect(() => {

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
    }
  }

  return (

    <div className="minhas-reservas-page">

      <PublicHeader />

      <div className="reservas-container">

        <h1>Minhas Reservas</h1>

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

                    <span>
                      {reserva.status}
                    </span>

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