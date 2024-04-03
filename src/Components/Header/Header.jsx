import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='flex mx-auto my-5 justify-center bg-black bg-opacity-10 py-8 shadow-2xl shadow-black-400 w-5/6 rounded-lg       max-sm:py-2'>
      <h1 className="outfit-bold text-6xl text-white geo-sans text-black    max-lg:text-5xl    max-md:text-4xl      max-sm:text-3xl">WEATHER AND FORCAST APP</h1>
    </div>
  )
}

export default Header