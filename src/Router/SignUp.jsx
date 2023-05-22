import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const initialState = {
    name: "",
    userId: "",
    mobile: null,
    email: "",
    password: "",
    image: ""
}

const SignUp = () => {
    const [formData, setFormData] = useState(initialState);
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [Disabled, setDisabled] = useState(false)

    //https://doctor-appointment-seven.vercel.app/loginData
    const handleSignup = () => {
        setIsLoading(true)
        axios.post(`https://renderapi-h6ct.onrender.com/loginData`, formData)
            .then((res) => {
                setIsLoading(false)
                toast({
                    title: 'SignUp Successfully.',
                    description: "We've create your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                navigate("/login")
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
                toast({
                    title: 'SigunUp Unsuccessfully.',
                    description: "Sorry We've not signup your account for you.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })

            });
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        axios.get(`https://renderapi-h6ct.onrender.com/loginData`).then((res) => {

            //setData(res.data)
            const userIdData = res.data.find((el) => el.userId == formData.userId)
            // console.log(userIdData);
            if (userIdData) {
                setDisabled(true)
            } else {
                setDisabled(false);
            }
        })

    }

    return (
        <Box w={"80%"} m={"auto"} >
            <FormControl pb={"355px"} pt={"95px"}>
                <Heading>SignUp</Heading>

                <FormLabel>Name</FormLabel>
                <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    type="text"
                />

                <FormLabel>User ID</FormLabel>
                <Input
                    bg={Disabled ? "red.300" : null}
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    placeholder="User ID"
                    type="text"
                />
                <FormHelperText textAlign={"start"} color={Disabled ? "red.300" : null}>
                    Enter a unique User ID
                </FormHelperText>

                <FormLabel>Mobile Number</FormLabel>
                <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    type="number"
                />

                <FormLabel>Email address</FormLabel>
                <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    type="email"
                />
                <FormHelperText textAlign={"start"}>
                    We'll never share your email.
                </FormHelperText>

                <FormLabel>Password</FormLabel>
                <Input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    type="password"
                />
                <Button
                    disabled={Disabled}
                    display="block"
                    margin="none"
                    marginTop="15px"
                    colorScheme="blue"
                    isLoading={isLoading}
                    onClick={handleSignup}
                >
                    SignUp
                </Button>

                <Link to="/login">Already have an account? Log in</Link>
            </FormControl>
        </Box>
    )
}

export default SignUp
