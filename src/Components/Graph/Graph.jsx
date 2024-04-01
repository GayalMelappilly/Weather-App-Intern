import React, { useContext, useDebugValue, useEffect } from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { detailsContext } from '../../Context/Context'

function Graph(props) {
    defaults.maintainAspectRatio = false
    defaults.responsive = true
    const { graph } = useContext(detailsContext)
    console.log(props.name)
    
    useEffect(()=>{
        // console.log('ASDSAD : '+graph[0].dt_txt)
    },[graph])

    const toDate = (date) => {
        const cDate = new Date(date);
        const formattedDate = cDate.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit'
        });

        return formattedDate
    }

    return (
        <div className='flex justify-center items-center h-full'>
            <Line
                data={{
                    labels: graph.map((obj)=>toDate(obj.dt_txt.slice(0, 14))),
                    datasets: [
                        {
                            label: 'Min',
                            data: graph.map((obj)=>obj.main.temp_min)
                        },
                        {
                            label: 'Max',
                            data: graph.map((obj)=>obj.main.temp_max)
                        },
                        {
                            label: "Hum",
                            data: graph.map((obj)=>obj.main.humidity)
                        }
                    ]
                }}
                options={{
                    plugins:{
                        title:{
                            text: `${props.name}, ${props.country}`
                        }
                    }
                }}
            />
        </div>
    )
}

export default Graph