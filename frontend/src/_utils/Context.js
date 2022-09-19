import { createContext, useState } from "react";


export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [Logon, setLogon] = useState('Logoff')
    const toggleLogon = () => {

        setLogon(Logon === 'Logoff' ? 'Logon' : 'Logoff')
    }

    return (
        <LoginContext.Provider value={{ Logon, toggleLogon }}>
            {children}
        </LoginContext.Provider>
    )
}