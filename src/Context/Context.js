import { createContext, useState } from "react";

export const detailsContext = createContext('')

export const Context = ({ children }) => {
    const [data, setData] = useState([''])
    const [graph, setGraph] = useState([''])
    const [hourlyForecast, setHourlyForecast] = useState([null])

    return (
        <detailsContext.Provider value={{ data, setData, graph, setGraph, hourlyForecast, setHourlyForecast }}>
            {children}
        </detailsContext.Provider>
    )

}