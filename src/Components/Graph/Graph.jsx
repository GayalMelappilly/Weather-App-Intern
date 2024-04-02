import React, { useContext } from 'react'
import { Chart as defaults, plugins } from 'chart.js/auto'
import { Bar, Chart, Line, Radar } from 'react-chartjs-2'
import { detailsContext } from '../../Context/Context'

function Graph(props) {
    defaults.maintainAspectRatio = false
    defaults.responsive = true

    const { graph } = useContext(detailsContext)


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
        <div className='flex justify-center align-middle h-96 pt-4    max-sm:h-96 max-sm:w-full max-sm:inline-block max-sm:align-middle'>
            <Bar
                className='h-full'
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
                            data: graph.map((obj) => obj?.main?.temp_min || 0)
                        },
                        {
                            label: 'Max',
                            data: graph.map((obj) => obj?.main?.temp_max || 0)
                        },
                        {
                            label: "Hum",
                            data: graph.map((obj) => obj?.main?.humidity || 0)
                        }
                    ],
                }}
            />




        </div>
    )
}

export default Graph