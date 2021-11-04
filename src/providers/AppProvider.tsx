import React, {createContext} from 'react'
import { useMachine } from '@xstate/react';
import appMachine from '../machines/AppMachine'
import gmLogo from '../assets/images/giantMachineLogo.jpeg'

interface AppContextProps {
    send?: any,
    current?: any
}

interface AppProviderProps {
    children: React.ReactNode
}

export const AppContext = createContext<AppContextProps>({})

const AppProvider: React.FC<AppProviderProps> = ({children}) => {

    const [current, send] = useMachine(appMachine, {
        devTools:true
    })

    return <AppContext.Provider value={{current, send}}>
        <div className="mainHeader">
        <img src={gmLogo} alt="Giant Machines logo"/> <h1>Leverage</h1>
        </div>
       {children}
    </AppContext.Provider>
}

export default AppProvider

