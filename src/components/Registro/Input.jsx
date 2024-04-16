export function Input({ type, name, label, placeholder, required }) {
  return (
    <>
      <label htmlFor={name} className='block text-sm font-medium leading-6'>
        {label}
      </label>
      <div className='mt-2'>
        <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            required={required}
            autoComplete='nombre_equipo'
            className='block flex-1 border-0 bg-transparent py-1.5 px-4 focus:ring-0 sm:text-sm sm:leading-6'
          />
        </div>
      </div>
    </>
  )
}
