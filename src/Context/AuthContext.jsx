import React, { useState } from 'react'

export const AuthContextProvider = React.createContext();
const intialState = {
    isAuth: false,
    userId: null
}

const AuthContext = ({ children }) => {
    const [state, setStat] = useState(intialState);
    const [picProfile, setPicProfile] = useState("");

    const loginHandle = (Id) => {
        setStat({ ...state, isAuth: true, userId: Id })
    }
    const logoutHandle = () => {
        setStat(intialState)
    }
    const ProfilePic = (imageURL) => {
        setPicProfile(imageURL)
    }
    return (
        <AuthContextProvider.Provider value={{ authState: true, state, loginHandle, logoutHandle, ProfilePic, picProfile }}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext

