import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import PrivateRoute from '../Components/PrivetRoute'
import Medicines from '../pages/Medicines'
import BookAppointment from './BookAppointment'
import DoctorList from './DoctorList'
import Home from './Home'
import Login from './Login'
import Status from './Status'
import Userlist from './Userlist'
import SignUp from './SignUp'
import Profile from './Profile'
import ForgotPassowrd from './ForgotPassowrd'

const AllRouting = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/doctorlist' element={<PrivateRoute><DoctorList /></PrivateRoute>} />
                <Route path='/userlist' element={<PrivateRoute><Userlist /></PrivateRoute>} />
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/status' element={<PrivateRoute><Status /></PrivateRoute>} />
                <Route path='/bookappointment' element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
                <Route path='/medicines' element={<Medicines />} />
                <Route path='/forgotPassword' element={<ForgotPassowrd />} />
            </Routes>
        </>
    )
}

export default AllRouting