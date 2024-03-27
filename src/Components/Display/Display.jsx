import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'


function Display() {
    const [city, setCity] = useState('')
    const [input, setInput] = useState('')

    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).then((response)=>{
            console.log("CITY : "+city)
            console.log(response.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[city])

    return (

        <div className='mx-auto h-5/6 flex justify-center c py-10 shadow-lg shadow-black-400 w-5/6 rounded-lg'>
            <div className='w-5/12'>
                <div className='px-10 bg-cyan-500 h-4/6 rounded-lg shadow-lg shadow-black-400'>
                    <div>
                        <label className='outfit-regular pb-10' htmlFor="city">&nbsp;City</label>
                        <br />
                        <input className='outfit-regular rounded-lg h-8 px-2 bg-transparent border-2 border-black' value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" id='city' placeholder='City name' />
                        <button onClick={(e)=>{setCity(input)}}>Submit</button>
                    </div>
                </div>
                <div className="py-2"></div>
                <div className='px-10 bg-cyan-500 h-2/6 rounded-lg shadow-lg shadow-black-400'>
                    <h1>Dipsplay</h1>
                </div>
            </div>

            <div className='px-2'></div>

            <div className="w-6/12">
                <div className='px-10 bg-cyan-500 h-2/6 rounded-lg shadow-lg shadow-black-400'>
                    <h1>Dipsplay</h1>
                </div>
                <div className="py-2"></div>
                <div className='px-10 bg-cyan-500 h-4/6  rounded-lg shadow-lg shadow-black-400'>
                    <h1>Dipsplay</h1>
                </div>
            </div>
        </div>

    )
}

export default Display

//bg-gradient-to-bl from-cyan-400 to-yellow-100