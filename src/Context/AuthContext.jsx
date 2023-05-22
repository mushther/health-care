import React, { useState } from 'react'

export const AuthContextProvider = React.createContext();
const intialState = {
    isAuth: false,
    userId: null
}

const AuthContext = ({ children }) => {
    const [state, setStat] = useState(intialState);

    const loginHandle = (Id) => {
        setStat({ ...state, isAuth: true, userId: Id })
    }
    const logoutHandle = () => {
        setStat(intialState)
    }
    return (
        <AuthContextProvider.Provider value={{ authState: true, state, loginHandle, logoutHandle }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext

