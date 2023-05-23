import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../Context/AuthContext'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { FaArrowAltCircleRight } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { loginHandle, ProfilePic } = useContext(AuthContextProvider);
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    const handleClick = () => {
        setIsLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/loginData`).then((res) => {

            const loginD = res.data.find((el) => el.email == loginData.email && el.password == loginData.password)

            if (loginD) {
                //alert("Login Succesfully")
                navigate("/")
                loginHandle(loginD.userId);
                ProfilePic(loginD.image)
                setIsLoading(false)
                toast({
                    title: 'Login Successfully.',
                    description: "We've login your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Wrong Input.',
                    description: "Sorry We've not login your account for you.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
                setIsLoading(false)
            }
        }).catch((err) => {
            toast({
                title: 'Login Unsuccessfully.',
                description: "Sorry We've not login your account for you.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setIsLoading(false)
        })

    }
    const hnadleChnageLogin = (e) => {

        setLoginData({ ...loginData, [e.target.name]: e.target.value });

    }
    return (
        <Box w={"80%"} m={"auto"} >
            <FormControl pb={"355px"} pt={"95px"}>
                <Heading>Login</Heading>
                <FormLabel>Email address</FormLabel>
                <Input placeholder='Enter email' name='email' value={loginData.email} onChange={(e) => { hnadleChnageLogin(e) }} type='email' />
                <FormHelperText textAlign={"start"}>We'll never share your email.</FormHelperText>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Enter password' name='password' value={loginData.password} onChange={(e) => { hnadleChnageLogin(e) }} type='password' />
                <Button
                    onClick={handleClick}
                    display={"block"}
                    margin={"none"}
                    marginTop={"15px"}
                    colorScheme={"blue"}
                    isLoading={isLoading}
                >Login</Button>
                <Box display={'flex'} w={"27%"} ml="74%" justifyContent={'space-between'} justifyItems={'center'} border={"0px solid white"}>
                    <Flex onClick={() => { navigate('/signup') }} gap={4} justifyContent={'center'} alignItems={'center'} border={"1px solid white"} m={"auto"} p={1} borderRadius={10} _hover={{ bg: "#4267B2", border: "2px solid white" }}>
                        SignUp Here <FaArrowAltCircleRight />
                    </Flex >
                    <Flex gap={4} onClick={() => { navigate('/forgotPassword') }} justifyContent={'center'} alignItems={'center'} border={"1px solid white"} m={"auto"} p={1} borderRadius={10} _hover={{ bg: "#4267B2", border: "2px solid white" }}>
                        Forgot Password <FaArrowAltCircleRight />
                    </Flex >
                </Box>
            </FormControl>


        </Box >
    )
}

export default Login