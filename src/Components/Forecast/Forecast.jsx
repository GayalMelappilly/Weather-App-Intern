import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY } from '../../Constants/constants'

function Forecast(props) {
  const [forecast, setForecast] = useState([null])
  const [dailyForecast, setDailyForecast] = useState()
  // const [lat, setLat] = useState()
  // const [lon, setLon] = useState()

  // setLat(props.lat)
  // setLon(props.lon)
  useEffect(() => {
    const getData = async () => {
      await axios.get((`https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=${API_KEY}`)).then((response) => {
        setForecast(response.data.list)
        console.log('FORECAST : ' + forecast)
      })
    }
    getData()

    if (forecast[0].sys.pod === 'd') {
      setDailyForecast({
        day1: forecast[0],
        day2: forecast[4],
        day3: forecast[12],
        day4: forecast[20],
        day5: forecast[28],
        day6: forecast[36]
      })
    } else if (forecast[0].sys.pod === 'n') {
      setDailyForecast({
        day1: forecast[0],
        day2: forecast[8],
        day3: forecast[16],
        day4: forecast[24],
        day5: forecast[32],
        day6: forecast[40]
      })
    }

    console.log(dailyForecast)
  }, [props.lat, props.lon])

  // forecast.map((list)=>{
  //   console.log(list.dt, list.dt_txt)
  // })

  // if(forecast[0].sys.pod === 'd') console.log(forecast[0].dt_txt,forecast[4].dt_txt,forecast[12].dt_txt,forecast[20].dt_txt,forecast[28].dt_txt,forecast[36].dt_txt)
  // else if(forecast[0].sys.pod === 'n') console.log(forecast[0].dt_txt,forecast[8].dt_txt,forecast[16].dt_txt,forecast[24].dt_txt,forecast[32].dt_txt,forecast[40].dt_txt)






  return (
    <div>
      {/* {dailyForecast.map((weather)=>{
        <div>

        </div>
      })} */}
    </div>
  )
}

export default Forecast