 import { Input } from "./Input"
 import { Select } from "./Select"


 export function Participante({titulo, subtitulo=' ',numero, onChange}){
  
 return(
  <>
    <div className='grid lg:flex gap-4 lg:justify-between mt-10 lg:mt-20'>
          <p className='mx-auto text-xl'>
            {titulo} <br />
          <span className='mx-auto font-normal text-xs'>
            {subtitulo}
            </span>
          </p>
          <div>
            <div className='grid lg:flex gap-4'>
            {/* Nombre */}
              <div className='w-full'>
              <Input
                type='text'
                name={'nombre_integrante'+ numero}
                label='Nombre'
                placeholder='Ingresa Nombre'
                required={true}
              />
              </div>
              {/* Apellido Paterno */}
              <div className='w-full'>
              <Input
                type='text'
                name={'paterno_integrante'+numero}
                label='Apellido Paterno'
                placeholder='Ingresa Apellido Paterno'
                required={true}
              />
              </div>
              {/* Apellido Materno */}
              <div className='w-full'>
                <Input
                  type='text'
                  name={'materno_integrante'+numero}
                  label='Apellido Materno'
                  placeholder='Ingresa Apellido Materno'
                  required={true}
                />
              </div>
            </div>
            <div className='grid sm:flex gap-4 mt-5'>
             {/* Genero */}
             <div className='w-full'>
                <Select
                label= 'Genero'
                name={'genero_integrante'+numero}
                text= {'elige una opción'}
                options={['Mujer', 'Hombre']}
                onChange={onChange}
                /> 
              </div>
              {/* Edad */}
              <div className='w-full'>
              <Input
                type='number'
                name={'edad_integrante'+numero}
                label='Edad'
                placeholder='Ingresa Edad'
                required={true}
              />
              </div>
              {/* Teléfono */}
              <div className='w-full'>
              <Input
                type='number'
                name={'telefono_integrante'+numero}
                label='Teléfono'
                placeholder='Ingresa Teléfono'
                required={true}
              />
              </div>
            </div>

            <div className='grid sm:flex gap-4 mt-5'>
              {/* Correo */}
              <div className='w-full'>
              <Input
                type='email'
                name={'email_integrante'+numero}
                label='Correo'
                placeholder='Ingresa Correo'
                required={true}
              />
              </div>
              {/* Grado Escolar */}
              <div>
              <Input
                type='text'
                name={'grado_integrante'+numero}
                label='Grado Escolar'
                placeholder='Ingresa Grado Escolar'
                required={true}
              />
              </div>
            </div>
            <div className='mt-10 grid md:flex gap-5'>
            {/* CURP */}
              <div>
                <Input
                  type='text' 
                  name={'curp_integrante'+numero}
                  label='CURP'
                  placeholder='Ingresa CURP'
                  required={true}
                />
              </div>
              {/* RFC */}
              <div>
                <Input
                  type='text'
                  name={'rfc_integrante'+ numero}
                  label='RFC'
                  placeholder='Ingresa RFC'
                  required={false}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className='mt-10' />
  </>
 )
}