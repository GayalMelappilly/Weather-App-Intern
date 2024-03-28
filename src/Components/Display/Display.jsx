import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { BsWind, BsDroplet } from "react-icons/bs";
import { WiBarometer } from "react-icons/wi";
import { wIcons } from '../../Constants/constants'
import { W01d } from '../../assets/Icons/openweathermap/01d.svg'
import Icon from '../Icon/Icon'


function Display() {
        const [city, setCity] = useState('')
        const [input, setInput] = useState('')
        const [details, setDetails] = useState(null)
        const [forecast, getForecast] = useState([''])
        const [icon, setIcons] = useState([''])

        useEffect(() => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
                console.log("CITY : " + city)
                console.log(response.data)
                setDetails(response.data)
            }).catch((err) => {
                console.log(err.message)
            })
        }, [city])

        return (

            <div className='mx-auto h-5/6 bg-black bg-opacity-10 justify-center flex py-10 shadow-2xl shadow-black-400 w-5/6 rounded-lg'>
                <div className='w-5/12'>
                    <div className='px-10 flex items-center bg-white bg-opacity-10 h-1/6 rounded-lg shadow-lg shadow-black-400'>
                        <div className='py-4 relative'>
                            <input className='pl-10 pr-4 py-2 rounded-lg outfit-regular rounded-lg h-8 bg-black bg-opacity-10 placeholder-white text-white outline-none' value={input} onChange={(e) => { setInput(e.target.value) }} type="text" id='city' placeholder='Search for location' />
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <FontAwesomeIcon className='text-white' icon={faSearch} />
                            </div>
                            &nbsp;
                            <button onClick={(e) => { setCity(input) }} className='px-6 bg-black absolute bg-opacity-10 rounded-lg h-8 text-white'>Search</button>
                        </div>
                    </div>
                    <div className="py-2"></div>
                    <div className='px-10 bg-white bg-opacity-10 h-5/6 rounded-lg shadow-lg shadow-black-400'>
                        {details && <div className='flex justify-start'>
                            {console.log(details.weather[0].icon)}
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64">
    <defs>
        <linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8"
            gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#f3f7fe" />
            <stop offset=".45" stop-color="#f3f7fe" />
            <stop offset="1" stop-color="#deeafb" />
        </linearGradient>
        <linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05"
            gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#4286ee" />
            <stop offset=".45" stop-color="#4286ee" />
            <stop offset="1" stop-color="#0950bc" />
        </linearGradient>
        <linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlinkHref="#a" />
        <linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlinkHref="#a" />
    </defs>
    <path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5"
        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" />
    <path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10"
        stroke-width="2" d="M24.39 43.03l-.78 4.94">
        <animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite"
            type="translate" values="1 -5; -2 10" />
        <animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0" />
    </path>
    <path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10"
        stroke-width="2" d="M31.39 43.03l-.78 4.94">
        <animateTransform attributeName="transform" begin="-0.4s" dur="0.7s"
            repeatCount="indefinite" type="translate" values="1 -5; -2 10" />
        <animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite"
            values="0;1;1;0" />
    </path>
    <path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10"
        stroke-width="2" d="M38.39 43.03l-.78 4.94">
        <animateTransform attributeName="transform" begin="-0.2s" dur="0.7s"
            repeatCount="indefinite" type="translate" values="1 -5; -2 10" />
        <animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite"
            values="0;1;1;0" />
    </path>
</svg>
                            <p className='py-6 putfit-bold font-thin text-4xl'>{details.main.temp}°C</p>
                        </div>}
                    </div>
                </div>

                <div className='px-2'></div>

                <div className="w-6/12">
                    <div className='px-10 bg-white bg-opacity-10 h-2/6 rounded-lg shadow-lg shadow-black-400'>
                        {details && <div className='flex items-center'>
                            <div className='px-3'>
                                <BsWind size={30} />
                                <p>{details.wind.speed}km/h</p>
                            </div>
                            <div className='px-3'>
                                <BsDroplet size={30} />
                                <p>{details.main.humidity}%</p>
                            </div>
                            <div className='px-3'>
                                <p>Temperature</p>
                                <p>{details.main.temp}°C</p>
                            </div>
                            <div className='px-3'>
                                <WiBarometer size={30} />
                                <p>{details.main.pressure}</p>
                            </div>
                        </div>}
                    </div>
                    <div className="py-2"></div>
                    <div className='px-10 bg-white bg-opacity-10 h-4/6  rounded-lg shadow-lg shadow-black-400'>
                        <h1></h1>
                    </div>
                </div>
            </div>

        )
    }

export default Display

//bg-gradient-to-bl from-cyan-400 to-yellow-100