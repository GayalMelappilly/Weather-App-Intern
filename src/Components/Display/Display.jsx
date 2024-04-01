import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { BsWind, BsDroplet, BsThermometer, BsClouds } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import Icon from '../Icon/Icon'
import Forecast from '../Forecast/Forecast'
import { detailsContext } from '../../Context/Context'
import Graph from '../Graph/Graph'

function Display() {
    const [city, setCity] = useState('')
    const [input, setInput] = useState('')
    const [details, setDetails] = useState(null)
    const [forecast, setForecast] = useState([])
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const {data, setData } = useContext(detailsContext)

    navigator.geolocation.getCurrentPosition((pos)=>{
        // setLat(pos.coords.latitude)
        // setLon(pos.coords.longitude)

        setLat(76.3874)
        setLon(10.191)
        console.log(lat, lon)
      })

    // useEffect(()=>{
    //     axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`).then((response)=>{
    //         setCity(response.data.name)
    //         console.log(response.data.name)
    //     }).catch((err)=>{
    //         console.log(err.message)
    //     })
    // },[]) 


    useEffect(() => {
        if (!city) return;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
            console.log(response.data)
            setDetails(response.data)
            fetchForecast(response.data.coord.lat, response.data.coord.lon);
        }).catch((err) => {
            console.log("ERR : " + err.message)
        })
    }, [city])

    const fetchForecast = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response) => {
            setForecast(response.data);
            setData(response.data.list);
        })
            .catch((err) => {
                console.log("ERR : " + err.message);
            });
    };

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
        return standardTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12'
        });
    };


    return (

        <div className='mx-auto h-5/6 bg-black bg-opacity-10 justify-center flex py-10 shadow-2xl shadow-black-400 w-5/6 rounded-lg        max-sm:py-2'>
            <div className='w-5/12                max-sm:mx-3 max-sm:h-2/6'>
                <div className='px-10 flex items-center bg-white bg-opacity-10 h-1/6 rounded-lg shadow-lg shadow-black-400         max-sm:w-11/12 max-sm:px-1 max-sm:ml=8'>
                    <div className='py-4 relative     max-sm: mx-2'>
                        <input className='pl-10 pr-4 py-2 rounded-lg outfit-regular rounded-lg h-8 bg-black bg-opacity-10 placeholder-white text-white outline-none           max-sm:w-40 max-sm:h-6 ' value={input} onChange={(e) => { setInput(e.target.value) }} type="text" id='city' placeholder='Search for location' />
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <FontAwesomeIcon className='text-white' icon={faSearch} />
                        </div>
                        &nbsp;
                        <button onClick={(e) => { setCity(input) }} className='px-6 bg-black absolute bg-opacity-10 rounded-lg h-8 text-white         max-sm:h-6'>Search</button>
                    </div>
                </div>
                <div className="py-2"></div>
                <div className={`bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 h-2/6`}>
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
                    </div>}
                </div>
                <div className="py-2"></div>
                
                <div>
                { details ? <Forecast /> : <div className='bg-white w-full bg-opacity-10 h-56 rounded-lg shadow-lg shadow-black-400'></div> } 
                </div>
            </div>

            <div className='px-2'></div>

            <div className="w-6/12 max-sm:invisible">
                <div>
                    {details ? <div className='h-full text-xl font-thin flex justify-between items-center'>
                        <div className='px-3 py-4 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                            <BsWind size={30} className='mx-auto fill-slate-600' />
                            <p className='text-center'>{details.wind.speed}km/h</p>
                        </div>
                        <div className='px-3 py-4 mx-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                            <BsDroplet size={30} className='mx-auto fill-slate-600' />
                            <p className='text-center'>{details.main.humidity}%</p>
                        </div>
                        <div className='px-3 py-4 mr-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                            <BsThermometer size={30} className='mx-auto fill-slate-600' />
                            <p className='text-center'>{details.main.temp}°C</p>
                        </div>
                        <div className='px-3 py-4 mr-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                            <SlSpeedometer size={30} className='mx-auto fill-slate-600' />
                            <p className='text-center'>{details.main.pressure} hPa</p>
                        </div>
                        <div className='px-3 py-4 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                            <BsClouds size={30} className='mx-auto fill-slate-600' />
                            <p className='text-center'>{details.clouds.all}</p>
                        </div>
                    </div>
                        :
                        <div className='bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg shadow-black-400'>
                        </div>}
                </div>
                <div className="py-2"></div>

                {details ? <div className='flex'>
                    <div className='text-center content-center w-2/5 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400'>
                        <p className='p-3 text-lg font-thin pl-3'>{`${details.name}, ${details.sys.country}`}</p>
                    </div>

                    <div className='text-center content-center w-2/5 mx-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400'>
                        <p className='p-3 text-lg font-thin pl-3 pr-1'>{`${details.main.temp_min.toFixed(1)}°C / ${details.main.temp_max.toFixed(1)}°C`}</p>
                    </div>

                    <div className='text-center content-center w-2/5 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400'>
                        <p className='p-3 text-lg font-thin pl-3 pr-1'>{`Timezone: ${details.timezone}`}</p>
                    </div>
                </div>
                    :
                    <div className='bg-white w-full bg-opacity-10 h-12 rounded-lg shadow-lg shadow-black-400'>

                    </div>}

                <div className="py-2"></div>
                <div className='px-10 bg-white bg-opacity-10 h-4/6 rounded-lg shadow-lg shadow-black-400'>
                    {city && <Graph />}
                </div>
            </div>
        </div>

    )
}

export default Display

