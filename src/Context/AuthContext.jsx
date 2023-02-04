import React, { useState } from 'react'

export const AuthContextProvider = React.createContext();
const intialState = {
    isAuth: false,
    token: null
}

const AuthContext = ({ children }) => {
    const [state, setStat] = useState(intialState);

    //localStorage.setItem("auth", true);

    //const status = localStorage.getItem('auth');

    const loginHandle = (token) => {
        setStat({ ...state, isAuth: true, token })
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

