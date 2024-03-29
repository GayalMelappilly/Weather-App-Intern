import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, TIME_API_KEY } from '../../Constants/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { BsWind, BsDroplet, BsThermometer } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import Icon from '../Icon/Icon'
import Forecast from '../Forecast/Forecast'

function Display() {
    const [city, setCity] = useState('')
    const [input, setInput] = useState('')
    const [details, setDetails] = useState(null)
    const [forecast, getForecast] = useState([''])
    const [time, setTime] = useState(null)


    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
            console.log(response.data)
            setDetails(response.data)
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

    
    const convertToStandardTime = (timezoneOffset) => {
        const offsetSeconds = timezoneOffset;
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const standardTime = new Date(utc + (offsetSeconds * 1000));
        return standardTime.toLocaleTimeString('en-US',{
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12'
        });
    };


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
                        <Icon icon={details.weather[0].icon} />
                        <div className='pt-10 pl-3'>
                            <p className='font-thin text-3xl'>{details.main.temp}°C</p>
                            <p className='font-thin text-3xl'>{details.weather[0].main}</p>
                        </div>
                        <div className='pt-12 pl-8 '>
                            <p className='font-thin text-xl'>{formattedDate}</p>
                            <p className='font-thin text-xl'>{convertToStandardTime(details.timezone)}</p>
                        </div>

                        <div className="forecast">
                            <Forecast lat={details.coord.lat} lon={details.coord.lon} />
                        </div>
                    </div>}
                </div>
            </div>

            <div className='px-2'></div>

            <div className="w-6/12">
                <div className='px-10 bg-white w-full bg-opacity-10 h-2/6 rounded-lg shadow-lg shadow-black-400'>
                    {details && <div className='font-regular h-full text-xl flex justify-between place-items-center'>
                        <div className='px-3'>
                            <BsWind size={40} className='mx-auto'/>
                            <p className='text-center'>{details.wind.speed}km/h</p>
                        </div>
                        <div className='px-3'>
                            <BsDroplet size={40} className='mx-auto' />
                            <p className='text-center'>{details.main.humidity}%</p>
                        </div>
                        <div>
                            <BsThermometer size={40} className='mx-auto' />
                            <p>{details.main.temp}°C</p>
                        </div>
                        <div className='px-3'>
                            <SlSpeedometer size={40} className='mx-auto' />
                            <p className='text-center'>{details.main.pressure} hPa</p>
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