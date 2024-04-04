import React, { useEffect, useState, useContext } from 'react'
import { detailsContext } from '../../Context/Context'
import Icon from '../Icon/Icon'

function Forecast() {
  const [dailyForecast, setDailyForecast] = useState([])
  const [forecast, setForecast] = useState([])
  const {data, setGraph} = useContext(detailsContext)

  useEffect(() => {
      setForecast(data)
      const firstPod = data[0].sys && data[0].sys.pod;
      if (firstPod === 'd') {
        setDailyForecast([
          data[0],
          data[4],
          data[12],
          data[20],
          data[28],
          data[36]
        ]);
      } else if (firstPod === 'n') {
        setDailyForecast([
          data[0],
          data[8],
          data[16],
          data[24],
          data[32],
          data[40]
        ]);
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
    if (dailyForecast)
    setGraph(dailyForecast)
  }, [dailyForecast])


  return (
    <div>
      {dailyForecast && <div className='grid grid-cols-3 gap-2'>

        {dailyForecast.map((obj, index) => {
          if(toDate(obj?.dt_txt.slice(0, 14)) === 'Invalid Date')
            return null
          else
            return (
                <div className='h-30 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30 dark:shadow-slate-800     max-lg:h-36  max-md:h-28  max-sm:h-20 max-sm:px-3 max-sm:py-1'>
                  <div className='flex     max-sm:grid'>
                    <Icon for='forecast' icon={obj?.weather[0].icon} />
                    <p key={index} className='pl-1 pt-4 font-normal dark:text-white    max-lg:text-sm    max-sm:pt-0 max-sm:text-xs max-sm:flex max-sm:font-light'>{obj?.main.temp_min.toFixed(0)}° / {obj?.main.temp_max.toFixed(0)}°</p>
                  </div>
                  <p key={index} className='text-sm font-thin dark:text-white    max-sm:text-xs max-sm:font-light'>{toDate(obj?.dt_txt.slice(0, 14))}</p>
                </div>
            )
          }
        )}
      </div>}
    </div >
  )
}

export default Forecast