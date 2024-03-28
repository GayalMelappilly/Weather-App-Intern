import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, TIME_API_KEY } from '../../Constants/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { BsWind, BsDroplet } from "react-icons/bs";
import { WiBarometer } from "react-icons/wi";
import Icon from '../Icon/Icon'

function Display() {
    const [city, setCity] = useState('')
    const [input, setInput] = useState('')
    const [details, setDetails] = useState(null)
    const [forecast, getForecast] = useState([''])
    const [time, setTime] = useState(null)


    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
            console.log("CITY : " + city)
            console.log(response.data)
            setDetails(response.data)
            // axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=position&lat=${details.coord.lat}&lng=${details.coord.lon}`).then((res) => {
            //     // console.log(res.data.formatted)
            //     console.log(tConvert(res.data.formatted))
            //     setTime(res.data.formatted)
            // })
        }).catch((err) => {
            console.log(err.message)
        })


    }, [city])

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
    const am_pm = date.toLocaleTimeString('en-GB',{
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h12'
    });


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
                <div className='bg-white bg-opacity-10 h-5/6 rounded-lg shadow-lg shadow-black-400'>
                    {details && <div className='flex justify-start'>
                        {console.log(details.weather[0].icon)}
                        <Icon icon={details.weather[0].icon} />
                        <div className='pt-10 pl-3'>
                            <p className='font-thin text-3xl'>{details.main.temp}°C</p>
                            <p className='font-thin text-3xl'>{details.weather[0].main}</p>
                        </div>
                        <div className='pt-12 pl-8 '>
                            <p className='font-thin text-xl'>{formattedDate}</p>
                            <p className='font-thin text-xl'>{am_pm}</p>
                        </div>
                    </div>}
                </div>
            </div>

            <div className='px-2'></div>

            <div className="w-6/12">
                <div className='px-10 bg-white bg-opacity-10 h-2/6 rounded-lg shadow-lg shadow-black-400'>
                    {details && <div className='flex items-center font-regular flex justify-center'>
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
                            <Icon icon='barometer' />
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