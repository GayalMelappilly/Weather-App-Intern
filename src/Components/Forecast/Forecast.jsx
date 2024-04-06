import React, { useEffect, useState, useContext } from 'react'
import { detailsContext } from '../../Context/Context'
import Icon from '../Icon/Icon'

function Forecast() {
  const [dailyForecast, setDailyForecast] = useState([])
  const [forecast, setForecast] = useState([])
  const [hourly, setHourly] = useState([])
  const { data, setGraph, setHourlyForecast } = useContext(detailsContext)

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
      setHourly([
        [
          data[0],
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
        ],
        [
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          data[10],
          data[11],
          data[12],
          data[13],
        ],
        [
          data[13],
          data[14],
          data[15],
          data[16],
          data[17],
          data[18],
          data[19],
          data[20],
          data[21],
        ],
        [
          data[21],
          data[22],
          data[23],
          data[24],
          data[25],
          data[26],
          data[27],
          data[28],
          data[29],
        ],
        [
          data[29],
          data[30],
          data[31],
          data[32],
          data[33],
          data[34],
          data[35],
          data[36],
        ],
      ])
    } else if (firstPod === 'n') {
      setDailyForecast([
        data[0],
        data[8],
        data[16],
        data[24],
        data[32],
        data[40]
      ]);
      setHourly([
        [
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
        ],
        [
          data[9],
          data[10],
          data[11],
          data[12],
          data[13],
          data[14],
          data[15],
          data[16],
          data[17],
        ],
        [
          data[17],
          data[18],
          data[19],
          data[20],
          data[21],
          data[22],
          data[23],
          data[24],
          data[25],
        ],
        [
          data[25],
          data[26],
          data[27],
          data[28],
          data[29],
          data[30],
          data[31],
          data[32],
          data[33],
        ],
        [
          data[33],
          data[34],
          data[35],
          data[36],
          data[37],
          data[38],
          data[39],
        ],
      ])
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
      console.log(dailyForecast)
    if (hourly) {
      hourly.map((obj) => {
        console.log("H :" + obj[0])
      })
    }
    setGraph(dailyForecast)
  }, [dailyForecast])


  return (
    <div>
      {dailyForecast && <div className='grid grid-cols-3 gap-2'>

        {dailyForecast.map((obj, index) => {
          if (toDate(obj?.dt_txt.slice(0, 14)) === 'Invalid Date')
            return null
          else

            return (
              <div className='h-30 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30 dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500     max-lg:h-36  max-md:h-28  max-sm:h-20 max-sm:px-3 max-sm:py-1'
                onClick={() => { setHourlyForecast(hourly[index])}}>
                <div className='flex     max-sm:grid'>
                  <Icon for='forecast' icon={obj?.weather[0].icon} />
                  <p key={index} className='pl-1 pt-4 font-normal dark:text-white    max-lg:text-xs    max-sm:pt-0 max-sm:text-xs max-sm:flex max-sm:font-light'>{obj?.main.temp_min.toFixed(0)}° / {obj?.main.temp_max.toFixed(0)}°</p>
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