export function LogoGrid({ logos }) {
  return (
    <div className='grid grid-cols-3 md:grid-cols-5 gap-6 md:m-10 sm:m-10 justify-evenly'>
      {logos.map((logo, index) => (
        <div key={index} className='flex justify-center items-center h-full'>
          <img src={logo.src} alt={logo.alt} className='w-auto' style={{width:logo.width}}/>
        </div>
      ))}
    </div>
  );
}