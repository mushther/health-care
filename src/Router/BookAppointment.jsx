import { Box, Button, FormControl, FormLabel, Heading, Input, Text, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import axios from "axios";
import { FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../Context/AuthContext';


const BookAppointment = () => {
    const [appointment] = useState(JSON.parse(localStorage.getItem("appointment")))
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    const toast = useToast();
    const navigate = useNavigate();
    const { state } = useContext(AuthContextProvider);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    const initialData = {
        username: "",
        age: "",
        email: "",
        mobile: "",
        status: true,
        token: `HC${Date.now()}`,
        description: "",
        doctorname: appointment.doctorname,
        doctorfee: appointment.doctorfee,
        doctorUserId: appointment.doctorUserId,
        userId: state.userId
    }
    const [formState, setFormState] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === "number" ? Number(value) : value;
        setFormState({ ...formState, [name]: val })
    }
    //console.log(Date.now());

    const postData = (id) => {
        setIsLoading(true)
        axios.post(`https://renderapi-h6ct.onrender.com/user`, formState)
            .then(function (response) {
                // console.log(response, );
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
        //console.log(formState);

        axios.patch(`https://renderapi-h6ct.onrender.com/doctor/${id}`, {
            "appointment": +(appointment.appointment) + 1
        }).then((res) => {
            navigate("/")
            toast({
                title: 'Book Appointment Successfully.',
                description: `Hello ${formState.username} Your Appointment Booked. Your Token No. ${formState.token}`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }).catch((err) => {
            console.log(err);
            toast({
                title: 'Not Book Appointment Successfully.',
                description: `Hello ${formState.username} Your Appointment is not Booked`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })

    }


    return (
        <Box w={"80%"} m={"auto"} pt={"35px"} pb={"95px"} mt={"80px"}>
            <FormControl position={"none"}>
                <Heading size={isLargerThan600 ? '2xl' : 'lg'} display='flex' alignItems='center' mb={5} gap='15px'>< FaTicketAlt />Book Doctor's Appointment</Heading>
                <FormLabel>Patient Name</FormLabel>
                <Input
                    position={"none"}
                    placeholder='Enter Your Name'
                    type='text'
                    name='username'
                    onChange={handleChange}
                    value={formState.username}
                />
                <FormLabel>Patient Age</FormLabel>
                <Input
                    position={"none"}
                    placeholder='Enter Your Age'
                    type='number'
                    name='age'
                    onChange={handleChange}
                    value={formState.age}
                />
                <FormLabel>Email Address</FormLabel>
                <Input
                    position={"none"}
                    type='email'
                    placeholder='Enter Your Email'
                    name='email'
                    onChange={handleChange}
                    value={formState.email}
                />
                <FormLabel>Mobile Number</FormLabel>
                <Input
                    position={"none"}
                    type='number'
                    placeholder='Enter Your Moblie No.'
                    name='mobile'
                    onChange={handleChange}
                    value={formState.mobile}
                />
                <FormLabel>Discribe Your Problem</FormLabel>
                <Input
                    position={"none"}
                    type='text'
                    placeholder='Enter Your Problem'
                    name='description'
                    onChange={handleChange}
                    value={formState.description}
                />
                <FormLabel>Doctor's Name</FormLabel>
                <Input
                    position={"none"}
                    disabled={true}
                    type='text'
                    name='doctorname'
                    onChange={handleChange}
                    value={formState.doctorname}
                />
                <FormLabel>Doctor's Fee</FormLabel>
                <Input
                    position={"none"}
                    disabled={true}
                    type='text'
                    name='doctorfee'
                    onChange={handleChange}
                    value={`₹${formState.doctorfee}/-`}
                />
                {
                    +(appointment.appointment) < 10 ? <Text
                        textAlign={"start"}
                        fontSize={"15px"}
                        fontWeight={"bold"}
                        p={1}
                        borderRadius={3}
                        mt={3} w={isLargerThan600 ? "17%" : '100%'}
                        color={"white"}
                        bg={"green"}
                    > Appointment Available : {(10) - (+(appointment.appointment))}</Text>
                        : <Text textAlign={"start"} fontSize={"15px"} fontWeight={"bold"} p={1} borderRadius={3} mt={3} w={isLargerThan600 ? "17%" : "100%"} color={"white"} bg={"red"}>Appointment Not Available</Text>
                }
                {
                    +(appointment.appointment) >= 10 ?
                        <Button onClick={() => { postData(appointment.id) }} disabled={true} display={"block"} margin={"none"} marginTop={"15px"} colorScheme={"blue"}>Book Appointment</Button>
                        : <Button onClick={(e) => { postData(appointment.id) }} display={"block"} margin={"none"} marginTop={"15px"} colorScheme={"blue"} isLoading={isLoading}>Book Appointment</Button>
                }
            </FormControl>


        </Box>
    )
}

export default BookAppointment