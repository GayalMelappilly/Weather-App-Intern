import React, { useContext } from 'react'
import { Chart as defaults, plugins } from 'chart.js/auto'
import { Bar, Chart, Line, Radar } from 'react-chartjs-2'
import { detailsContext } from '../../Context/Context'

function Graph(props) {
    defaults.maintainAspectRatio = false
    defaults.responsive = true

    const { graph, hourlyForecast, setHourlyForecast } = useContext(detailsContext)


    const toDate = (date) => {
        const cDate = new Date(date);
        if (window.innerWidth > 640) {
            return cDate.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: '2-digit'
            });
        } else {
            return cDate.toLocaleString('en-US', {
                weekday: 'short',
            });
        }
    }

    const convertTo12HourFormat = (time) => {
        const [hours] = time.split(':').map(Number);
        const period = hours < 12 ? 'AM' : 'PM';
        let hours12 = hours % 12 || 12;
        const standardTime = `${hours12} ${period}`;
        return standardTime;
    }

    return (
        <div className='flex justify-center align-middle h-full p-3 pt-4 relative      max-lg:py-10 max-lg:h-80     max-md:py-10 max-md:h-80         max-sm:h-72 max-sm:w-full max-sm:inline-block max-sm:align-middle max-sm:py-3'>
            <div onClick={() => { setHourlyForecast([null]) }}>
                <p className='bg-opacity-10 p-1 px-2 rounded-lg shadow-[0px_0px_2px_0px_#00000024] dark:bg-opacity-10 dark:bg-slate-500 absolute right-0 text-base font-thin cursor-pointer top-2 dark:text-white  max-md:text-xs'>{window.innerWidth > 640 ? 'Daily Forecast' : 'Daily'}</p>
            </div>

            {hourlyForecast.length > 2 ? <Line
                className='h-full'
                data={{
                    labels: hourlyForecast.map((obj) => {
                        if (convertTo12HourFormat(obj?.dt_txt?.slice(11, 19)) === "Invalid Date")
                            return null
                        else
                            return convertTo12HourFormat(obj?.dt_txt?.slice(11, 19))
                    }),
                    datasets: [
                        {
                            label: 'Min',
                            data: hourlyForecast.map((obj) => obj?.main?.temp_min || 0),
                        },
                        {
                            label: 'Max',
                            data: hourlyForecast.map((obj) => obj?.main?.temp_max || 0)
                        },
                        {
                            label: "Humidity",
                            data: hourlyForecast.map((obj) => obj?.main?.humidity || 0)
                        }
                    ],
                }}
                height={"100%"}
                width={"100%"}
                options={{
                    maintainAspectRatio: false
                }}
            />
                :
                <Line
                    className='h-full'
                    data={{
                        labels: graph.map((obj) => {
                            if (toDate(obj?.dt_txt?.slice(0, 14)) === "Invalid Date")
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
                    height={"100%"}
                    width={"100%"}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            }

            {/* <Line
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
                height={"100%"}
                width={"100%"}
                options={{
                    maintainAspectRatio: false
                }}
            /> */}




        </div>
    )
}

export default Graph