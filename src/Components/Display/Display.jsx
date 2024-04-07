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
import $ from 'jquery'

function Display() {
    const [city, setCity] = useState('')
    const [input, setInput] = useState('')
    const [details, setDetails] = useState(null)
    const [forecast, setForecast] = useState([])
    const [err, setErr] = useState('')
    const { data, setData } = useContext(detailsContext)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos.coords.latitude, pos.coords.longitude)
            axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&limit=5&appid=${API_KEY}`).then((response) => {
                setCity(response.data[0].name)
                console.log(response.data[0].name)
            }).catch((err) => {

                console.log(err.message, "CITY : " + city)
            })
        })
    }, [])



    useEffect(() => {
        if (!city) return;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
            console.log(response.data)
            setDetails(response.data)
            fetchForecast(response.data.coord.lat, response.data.coord.lon);
        }).catch((err) => {
            console.log("ERR : " + err.message)
            setErr("Couldn't get the weather condition from the specified location")
            $('#popup').fadeIn('fast')
            setTimeout(() => {
                $('#popup').fadeOut('slow')
            }, 3000)
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

        <div className='mx-auto h-screen bg-black bg-opacity-10 justify-center flex py-10 shadow-2xl w-5/6 rounded-lg dark:shadow-slate-900         max-md:grid max-md:h-auto       max-sm:h-auto max-sm:grid max-sm:py-3'>

            <center>
                <div id='popup' className="hidden fixed top-4 flex justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full pt-2  max-sm:w-3/6">
                    <div class="relative w-full max-w-fit max-h-auto">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-base font-medium text-gray-900 dark:text-white  max-sm:text-xs">
                                    {err}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </center>

            <div className='w-5/12      max-md:w-full        max-sm:container max-sm:mx-auto max-sm:h-4/6'>
                <div className='px-10 flex items-center bg-white bg-opacity-10 h-1/6 rounded-lg shadow-lg dark:bg-opacity-10 dark:bg-slate-500      max-lg:pb-6 max-lg:mx-auto max-lg:my-auto        max-md:pb-0 max-md:mx-auto max-md:h-16 max-md:px-0       max-sm:h-12 max-sm:w-full max-sm:px-6'>
                    <div className='py-4 relative flex mx-auto          max-lg:flex-wrap max-lg:flex max-lg:mx-auto max-lg:mb-4 max-lg:w-full max-lg:my-auto             max-md:mb-0 max-md:block max-md:mx-20         max-sm:w-full max-sm:py-2 max-sm:mx-auto'>
                        <input className='pl-10 pr-4 py-2 rounded-lg outfit-regular rounded-lg h-8 w-full bg-black bg-opacity-10 placeholder-white text-white outline-none         max-lg:w-full     max-md:w-60     max-sm:w-40 max-sm:h-6 ' value={input} onChange={(e) => { setInput(e.target.value) }} type="text" id='city' placeholder='Search for location' />
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none        max-lg:pb-6        max-md:pb-0'>
                            <FontAwesomeIcon className='text-white' icon={faSearch} />
                        </div>
                        &nbsp;
                        <button onClick={(e) => { setCity(input) }} className=' px-6 bg-black bg-opacity-10 rounded-lg h-8 text-white            max-lg:mt-10 max-lg:w-full max-lg:absolute     max-md:static  max-md:ml-0 max-md:w-auto max-md:mt-0       max-sm:px-5  max-sm:h-6'>Search</button>
                    </div>
                </div>
                <div className="py-2 max-sm:py-1"></div>
                {details ? <div>
                    <div className={`bg-white bg-opacity-10 rounded-lg shadow-lg h-2/6 dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500    max-lg:h-auto         max-sm:h-16`}>
                        {details && <div className='flex justify-start'>
                            <Icon icon={details.weather[0].icon} />
                            <div className='pt-10 pl-3    max-sm:pt-1 max-sm:inline-block max-sm:align-middle'>
                                <p className='font-thin text-3xl dark:text-white    max-lg:text-2xl      max-md:text-3xl      max-sm:text-base max-sm:font-light'>{details.main.temp}°C</p>
                                <p className='font-thin text-3xl dark:text-white      max-lg:text-2xl      max-md:text-3xl      max-sm:text-base max-sm:font-light'>{details.weather[0].main}</p>
                            </div>
                            <div className='pt-12 pl-8         max-lg:pt-10 max-lg:mx-auto max-lg:pb-10 max-lg:flex-wrap max-lg:flex   max-md:block  max-sm:pt-1 max-sm:inline-block max-sm:align-middle'>
                                <p className='font-thin text-xl dark:text-white     max-lg:text-lg      max-md:text-2xl       max-sm:text-base max-sm:font-light'>{formattedDate}</p>
                                <p className='font-thin text-xl dark:text-white     max-lg:text-lg      max-md:text-xl       max-sm:text-base max-sm:font-light'>{convertToStandardTime(details.timezone)}</p>
                            </div>
                        </div>}
                    </div>
                    <div className="py-2 max-sm:py-1"></div>

                    <div>
                        {details && <Forecast />}
                    </div>
                </div>
                    :
                    <div className='bg-white bg-opacity-10 h-5/6 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500        max-lg:h-66      max-md:h-72 max-md:w-auto    max-sm:w-auto '></div>}
            </div>

            <div className='px-2'></div>

            {details ? <div className="w-6/12     max-md:w-full max-md:mt-4     max-sm:mt-2 max-sm:mt-0 max-sm:grid-cols-none max-sm:w-full max-sm:mx-auto max-sm:h-4/6">
                <div>
                    <div className='h-full text-xl font-thin flex justify-between items-center dark:text-white     max-lg:text-base       max-md:text-lg               max-sm:px-1 max-sm:text-xs max-sm:font-light'>
                        <div className='px-3 py-4 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500      max-sm:px-1.5 max-sm:h-20'>
                            <BsWind size={30} className='mx-auto fill-slate-600 dark:fill-slate-400' />
                            <p className='text-center'>{details.wind.speed}km/h</p>
                        </div>
                        <div className='px-3 py-4 mx-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500      max-sm:px-1.5 max-sm:h-20'>
                            <BsDroplet size={30} className='mx-auto fill-slate-600 dark:fill-slate-400' />
                            <p className='text-center'>{details.main.humidity}%</p>
                        </div>
                        <div className='px-3 py-4 mr-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500      max-sm:px-1.5 max-sm:h-20'>
                            <BsThermometer size={30} className='mx-auto fill-slate-600 dark:fill-slate-400' />
                            <p className='text-center'>{details.main.temp}°C</p>
                        </div>
                        <div className='px-3 py-4 mr-2 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500     max-sm:px-1.5 max-sm:h-20'>
                            <SlSpeedometer size={30} className='mx-auto fill-slate-600 dark:fill-slate-400' />
                            <p className='text-center'>{details.main.pressure} hPa</p>
                        </div>
                        <div className='px-3 py-4 bg-white w-full bg-opacity-10 h-24 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500      max-sm:px-1.5 max-sm:h-20'>
                            <BsClouds size={30} className='mx-auto fill-slate-600 dark:fill-slate-400' />
                            <p className='text-center'>{details.clouds.all}</p>
                        </div>
                    </div>
                </div>
                <div className="py-2 max-sm:py-1"></div>

                <div className='flex             max-md:order-first max-md:mb-2 max-md:w-auto max-md:h-12            max-sm:flex max-sm:order-none max-sm:h-auto max-sm:mb-0'>
                    <div className='text-center content-center w-2/5 bg-white bg-opacity-10 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500'>
                        <p className='p-3 text-lg font-thin pl-3 dark:text-white    max-lg:text-base       max-md:text-base        max-sm:text-xs max-sm:font-light'>{`${details.name}, ${details.sys.country}`}</p>
                    </div>

                    <div className='text-center content-center w-2/5 mx-2 bg-white bg-opacity-10 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500'>
                        <p className='p-3 text-lg font-thin pl-3 pr-1 dark:text-white    max-lg:text-base     max-md:text-base       max-sm:text-xs max-sm:font-light'>{`${details.main.temp_min.toFixed(1)}°C / ${details.main.temp_max.toFixed(1)}°C`}</p>
                    </div>

                    <div className='text-center content-center w-2/5 bg-white bg-opacity-10 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500'>
                        <p className='p-3 text-lg font-thin pl-3 pr-1 dark:text-white    max-lg:text-base     max-md:text-base       max-sm:text-xs max-sm:font-light'>{`Timezone: ${details.timezone}`}</p>
                    </div>
                </div>

                <div className="py-2 max-sm:py-1"></div>
                <div className='px-10 bg-white bg-opacity-10 h-4/6 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500         max-md:h-4/6 max-md:order-first        max-sm:h-auto max-sm:px-1'>
                    {city && <Graph />}
                </div>
            </div>
                :
                <div className='bg-white w-6/12 bg-opacity-10 h-full py-2 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500     max-lg:h-full     max-md:h-80 max-md:mt-2 max-md:w-full    max-sm:mt-2 max-sm:w-full'></div>}
        </div>


    )
}

export default Display

