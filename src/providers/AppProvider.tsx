import React, {createContext, useContext} from 'react'

interface AppContextProps {
    send?: any,
    current?: any
}

interface AppProviderProps {
    children: React.ReactNode
}

export const AppContext = createContext<AppContextProps>({})

const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    return <AppContext.Provider value={{}}>
       {children}
    </AppContext.Provider>
}

export default AppProvider

