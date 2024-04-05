import React, { useEffect, useState } from 'react'
import './Header.css'
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

function Header() {
  const [theme, setTheme] = useState(true)

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  return (
    <div className='relative flex mx-auto my-5 justify-center items-center bg-black bg-opacity-10 py-8 shadow-2xl shadow-black-400 w-5/6 rounded-lg max-sm:py-2 dark:shadow-black-900 dark:shadow-slate-800'>
      <h1 className="outfit-bold text-5xl text-black geo-sans text-black text-center max-lg:text-4xl max-md:text-3xl max-sm:text-xl dark:text-white">WEATHER AND FORECAST APP</h1>
      <button className={`button absolute top-0 right-0 p-5 h-full text-2xl w-12 py-10 px-3 rounded-l-none    max-sm:py-2   ${theme ? 'bg-slate-600 bg-opacity-40' : 'bg-slate-400 bg-opacity-30'} rounded-lg`} onClick={() => { setTheme(!theme) }}>
        {theme ? (
           <FaMoon className='fill-violet-700 glow-dark max-sm:h-4 hover:animate-spin hover:animate-once'/>

        ) : (
            <IoIosSunny className='fill-yellow-500 glow-light max-sm:h-4 hover:animate-spin hover:animate-once'/>
        )}
      </button>
      
    </div>

  )
}

export default Header