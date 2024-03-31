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
      const firstPod = data[0].sys.pod;
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


  useEffect(() => {
    if (dailyForecast) console.log("DF : " + dailyForecast.day1.main.temp)
  })


  return (
    <div>
      {dailyForecast && <div>

        <div class="flex items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <Icon icon={dailyForecast.day1.weather[0].icon} />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </div>
        

      </div>}
    </div>
  )
}

export default Forecast