import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'
import { detailsContext } from '../../Context/Context'
import Icon from '../Icon/Icon'

function Forecast() {
  const [forecast, setForecast] = useState([])
  const [pod, setPod] = useState(null)
  const [dailyForecast, setDailyForecast] = useState([])
  const { data, setGraph, graph } = useContext(detailsContext)


  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const firstPod = data[0].sys && data[0].sys.pod;
      console.log("First Pod:", firstPod);

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
    console.log("DAY : "+dailyForecast)
      setGraph(dailyForecast)
    console.log("GRAPH 1/ : " + graph)
  }, [dailyForecast, graph])


  return (
    <div>
      {/* <div className='px-4'>Forecast</div> */}
      {dailyForecast && <div className='grid grid-cols-3 gap-2'>

        {dailyForecast.map((obj) => {
          return (
          <div className='h-28 p-2 bg-white bg-opacity-10 rounded-lg shadow-lg shadow-black-400 hover:bg-opacity-20 active:bg-opacity-30'>
            <div className='flex'>
              <Icon for='forecast' icon={obj.weather[0].icon} />
              <p className='pl-1 pt-4 font-normal font-lg'>{obj.main.temp_min.toFixed(0)}° / {obj.main.temp_max.toFixed(0)}°</p>
            </div>
            <p className='text-sm font-thin'>{toDate(obj.dt_txt.slice(0, 14))}</p>
          </div>
          )
        })}
      </div>}
    </div >
  )
}

export default Forecast