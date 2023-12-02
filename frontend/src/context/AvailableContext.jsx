import { createContext, useState } from "react";

export const AvailableContext = createContext()

export function AvailableContextProvider ({children}){
    const [locked,setLocked] = useState(true)

    return (<AvailableContext.Provider value={{locked,setLocked}}>
        {children}
    </AvailableContext.Provider>) 
}