import { createContext, useState } from "react";

export const detailsContext = createContext('')

export const Context = ({children}) => {
    const [data, setData] = useState([''])
    const [graph, setGraph] = useState([''])

    return (
        <detailsContext.Provider value={{data, setData, graph, setGraph}}>
            {children}
        </detailsContext.Provider>
    )

}