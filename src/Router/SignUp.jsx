import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, useMediaQuery, useToast } from '@chakra-ui/react'
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
    const [DisabledUserId, setDisabledUserId] = useState(false)
    const [DisabledMobile, setDisabledMobile] = useState(false)
    const [DisabledEmail, setDisabledEmail] = useState(false)
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
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
            const mobileData = res.data.find((el) => el.mobile == formData.mobile)
            const emailData = res.data.find((el) => el.email == formData.email)

            // console.log(userIdData);
            if (userIdData) {
                setDisabledUserId(true)
            } else if (mobileData) {
                setDisabledMobile(true)
            } else if (emailData) {
                setDisabledEmail(true)
            } else {
                setDisabledUserId(false);
                setDisabledMobile(false);
                setDisabledEmail(false);
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
                    onMouseOut={handleInputChange}
                    placeholder="Name"
                    type="text"
                />

                <FormLabel>User ID</FormLabel>
                <Input
                    borderColor={DisabledUserId ? "red.300" : null}
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    onMouseOut={handleInputChange}
                    placeholder="User ID"
                    type="text"
                />
                {DisabledUserId ? <FormHelperText textAlign={"start"} color={"red.300"}>
                    Enter a unique User ID
                </FormHelperText> : null}

                <FormLabel>Mobile Number</FormLabel>
                <Input
                    borderColor={DisabledMobile ? "red.300" : null}
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    onMouseOut={handleInputChange}
                    placeholder="Phone number"
                    type="number"
                />
                {DisabledMobile ? <FormHelperText textAlign={"start"} color={"red.300"}>
                    This Mobile number is already register.
                </FormHelperText> : null}
                <FormLabel>Email address</FormLabel>
                <Input
                    borderColor={DisabledEmail ? "red.300" : null}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onMouseOut={handleInputChange}
                    placeholder="Enter email address"
                    type="email"
                />

                <FormHelperText textAlign={"start"} color={DisabledEmail ? "red.300" : null}>
                    {DisabledEmail ? "This email Id is already register." : "We'll never share your email"}
                </FormHelperText>

                <FormLabel>Password</FormLabel>
                <Input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onMouseOut={handleInputChange}
                    placeholder="Enter Password"
                    type="password"
                />
                <Button
                    disabled={DisabledUserId || DisabledEmail || DisabledMobile}
                    display="block"
                    margin="none"
                    marginTop="15px"
                    marginBottom={isLargerThan600 ? null : "15px"}
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
