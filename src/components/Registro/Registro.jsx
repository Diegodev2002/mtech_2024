import { useState } from 'react'
import { estados } from '../../data/constans_estados.js'

import { useZustandStore } from '../../store/form-store.js'
import { Input } from './Input.jsx'
import { Select } from './Select.jsx'
import { Participante } from './Participantes.jsx'

export function Registro() {
  const { setZustandState } = useZustandStore()

  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Guanajuato')
  const [message, setMessage] = useState('')

  const handleEstadoChange = (event) => {
    const estado = event.target.value
    setEstadoSeleccionado(estado)
  }

  const municipios = estadoSeleccionado ? estados[estadoSeleccionado] : []

  const [genero1, setGeneroSeleccionado1] = useState('')
  const [genero2, setGeneroSeleccionado2] = useState('')
  const [genero3, setGeneroSeleccionado3] = useState('')

  const handleGenero_integrante_Change1 = (e) => {
    const genero_integrante1 = e.target.value
    setGeneroSeleccionado1(genero_integrante1)
  }
  const handleGenero_integrante_Change2 = (e) => {
    const genero_integrante2 = e.target.value
    setGeneroSeleccionado2(genero_integrante2)
  }
  const handleGenero_integrante_Change3 = (e) => {
    const genero_integrante3 = e.target.value
    setGeneroSeleccionado3(genero_integrante3)
  }

  const correcto =
    genero1 === genero2 && genero2 === genero3 && genero1 === genero3
  const buttonDisabled = correcto
    ? 'bg-gray-500 text-gray-600'
    : 'bg-blue-500 hover:bg-blue-700 text-white '

  const [categorias, setcategoria] = useState('')
  const handleCategoriaChange = (e) => {
    const categoria = e.target.value
    setcategoria(categoria)
  }

  const requeri = categorias === 'Sumo Autónomo' ? 'hidden' : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    /*if (!correcto) {
      try {
        const validarEquipos = await fetch(
          'http://mtech.igeco.mx/backend/obtener-registros',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        )
        const response1 = await validarEquipos.json()
        console.log(response1)
        if (
          (data.categoria === 'Sumo Autónomo' && response1.total < 16) ||
          (data.categoria === 'M-Tech Innovations' && response1.total < 14) ||
          (data.categoria === 'M-Tech Engineers' && response1.total < 14)
        ) {
          const guardar_registro = await fetch(
            'https://mtech.igeco.mx/backend/guardar-registro',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }
          )

          const response = await guardar_registro.json()
          if (response.status) {
            setZustandState(true)
            window.location.href = '/gracias-por-participar'
          }
        } else {
          setMessage('Error - Cupo de Equipos párticipantes lleno')
        }
      } catch (error) {
        console.log(error)
        setMessage('Error al guardar el registro intenta más tarde...')
        //document.getElementById('form-register').reset()
      }
    } else {
      setMessage('El equipo debe de ser genero mixto...')
    }*/
  }

  return (
    <div className='text-white font-bold backdrop-blur-4xl bg-white/10 text-center bg-blur-md p-5 rounded-2xl'>
      <p className='text-2xl' style={{ textShadow: '0px 0px 15px white' }}>
        REGÍSTRATE
      </p>

      <p className='mt-10'>Captura los datos de tu equipo</p>
      <form onSubmit={handleSubmit} className='mt-5' id='form-register'>
      {/* Nombre del equipo */}
        <div className='grid place-content-center'>
          <Input
            type='text'
            name='nombre_equipo'
            label='Nombre del equipo'
            placeholder='Ingresa el nombre del equipo'
            required={true}
          />
        </div>

        <div className='grid sm:flex gap-4 justify-center mt-5'>
        {/* Sede */}
          <div>
            <Select
            label= 'Sede'
            name='sede'
            text= 'Elige una sede'
            options={['Silao - UPIIG','Valle de Santiago - UTSOE','Purísima del Rincón - ITSPR']}
            />   
          </div>
          {/* Categoría */}
          <div>
            <Select
              label= 'Categoría'
              name='categoria'
              text= 'Elige una categoría'
              options={['Sumo Autónomo','M-Tech Innovations','M-Tech Engineers']}
              onChange={handleCategoriaChange}
              />
          </div>
        </div>

        <div className='grid sm:flex gap-2 place-content-center mt-5 mx-2'>
          {/* Nombre Escuela */}
          <div>
            <Input
              type='text'
              name='nombre_escuela'
              label='Nombre de la escuela'
              placeholder='Ingresa el nombre de la escuela'
              required={true}
            />
          </div>
          {/* Delegacion */}
          <div>
          <Input
            type='text'
            name='delegación'
            label='Delegacion'
            placeholder='Ingresa la delegacion'
            required={true}
          />
          </div>
          <div className={`${requeri}  min-h-min truncate`}>
            <Input
              type='text'
              name='requerimiento'
              label='Requerimiento'
              placeholder='Ingresa el requerimiento'
              required={false}
            />
          </div>
        </div>
        <div className='grid lg:flex gap-4 mt-5 mx-8 justify-center'>
          {/* Municipio */}
          <div className='lg:col-span-2  sm:col-start-1'>
            <Select
              label= 'Municipio'
              name='municipio'
              text= '----Selecciona un Municipio-----'
              options={estados}
              />
          </div>
          
          {/* Nivel */}
          <div className='lg:col-span-2'>
          <Input
            type='text'
            name='nivel'
            label='Nivel'
            placeholder='Ingresa el Nivel'
            required={true}
          />
          </div>
          {/* CCT */}
          <div className='lg:col-span-2'>
            <Input
              type='text'
              name='cct'
              label='CCT'
              placeholder='Ingresa el CCT'
              required={true}
            />
          </div>
        </div>
        <hr className='mt-10' />

        <Participante
          titulo = 'Coach'
          subtitulo='Para registrar a tu equipo debes considerar lo siguiente: El
          equipo debe de estar conformado por 3 integrantes de genero mixto
          (2 mujeres y 1 hombre) o (2 hombres y 1 mujer).'
          numero = 'coach'
          />

        <Participante
          titulo = 'Lider del equipo'
          numero = '1'
          onChange={handleGenero_integrante_Change1}
          />
          <Participante
          titulo = 'Integrante 2'
          numero = '2'              
          onChange={handleGenero_integrante_Change2}
          />
        <Participante
          titulo = 'Integrante 3'
          numero = '3'
          onChange={handleGenero_integrante_Change3}
          />
        <p className='text-red-600 font-bold text-2xl'>{message}</p>
        <button
          type='submit'
          disabled={correcto}
          className={`mt-10 ${buttonDisabled} font-bold py-2 px-5 rounded`}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
