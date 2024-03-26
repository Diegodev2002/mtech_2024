import { useState } from 'react'
import { estados } from '../../data/constans_estados.js'

export function Registro() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('')

  const handleEstadoChange = (event) => {
    const estado = event.target.value
    setEstadoSeleccionado(estado)
  }

  const municipios = estadoSeleccionado ? estados[estadoSeleccionado] : []

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <div className='text-white font-bold text-center bg-slate-700 p-5 rounded-2xl'>
      <p className='text-2xl'>REGISTRATE</p>

      <p className='mt-10'>Captura los datos de tu equipo</p>
      <form onSubmit={handleSubmit} className='mt-5'>
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
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>

        <div className='flex gap-4 justify-center mt-5'>
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
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option>elige una categoría</option>
              <option>Sumo Autónomo</option>
              <option>M-Tech Innovations</option>
              <option>M-Tech Engineers</option>
            </select>
          </div>
        </div>

        <div className='flex gap-4 place-content-center mt-5'>
          <div>
            <label
              htmlFor='nombre_escuela'
              className='block text-sm font-medium leading-6'
            >
              Nombre de la escuela
            </label>
            <div className='mt-2'>
              <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                <input
                  type='text'
                  name='nombre_escuela'
                  id='nombre_escuela'
                  autoComplete='nombre_escuela'
                  className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                  className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4 mt-5'>
          <div className='sm:col-span-2'>
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

          <div className='sm:col-span-2 sm:col-start-1'>
            <label
              htmlFor='munucipio'
              className='block text-sm font-medium leading-6 text-white'
            >
              Municipio
            </label>
            <div className='mt-2'>
              {estadoSeleccionado && (
                <select
                  name='munucipio'
                  id='munucipio'
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

          <div className='sm:col-span-2'>
            <label
              htmlFor='cp'
              className='block text-sm font-medium leading-6 text-white'
            >
              ZIP / Codigo postal
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='cp'
                id='cp'
                autoComplete='cp'
                className='block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
        </div>

        <div className='mt-20 flex gap-4'>
          <p className='text-start'>
            Captura los datos de los Integrantes <br />
            <span className='font-normal'>
              registra a tu equipo, el equipo debe de estar integrado por un
              coach, 3 integrantes y debe de ser de genero mixto (2 mujeres y 1
              hombre o 2 hombres y una mujer)
            </span>
          </p>
          <div>
            <div className='flex gap-4'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_coach'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_coach'
                      id='genero_coach'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option>elige una opción</option>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='mt-20 flex gap-4'>
          <p className='text-start'>
            Captura datos del integrante 1 <br />
          </p>
          <div>
            <div className='flex gap-4'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante1'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_integrante1'
                      id='genero_integrante1'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option>elige una opción</option>
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
                      type='number'
                      name='edad_integrante1'
                      id='edad_integrante1'
                      autoComplete='edad_integrante1'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

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
                      type='email'
                      name='email_integrante1'
                      id='email_integrante1'
                      autoComplete='email_integrante1'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='mt-20 flex gap-4'>
          <p className='text-start'>
            Captura datos del integrante 2 <br />
          </p>
          <div>
            <div className='flex gap-4'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante2'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_integrante2'
                      id='genero_integrante2'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option>elige una opción</option>
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
                      type='number'
                      name='edad_integrante2'
                      id='edad_integrante2'
                      autoComplete='edad_integrante2'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />

        <div className='mt-20 flex gap-4'>
          <p className='text-start'>
            Captura datos del integrante 3 <br />
          </p>
          <div>
            <div className='flex gap-4'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
              <div className='w-full'>
                <label
                  htmlFor='genero_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Genero
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <select
                      name='genero_integrante3'
                      id='genero_integrante3'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option>elige una opción</option>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 mt-5'>
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
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='email_integrante3'
                  className='block text-sm font-medium leading-6'
                >
                  Correo
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input
                      type='email'
                      name='email_integrante3'
                      id='email_integrante3'
                      autoComplete='email_integrante3'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded'
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
