import { createContext, useReducer } from "react";
import { initialStore, storeReducer } from "./storeReducer";

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {

    const [store,dispatch] =useReducer(storeReducer,initialStore)

    return (<StoreContext.Provider value={data}>
            {children}
    </StoreContext.Provider>)
}