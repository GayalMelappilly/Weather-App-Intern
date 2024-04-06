import React, { useContext } from 'react'
import { Chart as defaults, plugins } from 'chart.js/auto'
import { Bar, Chart, Line, Radar } from 'react-chartjs-2'
import { detailsContext } from '../../Context/Context'

function Graph() {
    defaults.maintainAspectRatio = false
    defaults.responsive = true

    const { graph, hourlyForecast } = useContext(detailsContext)
    
    if(hourlyForecast){
        hourlyForecast.map((obj)=>{
            console.log(obj.dt_txt)
        })
    }

    const toDate = (date) => {
        const cDate = new Date(date);
        if(window.innerWidth > 640){  
           return cDate.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: '2-digit'
            });
        }else{
            return cDate.toLocaleString('en-US', {
                weekday: 'short',
            });
        }
    }

    return (
        <div className='flex justify-center align-middle h-full p-3 pt-4      max-lg:py-10 max-lg:h-80     max-md:py-10 max-md:h-80         max-sm:h-auto max-sm:w-full max-sm:inline-block max-sm:align-middle max-sm:py-3'>
            {/* <div className='flex bg-opacity-70 h-8 rounded-lg shadow-lg dark:shadow-slate-900 dark:bg-opacity-10 dark:bg-slate-500'>
                <button className='h-8 p-1 font-thin px-2'>DAILY</button>
            </div> */}
            <Line
                className='w-full max-sm:w-full max-sm:h-40'
                data={{
                    labels: graph.map((obj) => {
                        if(toDate(obj?.dt_txt?.slice(0, 14)) === "Invalid Date")
                            return null
                        else
                           return toDate(obj?.dt_txt?.slice(0, 14))
                    }),
                    datasets: [
                        {
                            label: 'Min',
                            data: graph.map((obj) => obj?.main?.temp_min || 0),
                        },
                        {
                            label: 'Max',
                            data: graph.map((obj) => obj?.main?.temp_max || 0)
                        },
                        {
                            label: "Humidity",
                            data: graph.map((obj) => obj?.main?.humidity || 0)
                        }
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}

export default Graph