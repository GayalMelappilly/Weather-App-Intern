import React, { useContext } from 'react'
import { Chart as defaults } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { detailsContext } from '../../Context/Context'

function Graph(props) {
    defaults.maintainAspectRatio = false
    defaults.responsive = true
    const { graph } = useContext(detailsContext)

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
                    ]
                }}
                options={{
                    plugins: {
                        title: {
                            text: `${props.name}, ${props.country}`
                        }
                    }
                }}
            />




        </div>
    )
}

export default Graph