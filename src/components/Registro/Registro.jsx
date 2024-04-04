import { useState } from 'react'
import { estados } from '../../data/constans_estados.js'

export function Registro() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('')
  const [message, setMessage] = useState('')

  const handleEstadoChange = (event) => {
    const estado = event.target.value
    setEstadoSeleccionado(estado)
  }

  const municipios = estadoSeleccionado ? estados[estadoSeleccionado] : []

  const [genero1, setGeneroSeleccionado1] = useState('')
  const [genero2, setGeneroSeleccionado2] = useState('')
  const [genero3, setGeneroSeleccionado3] = useState('')

  const handleGenero_integrante_1Change = (e) => { 
    const genero_integrante1 = e.target.value
    setGeneroSeleccionado1(genero_integrante1)
  }
  const handleGenero_integrante_2Change = (e) => {
    const genero_integrante2 = e.target.value
    setGeneroSeleccionado2(genero_integrante2)
  }
  const handleGenero_integrante_3Change = (e) => {
    const genero_integrante3 = e.target.value
    setGeneroSeleccionado3(genero_integrante3)
  }

  const correcto =
    genero1 === genero2 && genero2 === genero3 && genero1 === genero3 
  const buttonDisabled = correcto
    ? 'bg-gray-500 text-gray-600'
    : 'bg-blue-500 hover:bg-blue-700 text-white '

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    if (!correcto) {
      try {

        const validarEquipos = await fetch(
          'http://localhost:3000/obtener-registros',
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
        if(data.categoria === 'Sumo Autónomo' && response1.total < 16 
          || data.categoria === 'M-Tech Innovations' && response1.total < 14 
          || data.categoria === 'M-Tech Engineers' && response1.total < 14 )
        {
            const guardar_registro = await fetch(
              'http://localhost:3000/guardar-registro',
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
              setMessage('Tu registro se guardo correctamente')
             // document.getElementById('form-register').reset()
            }
        }
        else{
          setMessage('Error - Cupo de Equipos párticipantes lleno')
        }
        
       
      } catch (error) {
        console.log(error)
        setMessage('Error al guardar el registro intenta más tarde...')
        document.getElementById('form-register').reset()
      }
    }
  }

  return (
    <div className='text-white font-bold text-center bg-slate-700 p-5 rounded-2xl'>
      <p className='text-2xl'>REGISTRATE</p>

      <p className='mt-10'>Captura los datos de tu equipo</p>
      <form onSubmit={handleSubmit} className='mt-5' id='form-register'>
        <div className='grid place-content-center '>
          <label
            htmlFor='nombre_equipo'
            className='block text-sm font-medium leading-6'
          >
            Nombre del equipo
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <input
                type='text'
                name='nombre_equipo'
                id='nombre_equipo'
                required
                autoComplete='nombre_equipo'
                className='block flex-1 border-0 bg-transparent py-1.5 px-4 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>

        <div className='grid sm:flex gap-4 justify-center mt-5'>
          <div>
            <p className='text-sm font-medium leading-6'>Sede</p>
            <select
              name='sede'
              id='sede'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option value='' defaultValue>
                elige una sede
              </option>
              <option>Silao - UPIIG</option>
              <option>Valle de Santiago - UTSOE</option>
              <option>Purísima del Rincón - ITSPR </option>
            </select>
          </div>
          <div>
            <p className='text-sm font-medium leading-6'>Categoría</p>
            <select
              name='categoria'
              required
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option value='' defaultValue>
                elige una categoría
              </option>
              <option>Sumo Autónomo</option>
              <option>M-Tech Innovations</option>
              <option>M-Tech Engineers</option>
            </select>
          </div>
        </div>

        <div className='grid sm:flex gap-4 place-content-center mt-5 mx-8'>
          <div>
            <label
              htmlFor='nombre_escuela'
              className='block text-sm font-medium leading-6'
            >
              Nombre de la escuela
            </label>
            <div className='mt-2 '>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                <input
                  type='text'
                  name='nombre_escuela'
                  id='nombre_escuela'
                  autoComplete='nombre_escuela'
                  required
                  className='block flex-1 border-0 bg-transparent py-1.5 px-4 focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='direccion'
              className='block text-sm font-medium leading-6'
            >
              Dirección
            </label>
            <div className='mt-2'>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full'>
                <input
                  type='text'
                  name='direccion'
                  id='direccion'
                  autoComplete='direccion'
                  required
                  className='block flex-1 border-0 bg-transparent py-1.5 px-4 focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='grid lg:flex gap-4 mt-5 mx-8 justify-center'>
          <div className='lg:col-span-2'>
            <label
              htmlFor='estado'
              className='block text-sm font-medium leading-6 text-white'
            >
              Estado
            </label>
            <div className='mt-2'>
              <select
                name='estado'
                id='estado'
                autoComplete='address-level1'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={handleEstadoChange}
                required
              >
                <option value='' defaultValue>
                  ----Selecciona un estado-----
                </option>
                {Object.keys(estados).map((estado, index) => (
                  <option key={index} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='lg:col-span-2  sm:col-start-1'>
            <label
              htmlFor='municipio'
              className='block text-sm font-medium leading-6 text-white'
            >
              Municipio
            </label>
            <div className='mt-2'>
              {estadoSeleccionado && (
                <select
                  name='municipio'
                  id='municipio'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  required
                >
                  <option value='' defaultValue>
                    ----Selecciona un Municipio-----
                  </option>
                  {municipios.map((municipio, index) => (
                    <option key={index} value={municipio}>
                      {municipio}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className='lg:col-span-2'>
            <label
              htmlFor='cp'
              className='block text-sm font-medium leading-6 text-white'
            >
              ZIP / Codigo postal
            </label>
            <div className='mt-2'>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full'>
                <input
                  type='text'
                  name='cp'
                  id='cp'
                  autoComplete='cp'
                  required
                  className='block flex-1 border-0 bg-transparent py-1.5 px-4 focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='grid lg:flex gap-4 justify-center lg:justify-between mt-10 lg:mt-20'>
          <p className='mx-auto text-xl'>
            Captura los datos de los Integrantes <br />
            <span className='mx-auto font-normal text-xs'>
              Registra a tu equipo, el equipo debe de estar integrado por un
              coach, 3 integrantes y debe de ser de genero mixto (2 mujeres y 1
              hombre o 2 hombres y una mujer)
            </span>
          </p>
          <div>
            <div className='grid lg:flex gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='nombre_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Nombre del Coach
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='nombre_coach'
                      id='nombre_coach'
                      autoComplete='nombre_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='paterno_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Paterno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='paterno_coach'
                      id='paterno_coach'
                      autoComplete='nombre_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='materno_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Materno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='materno_coach'
                      id='materno_coach'
                      autoComplete='materno_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2 '>
                  <div className='flex mx-auto max-w-max rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_coach'
                      id='genero_coach'
                      required
                      className='block w-full mx-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option value='' defaultValue>
                        elige una opción
                      </option>
                      <option>Mujer</option>
                      <option>Hombre</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='edad_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Edad
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='edad_coach'
                      id='edad_coach'
                      autoComplete='edad_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <label
                  htmlFor='telefono_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Teléfono
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='telefono_coach'
                      id='telefono_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='email_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Correo
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='email'
                      name='email_coach'
                      id='email_coach'
                      autoComplete='email_coach'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='grid lg:flex gap-4  lg:justify-between mt-10 lg:mt-20'>
          <p className='mx-auto text-xl'>
            Captura datos del integrante 1 <br />
          </p>
          <div>
            <div className='grid lg:flex gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='nombre_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='nombre_integrante1'
                      id='nombre_integrante1'
                      autoComplete='nombre_integrante1'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='paterno_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Paterno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='paterno_integrante1'
                      id='paterno_integrante1'
                      autoComplete='paterno_integrante1'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='materno_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Materno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='materno_integrante1'
                      id='materno_integrante1'
                      autoComplete='materno_integrante1'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex mx-auto max-w-max rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_integrante1'
                      id='genero_integrante1'
                      required
                      onChange={handleGenero_integrante_1Change}
                      className='block w-full mx-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option value='' defaultValue>
                        elige una opción
                      </option>
                      <option>Mujer</option>
                      <option>Hombre</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='edad_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Edad
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      required
                      type='number'
                      name='edad_integrante1'
                      id='edad_integrante1'
                      autoComplete='edad_integrante1'
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <label
                  htmlFor='telefono_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Teléfono
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='telefono_integrante1'
                      id='telefono_integrante1'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='email_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Correo
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      required
                      type='email'
                      name='email_integrante1'
                      id='email_integrante1'
                      autoComplete='email_integrante1'
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='grid lg:flex gap-4 lg:justify-between mt-10 lg:mt-20'>
          <p className='mx-auto text-xl'>
            Captura datos del integrante 2 <br />
          </p>
          <div>
            <div className='grid lg:flex gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='nombre_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='nombre_integrante2'
                      id='nombre_integrante2'
                      autoComplete='nombre_integrante2'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='paterno_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Paterno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='paterno_integrante2'
                      id='paterno_integrante2'
                      autoComplete='paterno_integrante2'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='materno_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Materno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='materno_integrante2'
                      id='materno_integrante2'
                      autoComplete='materno_integrante2'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex  mx-auto max-w-max rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      required
                      name='genero_integrante2'
                      id='genero_integrante2'
                      onChange={handleGenero_integrante_2Change}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option value='' defaultValue>
                        elige una opción
                      </option>
                      <option>Mujer</option>
                      <option>Hombre</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='edad_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Edad
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      required
                      type='number'
                      name='edad_integrante2'
                      id='edad_integrante2'
                      autoComplete='edad_integrante2'
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <label
                  htmlFor='telefono_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Teléfono
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='telefono_integrante2'
                      id='telefono_integrante2'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='email_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Correo
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='email'
                      name='email_integrante2'
                      id='email_integrante2'
                      autoComplete='email_integrante2'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='grid lg:flex gap-4 lg:justify-between mt-10 lg:mt-20'>
          <p className='mx-auto text-xl '>
            Captura datos del integrante 3 <br />
          </p>
          <div>
            <div className='grid lg:flex gap-4'>
              <div className='w-full'>
                <label
                  htmlFor='nombre_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='nombre_integrante3'
                      id='nombre_integrante3'
                      autoComplete='nombre_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='paterno_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Paterno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='paterno_integrante3'
                      id='paterno_integrante3'
                      autoComplete='paterno_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='materno_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Apellido Materno
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='text'
                      name='materno_integrante3'
                      id='materno_integrante3'
                      autoComplete='materno_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex mx-auto max-w-max rounded-md sadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_integrante3'
                      id='genero_integrante3'
                      required
                      onChange={handleGenero_integrante_3Change}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option value='' defaultValue>
                        elige una opción
                      </option>
                      <option>Mujer</option>
                      <option>Hombre</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='edad_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Edad
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='edad_integrante3'
                      id='edad_integrante3'
                      autoComplete='edad_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <label
                  htmlFor='telefono_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Teléfono
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='number'
                      name='telefono_integrante3'
                      id='telefono_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='email_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Correo
                </label>
                <div className='mt-2'>
                  <div className='flexrounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='email'
                      name='email_integrante3'
                      id='email_integrante3'
                      autoComplete='email_integrante3'
                      required
                      className='block flex-1 border-0 bg-transparent py-1.5 px-3 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
