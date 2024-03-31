import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'
import { detailsContext } from '../../Context/Context'
import Icon from '../Icon/Icon'

function Forecast(props) {
  const [forecast, setForecast] = useState([])
  const [pod, setPod] = useState(null)
  const [dailyForecast, setDailyForecast] = useState('')
  const { data } = useContext(detailsContext)

  // setForecast(data)
  // console.log('DATA : ' + forecast)


  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const firstPod = data[0].sys && data[0].sys.pod;
      console.log("First Pod:", firstPod);

      // Set daily forecast based on forecast data
      if (firstPod === 'd') {
        setDailyForecast({
          day1: data[0],
          day2: data[4],
          day3: data[12],
          day4: data[20],
          day5: data[28],
          day6: data[36]
        });
      } else if (firstPod === 'n') {
        setDailyForecast({
          day1: data[0],
          day2: data[8],
          day3: data[16],
          day4: data[24],
          day5: data[32],
          day6: data[40]
        });
      }

    }
  }, [data]);

  const toDate = (date) => {
    const cDate = new Date(date);
    const formattedDate = cDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit'
    });

    return formattedDate
  }

  useEffect(() => {
    if (dailyForecast) console.log("DF : " + dailyForecast.day1.main.temp)
  })


  return (
    <div>
      {/* <div className='px-4'>Forecast</div> */}
      {dailyForecast && <div className='grid grid-cols-3 gap-2'>
        <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day1.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day1.main.temp_min.toFixed(0)}° / {dailyForecast.day1.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day1.dt_txt.slice(0, 14))}</p>
        </div>

        <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day2.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day2.main.temp_min.toFixed(0)}° / {dailyForecast.day2.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day2.dt_txt.slice(0, 14))}</p>
        </div>

        <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day3.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day3.main.temp_min.toFixed(0)}° / {dailyForecast.day3.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day3.dt_txt.slice(0, 14))}</p>
        </div>

        <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day4.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day4.main.temp_min.toFixed(0)}° / {dailyForecast.day4.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day4.dt_txt.slice(0, 14))}</p>
        </div>

        <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day5.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day5.main.temp_min.toFixed(0)}° / {dailyForecast.day5.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day5.dt_txt.slice(0, 14))}</p>
        </div>

        {dailyForecast.day6 && <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
          <div className='flex'>
            <Icon for='forecast' icon={dailyForecast.day6.weather[0].icon} />
            <p className='pl-1 pt-4 font-normal font-lg'>{dailyForecast.day6.main.temp_min.toFixed(0)}° / {dailyForecast.day6.main.temp_max.toFixed(0)}°</p>
          </div>
          <p className='text-sm font-thin'>{toDate(dailyForecast.day6.dt_txt.slice(0, 14))}</p>
        </div>}
      </div>}
    </div >
  )
}

export default Forecast