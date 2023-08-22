import React, { useContext, useState } from 'react'
import { useMediaQuery, useToast } from '@chakra-ui/react';
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../Context/AuthContext';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';

const ForgotPassowrd = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { loginHandle } = useContext(AuthContextProvider);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [forgotData, setForgotData] = useState({
        email: "",
        userId: ""
    })
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    const handleClick = () => {
        setIsLoading(true)
        axios.get(`https://renderapi-h6ct.onrender.com/loginData`).then((res) => {

            const forgotD = res.data.find((el) => el.email == forgotData.email && el.userId == forgotData.userId)
            // console.log(forgotD);
            if (forgotD) {
                setData(forgotD)
                setIsLoading(false)
                toast({
                    title: 'Forgot Successfully.',
                    description: "We've Forgot your account for you.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                })
            } else {
                setIsLoading(false)
                toast({
                    title: 'Wrong Input.',
                    description: "Sorry We've not Forgot your account for you.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
        }).catch((err) => {
            setIsLoading(false)
            toast({
                title: 'Forgot Unsuccessfully.',
                description: "Sorry We've not login your account for you.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })

    }
    const hnadleChnageLogin = (e) => {
        setForgotData({ ...forgotData, [e.target.name]: e.target.value });
    }
    return (
        <Box w={"80%"} m={"auto"} >
            {data.length >= 1 ?
                <FormControl pt={"95px"}>
                    <Heading>Forgot Password</Heading>
                    <FormLabel>Email address</FormLabel>
                    <Input placeholder='Enter email' name='email' value={forgotData.email} onChange={(e) => { hnadleChnageLogin(e) }} type='email' />
                    <FormHelperText textAlign={"start"}>We'll never share your email.</FormHelperText>
                    <FormLabel>UserId</FormLabel>
                    <Input placeholder='Enter UserId' name='userId' value={forgotData.userId} onChange={(e) => { hnadleChnageLogin(e) }} type='text' />
                    <Button
                        onClick={handleClick}
                        display={"block"}
                        margin={"none"}
                        marginTop={"15px"}
                        colorScheme={"blue"}
                        isLoading={isLoading}
                    >Forgot Password</Button>
                </FormControl> :
                <Box w={"80%"} m={"auto"} pt={"95px"} textAlign={'start'} display={'flex'} flexDirection={'column'} gap={5}>
                    <Heading>Forgot Password Successfully</Heading>
                    <Heading size={'md'}>Email Id: {data.email}</Heading>
                    <Heading size={'md'}>UserId: {data.userId}</Heading>
                    <Heading size={'md'}>Password: {data.password}</Heading>
                </Box>
            }
            <Box display={isLargerThan600 ? 'flex' : 'grid'} justifyContent={'space-between'} justifyItems={'center'} gap={isLargerThan600 ? '0px' : '10px'} w={isLargerThan600 ? "27%" : "64%"} mb={"40px"} mt={isLargerThan600 ? "0px" : "10px"} ml={isLargerThan600 ? "73%" : "0%"} border={"0px solid white"} >
                <Flex gap={4} onClick={() => { navigate('/login') }} justifyContent={'center'} alignItems={'center'} border={"1px solid white"} m={"auto"} ml={isLargerThan600 ? null : "0px"} p={1} borderRadius={10} _hover={{ bg: "#4267B2", border: "2px solid white" }}>
                    Login <FaArrowAltCircleRight />
                </Flex >
                <Flex gap={4} onClick={() => { navigate('/signup') }} justifyContent={'center'} alignItems={'center'} border={"1px solid white"} m={"auto"} p={1} borderRadius={10} _hover={{ bg: "#4267B2", border: "2px solid white" }}>
                    SignUp Here <FaArrowAltCircleRight />
                </Flex >
            </Box>
        </Box>
    )
}

export default ForgotPassowrd