export function Select ({label,name,text,options,onChange=()=>{}}){
  console.log(name+text)
return(
  <>
    <p className='text-sm font-medium w-24 leading-6 first-line:'>{label}</p>
            <select
              name={name}
              id={name}
              required
              onChange={onChange}
              className='block w-ful mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option value='' defaultValue>
                {text}
              </option>
              {options.map((option, index) => (
              <option key={index}>{option}</option>   ))}   
            </select>
            </>


)}